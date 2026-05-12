import Cart from "../features/cart/Cart";
import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";

function CartPage() {
  return (
    <div>
      <NavBar>
        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-xl sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Your cart
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Review your items before checkout.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Check quantities, remove anything you do not need, and head to
                checkout when everything looks right.
              </p>
            </div>
          </section>

          <Cart></Cart>
        </div>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default CartPage;
