import { Link } from "react-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
// ===============================================================================================
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Products", link: "/products", customer: true },
  { name: "Cart", link: "/cart", customer: true },
  { name: "CheckOut", link: "/checkout", customer: true },
  {name: "Products",link:'/admin/products',admin:true},
  {name:"Orders" ,link:'/admin/orders',admin:true},
];

const userNavigation = [
  { name: "Your Profile", link: "/profile", customer: "customer" },
  { name: "My Orders", link: "/orders", customer: "customer" },
  { name: "Logout", link: "/logout", customer: "customer" },
  { name: "Logout", link: "/logout", admin: "admin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Navbar({ children }) {
  // const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const userInfo = useSelector((state)=>state.user.userInfo);

  
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {/* Left Side of Navbar =======> */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Naviagation Links */}
              <div className="flex items-center">
                <Link to="/" className="shrink-0">
                  <img
                    alt="Your Company"
                    src="/FinalLogo.png"
                    className="size-8"
                  />
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) =>
                      item[userInfo?.role] ? (
                        <Link
                          key={item.name+ ( (item.admin) ? "admin":"customer") }
                          to={item.link}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
              {/* Desktop Section */}
              <div className="hidden md:block ">
                <div className="ml-4 flex items-center md:ml-6 ">
                  {/* <div className="relative"> */}
                  {userInfo.role === "customer" && (
                    <Link to="/cart" className="relative">
                      <button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden border-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          aria-hidden="true"
                          className="size-6 "
                        />
                      </button>
                      {totalItems > 0 && (
                        <span className="absolute inline-flex items-center rounded-md -top-3 left-4 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  )}
                  {/* </div> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) => (
                          item[userInfo?.role] ? (
                            <MenuItem
                              key={
                                item.name +
                                (item["admin"] === "admin"
                                  ? " admin"
                                  : " customer")
                              }
                            >
                              <Link
                                to={item.link}
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ) : null
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              {/* Mobile Section */}
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>
          {/* Right Side of Navbar ======> */}
          <DisclosurePanel className="md:hidden hello">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) =>
                item[userInfo?.role] ? (
                  <Link
                    to={item.link}
                    key={item.name + " " + (item.admin)?"admin":"customer"}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ) : null
              )}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>

                <Link to="/cart" className="relative">
                  <button
                    type="button"
                    className="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden border-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon
                      aria-hidden="true"
                      className="size-6"
                    ></ShoppingCartIcon>
                  </button>
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset absolute -top-3 left-7">
                    Mobile
                  </span>
                </Link>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  item[user?.role] ? 
                 ( <Link
                    to=""
                    key={
                      item.name +
                      (item["admin"] === "admin" ? " admin" : " customer")
                    }
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Link>) :null
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <div className="w-50 h-10">
                <img src="/Logo.png" alt="" />
              </div>
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
