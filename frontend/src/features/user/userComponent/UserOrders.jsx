import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loggedInUserOrdersAsync } from "../UserSlice";
export default function UserOrders() {
  const dispatch = useDispatch();

  // auth Variables ...
  const {id: userId} = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state.user.userOrders);
  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        await dispatch(loggedInUserOrdersAsync(userId));
      };
      fetchOrders();
    }
  }, [userId,dispatch]);
  const handleRemove = async (e, item) => {};
  // removed : sm:px-6 lg:px-8 px-4
  console.log("Hey Orders",orders);
  if (orders) {
    console.log(orders, "is Truthy");
  }

  return (
    <>
      <div className="mx-auto max-w-7xl ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1">
          <div className="mt-2 lg:col-span-1 ">
            <div className="flex  flex-col overflow-y-scroll bg-white shadow-xl ">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                <div className="flex items-start justify-between ">
                  <h1 className="text-2xl font-medium text-gray-900">
                    My Orders
                  </h1>
                </div>
                <div className="mt-8 ">
                  {/* TODO : study flow root */}
                  <div className="flow-root">
                    <ul
                      role="list"
                      className="-my-6 divide-y divide-black-1000"
                    >
                      {orders.length === 0 && <h1>No Orders Found</h1>}

                      {orders &&
                        orders.slice(0).reverse().map((order) => (
                          <div className="flex flex-col py-6 " key={order.id}>
                            <h2 className="text-xl font-medium text-gray-900">
                              Order ID: {order.id}
                            </h2>
                            <div>
                              <h2 className="text-xl font-medium inline-block mr-1">
                                Status :
                              </h2>
                              <p className="text-red-900 font-medium inline-block">
                                {" "}
                                {order.status}
                              </p>
                            </div>

                            <ul key={order.id} className="flex flex-col ">
                              {order.products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product?.images[0]}
                                      alt={product.title}
                                      className="size-full object-cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 ">
                                        <h3>{product?.title}</h3>
                                        <p className="ml-4">
                                          $ {product.price}
                                        </p>
                                      </div>
                                      <div className="flex flex-row gap-2">
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.color.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.size.name}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty:{product.quantity}
                                      </p>

                                      <div className="flex">
                                        {/* <button
                                          onClick={(e) =>
                                            handleRemove(e, product)
                                          }
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                              <div className="flex justify-between  text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p className="mx-2">
                                  $ {Math.round(+order.totalAmount * 100) / 100}
                                </p>
                              </div>
                              <div className="flex justify-between  text-base font-medium text-gray-900">
                                <p>Total Items</p>
                                <p className="mx-2">{order.totalItems}</p>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-xl font-medium text-gray-900">
                                Delivering At
                              </h5>
                              <div className="flex justify-between gap-x-6 py-5 border-solid border-gray-100 border-2 px-2">
                                <div className="flex min-w-0 gap-x-4">
                                  <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">
                                      {order.address.fullName}
                                    </p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                                      {order.address.phoneNo}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                  <p className="text-sm/6 text-gray-900">
                                    {order.address.city}
                                  </p>
                                  <p className="mt-1 text-xs/5 text-gray-500">
                                    {order.address["postal-code"]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${Math.round(amount * 100) / 100}</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
                  >
                    Pay & Order
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link
                      to="/products"
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div> 
*/
