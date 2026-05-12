import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (!totalPages) {
    return null;
  }

  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, totalItems);

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [1];
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);

    if (left > 2) {
      pages.push("...");
    }

    for (let p = left; p <= right; p += 1) {
      pages.push(p);
    }

    if (right < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
          className="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
          disabled={page === totalPages}
          className="ml-3 inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white shadow-sm">
            {page}
          </span>
          <span>
            Showing{" "}
            <span className="font-semibold text-slate-900">{startItem}</span> to{" "}
            <span className="font-semibold text-slate-900">{endItem}</span> of{" "}
            <span className="font-semibold text-slate-900">{totalItems}</span>{" "}
            results
          </span>
        </div>

        <nav
          className="isolate inline-flex items-center gap-1"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() => handlePage(page > 1 ? page - 1 : page)}
            disabled={page === 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {visiblePages.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex h-9 min-w-[2.25rem] items-center justify-center text-sm font-medium text-slate-400"
                >
                  ...
                </span>
              );
            }

            const current = item === page;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handlePage(item)}
                aria-current={current ? "page" : undefined}
                className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors ${
                  current
                    ? "bg-indigo-600 text-white shadow"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePage(page < totalPages ? page + 1 : page)}
            disabled={page === totalPages}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
