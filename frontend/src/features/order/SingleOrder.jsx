
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router";
import {useState} from 'react'
// TODO : 
// Simple Order Page with Detail Summary of A Given Order  
const calAmount = (price) => {
  return Math.round(price * 100) / 100;
};
const SingleOrder = ({ order }) => {
    const [isInvoice,setIsInvoice] = useState(false);
    console.log(order);
    
  return (
    <div className="mt-10 flex  flex-col bg-white shadow-xl">
      <div className="flex-1">
        <div className="mt-8 ">
          {/* TODO : study flow root */}
          <div className="">
            <div className="orderBanner grid grid-cols-4 mb-12 px-4 border-b-1">
              <div
                className="col-span-3 orderDetails grid grid-cols-2 gap-x-30 lg:grid-cols-3 
                            g:gap-x-4 border-3"
              >
                <div className="flex flex-col ">
                  Order Id
                  <h3 className="">{order._id}</h3>
                </div>
                <div
                  className="hidden 
                              lg:flex flex-col "
                >
                  Date Placed
                  <h1>27 July 2023</h1>
                </div>
                <div className="flex flex-col ">
                  Amount
                  <h1>{calAmount(order.total)}</h1>
                </div>
              </div>
              <div
                className="col-span-1 justify-self-end mr-2 relative border-1
                h-7"
                onMouseOver={() => {
                  console.log("Hey");

                  setIsInvoice(true);
                }}
                onMouseLeave={(e) => {
                  setIsInvoice(false);
                }}
              >
                <div
                  className={
                    "border-1 w-30 right-full " +
                    `${isInvoice ? "absolute" : "hidden"}`
                  }
                >
                  <div className="w-full mt-1 hover:bg-gray-50 
                  cursor-pointer grid place-items-center">
                        <Link
                        to={"/singleOrder/" + order._id}
                        className="block"
                        >
                        Track Order
                        </Link>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => console.log("Generate Invoice")}
                    className="w-full pl-2 mt-1 hover:bg-gray-50 cursor-pointer"
                  >
                    View Invoice
                  </button>
                </div>
                <button className="cursor-pointer text-2xl" type="button">
                  <BiDotsVerticalRounded className="" />
                </button>
              </div>
            </div>
            <div className="orderItemDetails">
              {order.orderItems.map((orderItem) => {
                const { thumbnail, title, price, discountPercentage } =
                  orderItem.product;
                const { quantity } = orderItem;
                console.log(orderItem);

                return (
                  <div
                    className="rounded-md px-4
                                border"
                  >
                    <div className="itemInfoHeader w-full">
                      <div className="infoContainer w-full md:h-[180px] md:grid grid-cols-4 items-center gap-4 border">
                        <div className="productImage md:h-[180px]">
                          <div className="temporary h-full border-1">
                            <img
                              src={`${thumbnail}`}
                              alt=""
                              className="bg-white w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="orderProductDetails md:col-span-3 md:col-start-2">
                          <div className="orderProductDetailsHead flex justify-between items-center border-1">
                            <div className="border-1">
                              <h1>{title}</h1>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 place-items-center border-1">
                              <h2>Price</h2>
                              <p>{price}$</p>
                            </div>
                          </div>

                          <div className="orderProductDetailsBody flex  justify-between items-center border-1 mt-5">
                            <div className="grid grid-cols-2 gap-x-2 place-items-center border-1">
                              <h2>Quantity</h2>
                              <p>{quantity}$</p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 place-items-center border-1">
                              <h2>Discount</h2>
                              <p>{discountPercentage}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="orderFooter 
                                  md:h-[30px] flex flex-row-reverse items-center py-2 mt-2"
                    >
                      <div>
                        <Link
                          to={"/product-detail/" + `${orderItem.product.id}`}
                        >
                          {" "}
                          View Product
                        </Link>
                        <div className="inline-block mx-1 border h-4"></div>
                        <Link to="#">Buy Again</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
