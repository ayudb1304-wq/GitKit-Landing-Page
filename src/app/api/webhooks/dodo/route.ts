import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Environment variables
const GITHUB_PAT = process.env.GITHUB_PAT;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const DODO_WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET;

// Type definitions
interface DodoWebhookPayload {
  type: string;
  data: {
    payment_id?: string;
    customer?: {
      email?: string;
      name?: string;
    };
    email?: string;
    metadata?: {
      github_username?: string;
      [key: string]: string | undefined;
    };
    // Dodo passes query params as metadata_* fields
    metadata_github_username?: string;
  };
}

interface GitHubSearchResponse {
  total_count: number;
  items: Array<{
    login: string;
  }>;
}

interface GitHubErrorResponse {
  message: string;
  documentation_url?: string;
}

/**
 * Verify Dodo webhook signature using HMAC-SHA256
 * Dodo uses Svix-style webhooks with the format: v1,<signature>
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookId: string,
  timestamp: string,
  secret: string
): boolean {
  try {
    // Svix signature format: "v1,<base64_signature>"
    const signatures = signature.split(" ");
    
    for (const sig of signatures) {
      const [version, signatureValue] = sig.split(",");
      
      if (version !== "v1" || !signatureValue) {
        continue;
      }

      // Svix signed content format: "{webhook_id}.{timestamp}.{payload}"
      const signedContent = `${webhookId}.${timestamp}.${payload}`;
      
      // Decode the secret (Svix secrets are base64 encoded with "whsec_" prefix)
      const secretBytes = secret.startsWith("whsec_")
        ? Buffer.from(secret.substring(6), "base64")
        : Buffer.from(secret, "utf8");

      const expectedSignature = crypto
        .createHmac("sha256", secretBytes)
        .update(signedContent)
        .digest("base64");

      if (signatureValue === expectedSignature) {
        return true;
      }
    }

    // Also try simple HMAC verification (fallback for different Dodo implementations)
    const simpleSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signature === simpleSignature || signature === `sha256=${simpleSignature}`) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("❌ Signature verification error:", error);
    return false;
  }
}

/**
 * Lookup GitHub username by email using the GitHub Search API
 */
async function findGitHubUsername(email: string): Promise<string | null> {
  const searchUrl = `https://api.github.com/search/users?q=${encodeURIComponent(email)}+in:email`;

  const response = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    console.error(`❌ GitHub search API error: ${response.status} ${response.statusText}`);
    return null;
  }

  const data: GitHubSearchResponse = await response.json();

  if (data.total_count === 0 || data.items.length === 0) {
    return null;
  }

  return data.items[0].login;
}

/**
 * Invite a GitHub user to the repository with read (pull) permission
 */
async function inviteToRepository(username: string): Promise<{ success: boolean; error?: string }> {
  const inviteUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/collaborators/${username}`;

  const response = await fetch(inviteUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      permission: "pull", // read-only access
    }),
  });

  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;
    try {
      const errorData: GitHubErrorResponse = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Use status text if JSON parsing fails
    }
    return { success: false, error: errorMessage };
  }

  return { success: true };
}

/**
 * Extract GitHub username from metadata (handles both nested and flattened formats)
 */
function extractMetadataUsername(data: DodoWebhookPayload["data"]): string | null {
  // Priority 1: Check flattened format (metadata_github_username) - this is how URL params come through
  if (data.metadata_github_username) {
    return data.metadata_github_username.trim();
  }
  // Priority 2: Check nested metadata object
  if (data.metadata?.github_username) {
    return data.metadata.github_username.trim();
  }
  return null;
}

export async function POST(request: NextRequest) {
  // Get webhook headers for signature verification
  const webhookSignature = request.headers.get("webhook-signature");
  const webhookId = request.headers.get("webhook-id");
  const webhookTimestamp = request.headers.get("webhook-timestamp");

  // Read raw body for signature verification
  const rawBody = await request.text();

  // Verify webhook signature if secret is configured
  if (DODO_WEBHOOK_SECRET) {
    if (!webhookSignature || !webhookId) {
      console.error("❌ Missing required webhook headers (webhook-signature or webhook-id)");
      return NextResponse.json({ error: "Missing webhook headers" }, { status: 401 });
    }

    const isValid = verifyWebhookSignature(
      rawBody,
      webhookSignature,
      webhookId,
      webhookTimestamp || "",
      DODO_WEBHOOK_SECRET
    );

    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.log("✓ Webhook signature verified");
  } else {
    console.warn("⚠️ DODO_WEBHOOK_SECRET not configured - skipping signature verification");
  }

  // Parse the payload
  let payload: DodoWebhookPayload;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    console.error("❌ Failed to parse webhook payload");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("═══════════════════════════════════════════════════════════");
  console.log(`📥 Received Dodo webhook: ${payload.type}`);
  console.log(`📦 Payment ID: ${payload.data?.payment_id || "(unknown)"}`);

  // Only process payment.succeeded events
  if (payload.type !== "payment.succeeded") {
    console.log(`ℹ️ Ignoring event type: ${payload.type}`);
    console.log("═══════════════════════════════════════════════════════════");
    return NextResponse.json({ received: true });
  }

  // Extract customer info
  const email = payload.data?.customer?.email || payload.data?.email;
  const customerName = payload.data?.customer?.name || "(unknown)";
  console.log(`💳 Payment succeeded!`);
  console.log(`   Customer: ${customerName}`);
  console.log(`   Email: ${email || "(no email)"}`);

  // Check for required environment variables
  if (!GITHUB_PAT || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("❌ Missing GitHub environment variables (GITHUB_PAT, GITHUB_OWNER, or GITHUB_REPO)");
    console.log("═══════════════════════════════════════════════════════════");
    return NextResponse.json({ received: true, warning: "Server misconfiguration" });
  }

  // Smart Username Extraction
  // PRIORITY 1: Try to get username from metadata (pre-checkout capture)
  const metadataUsername = extractMetadataUsername(payload.data);
  
  let username: string | null = null;
  let source: "metadata" | "email_search" | null = null;

  if (metadataUsername) {
    console.log(`🎯 PRIORITY 1: Found GitHub username from metadata: "${metadataUsername}"`);
    username = metadataUsername;
    source = "metadata";
  } else if (email) {
    // PRIORITY 2: Fallback to email search
    console.log(`🔍 PRIORITY 2: No metadata username found, searching GitHub by email...`);
    username = await findGitHubUsername(email);
    if (username) {
      console.log(`🔍 Found GitHub user via email search: "${username}"`);
      source = "email_search";
    } else {
      console.warn(`⚠️ User Mismatch: No GitHub user found with email "${email}"`);
    }
  }

  if (!username) {
    console.warn("═══════════════════════════════════════════════════════════");
    console.warn(`⚠️ MANUAL ACTION REQUIRED`);
    console.warn(`   Could not determine GitHub username for customer.`);
    console.warn(`   Email: ${email || "(not provided)"}`);
    console.warn(`   Metadata username: ${metadataUsername || "(not provided)"}`);
    console.warn("═══════════════════════════════════════════════════════════");
    // Return 200 OK to prevent Dodo from retrying - manual intervention needed
    return NextResponse.json({
      received: true,
      warning: "GitHub user not found - manual invite required",
      email: email || null,
    });
  }

  // Invite user to repository
  console.log(`📨 Sending invite to "${username}" for ${GITHUB_OWNER}/${GITHUB_REPO}...`);
  const inviteResult = await inviteToRepository(username);

  if (inviteResult.success) {
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`✅ Invite Sent to ${username}`);
    console.log(`   Repository: ${GITHUB_OWNER}/${GITHUB_REPO}`);
    console.log(`   Source: ${source}`);
    console.log(`   Email: ${email || "(none)"}`);
    console.log("═══════════════════════════════════════════════════════════");
    return NextResponse.json({
      received: true,
      success: true,
      username,
      source,
    });
  } else {
    console.log("═══════════════════════════════════════════════════════════");
    console.error(`❌ Invite Failed for ${username}`);
    console.error(`   Error: ${inviteResult.error}`);
    console.error(`   Repository: ${GITHUB_OWNER}/${GITHUB_REPO}`);
    console.log("═══════════════════════════════════════════════════════════");
    // Still return 200 to prevent endless retries
    return NextResponse.json({
      received: true,
      warning: "Failed to send GitHub invite",
      error: inviteResult.error,
    });
  }
}
