import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${siteConfig.name} website and waitlist.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 15, 2026">
      <section>
        <p>
          These Terms govern your use of the {siteConfig.name} website at{" "}
          {siteConfig.domain} and the waitlist signup. By using the site, you
          agree to these Terms.
        </p>
      </section>

      <section>
        <h2>The service</h2>
        <p>
          {siteConfig.name} is a pre-launch product. The website currently
          provides information about the product and lets you join a waitlist to
          be notified when it becomes available. Features described are subject to
          change and do not constitute a binding offer of any financial product.
        </p>
      </section>

      <section>
        <h2>Waitlist</h2>
        <ul>
          <li>You must provide a valid email address that you own.</li>
          <li>
            Joining the waitlist does not guarantee access, pricing, or
            availability at launch.
          </li>
          <li>
            You may leave the waitlist at any time via the unsubscribe link in any
            email we send.
          </li>
        </ul>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Submit false information or someone else&rsquo;s email address.</li>
          <li>
            Attempt to disrupt, probe, or gain unauthorised access to the site or
            its systems.
          </li>
          <li>Use the site for any unlawful purpose.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The {siteConfig.name} name, logo, content, and design are owned by us
          and protected by intellectual-property laws. You may not copy,
          reproduce, or reuse them without our written permission.
        </p>
      </section>

      <section>
        <h2>Disclaimers &amp; limitation of liability</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; without warranties of any kind.
          To the maximum extent permitted by law, we are not liable for any
          indirect or consequential damages arising from your use of the site.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these Terms from time to time. Material changes will be
          reflected by the &ldquo;Last updated&rdquo; date above. Continued use of
          the site after changes means you accept the revised Terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:legal@hover.money">legal@hover.money</a>.
        </p>
      </section>

      <section>
        <p className="text-sm text-ink-3">
          This document is a general template and does not constitute legal
          advice. Have it reviewed by qualified counsel before you rely on it in
          production.
        </p>
      </section>
    </LegalPage>
  );
}
