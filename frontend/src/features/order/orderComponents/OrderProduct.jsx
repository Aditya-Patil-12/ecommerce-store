import React from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router";
import { useState } from "react";

const OrderProduct = ({order}) => {
  return (
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
              <div className="infoContainer w-full md:h-[180px] md:grid grid-cols-4 items-center gap-4 ">
                <div className="productImage md:h-[180px]">
                  <div className="temporary h-full ">
                    <img
                      src={`${thumbnail}`}
                      alt=""
                      className="bg-white w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="orderProductDetails md:col-span-3 md:col-start-2">
                  <div className="orderProductDetailsHead flex justify-between items-center">
                    <div className="">
                      <h1>{title}</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 place-items-center ">
                      <h2>Price</h2>
                      <p>{price}₹</p>
                    </div>
                  </div>

                  <div className="orderProductDetailsBody flex  justify-between items-center  mt-5">
                    <div className="grid grid-cols-2 gap-x-2 place-items-center ">
                      <h2>Quantity</h2>
                      <p>{quantity}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 place-items-center ">
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
                <Link to={"/product-detail/" + `${orderItem.product.id}`}>
                  {" "}
                  View Product
                </Link>
                <div className="inline-block mx-1 h-4"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderProduct
