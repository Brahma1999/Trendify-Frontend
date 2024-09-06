import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectedItems } from "../cart/cartSlice";

import { selectUserInfo } from '../user/userSlice'

const navigation = [
  { name: 'Products', link: '/', user: true, current: true },
  { name: 'Products', link: '/admin', admin: true, current: true },
  { name: 'Orders', link: '/admin/orders', admin: true, current: false },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {

  const items = useSelector(selectedItems);
  const user = useSelector(selectUserInfo);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                      <img
                        className="h-8 w-8"
                        src={process.env.PUBLIC_URL + "/Logo.png"}
                        alt="Trendify"
                      />
                      <h1 className="ml-2 text-3xl font-bold tracking-tight text-gray-900">
                        Trendify
                      </h1>
                    </Link>
                    <div className="hidden md:block ml-10">
                      <div className="flex items-baseline space-x-4">
                        {navigation.map((item) =>
                          item[user.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {user.role === 'user' && (
                        <Link to="/cart">
                          <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 bg-white text-black-400"
                          >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                      )}

                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 mb-5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-6 w-6 rounded-full bg-white"
                              src={process.env.PUBLIC_URL + "/user.png"}
                              alt=""
                            />
                          </MenuButton>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {user.role === 'user' ? (userNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </MenuItem>
                            ))
                            ) : (
                              <Link to="/logout" className="block rounded-md px-3 py-2 text-base font-medium  hover:text-blue-700">
                                Log Out
                              </Link>
                            )}
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    item[user.role] ? (
                      <Link
                        key={item.name}
                        to={item.link}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>) : null
                  ))}
                </div>

                <div className="border-t bg-white pb-3 pt-4">
                  <div className="flex items-center px-5">
                    {user.role === 'user' && (
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative ml-auto mx-5 flex-shrink-0 bg-white text-black-400"
                        >
                          <span className="absolute -inset-1.5" />
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                    )}


                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mb-7 -ml-0 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {items.length}
                      </span>
                    )}

                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {/* {user.role === 'user' && userNavigation.map((item) => (
                      <Link
                        key={item.link}
                        to={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    )): <Link to="/logout">Logout</Link>} */}

                    {user.role === 'user' ? (
                      userNavigation.map((item) => (
                        <Link
                          key={item.link}
                          to={item.link}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : (
                      <Link to="/logout" className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white">
                        Logout
                      </Link>
                    )}

                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
