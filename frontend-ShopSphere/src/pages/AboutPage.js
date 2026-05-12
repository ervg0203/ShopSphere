import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

function AboutPage() {
  return (
    <div>
      <NavBar>
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                About ShopSphere
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple shopping, styled right.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                We believe shopping should feel calm and easy, not cluttered and
                confusing. ShopSphere is built with clean design and thoughtful
                features.
              </p>
            </div>
          </section>

          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-4 text-slate-600">
              We're on a mission to create a shopping experience that feels
              good. Every page, every button, every interaction is designed to
              be clear, fast, and respectful of your time.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Why ShopSphere?
            </h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-indigo-600 font-bold">
                  ✓
                </span>
                <span>Clean, intuitive design that doesn't distract</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-indigo-600 font-bold">
                  ✓
                </span>
                <span>Fast checkout in just a few clicks</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-indigo-600 font-bold">
                  ✓
                </span>
                <span>Works perfectly on mobile or desktop</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 text-indigo-600 font-bold">
                  ✓
                </span>
                <span>Your security and privacy come first</span>
              </li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Built for You
            </h2>
            <p className="mt-4 text-slate-600">
              Whether you're browsing on your phone during lunch or shopping
              from your desktop, ShopSphere gives you the same smooth, reliable
              experience every time. We've removed the noise and kept the
              essentials.
            </p>
          </div>
        </div>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default AboutPage;
