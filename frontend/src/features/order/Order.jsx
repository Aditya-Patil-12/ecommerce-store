import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from 'react-router'
import { loggedInUserInfo } from "../user/UserAPI";
import { fetchProductDetailAsync } from "../productList/productListSlice";
import SingleOrder from "./SingleOrder";
import './order.css'
export default function Orders() {
  const dispatch = useDispatch();

  // auth Variables ...
  // const {id: userId} = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state.order.orders);

  console.log("Hey Orders", orders);
  if (orders) {
    console.log(orders, "is Truthy");
  }
  

  return (
    <>
      <div className="mx-auto max-w-7xl border-1">
        <div className="ordersBanner">
          <h1 className="text-3xl font-medium text-gray-900">Order history</h1>
          <p className="font-medium text-gray-900">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1">
          <div className="lg:col-span-1 border-1">
            {orders &&
              orders
                .slice(0)
                .reverse()
                .map((order) => <SingleOrder order={order} />)}
          </div>
        </div>
      </div>
    </>
  );
}

// {
//   orders &&
//     orders
//       .slice(0)
//       .reverse()
//       .map((order) => (
//         <div className="flex flex-col py-6 " key={order._id}>
//           <h2 className="text-xl font-medium text-gray-900">
//             Order ID: {order._id}
//           </h2>
//           <div>
//             <h2 className="text-xl font-medium inline-block mr-1">Status :</h2>
//             <p className="text-red-900 font-medium inline-block">
//               {" "}
//               {order.status}
//             </p>
//           </div>

//           <ul key={order.id} className="flex flex-col ">
//             {order.orderItems.map((product) => (
//               <li key={product.product.id} className="flex py-6">
//                 <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                   <img
//                     src={product.product.thumbnail}
//                     alt={product.product.title}
//                     className="size-full object-cover"
//                   />
//                 </div>

//                 <div className="ml-4 flex flex-1 flex-col">
//                   <div>
//                     <div className="flex justify-between text-base font-medium text-gray-900 ">
//                       <h3>{product.product.title}</h3>
//                       <p className="ml-4">$ {product.product.price}</p>
//                     </div>
//                     <div className="flex flex-row gap-2">
//                       <p className="mt-1 text-sm text-gray-500">{"Red"}</p>
//                       <p className="mt-1 text-sm text-gray-500">{"S"}</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-1 items-end justify-between text-sm">
//                     <p className="text-gray-500">Qty:{product.quantity}</p>

//                     <div className="flex">
//                       {/* <button
//                     onClick={(e) =>
//                       handleRemove(e, product)
//                     }
//                     type="button"
//                     className="font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     Remove
//                   </button> */}
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//             <div className="flex justify-between  text-base font-medium text-gray-900">
//               <p>Subtotal</p>
//               <p className="mx-2">
//                 $ {Math.round(+order.subTotal * 100) / 100}
//               </p>
//             </div>
//             <div className="flex justify-between  text-base font-medium text-gray-900">
//               <p>Total</p>
//               <p className="mx-2">$ {Math.round(+order.total * 100) / 100}</p>
//             </div>
//             <div className="flex justify-between  text-base font-medium text-gray-900">
//               <p>Total Items</p>
//               <p className="mx-2">{1}</p>
//             </div>
//           </div>
//           <div>
//             <h5 className="text-xl font-medium text-gray-900">Delivering At</h5>
//             <div className="flex justify-between gap-x-6 py-5 border-solid border-gray-100 border-2 px-2">
//               <div className="flex min-w-0 gap-x-4">
//                 <div className="min-w-0 flex-auto">
//                   <p className="text-sm/6 font-semibold text-gray-900">
//                     {order.shippingAddress.fullName}
//                   </p>
//                   <p className="mt-1 truncate text-xs/5 text-gray-500">
//                     {order.shippingAddress.phoneNo}
//                   </p>
//                 </div>
//               </div>
//               <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//                 <p className="text-sm/6 text-gray-900">
//                   {order.shippingAddress.city}
//                 </p>
//                 <p className="mt-1 text-xs/5 text-gray-500">
//                   {order.shippingAddress["postal-code"]}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ));
// }
