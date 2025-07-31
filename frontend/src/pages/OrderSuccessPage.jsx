import { Link, Navigate , useParams } from "react-router";
import { deleteCompleteUserCartAsync ,clearCart } from "../features/cart/CartSlice";
import { resetCurrentOrder } from "../features/order/OrderSlice";
import {fetchProductByFiltersAsync} from '../features/productList/productListSlice'
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
export default function OrderSuccessPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    console.log(id);
    
    // // React: /payment-success route
    // const params = new URLSearchParams(window.location.search);
    // const payment_id = params.get("razorpay_payment_id");
    // const order_id = params.get("razorpay_order_id");
    // const signature = params.get("razorpay_signature");
    // console.log(payment_id," ",order_id," ",signature);

    // productList State Variable .....
    const filterQuery = useSelector((state)=>state.product.filterQuery);
    const sortQuery = useSelector((state)=>state.product.sortQuery);
    const page = useSelector((state)=>state.product.page);
    console.log("Hey id is ",id);
    
    const {id : userId} = useSelector((state)=>state.user.userInfo);

    useEffect(()=>{
        const adjustOrderChanges = async () =>{
            await dispatch(deleteCompleteUserCartAsync(userId));
            await dispatch(resetCurrentOrder(null));
            await dispatch(clearCart());
            await dispatch(fetchProductByFiltersAsync({filterQuery,sortQuery,page}));
        }
        adjustOrderChanges();
    },[dispatch,userId]);


    return (
        <>
        { !id && <Navigate to="/products" replace/> }
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">

            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-indigo-600 sm:text-7xl">
                Order Placed Successfully
            </h1>

            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            You Can Track Your Order (ID : {id}) By Visiting
                MyProfile - Orders
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                to="/orders"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Go to MyOrders
                </Link>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
                </a> */}
            </div>
            </div>
        </main>
        </>
  );
}
