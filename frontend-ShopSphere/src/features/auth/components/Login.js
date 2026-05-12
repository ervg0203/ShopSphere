import { useSelector, useDispatch } from "react-redux";
import { selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { checkUserAsync } from "../authSlice";
import { useForm } from "react-hook-form";
import logo from "../../../logo.svg";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const errorClassName =
    "mt-2 inline-flex max-w-full items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100";

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.14),_transparent_36%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_45%,_#f8fafc)] px-6 py-12 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/60 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
            <div className="hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <img className="h-7 w-7" src={logo} alt="ShopSphere" />
                  </div>
                  <div>
                    <p className="text-lg font-bold tracking-wide">
                      ShopSphere
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                      Smart marketplace
                    </p>
                  </div>
                </div>

                <h2 className="mt-10 max-w-md text-4xl font-bold tracking-tight">
                  Sign in to continue your shopping flow.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                  Manage your cart, orders, and profile in one clean place.
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>Fast checkout</p>
                <p>Secure account access</p>
                <p>Responsive experience on every device</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-12 w-12"
                  src={logo}
                  alt="ShopSphere"
                />
                <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-slate-900">
                  Log in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Welcome back. Let's get you shopping.
                </p>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      checkUserAsync({
                        email: data.email,
                        password: data.password,
                      }),
                    );
                  })}
                  className="space-y-6"
                >
                  <div>
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
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "email not valid",
                          },
                        })}
                        type="email"
                        className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.email && (
                        <p className={errorClassName}>{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Password
                      </label>
                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        {...register("password", {
                          required: "password is required",
                        })}
                        type="password"
                        className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.password && (
                        <p className={errorClassName}>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {error && <p className={errorClassName}>{error.message}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Log in
                    </button>
                  </div>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                  Not a member?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
