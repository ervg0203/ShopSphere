import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const fullName =
    userInfo?.name ||
    [userInfo?.firstName, userInfo?.lastName].filter(Boolean).join(" ") ||
    "New User";
  const addresses = userInfo?.addresses || [];

  //TODO: We will add payment section when we work on backend.

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  if (!userInfo) {
    return <p className="px-4 py-6 text-gray-600">Loading profile...</p>;
  }

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
                Account profile
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {fullName}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Manage your personal details and shipping addresses from one
                  clean dashboard.
                </p>
              </div>
            </div>

            {userInfo.image && (
              <img
                src={userInfo.image}
                alt={fullName}
                className="h-24 w-24 rounded-3xl border border-white/15 object-cover shadow-lg shadow-black/20"
              />
            )}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                  Profile details
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Account information
                </h2>
              </div>
              {userInfo.role === "admin" && (
                <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 ring-1 ring-rose-100">
                  Admin
                </span>
              )}
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Email address
                </dt>
                <dd className="mt-2 text-sm font-semibold text-rose-700 break-all">
                  {userInfo.email}
                </dd>
              </div>

              {userInfo.username && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Username
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.username}
                  </dd>
                </div>
              )}

              {userInfo.phone && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Phone
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.phone}
                  </dd>
                </div>
              )}

              {userInfo.gender && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Gender
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.gender}
                  </dd>
                </div>
              )}

              {userInfo.birthDate && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Birth date
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.birthDate}
                  </dd>
                </div>
              )}

              {userInfo.university && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    University
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.university}
                  </dd>
                </div>
              )}

              {userInfo.company?.name && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Company
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.company.name}
                  </dd>
                </div>
              )}

              {userInfo.role && (
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-900">
                    {userInfo.role}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                    Addresses
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Saved delivery locations
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setShowAddAddressForm(true);
                    setSelectedEditIndex(-1);
                  }}
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  Add New Address
                </button>
              </div>

              {showAddAddressForm ? (
                <form
                  className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:p-6"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleAdd(data);
                    reset();
                  })}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Add a new address
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Use a reliable address for deliveries and returns.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {[
                        ["name", "Full name", "text", "name is required"],
                        [
                          "email",
                          "Email address",
                          "email",
                          "email is required",
                        ],
                        ["phone", "Phone", "tel", "phone is required"],
                        [
                          "street",
                          "Street address",
                          "text",
                          "street is required",
                        ],
                        ["city", "City", "text", "city is required"],
                        [
                          "state",
                          "State / Province",
                          "text",
                          "state is required",
                        ],
                        [
                          "pinCode",
                          "ZIP / Postal code",
                          "text",
                          "pinCode is required",
                        ],
                      ].map(([field, label, type, message], index) => (
                        <div
                          key={field}
                          className={index < 4 ? "" : "sm:col-span-1"}
                        >
                          <label
                            htmlFor={field}
                            className="block text-sm font-medium leading-6 text-slate-700"
                          >
                            {label}
                          </label>
                          <div className="mt-2">
                            <input
                              id={field}
                              type={type}
                              {...register(field, { required: message })}
                              className="block w-full rounded-2xl border-0 bg-white px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                            {errors[field] && (
                              <p className="mt-2 text-sm text-rose-600">
                                {errors[field].message}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressForm(false)}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              <div className="mt-6 space-y-4">
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                    >
                      {selectedEditIndex === index ? (
                        <form
                          className="p-5 sm:p-6"
                          noValidate
                          onSubmit={handleSubmit((data) => {
                            handleEdit(data, index);
                            reset();
                          })}
                        >
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-900">
                                Edit address
                              </h3>
                              <p className="mt-1 text-sm text-slate-500">
                                Update the selected delivery location.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              {[
                                [
                                  "name",
                                  "Full name",
                                  "text",
                                  "name is required",
                                ],
                                [
                                  "email",
                                  "Email address",
                                  "email",
                                  "email is required",
                                ],
                                ["phone", "Phone", "tel", "phone is required"],
                                [
                                  "street",
                                  "Street address",
                                  "text",
                                  "street is required",
                                ],
                                ["city", "City", "text", "city is required"],
                                [
                                  "state",
                                  "State / Province",
                                  "text",
                                  "state is required",
                                ],
                                [
                                  "pinCode",
                                  "ZIP / Postal code",
                                  "text",
                                  "pinCode is required",
                                ],
                              ].map(([field, label, type, message]) => (
                                <div key={field}>
                                  <label
                                    htmlFor={field}
                                    className="block text-sm font-medium leading-6 text-slate-700"
                                  >
                                    {label}
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id={field}
                                      type={type}
                                      {...register(field, {
                                        required: message,
                                      })}
                                      className="block w-full rounded-2xl border-0 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    />
                                    {errors[field] && (
                                      <p className="mt-2 text-sm text-rose-600">
                                        {errors[field].message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => setSelectedEditIndex(-1)}
                                type="button"
                                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
                              >
                                Save Address
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : null}

                      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div className="space-y-2">
                          <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                            Address {index + 1}
                          </div>
                          <p className="text-base font-semibold leading-6 text-slate-900">
                            {address.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {address.street}
                          </p>
                          <p className="text-sm text-slate-500">
                            {address.city}
                          </p>
                          <p className="text-sm text-slate-500">
                            {address.state}
                          </p>
                          <p className="text-sm text-slate-500">
                            {address.pinCode}
                          </p>
                          <p className="text-sm text-slate-700">
                            Phone: {address.phone}
                          </p>
                        </div>

                        <div className="flex gap-3 sm:flex-col sm:items-end">
                          <button
                            onClick={() => handleEditForm(index)}
                            type="button"
                            className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => handleRemove(e, index)}
                            type="button"
                            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      No saved addresses
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Add your first shipping address to make checkout faster.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
