export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24 text-zinc-400">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">1. Acceptance of Terms</h2>
            <p>
              By accessing or using GitKit, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">2. Use License</h2>
            <p>
              Permission is granted to use the GitKit codebase for personal or commercial projects. However, you may not resell, redistribute, or sublicense the codebase itself as a standalone product.
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li>You CAN use GitKit to build unlimited SaaS applications.</li>
              <li>You CAN use GitKit for client projects.</li>
              <li>You CANNOT resell GitKit as a boilerplate or starter kit.</li>
              <li>You CANNOT publish GitKit as open-source.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">3. Disclaimer</h2>
            <p>
              The materials on GitKit's website are provided on an 'as is' basis. GitKit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">4. Limitations</h2>
            <p>
              In no event shall GitKit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GitKit's website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">5. Refunds</h2>
            <p>
              Due to the nature of digital products, all sales are final. We do not offer refunds once access to the codebase has been granted.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

