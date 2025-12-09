import { NextRequest, NextResponse } from "next/server";

// Environment variables
const GITHUB_PAT = process.env.GITHUB_PAT;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
// const DODO_WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET;

interface DodoWebhookPayload {
  type: string;
  data: {
    customer?: {
      email?: string;
    };
    email?: string;
    metadata?: {
      github_username?: string;
    };
    // Dodo might flatten metadata with underscore prefix
    metadata_github_username?: string;
  };
}

interface GitHubSearchResponse {
  total_count: number;
  items: Array<{
    login: string;
  }>;
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
async function inviteToRepository(username: string): Promise<boolean> {
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
    const errorText = await response.text();
    console.error(`❌ Failed to invite ${username}: ${response.status} ${response.statusText} - ${errorText}`);
    return false;
  }

  return true;
}

/**
 * Extract GitHub username from metadata (handles both nested and flattened formats)
 */
function extractMetadataUsername(data: DodoWebhookPayload["data"]): string | null {
  // Check nested metadata object first
  if (data.metadata?.github_username) {
    return data.metadata.github_username;
  }
  // Check flattened format (metadata_github_username)
  if (data.metadata_github_username) {
    return data.metadata_github_username;
  }
  return null;
}

export async function POST(request: NextRequest) {
  // Check for webhook headers (basic validation)
  const webhookSignature = request.headers.get("webhook-signature");
  const webhookId = request.headers.get("webhook-id");

  if (!webhookSignature || !webhookId) {
    console.warn("⚠️ Missing webhook headers (webhook-signature or webhook-id)");
    // Continue processing but log the warning - some test webhooks may not include these
  }

  // --- HMAC Signature Verification (Commented out for future enablement) ---
  // To enable signature verification, uncomment the following code:
  //
  // import crypto from "crypto";
  //
  // const rawBody = await request.text();
  // const expectedSignature = crypto
  //   .createHmac("sha256", DODO_WEBHOOK_SECRET!)
  //   .update(rawBody)
  //   .digest("hex");
  //
  // if (webhookSignature !== expectedSignature) {
  //   console.error("❌ Invalid webhook signature");
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  // }
  //
  // const payload: DodoWebhookPayload = JSON.parse(rawBody);
  // ---

  let payload: DodoWebhookPayload;

  try {
    payload = await request.json();
  } catch {
    console.error("❌ Failed to parse webhook payload");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log(`📥 Received Dodo webhook: ${payload.type}`);
  console.log(`📦 Payload data:`, JSON.stringify(payload.data, null, 2));

  // Only process payment.succeeded events
  if (payload.type !== "payment.succeeded") {
    console.log(`ℹ️ Ignoring event type: ${payload.type}`);
    return NextResponse.json({ received: true });
  }

  // Extract customer email (for logging and fallback)
  const email = payload.data?.customer?.email || payload.data?.email;
  console.log(`💳 Payment succeeded for email: ${email || "(no email)"}`);

  // Check for required environment variables
  if (!GITHUB_PAT || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("❌ Missing GitHub environment variables (GITHUB_PAT, GITHUB_OWNER, or GITHUB_REPO)");
    return NextResponse.json({ received: true, warning: "Server misconfiguration" });
  }

  // PRIORITY 1: Try to get username from metadata (pre-checkout capture)
  const metadataUsername = extractMetadataUsername(payload.data);
  
  let username: string | null = null;
  let source: "metadata" | "email_search" | null = null;

  if (metadataUsername) {
    console.log(`🎯 Found GitHub username via Metadata: ${metadataUsername}`);
    username = metadataUsername;
    source = "metadata";
  } else if (email) {
    // PRIORITY 2: Fallback to email search (legacy support)
    console.log(`🔍 No metadata username found, searching by email: ${email}`);
    username = await findGitHubUsername(email);
    if (username) {
      console.log(`🔍 Found GitHub user via Email Search: ${username}`);
      source = "email_search";
    }
  }

  if (!username) {
    console.warn(`⚠️ Could not find GitHub user. Email: ${email || "(none)"}, Metadata username: ${metadataUsername || "(none)"}`);
    // Return 200 OK to prevent Dodo from retrying - manual intervention needed
    return NextResponse.json({
      received: true,
      warning: "GitHub user not found - manual invite required",
    });
  }

  // Invite user to repository
  const invited = await inviteToRepository(username);

  if (invited) {
    console.log(`✅ Successfully invited ${username} to ${GITHUB_OWNER}/${GITHUB_REPO} (via ${source})`);
    return NextResponse.json({
      received: true,
      success: true,
      username,
      source,
    });
  } else {
    console.error(`❌ Failed to invite ${username} to repository`);
    // Still return 200 to prevent endless retries
    return NextResponse.json({
      received: true,
      warning: "Failed to send GitHub invite",
    });
  }
}
