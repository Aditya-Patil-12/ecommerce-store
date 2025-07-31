import React, { useState,useEffect } from 'react'
import OrderProduct from './OrderProduct';
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
const CompleteSingleOrder = ({}) => {
    // console.log(order);
    const orderId = "67189267dsfa7863214";
    const orderPlacedDate = "27 Jul 2025";
    const order = { 
        paymentIntentId: 
        "order_QfB2yo5LO2pgHj",
        paymentState: 
        "created",
        paymentType: 
        "card",
        orderItems : [{
      netAmount: 264.59999999999997,
      quantity: 14,
      taxAmount: 47.63,
      _id: "6847175c103028f3f3632f96",
      product:{
        discountPercentage: 5.5,
        id: "67ed3db46cfe18b6a675b797",
        price: 19.99,
        shippingAmount: 0,
        taxPercentage: 18,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
        title:"Eyeshadow Palette with Mirror",
      }
        }],
        status: "Pending",
        subTotal: 264.59999999999997,
        total: 312.22999999999996,
        totalShippingAmount: 0,
        totalTaxAmount: 47.63,
        updatedAt: "2025-06-09T17:18:21.003Z",
        user: "6841d74b42c8862e907ce97e",
        __v: 0,
        _id: "6847175c103028f3f3632f95",
        shippingAddress:{
            city: "Mumbai",
            country: "India",
            email : "aditypatil71@gmail.com",
            fullName : "Aditya Patil",
            phoneNo : "+919326573816",
            postalCode : "400068",
            region : "Maharashtra",
            streetAddress : "A/31 PAVITRA OVARIPADA DAHISAR",
            _id : "6841d77b42c8862e907ce98c",
        }
    };
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
                  <p className="inline-block">{orderPlacedDate}</p>
                </div>
              </div>
              <div className="orderProgressBar">
                <ProgressBar status={"Shipped"} />
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
}

export default CompleteSingleOrder
