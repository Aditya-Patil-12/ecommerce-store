import React from 'react'
import { ImCross } from "react-icons/im";

const AdminOrderDetails = ({order,setShowOrder}) => {
    console.log(order);
    
  return (
    <>
      <div className="flex flex-row-reverse pr-2 pt-2">
        <ImCross
          onClick={() => setShowOrder(-1)}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
          <div className="mt-8">
            <h1 className='text-2xl font-bold mb-2 '>OrderID # {order._id}</h1>
            <div className="order-banner grid grid-rows-2 grid-cols-2">
              <div>
                <h1>
                  <span className="font-bold"> Receiving Person</span> :{" "}
                  {order?.shippingAddress.fullName}{" "}
                </h1>
              </div>
              <div>
                <h1>
                  <span className="font-bold"> Phone</span> :{" "}
                  {order?.shippingAddress.phoneNo}{" "}
                </h1>
              </div>
              <div>
                <h1>
                  <span className="font-bold"> Email </span>:{" "}
                  {order?.shippingAddress.email}{" "}
                </h1>
                <h1>
                  <span className="font-bold"> Payment mode</span> :{" "}
                  {order?.["paymentType"]}
                </h1>
              </div>
              <div>
                <h1>
                  <span className="font-bold"> Destination Address</span> :{" "}
                  {order?.shippingAddress["street-address"]}{" "}
                  {order?.shippingAddress["city"]}
                  {"-"}
                  {order?.shippingAddress["postal-code"]}{" "}
                  {order?.shippingAddress["region"]}{" "}
                  {order?.shippingAddress["country"]}{" "}
                </h1>
              </div>
            </div>
            <div className="flow-root pl-10 pr-10 my-2">
              <ul role="list" className="divide-y divide-gray-200 rounded-md p-2 bg-gray-50">
                {order?.orderItems.map(({ product, quantity,itemSubTotal}) => (
                  <li key={product.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product?.thumbnail}
                        alt={product?.title}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href="#"className='font-bold text-xl'>{product?.title}</a>
                          </h3>
                          <p className="ml-4">
                            <span className="font-bold text-xl"> Price</span> :{" "}
                            {product?.price}$
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="quantityChange min-w-17 flex justify-between">
                          <p>
                            <span className="font-bold text-xl">
                              {" "}
                              Quantity Purchased{" "}
                            </span>{" "}
                            :{quantity}
                          </p>
                        </div>
                        <div className="quantityChange min-w-17 flex justify-between">
                          <p>
                            <span className="font-bold text-xl">
                              {" "}
                              Purchased Amount with Discount{" "}
                            </span>{" "}
                            :{itemSubTotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between  text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p className="mx-2">$ {Math.round(order?.subTotal * 100) / 100}</p>
          </div>
          <div className="flex justify-between  text-base font-medium text-gray-900">
            <p>Total Tax</p>
            <p className="mx-2">
              $ {Math.round(order?.totalTaxAmount * 100) / 100}
            </p>
          </div>
          <div className="flex justify-between  text-base font-medium text-gray-900">
            <p>Total Shipping</p>
            <p className="mx-2">
              $ {Math.round(order?.totalShippingAmount * 100) / 100}
            </p>
          </div>
          <div className="flex justify-between  text-base font-medium text-gray-900 border-t-2 my-2">
            <p>Total</p>
            <p className="mx-2">$ {Math.round(order?.total * 100) / 100}</p>
          </div>
          <div className="flex justify-between  text-base font-medium text-gray-900">
            <p>Total Quantity</p>
            <p className="mx-2">
              {order?.orderItems.reduce((rem, curr) => rem + curr.quantity, 0)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrderDetails
