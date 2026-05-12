import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";

function PaymentGatewayPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentOrder = useSelector(selectCurrentOrder);
  const [submitted, setSubmitted] = useState(false);
  const pendingOrder = location.state?.order;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorClassName =
    "mt-2 inline-flex max-w-full items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100";

  if (!pendingOrder) {
    return <Navigate to="/checkout" replace={true}></Navigate>;
  }

  if (submitted && currentOrder?.id) {
    return (
      <Navigate
        to={`/order-success/${currentOrder.id}`}
        replace={true}
      ></Navigate>
    );
  }

  return (
    <div>
      <NavBar>
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Dummy payment gateway
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Complete card payment to place your order.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                This is a demo gateway. Any card details are accepted.
              </p>
            </div>
          </section>

          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Amount to pay
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                $ {pendingOrder.totalAmount}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {pendingOrder.totalItems} items in your order
              </p>
            </div>

            <form
              noValidate
              className="mt-6 space-y-5"
              onSubmit={handleSubmit((data) => {
                const orderPayload = {
                  ...pendingOrder,
                  paymentMethod: "card",
                  paymentDetails: {
                    cardHolder: data.cardHolder,
                    cardNumber: data.cardNumber,
                    expiry: data.expiry,
                  },
                  paymentStatus: "paid",
                };

                setSubmitted(true);
                dispatch(createOrderAsync(orderPayload));
              })}
            >
              <div>
                <label
                  htmlFor="cardHolder"
                  className="block text-sm font-medium leading-6 text-slate-700"
                >
                  Card holder name
                </label>
                <input
                  id="cardHolder"
                  type="text"
                  {...register("cardHolder", {
                    required: "card holder name is required",
                  })}
                  className="mt-2 block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
                {errors.cardHolder && (
                  <p className={errorClassName}>{errors.cardHolder.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium leading-6 text-slate-700"
                >
                  Card number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  {...register("cardNumber", {
                    required: "card number is required",
                  })}
                  className="mt-2 block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
                {errors.cardNumber && (
                  <p className={errorClassName}>{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium leading-6 text-slate-700"
                  >
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    {...register("expiry", {
                      required: "expiry is required",
                    })}
                    className="mt-2 block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                  />
                  {errors.expiry && (
                    <p className={errorClassName}>{errors.expiry.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium leading-6 text-slate-700"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="password"
                    {...register("cvv", {
                      required: "cvv is required",
                    })}
                    className="mt-2 block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                  />
                  {errors.cvv && (
                    <p className={errorClassName}>{errors.cvv.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Pay and Place Order
              </button>
            </form>
          </div>
        </div>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default PaymentGatewayPage;
