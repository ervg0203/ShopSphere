import ProductForm from "../features/admin/components/ProductForm";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

function AdminProductFormPage() {
  return (
    <div>
      <NavBar>
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Admin product form
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Add or edit products with a cleaner workspace.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Create strong product listings, update inventory, and keep the
                catalog organized.
              </p>
            </div>
          </section>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <ProductForm></ProductForm>
          </div>
        </div>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default AdminProductFormPage;
