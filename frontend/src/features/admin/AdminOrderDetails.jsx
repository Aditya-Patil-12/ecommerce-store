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
            <h1>Receiving Person : {order?.shippingAddress.fullName} </h1>
            <h1>Phone : {order?.shippingAddress.phoneNo} </h1>
            <h1>Email : {order?.shippingAddress.email} </h1>
            <h1>
              Destination Address : {order?.shippingAddress["street-address"]}{" "}
              {order?.shippingAddress["city"]}
              {"-"}
              {order?.shippingAddress["postal-code"]}{" "}
              {order?.shippingAddress["region"]}{" "}
              {order?.shippingAddress["country"]}{" "}
            </h1>
            <h1>Payment mode : {order?.["paymentType"]}</h1>
            <div className="flow-root pl-10 pr-10">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order?.orderItems.map((product) => (
                  <li key={product._id} className="flex py-6">
                    {/* <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product?.images[0]}
                        alt={product.title}
                        className="size-full object-cover"
                      />
                    </div> */}

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        {/* <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div> */}
                        {/* <p className="mt-1 text-sm text-gray-500">
                          {product.color.name}
                        </p> */}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="quantityChange w-17 flex justify-between">
                          <p>{product.quantity}</p>
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
            <p className="mx-2">$ {Math.round(order?.total * 100) / 100}</p>
          </div>
          <div className="flex justify-between  text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p className="mx-2">{order?.orderItems.reduce((rem,curr)=>rem+curr.quantity,0)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminOrderDetails
