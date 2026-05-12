import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountedPrice } from "../../../app/constants";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

// TODO: In server data we will add colors, sizes , highlights. to each product

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function dimensionLabel(product) {
  const width = product.dimensions?.width;
  const height = product.dimensions?.height;
  const depth = product.dimensions?.depth;

  if (width || height || depth) {
    return `${width ?? "?"} x ${height ?? "?"} x ${depth ?? "?"} cm`;
  }

  return "Not specified";
}

function getCartProductId(cartItem) {
  return cartItem?.product?.id || cartItem?.product?._id || cartItem?.product;
}

// TODO : Loading UI

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);
  const productImages = product?.images?.length ? product.images : [];
  const imageAt = (index) =>
    productImages[index] || product.thumbnail || productImages[0] || "";

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => getCartProductId(item) === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
        user: user.id,
      };
      dispatch(addToCartAsync(newItem));
      // TODO: it will be based on server response of backend
      alert.success("Item added to cart");
    } else {
      alert.info("This item is already in your cart.");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_45%,_#f8fafc)] py-8 sm:py-10">
      {status === "loading" ? (
        <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 px-10 py-12 shadow-xl shadow-slate-200/60 backdrop-blur-sm">
            <Grid
              height="80"
              width="80"
              color="rgb(79, 70, 229) "
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p className="mt-4 text-center text-sm font-medium text-slate-500">
              Loading product details...
            </p>
          </div>
        </div>
      ) : null}
      {product && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/60 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white sm:px-8">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  {product.breadcrumbs &&
                    product.breadcrumbs.map((breadcrumb) => (
                      <li key={breadcrumb.id}>
                        <div className="flex items-center gap-2">
                          <a
                            href={breadcrumb.href}
                            className="font-medium text-slate-200 transition hover:text-white"
                          >
                            {breadcrumb.name}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-slate-500"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      </li>
                    ))}
                  <li>
                    <a
                      href={product.href}
                      aria-current="page"
                      className="font-medium text-white"
                    >
                      {product.title}
                    </a>
                  </li>
                </ol>
              </nav>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                  {product.brand}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                  {product.category}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                  {product.availabilityStatus ||
                    (product.stock > 0 ? "In stock" : "Out of stock")}
                </span>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mx-auto max-w-7xl px-6 pb-6 pt-6 sm:px-8 lg:px-8 lg:pt-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                    <img
                      src={imageAt(0)}
                      alt={product.title}
                      className="h-[28rem] w-full object-cover object-center sm:h-[34rem]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 lg:col-span-2 lg:grid-cols-1">
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                    <img
                      src={imageAt(1)}
                      alt={product.title}
                      className="h-56 w-full object-cover object-center"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                    <img
                      src={imageAt(2)}
                      alt={product.title}
                      className="h-56 w-full object-cover object-center"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                    <img
                      src={imageAt(3)}
                      alt={product.title}
                      className="h-56 w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="grid grid-cols-1 gap-8 px-6 pb-8 pt-2 sm:px-8 lg:grid-cols-3 lg:gap-x-8 lg:pb-10 lg:pt-6">
              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm sm:p-8">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {product.title}
                  </h1>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="rounded-full bg-white px-3 py-1 font-medium text-indigo-700 ring-1 ring-indigo-100">
                      {product.brand}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 font-medium text-indigo-700 ring-1 ring-indigo-100">
                      {product.category}
                    </span>
                    {product.sku ? (
                      <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                        SKU: {product.sku}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    {product.availabilityStatus ||
                      (product.stock > 0
                        ? "In stock and ready to ship"
                        : "Currently unavailable")}
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                    <div className="flex items-end gap-3">
                      <p className="text-lg line-through tracking-tight text-slate-400">
                        ${product.price}
                      </p>
                      <p className="text-4xl font-semibold tracking-tight text-indigo-700">
                        ${discountedPrice(product)}
                      </p>
                    </div>
                    {product.discountPercentage ? (
                      <p className="mt-2 text-sm font-medium text-emerald-600">
                        Save {product.discountPercentage}% on this item
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                      Rating: {product.rating}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {product.reviews?.length || 0} reviews
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      Min order: {product.minimumOrderQuantity || 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="lg:row-span-3 lg:mt-0">
                <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Purchase
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    Secure checkout, fast delivery, and easy returns.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Stock
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {product.stock}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Weight
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {product.weight ?? "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Dimensions
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {dimensionLabel(product)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Warranty
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {product.warrantyInformation || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.rating > rating
                                ? "text-amber-400"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0",
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                    {product.reviews?.length ? (
                      <p className="mt-2 text-sm text-slate-500">
                        {product.reviews.length} customer review(s)
                      </p>
                    ) : null}
                  </div>

                  <form className="mt-8 space-y-8">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Color
                      </h3>

                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a color
                        </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {colors.map((color) => (
                            <RadioGroup.Option
                              key={color.name}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  color.selectedClass,
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none",
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.class,
                                  "h-8 w-8 rounded-full border border-black border-opacity-10",
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Size
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Size guide
                        </a>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a size
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-4">
                          {sizes.map((size) => (
                            <RadioGroup.Option
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={({ active }) =>
                                classNames(
                                  size.inStock
                                    ? "cursor-pointer bg-white text-slate-900 shadow-sm"
                                    : "cursor-not-allowed bg-slate-50 text-slate-300",
                                  active ? "ring-2 ring-indigo-500" : "",
                                  "group relative flex items-center justify-center rounded-2xl border py-3 px-4 text-sm font-semibold uppercase focus:outline-none sm:flex-1 sm:py-4",
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {size.inStock ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-2xl",
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-2xl border-2 border-slate-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-slate-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <button
                      onClick={handleCart}
                      type="submit"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-10 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 px-6 pb-8 sm:px-8 lg:grid-cols-3 lg:pb-10">
              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm sm:p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Description
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-700">
                    {product.description}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                      Highlights
                    </h3>
                    <ul role="list" className="mt-4 space-y-3">
                      {(product.tags?.length ? product.tags : highlights).map(
                        (highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200"
                          >
                            <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-indigo-500"></span>
                            <span>{highlight}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Details
                  </h2>
                  <div className="mt-4 space-y-4 text-sm text-slate-600">
                    <p>{product.description}</p>
                    <div className="space-y-3 rounded-2xl bg-slate-50 p-4">
                      <p>Stock: {product.stock}</p>
                      <p>Min order: {product.minimumOrderQuantity || 1}</p>
                      <p>Weight: {product.weight ?? "Not specified"}</p>
                      <p>Dimensions: {dimensionLabel(product)}</p>
                      <p>
                        Warranty:{" "}
                        {product.warrantyInformation || "Not specified"}
                      </p>
                      <p>
                        Shipping:{" "}
                        {product.shippingInformation || "Not specified"}
                      </p>
                      <p>
                        Return policy: {product.returnPolicy || "Not specified"}
                      </p>
                      <p>Barcode: {product.barcode || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
