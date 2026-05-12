import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { selectLoggedInUser, createUserAsync } from "../authSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import logo from "../../../logo.svg";

export default function Signup() {
  const dispatch = useDispatch();
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
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15),_transparent_36%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_45%,_#f8fafc)] px-6 py-12 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/60 backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div className="hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">
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
                  Create your account and start shopping.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                  Keep your orders, profile, and checkout details all in one
                  place.
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>Quick sign up</p>
                <p>Secure account setup</p>
                <p>Built for mobile and desktop</p>
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
                  Create a new account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Join ShopSphere in a few quick steps.
                </p>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  noValidate
                  className="space-y-6"
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      createUserAsync({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        phone: data.phone,
                        gender: data.gender,
                        birthDate: data.birthDate,
                        image: data.image,
                        addresses: [],
                      }),
                    );
                    console.log(data);
                  })}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="firstName"
                          {...register("firstName", {
                            required: "first name is required",
                          })}
                          type="text"
                          className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.firstName && (
                          <p className={errorClassName}>
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="lastName"
                          {...register("lastName", {
                            required: "last name is required",
                          })}
                          type="text"
                          className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.lastName && (
                          <p className={errorClassName}>
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-slate-700"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        {...register("username", {
                          required: "username is required",
                        })}
                        type="text"
                        className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.username && (
                        <p className={errorClassName}>
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>

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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone")}
                          type="tel"
                          className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="birthDate"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Birth Date
                      </label>
                      <div className="mt-2">
                        <input
                          id="birthDate"
                          {...register("birthDate")}
                          type="date"
                          className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Gender
                      </label>
                      <div className="mt-2">
                        <select
                          id="gender"
                          {...register("gender")}
                          className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                          <option value="">Select</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Profile Image URL
                      </label>
                      <div className="mt-2">
                        <input
                          id="image"
                          {...register("image")}
                          type="url"
                          placeholder="https://example.com/avatar.png"
                          className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
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
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        {...register("password", {
                          required: "password is required",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: `- at least 8 characters
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                      - Can contain special characters`,
                          },
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
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium leading-6 text-slate-700"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        {...register("confirmPassword", {
                          required: "confirm password is required",
                          validate: (value, formValues) =>
                            value === formValues.password ||
                            "password not matching",
                        })}
                        type="password"
                        className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.confirmPassword && (
                        <p className={errorClassName}>
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
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
