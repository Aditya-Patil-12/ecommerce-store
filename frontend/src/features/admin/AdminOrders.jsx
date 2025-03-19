import { useEffect,useState } from "react";

import { RiPencilFill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import AdminOrderDetails from "./AdminOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementOrdersPage,
  decrementOrdersPage,
  setOrdersPage,
  setOrderSortQuery,
  deleteOrderSortQuery,
} from "../order/OrderSlice";
import { fetchAllOrdersAsync,updateOrderDetailsAsync } from "../order/OrderSlice";
import { ThreeDots } from "react-loader-spinner";
import { productListLimit } from "../../app/constants";

import paginationDisplay from "../../utils/paginationDisplay";
const generateColor = (status) =>{
  if( status === "pending" ){
    return "bg-purple-200 text-purple-600";
  }
  else if( status === "delivered" ){
    return "bg-green-200 text-green-600";
  }
  else if( status === "dispatched" ){
    return "bg-yellow-200 text-yellow-600";
  }
  else{
    return "bg-red-200 text-red-600";
  }
};
const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const page = useSelector((state) => state.order.ordersPage);
  const orderSortQuery = useSelector((state) => state.order.orderSortQuery);
  const status = useSelector((state) =>state.order.status);
  const totalOrders = useSelector((state)=>state.order.totalOrders);
  const [editableId,setEditableId] = useState(-1);
  const [showOrder,setShowOrder] = useState(-1);

  console.log(orderSortQuery);

  useEffect(() => {
    console.log("inside use Effect");
      dispatch(fetchAllOrdersAsync({page:page,orderSortQuery:orderSortQuery}));
  },[page,orderSortQuery]);
  // console.log(status);
  console.log(orders);

  const handleOrderStatusUpdate = async (e,order)=>{
    const newOrder = {...order,status:e.target.value};
    console.log("update for the",order,"required is ",newOrder);
    await dispatch(updateOrderDetailsAsync(newOrder));
    setEditableId(-1);
  }
  // console.log(orders);
  return (
    <div className="relative ">
      {showOrder !== -1 ? (
        <div
          className={
            "absolute z-10 w-1/1 h-1/1 bg-white " +
            `${showOrder == -1 ? "hidden" : ""}`
          }
        >
          <AdminOrderDetails
            order={orders[showOrder]}
            setShowOrder={setShowOrder}
          />
        </div>
      ) : null}
      <div className="mt-0 align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        {status === "loading" ? (
          <div className="flex justify-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              className=""
            />
          </div>
        ) : (
          <>
          <table className="min-w-full">
            <thead>
              <tr>
                {[
                  "Order ID",
                  "Items",
                  "Total Amount",
                  "Shipping Address",
                  "Status",
                  "Actions",
                  // "",
                ].map((heading, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-300 tracking-wider"
                  >
                    <div className="flex gap-2">
                      <p
                        className={"inline cursor-pointer"}
                        onClick={(e) => {
                          if (
                            heading === "Order ID" ||
                            heading === "Total Amount"
                          ) {
                            console.log("hello");

                            dispatch(
                              deleteOrderSortQuery(
                                heading === "Order ID" ? "id" : "totalAmount"
                              )
                            );
                          }
                        }}
                      >
                        {heading}
                      </p>
                      {heading === "Total Amount" || heading === "Order ID" ? (
                        <div className="inline">
                          <IoMdArrowDropup
                            className="cursor-pointer hover:border-2"
                            onClick={() => {
                              console.log(orderSortQuery);
                              dispatch(
                                setOrderSortQuery({
                                  [heading === "Order ID"
                                    ? "id"
                                    : "totalAmount"]: "desc",
                                })
                              );
                            }}
                          />
                          <IoMdArrowDropdown
                            className="cursor-pointer hover:border-2"
                            onClick={() =>
                              dispatch(
                                setOrderSortQuery({
                                  [heading === "Order ID"
                                    ? "id"
                                    : "totalAmount"]: "asc",
                                })
                              )
                            }
                          />
                        </div>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders &&
                orders.map((order, index) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm text-gray-800">
                      #{order?.id}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm text-blue-900">
                      {/* Items  */}
                      <div className="flex flex-col">
                        {order.products.map((product) => (
                          <p className="mx-2" key={product.id}>
                            {product.title} - #{product.quantity} - $
                            {product.price}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 pr-20 border-b border-gray-500 text-sm text-blue-900">
                      <div className="flex justify-around ">
                        <span>{Math.round(order.totalAmount * 100) / 100}</span>
                        <span className="">
                          {order.paymentMethod === "cash" ? (
                            <BsCashCoin className="inline" />
                          ) : (
                            <MdPayment className="inline" />
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm text-gray-900">
                      {/* address */}
                      <div className="flex gap-4">
                        {<p className="font-bold">{order.address.fullName}</p>}
                        {<p>{order.address.phoneNo}</p>}
                      </div>
                      <div className="flex gap-4">
                        {<p>{order.address["street-address"]}</p>}
                      </div>
                      <div className="flex gap-4">
                        {<p>{order.address.city}</p>}
                        {<p>{order.address["postal-code"]}</p>}
                      </div>
                      {<p>{order.address.region}</p>}
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm">
                      {editableId === index ? (
                        <select
                          onChange={(e) => handleOrderStatusUpdate(e, order)}
                          defaultValue={order.status}
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      ) : null}
                      {editableId !== index ? (
                        <span
                          className={
                            "relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight" +
                            `${generateColor(order.status)}`
                          }
                        >
                          <span
                            aria-hidden
                            className={
                              "absolute inset-0 bg-green-200 opacity-50 rounded-full " +
                              `${generateColor(order.status)}`
                            }
                          ></span>
                          <span className={"relative text-xs"}>
                            {order.status}
                          </span>
                        </span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm text-blue-900">
                      <div className="flex justify-between ">
                        <IoMdEye
                          className="w-5 h-5 cursor-pointer"
                          onClick={(e) => setShowOrder(index)}
                        />
                        <RiPencilFill
                          className="w-5 h-5 cursor-pointer"
                          onClick={(e) =>
                            setEditableId(editableId === -1 ? index : -1)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <OrdersPagination totalItems={totalOrders} page={page} />
          </>
        )}
      </div>
    </div>
  );
};

const OrdersPagination  = ({totalItems})=>{
    const dispatch = useDispatch();
    const page = useSelector((state)=>state.order.ordersPage); 
    const totalPages = Math.ceil(totalItems / productListLimit);
    const displayPages = paginationDisplay({
      pageNumber: page,
      totalPages: totalPages,
    });
  return (
    <div
      className="flex items-center justify-between  border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      id="paginationOuter"
    >
      <div
        className="flex flex-1 justify-between sm:hidden"
        id="paginationInner"
      >
        <button
          type="button"
          onClick={() => dispatch(decrementOrdersPage())}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id={"button-1"}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => dispatch(incrementOrdersPage(totalPages))}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id={"button-2"}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * productListLimit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(totalItems, page * productListLimit)}
            </span>{" "}
            of <span className="font-medium">{+totalItems}</span> Orders
          </p>
        </div>

        {/* Numbering Starts ===================== */}
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            id="nav-Page"
          >
            {/* Left Move ================ */}
            <button
              type="button"
              onClick={() => {
                dispatch(decrementOrdersPage());
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              id="0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5 " />
            </button>
            {/* Right Move ============== */}

            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {/* pages are setted ... */}
            {displayPages.map((displayPage, index) => {
              if (displayPage === "...") {
                return (
                  <button
                    type="button"
                    id={`ellipsis-${index}`}
                    key={`ellipsis-${index}`}
                    disabled
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                  >
                    ...
                  </button>
                );
              } else if (+displayPage === page) {
                return (
                  <button
                    type="button"
                    onClick={() => dispatch(setOrdersPage(Number(displayPage)))}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    // id={`${index + 1}`}
                    key={`page-${displayPage}`}
                  >
                    {displayPage}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  onClick={() => dispatch(setOrdersPage(Number(displayPage)))}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  // id={`${index + 1}`}
                  key={`page-${displayPage}`}
                >
                  {displayPage}
                </button>
              );
            })}
            {/* ==================  */}

            {/* Right Move ================== */}
            <button
              onClick={() => dispatch(incrementOrdersPage(totalPages))}
              type="button"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 "
              id="7"
            >
              <span className="sr-only">Next</span>

              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
            {/* ======================  */}
          </nav>
        </div>
        {/* =============================== */}
      </div>
    </div>
  );
}


export default AdminOrders;

{
  /* <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm">
  <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
    View Details
  </button>
</td> */
}


          {
            /* <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent"> */
          }
          {
            /* <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow  leading-normal tracking-wide w-px flex-1 border-none px-3 focus:outline-none text-xxs lg:text-xs  text-gray-500 font-thin"
                placeholder="Search"
              />
            </div>
          </div> */
          }