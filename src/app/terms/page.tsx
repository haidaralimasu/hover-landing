import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${siteConfig.name} website and private beta.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 1, 2026">
      <section>
        <p>
          These Terms govern your use of the {siteConfig.name} website at{" "}
          {siteConfig.domain} and the {siteConfig.name} private beta app. By using
          the site or the app, you agree to these Terms.
        </p>
      </section>

      <section>
        <h2>The service</h2>
        <p>
          {siteConfig.name} is currently available as a private beta on iOS
          through Apple TestFlight, with Android coming soon. The website lets
          you request an invite to the beta by email. Features described are
          subject to change during the beta period and do not constitute a
          binding offer of any financial product.
        </p>
      </section>

      <section>
        <h2>Private beta</h2>
        <ul>
          <li>You must provide a valid email address that you own to request an invite.</li>
          <li>
            Requesting an invite does not guarantee access, and invites are
            issued as spots become available.
          </li>
          <li>
            The beta app is provided for testing purposes and may contain bugs,
            incomplete features, or be changed or discontinued at any time
            without notice.
          </li>
          <li>
            You may leave the beta invite list at any time via the unsubscribe
            link in any email we send.
          </li>
          <li>
            Your use of the TestFlight app is also subject to Apple&rsquo;s
            TestFlight terms.
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
          <a href="mailto:support@hover.money">support@hover.money</a>,{" "}
          <a href="mailto:haidaralimasu123@gmail.com">
            haidaralimasu123@gmail.com
          </a>
          , or{" "}
          <a href="mailto:mustakimkhan1111176@gmail.com">
            mustakimkhan1111176@gmail.com
          </a>
          .
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
