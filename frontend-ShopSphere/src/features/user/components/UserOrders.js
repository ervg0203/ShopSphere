import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { discountedPrice } from "../../../app/constants";

function getOrderProduct(item) {
  if (item?.product && typeof item.product === "object") {
    return item.product;
  }

  return item?.product || item;
}

function getOrderProductId(item) {
  const product = getOrderProduct(item);
  return product?.id || product?._id || product;
}

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(fetchLoggedInUserOrderAsync(userInfo.id));
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return <p className="px-4 py-6 text-gray-600">Loading orders...</p>;
  }

  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          No orders yet
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Your completed purchases will appear here once you place an order.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <article
          key={order.id}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
        >
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-6 text-white sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                  Order summary
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Order # {order.id}
                </h1>
              </div>

              <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold capitalize text-white ring-1 ring-white/15">
                {order.status}
              </span>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Items in this order
                </h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {order.items.length} items
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => {
                  const product = getOrderProduct(item);
                  const productId = getOrderProductId(item);

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <img
                          src={product.thumbnail || product.images?.[0]}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                              <Link
                                to={`/product-detail/${productId}`}
                                className="transition hover:text-indigo-600"
                              >
                                {product.title}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {product.brand}
                            </p>
                          </div>

                          <p className="text-lg font-semibold text-slate-900">
                            $ {discountedPrice(product)}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                          <span className="rounded-full bg-white px-3 py-1 font-medium ring-1 ring-slate-200">
                            Qty {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="space-y-4 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                  Order totals
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
                  Payment breakdown
                </h2>
              </div>

              <div className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <p>Total items</p>
                  <p>{order.totalItems} items</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Shipping address
                </p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">
                    {order.selectedAddress.name}
                  </p>
                  <p>{order.selectedAddress.street}</p>
                  <p>{order.selectedAddress.pinCode}</p>
                  <p>Phone: {order.selectedAddress.phone}</p>
                  <p>{order.selectedAddress.city}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-indigo-50 px-4 py-4 text-sm text-indigo-900 ring-1 ring-indigo-100">
                Keep this receipt for support and delivery tracking.
              </div>
            </aside>
          </div>
        </article>
      ))}
    </div>
  );
}
