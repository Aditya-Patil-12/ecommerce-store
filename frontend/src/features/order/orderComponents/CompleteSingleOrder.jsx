import React, { useState,useEffect } from 'react'
import OrderProduct from './OrderProduct';
import { useSelector } from 'react-redux';
const calAmount = (price) => {
  return Math.round(price * 100) / 100;
};
const orderStatuses = ["Order Placed", "Processing","Shipped","Delivered"];
const ProgressBar = ({status}) => {
    let limit =0;
    const [percentage, setPercentage] = useState(0);
    useEffect(()=> {
        orderStatuses.forEach((orderState,index)=>{
            if( orderState == status ){
                limit = Math.min(100,25*(index+1)+5);
            }
        })
        setTimeout(() => setPercentage(limit), 500);
    },[]);
    useEffect(() => {
    const help = async () => {
        setTimeout(() => {
        if (percentage < limit) {
            setPercentage((state) => state + 1);
        }
        }, 10);

    };
    help();
    }, [percentage]);

  return (
    <div className="w-full px-5 my-3">
      <div
        className="progressBar 
        w-full h-3 rounded-md 
        border-1 overflow-hidden"
      >
        <div
          className={"rounded-md bg-blue-100  h-full"}
          style={{
            transform: `translateX(${percentage - 100}%)`,
            textAlign: "right",
            transition: "all 1s ease-out",
          }}
        >
          {/* <h1>{percentage}%</h1> */}
        </div>
      </div>
      <div className="w-full">
        <div className="pl-[25%] inline-block">
          {/* <div className="absolute right-full"> */}
            <h1>Order Placed</h1>
          {/* </div> */}
        </div>
        <div className="pl-[19%] inline-block">
          {/* <div className="absolute right-full"> */}
            <h1>Processing</h1>
          {/* </div> */}
        </div>
        <div className="pl-[18%] inline-block">
          {/* <div className="absolute right-full"> */}
            <h1>Shipped</h1>
          {/* </div> */}
        </div>
        <div className="pl-[12%] inline-block">
          {/* <div className="absolute right-full"> */}
            <h1>Delivered</h1>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
const CompleteSingleOrder = ({  }) => {
  // console.log(order);
  const order = useSelector((state) => state.order.currentOrder);
  const orderId = "67189267dsfa7863214";
  const orderPlacedDate = "27 Jul 2025";
  console.log("The current Order :::::",order);
  
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1">
        <div className="lg:col-span-1 ">
          {
            <div className="mt-10 flex px-2 flex-col bg-white shadow-xl">
              <div className="singleOrderHeader flex justify-between items-center">
                <div className="mt-2 flex flex-row items-center gap-x-5">
                  <div className="">
                    <h1 className="text-center">#Order ID </h1>
                    <p className="text-center">{orderId}</p>
                  </div>
                  <div
                    className="invoice border-1 rounded-md p-1 
                    hover:bg-gray-50 bg-gray-100"
                  >
                    <button
                      type="button"
                      className="cursor-pointer text-center 
                        "
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
                <div className="w-[200px] flex justify-center gap-x-2">
                  <h1 className="inline-block">Order Placed</h1>
                  <p className="inline-block">{new Date(order.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="orderProgressBar">
                <ProgressBar
                  status={order.status == "Pending" ? "Order Placed" : ""}
                />
              </div>
              <OrderProduct order={order} />

              <div className="singleOrderFooter grid grid-cols-2 bg-gray-300 xl:grid-cols-3 mb-10 p-2 gap-2">
                <div className="shippingAddress col-span-1 pt-2">
                  <div className="font-bold text-2xl mb-2">
                    <h1>Shipping Address</h1>
                  </div>
                  <div>
                    <div>{order.shippingAddress.fullName}</div>
                    <div>{order.shippingAddress.streetAddress}</div>
                    <div className="pl-2">
                      {order.shippingAddress.city} ,{" "}
                      {order.shippingAddress.region} {" - "}
                      {order.shippingAddress.postalCode}
                    </div>
                  </div>
                </div>
                <div className="paymentInfo col-span-1  pt-2">
                  <div className="font-bold text-2xl mb-2">
                    <h1>Payment Information</h1>
                  </div>
                  <div className="pl-2 flex justify-between w-[200px]">
                    <h1>Payment Method</h1>
                    {order.paymentType}
                  </div>
                </div>
                <div
                  className="orderCosting col-span-2 xl:col-span-1
                    pt-2 px-2 border-t-1 xl:border-t-0"
                >
                  <h1 className="font-bold text-2xl mb-2">Order Costing</h1>
                  <div className="mt-2 border-b-1 flex flex-row justify-between">
                    <p className="inline ">Subtotal</p>
                    <p className="font-normal inline">
                      ${calAmount(order.subTotal)}
                    </p>
                  </div>
                  <div className="mt-2 border-b-1 flex flex-row justify-between">
                    <p className="inline-block ">Shipping</p>
                    <p className="font-normal inline-block ">
                      ${calAmount(order.totalShippingAmount)}
                    </p>
                  </div>
                  <div className="mt-2 border-b-1 flex flex-row justify-between">
                    <p className="inline-block ">Tax</p>
                    <p className="font-normal inline-block ">
                      ${calAmount(order.totalTaxAmount)}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-row justify-between">
                    <p className="font-bold inline-block ">Order Total</p>
                    <p className="font-semibold inline-block ">
                      ${calAmount(order.total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CompleteSingleOrder
