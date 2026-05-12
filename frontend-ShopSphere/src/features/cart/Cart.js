import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";

function getCartProduct(item) {
  if (item?.product && typeof item.product === "object") {
    return item.product;
  }

  if (item?.products?.length) {
    const firstProduct = item.products[0];
    if (firstProduct?.product && typeof firstProduct.product === "object") {
      return firstProduct.product;
    }

    return firstProduct?.product || firstProduct;
  }

  return item?.product || item;
}

function getCartProductId(item) {
  const product = getCartProduct(item);
  return product?.id || product?._id || product;
}

function getCartItemId(item) {
  return item?.parentId || item?.id;
}

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null);

  const normalizedItems = items.flatMap((item) => {
    if (item?.products?.length) {
      return item.products.map((product, index) => ({
        id: `${item.id}-${product.id ?? index}`,
        parentId: item.id,
        product,
        quantity: product.quantity ?? 1,
      }));
    }

    if (item?.product) {
      return [item];
    }

    return [];
  });

  const cartViewItems = normalizedItems.map((item) => ({
    ...item,
    product: getCartProduct(item),
    cartItemId: getCartItemId(item),
  }));

  const totalAmount = cartViewItems.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0,
  );
  const totalItems = cartViewItems.reduce(
    (total, item) => item.quantity + total,
    0,
  );
  const aggregateCart = items.find((item) => item.products?.length);
  const displaySubtotal = aggregateCart?.discountedTotal ?? totalAmount;
  const displayTotalItems = aggregateCart?.totalQuantity ?? totalItems;

  const handleQuantity = (e, item) => {
    dispatch(
      updateCartAsync({ id: item.cartItemId, quantity: +e.target.value }),
    );
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

      <div className="space-y-8">
        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              {status === "loading" ? (
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
              ) : null}
              <ul className="-my-6 divide-y divide-gray-200">
                {cartViewItems.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail || item.product.images?.[0]}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link
                              to={`/product-detail/${getCartProductId(item)}`}
                            >
                              {item.product.title}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            ${discountedPrice(item.product)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {item.product.category}
                          {item.product.availabilityStatus
                            ? ` · ${item.product.availabilityStatus}`
                            : ""}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure you want to delete this Cart item ?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) =>
                              handleRemove(e, item.cartItemId)
                            }
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item.cartItemId}
                          ></Modal>
                          <button
                            onClick={(e) => {
                              setOpenModal(item.cartItemId);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">
                    Order summary
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Shipping and taxes are calculated at checkout.
                  </p>
                </div>
                <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                    Items
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {displayTotalItems}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    $ {displaySubtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Total items</span>
                  <span className="font-semibold text-slate-900">
                    {displayTotalItems} items
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/checkout"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-200"
                >
                  Checkout
                </Link>

                <Link
                  to="/"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  Continue Shopping
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
