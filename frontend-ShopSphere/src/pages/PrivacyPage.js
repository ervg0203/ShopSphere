import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

function PrivacyPage() {
  return (
    <div>
      <NavBar>
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Legal
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Your privacy is important to us. Here's how we protect your
                data.
              </p>
            </div>
          </section>

          <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                1. Information We Collect
              </h2>
              <p className="mt-4 text-slate-600">
                When you use ShopSphere, we collect information you provide
                directly, such as your name, email address, shipping address,
                and payment information. We also automatically collect
                information about your interactions with our site, including
                pages visited and actions taken.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                2. How We Use Your Information
              </h2>
              <p className="mt-4 text-slate-600">We use your information to:</p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Process and deliver your orders</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Send you order confirmations and updates</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Respond to your inquiries and support requests</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Improve our services and user experience</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                3. Data Protection
              </h2>
              <p className="mt-4 text-slate-600">
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. All sensitive data, including
                payment information, is encrypted and stored securely.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                4. Sharing Your Information
              </h2>
              <p className="mt-4 text-slate-600">
                We do not sell or share your personal information with third
                parties for marketing purposes. We may share information with
                service providers who assist in operating our website and
                conducting our business, subject to strict confidentiality
                agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                5. Your Rights
              </h2>
              <p className="mt-4 text-slate-600">
                You have the right to access, correct, or delete your personal
                information. You may also opt out of marketing communications at
                any time. To exercise these rights, please contact us at
                support@shopsphere.com.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                6. Contact Us
              </h2>
              <p className="mt-4 text-slate-600">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us at{" "}
                <a
                  href="mailto:support@shopsphere.com"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  support@shopsphere.com
                </a>
                .
              </p>
            </div>

            <p className="pt-4 text-sm text-slate-500">
              Last updated: May 2026
            </p>
          </div>
        </div>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default PrivacyPage;
