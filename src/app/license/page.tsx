export default function LicenseAgreement() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24 text-zinc-400">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold text-white">License Agreement</h1>
        <p className="mb-8 text-sm text-zinc-500">Last Updated: 14th December, 2025</p>
        
        {/* TL;DR Summary */}
        <div className="mb-10 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-yellow-500">TL;DR Summary</h2>
          <div className="space-y-2">
            <p><span className="text-green-500">✓ You CAN:</span> Build unlimited SaaS apps, client projects, and personal tools.</p>
            <p><span className="text-green-500">✓ You CAN:</span> Charge your users for the apps you build.</p>
            <p><span className="text-red-500">✗ You CANNOT:</span> Resell this code as a starter kit, boilerplate, or open-source it.</p>
            <p><span className="text-red-500">✗ You CANNOT:</span> Post this code to a public GitHub repository.</p>
          </div>
        </div>

        <p className="mb-8">
          This License Agreement (&quot;Agreement&quot;) is entered into between GitKit (&quot;Licensor&quot;), and you, the user (&quot;Licensee&quot;). By downloading, accessing, or using the GitKit codebase (the &quot;Product&quot;), Licensee agrees to be bound by the terms and conditions of this Agreement.
        </p>
        
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">1. Grant of License</h2>
            
            <h3 className="mt-4 mb-3 text-lg font-semibold text-zinc-300">1.1 Standard License (Individual &amp; Freelancers)</h3>
            <p>
              Subject to the terms and conditions of this Agreement, GitKit grants Licensee a non-exclusive, non-transferable, non-sublicensable worldwide license to use the Product for the following purposes:
            </p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li><strong>Unlimited Projects:</strong> Create an unlimited number of End Products (SaaS applications, websites, internal tools).</li>
              <li><strong>Commercial Use:</strong> Build and operate commercial services where end-users pay a fee.</li>
              <li><strong>Client Work:</strong> You are permitted to use the Product to build applications for clients. You may transfer the compiled/built application and the source code required to maintain it to the client, provided that the client does not resell the source code as a competing product.</li>
            </ul>

            <h3 className="mt-6 mb-3 text-lg font-semibold text-zinc-300">1.2 Team License (Agencies &amp; Startups)</h3>
            <p>If a Team License was purchased, the rights in Section 1.1 are extended to include:</p>
            <ul className="mt-4 list-disc pl-6 space-y-2">
              <li><strong>Multi-Seat Access:</strong> The Product may be shared and used by multiple developers within a single organization or legal entity.</li>
              <li><strong>Source Control:</strong> The Product may be stored in a private shared repository accessible only to team members.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">2. Strict Restrictions (The &quot;No-Go&quot; Zone)</h2>
            <p className="mb-4">Licensee shall NOT:</p>
            
            <h3 className="mt-4 mb-3 text-lg font-semibold text-zinc-300">2.1 No Resale of Source</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sell, resell, rent, lease, or exchange the Product itself, either in its original form or as a modified version (e.g., &quot;reskinned&quot; boilerplate).</li>
              <li>Create a derivative product that competes directly with GitKit (e.g., a &quot;Next.js Starter Kit&quot; based on this code).</li>
            </ul>

            <h3 className="mt-6 mb-3 text-lg font-semibold text-zinc-300">2.2 No Public Disclosure (Open Source)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Public Repositories:</strong> You are strictly prohibited from uploading the Product to any public code repository (e.g., GitHub Public Repo, GitLab Public). All repositories containing this code must be Private.</li>
              <li><strong>Open Source:</strong> You may not release the Product under any open-source license (MIT, GPL, etc.).</li>
            </ul>

            <h3 className="mt-6 mb-3 text-lg font-semibold text-zinc-300">2.3 No &quot;Wrapper&quot; Products</h3>
            <p>
              You may not wrap the Product in a thin UI layer or minor modification and sell it as a template, theme, or starter kit. The value of your End Product must be derived from your specific application logic, not the GitKit boilerplate foundation.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">3. Ownership and Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>GitKit Ownership:</strong> GitKit retains all ownership and intellectual property rights to the core boilerplate code.</li>
              <li><strong>Your Ownership:</strong> You retain full ownership of the intellectual property, design, and unique data of the End Products (the apps) you build. We claim no royalty or rights over your success.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">4. Updates and Support</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Updates:</strong> This license grants you access to the version of the Product available at the time of purchase. Future updates may be provided at GitKit&apos;s discretion but are not guaranteed unless explicitly stated.</li>
              <li><strong>Support:</strong> This license does not include dedicated engineering support or custom development services.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">5. Refund Policy (Digital Goods)</h2>
            <p>
              Due to the non-returnable nature of digital source code, all sales are final. By purchasing, the Licensee acknowledges that the Product is digital data that cannot be &quot;returned,&quot; and therefore, no refunds will be issued once access has been granted.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">6. Warranty and Disclaimer</h2>
            <p className="uppercase text-sm">
              THE PRODUCT IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND. GITKIT DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE CODE IS BUG-FREE OR THAT IT WILL MEET YOUR SPECIFIC REQUIREMENTS.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">7. Limitation of Liability</h2>
            <p className="uppercase text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, GITKIT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF PROFITS, DATA, OR REVENUE) ARISING OUT OF THE USE OF THE PRODUCT. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE PRODUCT.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">8. Governing Law</h2>
            <p>
              This Agreement shall be governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-zinc-200">Contact</h2>
            <p>
              <a href="mailto:support@getgitkit.com" className="text-yellow-500 hover:text-yellow-400">support@getgitkit.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
