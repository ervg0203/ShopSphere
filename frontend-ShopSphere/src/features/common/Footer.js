import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800/70 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200">
              ShopSphere
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              A cleaner shopping experience with faster browsing, simple
              checkout, and a layout that stays easy to use.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <Link className="transition hover:text-white" to="/">
                  Products
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/cart">
                  Cart
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/checkout">
                  Checkout
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <Link className="transition hover:text-white" to="/about">
                  About us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/contact">
                  Contact us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/help">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              App
            </h4>
            <div className="mt-4 space-y-2">
              <a
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm transition hover:border-indigo-400/30 hover:bg-white/10"
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Google Play"
                  className="h-7 w-7 flex-shrink-0"
                />
                <span>
                  <span className="block text-[0.7rem] uppercase tracking-wide text-slate-400">
                    Download on
                  </span>
                  <span className="block font-medium text-white">
                    Google Play
                  </span>
                </span>
              </a>

              <a
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm transition hover:border-indigo-400/30 hover:bg-white/10"
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  alt="Apple Store"
                  className="h-7 w-7 flex-shrink-0"
                />
                <span>
                  <span className="block text-[0.7rem] uppercase tracking-wide text-slate-400">
                    Download on
                  </span>
                  <span className="block font-medium text-white">
                    Apple Store
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© ShopSphere, 2026.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="transition hover:text-slate-300" to="/">
              Home
            </Link>
            <Link className="transition hover:text-slate-300" to="/cart">
              Cart
            </Link>
            <Link className="transition hover:text-slate-300" to="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
