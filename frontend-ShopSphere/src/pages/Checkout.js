import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/userSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { discountedPrice } from "../app/constants";
import { useAlert } from "react-alert";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

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

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const errorClassName =
    "mt-2 inline-flex max-w-full items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100";

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const alert = useAlert();

  const normalizedItems = items.flatMap((item) => {
    if (item?.products?.length) {
      return item.products.map((product, index) => ({
        id: `${item.id}-${product.id ?? index}`,
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

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {
    dispatch(
      updateCartAsync({ id: item.cartItemId, quantity: +e.target.value }),
    );
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const inputClassName =
    "block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600";
  const selectClassName =
    "rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600";
  const sectionCardClassName =
    "rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-sm sm:p-8";

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const orderItems = aggregateCart
        ? aggregateCart.products.map((item) => ({
            ...item,
            product: item.product || item,
          }))
        : cartViewItems;

      const order = {
        items: orderItems,
        totalAmount: aggregateCart?.discountedTotal ?? totalAmount,
        totalItems: aggregateCart?.totalQuantity ?? totalItems,
        user: user.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };

      if (paymentMethod === "card") {
        navigate("/payment-gateway", {
          state: {
            order,
          },
        });
        return;
      }

      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      alert.error("Please add an address and choose a payment method.");
    }
    //TODO : Redirect to order-success page
    //TODO : clear cart after order
    //TODO : on server change the stock number of items
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <NavBar>
        <div className="min-h-screen bg-slate-50 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                    Checkout
                  </p>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    Finish your order in a calm, clean flow.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Save an address, choose a payment method, and review your
                    cart before placing the order.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Items
                    </p>
                    <p className="mt-1 text-lg font-semibold">{totalItems}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Total
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      $ {totalAmount}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm col-span-2 sm:col-span-1">
                    <p className="text-xs uppercase tracking-wide text-slate-300">
                      Payment
                    </p>
                    <p className="mt-1 text-lg font-semibold capitalize">
                      {paymentMethod || "Choose"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3 space-y-8">
                <form
                  className={sectionCardClassName}
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    dispatch(
                      updateUserAsync({
                        ...user,
                        addresses: [...(user.addresses || []), data],
                      }),
                    );
                    reset();
                  })}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <h2 className="text-xl font-semibold leading-7 text-slate-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Use a permanent address where you can receive mail.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                      Address form
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className={inputClassName}
                        />
                        {errors.name && (
                          <p className={errorClassName}>
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className={inputClassName}
                        />
                        {errors.email && (
                          <p className={errorClassName}>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className={inputClassName}
                        />
                        {errors.phone && (
                          <p className={errorClassName}>
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className={inputClassName}
                        />
                        {errors.street && (
                          <p className={errorClassName}>
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className={inputClassName}
                        />
                        {errors.city && (
                          <p className={errorClassName}>
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className={inputClassName}
                        />
                        {errors.state && (
                          <p className={errorClassName}>
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className={inputClassName}
                        />
                        {errors.pinCode && (
                          <p className={errorClassName}>
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                    >
                      Add Address
                    </button>
                  </div>
                </form>

                <div className={sectionCardClassName}>
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      <h2 className="text-xl font-semibold leading-7 text-slate-900">
                        Addresses
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Choose from existing addresses.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Saved addresses
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {(user.addresses || []).map((address, index) => (
                      <li
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-indigo-200 hover:bg-indigo-50/60"
                      >
                        <label className="flex cursor-pointer items-start gap-4">
                          <input
                            onChange={handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            className="mt-1 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold leading-6 text-slate-900">
                              {address.name}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {address.street}
                            </p>
                            <p className="text-sm leading-6 text-slate-500">
                              {address.city}, {address.state}
                            </p>
                            <p className="text-xs leading-5 text-slate-400">
                              {address.pinCode}
                            </p>
                          </div>
                          <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium leading-6 text-slate-900">
                              {address.phone}
                            </p>
                            <p className="text-sm leading-6 text-slate-500">
                              {address.email}
                            </p>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-slate-900">
                        Payment methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Choose one.
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-indigo-200 hover:bg-indigo-50/60">
                          <input
                            id="cash"
                            name="payments"
                            onChange={handlePayment}
                            value="cash"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div>
                            <p className="text-sm font-semibold leading-6 text-slate-900">
                              Cash
                            </p>
                            <p className="text-xs leading-5 text-slate-500">
                              Pay on delivery.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-indigo-200 hover:bg-indigo-50/60">
                          <input
                            id="card"
                            onChange={handlePayment}
                            name="payments"
                            checked={paymentMethod === "card"}
                            value="card"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div>
                            <p className="text-sm font-semibold leading-6 text-slate-900">
                              Card payment
                            </p>
                            <p className="text-xs leading-5 text-slate-500">
                              Fast and secure.
                            </p>
                          </div>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-6">
                  <div className={`${sectionCardClassName} p-5 sm:p-6`}>
                    <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                          Order summary
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                          Cart
                        </h2>
                      </div>
                      <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-right">
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                          Total
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          $ {totalAmount}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flow-root">
                      <ul role="list" className="space-y-4">
                        {cartViewItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <img
                                src={
                                  item.product.thumbnail ||
                                  item.product.images?.[0]
                                }
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="flex items-start justify-between gap-3 text-base font-medium text-slate-900">
                                  <h3 className="min-w-0 flex-1 text-sm font-semibold leading-6 text-slate-900">
                                    <Link
                                      to={`/product-detail/${getCartProductId(item)}`}
                                      className="hover:text-indigo-600"
                                    >
                                      {item.product.title}
                                    </Link>
                                  </h3>
                                  <p className="shrink-0 text-sm font-semibold text-slate-900">
                                    ${discountedPrice(item.product)}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-slate-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="mt-4 flex flex-1 items-end justify-between gap-3 text-sm">
                                <div className="text-slate-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-3 text-sm font-medium leading-6 text-slate-700"
                                  >
                                    Qty
                                  </label>
                                  <span className="relative inline-flex">
                                    <select
                                      onChange={(e) => handleQuantity(e, item)}
                                      value={item.quantity}
                                      className="appearance-none rounded-2xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                                      ▾
                                    </span>
                                  </span>
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={(e) =>
                                      handleRemove(e, item.cartItemId)
                                    }
                                    type="button"
                                    className="rounded-full border border-transparent px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
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
                    <div className="mt-6 rounded-2xl bg-slate-50 p-4 sm:p-5">
                      <div className="flex justify-between my-2 text-base font-medium text-slate-900">
                        <p>Subtotal</p>
                        <p>$ {totalAmount}</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-slate-900">
                        <p>Total Items in Cart</p>
                        <p>{totalItems} items</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={handleOrder}
                          className="flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                        >
                          Place Order
                        </button>
                      </div>
                      <div className="mt-4 flex justify-center text-sm text-slate-500">
                        <Link
                          to="/"
                          className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
                        >
                          Continue Shopping
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavBar>
      <Footer></Footer>
    </>
  );
}

export default Checkout;
