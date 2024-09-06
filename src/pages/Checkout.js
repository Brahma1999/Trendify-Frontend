import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../features/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedItems,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "../features/cart/cartSlice";

import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";

import { updateUserAsync } from "../features/auth/authSlice";

import { selectUserInfo } from "../features/user/userSlice";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectedItems);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items
    ? items.reduce(
        (amount, item) =>
          Math.round(item.price * (1 - item.discountPercentage / 100)) *
            item.quantity +
          amount,
        0
      )
    : 0;

  const totalItems = items
    ? items.reduce((total, item) => item.quantity + total, 0)
    : 0;

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user: user.id,
      paymentMethod,
      selectedAddress,
      status: "pending",
    };
    dispatch(createOrderAsync(order));
    //Todo- redirect to order success page , clear cart after order , on server change the stock pf items
  };

  return (
    <Navbar>
      <>
        {!items.length > 0 && <Navigate to="/"></Navigate>}
        {currentOrder && (
          <Navigate
            to={`/order-success/${currentOrder.id}`}
            replace={true}
          ></Navigate>
        )}
        <div className="mx-auto bg-white px-4 mt-10 mb-20 max-w-7xl  sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* --------------------------Personal Information --------------------------------*/}
            <div className="lg:col-span-2">
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      ...user,
                      addresses: [...user.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div className="space-y-10">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className=" text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              required: "Phone Number is required",
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "Street address is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "City is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("region", {
                              required: "Region is required",
                            })}
                            id="region"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "Pincode  is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  {/* -----------------------------------------Chooose from existing address--------------------------------------------------- */}
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Addresses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from an existing address
                    </p>
                    <ul className="divide-y divide-gray-100">
                      {user.addresses.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                                {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-800">
                              {address.city}
                            </p>
                            <p className="text-sm leading-6 text-gray-800">
                              {address.state}
                            </p>
                            <p className="text-sm leading-6 text-gray-800">
                              {address.pinCode}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash-payment"
                              name="payments"
                              type="radio"
                              onChange={handlePayment}
                              value="cash"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              id="card-payment"
                              name="payments"
                              type="radio"
                              checked={paymentMethod === "card"}
                              value="card"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card-payment"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/*------------------------------ Checkout Cart----------------------------------- */}
            <div className="lg:col-span-2">
              <div className="mx-auto bg-white mt-8 max-w-4xl px-4 sm:px-2 lg:px-8">
                <h1 className="text-4xl font-bold mx-5 tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-2">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {items &&
                        items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.thumbnail}
                                alt={item.images}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-2 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <p>{item.title}</p>
                                  </h3>
                                  <p className="ml-4">
                                    $
                                    {Math.round(
                                      item.price *
                                        (1 - item.discountPercentage / 100)
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty
                                  <select
                                    className="mx-2"
                                    onChange={(e) => handleQuantity(e, item)}
                                    value={item.quantity}
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                  </select>
                                </p>

                                <div className="flex">
                                  <button
                                    onClick={(e) => handleRemove(e, item.id)}
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

                <div className="border-t border-gray-200 px-4 py-6 sm:px-2">
                  <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{totalItems} items</p>
                  </div>
                  <div className="flex justify-between  my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Navbar>
  );
}
