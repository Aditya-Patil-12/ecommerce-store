import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { FaMinus,FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserInfoAsync } from "../features/user/UserSlice";
import { resetCurrentOrder } from "../features/order/OrderSlice";
import { verifyOrderPaymentAsync } from "../features/order/OrderSlice";
import {
  updateCartItemAsync,
  deleteCartItemAsync,
} from "../features/cart/CartSlice";
import {
  createOrderAsync,
} from "../features/order/OrderSlice";

const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    // script.src = src --> this can load any type of script 
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
export default function CheckOutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user Variables ...
  const userInfo = useSelector((state)=>state.user.userInfo);
  const {id : userId} = useSelector((state) => state.user.userInfo);
  const {addresses} = useSelector((state) => state.user.userInfo);

  // Cart Variables .....
  const total = useSelector((state) => state.cart.totalAmount);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const totalTaxAmount = useSelector((state) => state.cart.totalTaxAmount);
  const totalShippingAmount = useSelector((state) => state.cart.totalShippingAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const isCartFetched = useSelector((state) => state.cart.status);
  const products = useSelector((state) => state.cart.cart); 
  // order Variables ....
  const currentOrder = useSelector((state) => state.order.currentOrder);


  // useState .......
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDetails,setPaymentDetails] = useState({
    order_id:"",
    payment_id:"",
    signature:"",
  });

  const [successfullOrderId,setSuccessfullOrderId] = useState(-1);

  // Remove Cart Product
  const handleRemove = async (item) => {
    await dispatch(deleteCartItemAsync(item));
    toast.success(`${item?.product.title} Deleted Succesfully`);
  };
  // Incr / Decrement Product....
  const handleChange = async (value, item) => {
    // + means this for integer
    console.log("tell the updated Value", value);
    if (value == item.quantity) return;
    if (value == 0) handleRemove(item);
    else {
      await dispatch(updateCartItemAsync({ item: item, newQuantity: value }));
    }
  };
  // New Addresses is Added ..... 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Information :", e.currentTarget);
    const data = new FormData(e.currentTarget);
    const orderInfo = Object.fromEntries(data);
    console.log(orderInfo, " ", userInfo);
    console.log({ ...userInfo, addresses: [...userInfo.addresses, orderInfo] });
    
    await dispatch(updateUserInfoAsync(
      { ...userInfo, addresses: [...userInfo.addresses,orderInfo] }));
  };
  // Current Order Placement =====>
  const handleOrder = async (e) => {
    e.preventDefault();
    if ( (!selectedAddress) || (!paymentMethod) ){
      if (!selectedAddress) {
        if (userInfo.addresses.length == 0) {
          toast.info("Please Add Addresses of Order Shipping");
        } else {
          toast.warning("Select Shipping Addresses");
        }
      } else {
        toast.warning("Select Payment Method");
      }
      return ;
    }
    // ready for payment
    // 1) Load the Script ... generally fetched in App. s
    const isScriptLoaded = await loadRazorpayScript();
    if( !isScriptLoaded ){
      toast.error('RazorPay SDK is Failed');
      return ;
    }
    // we have to place the order ....
    let orderIntentDetails = await dispatch(
      createOrderAsync({
        totalTaxAmount: totalTaxAmount,
        totalShippingAmount: totalShippingAmount,
        subTotal: subTotal,
        total: Math.round(total * 100) / 100,
        user: userId,
        paymentType: paymentMethod,
        orderItems: products,
        shippingAddress: selectedAddress,
        status: "pending",
      })
    );
    console.log(orderIntentDetails);
    orderIntentDetails = orderIntentDetails.payload;
    if( orderIntentDetails.success ){
      orderIntentDetails = orderIntentDetails.data;
      console.log(orderIntentDetails);
      
      const options = {
        key: orderIntentDetails.clientSecret,
        amount: orderIntentDetails.total,
        currency: "INR",
        name: "Ecommerce Store",
        description: "",
        image:
          "https://tse4.mm.bing.net/th/id/OIP._mKN-XWUleASlO4pPHqXeQHaD3?cb=iwc2&rs=1&pid=ImgDetMain",
        order_id: orderIntentDetails.paymentIntentId,
        handler: function (response) {
          console.log(
            orderIntentDetails._id,
            " ",
            response.razorpay_payment_id,
            " ",
            response.razorpay_order_id,
            " ",
            response.razorpay_signature
          );
          
          setPaymentDetails({
            id: orderIntentDetails._id,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature:response.razorpay_signature,
          });
        },
        // callback_url: `https://ad8e-183-87-254-149.ngrok-free.app/order-success/${orderIntentDetails._id}`,
        // callback_url: `http://localhost:5000/api/v1/orders/verifyOrderPayment`,
        // callback_url: `https://8384-183-87-254-149.ngrok-free.app/api/v1/orders/verifyOrderPayment`,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } 
    else{
      toast.error("Payment Intent Failed");
      return ;
    }

        // products: products,
        // totalAmount: amount,
        // totalItems: totalItems,

        // TODO : redirection to order Page, stock of current product changes , clear cart items
  };
  useEffect(() => {
    if (currentOrder != -1) {
      dispatch(resetCurrentOrder(null));
    }
  }, []);
  // use Navigate works now if not will use Naivgate 
  useEffect(()=>{
    if( paymentDetails?.order_id && paymentDetails?.payment_id  && paymentDetails?.signature  ){
      // we have got the required thing now lets go to order Success Page
      const callback = async ()=>{
        const {order_id,payment_id,signature} = paymentDetails;
        await dispatch(verifyOrderPaymentAsync({ order_id, payment_id, signature }));
        setSuccessfullOrderId(paymentDetails.id);
      }
      callback();
    }
  },[paymentDetails]);
  useEffect(() => {
    if (successfullOrderId != -1) {
      console.log("Current Order is set ok");
      navigate(`/order-success/${successfullOrderId}`, { replace: true });
    }
  }, [successfullOrderId]);
  // NOTE :
  //
  // if( currentOrder ){
  //   dispatch(resetCurrentOrder(null));
  //   return <Navigate to={"/order-success/"+currentOrder} replace={true} /> ;
  // }

  console.log("This is not Just Vlaue", paymentMethod);
    if (isCartFetched === "idle" && products.length === 0) {
      toast.warning('Cart Empty, Please Buy Products');
      return <Navigate to="/products" />;
    }
    if (isCartFetched === "loading") {
      return <h1>Loading ...</h1>;
    }
    console.log(selectedAddress);


  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 bg-white px-3 mt-2">
            {/* Personal Information Section Over here  */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 pt-5">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive product.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="fullName"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          // autoComplete ===>
                          autoComplete="name"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phoneNo"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNo"
                          name="phoneNo"
                          type="tel"
                          autoComplete="tel"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street-address"
                          name="streetAddress"
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="region"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="region"
                          name="region"
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          name="postalCode"
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="reset"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Addresss Information
                  </button>
                </div>
              </div>
            </form>
            {/* ================================== */}

            {/* Selecting Address and Payment Information================= */}

            <form className="mt-3">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  {/* Addresses  ====================== */}
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Choose an Address
                  </p>
                  <ul role="list" className="divide-y divide-gray-100">
                    {addresses &&
                      addresses.map((person) => (
                        <li
                          key={person.fullName}
                          className="flex justify-between gap-x-6 py-5 border-solid border-gray-200 border-2 px-2"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              name="address"
                              type="radio"
                              checked={person === selectedAddress}
                              onChange={(e) => setSelectedAddress(person)}
                              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm/6 font-semibold text-gray-900">
                                {person.fullName}
                              </p>
                              <p className="mt-1 truncate text-xs/5 text-gray-500">
                                {person.phoneNo}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm/6 text-gray-900">
                              {person.city}
                            </p>
                            <p className="mt-1 text-xs/5 text-gray-500">
                              {person["postal-code"]}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {/* ==================================  */}

                  {/* Select Payment Criteria ==============*/}
                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Payment Methods
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            type="radio"
                            name="payments"
                            checked={"cash" === paymentMethod}
                            onChange={(e) => setPaymentMethod("cash")}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <label
                            htmlFor="cash-label"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            type="radio"
                            name="payments"
                            checked={"card" === paymentMethod}
                            onChange={(e) => setPaymentMethod("card")}
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
            {/* ================================= */}
          </div>
          {/* ================= End of Form ================================ */}
          {/* Shopping Cart In CheckOut Page */}
          <div className="mt-2 lg:col-span-2">
            <div className="flex  flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-medium text-gray-900">
                    Shopping cart
                  </h1>
                </div>

                <div className="mt-8">
                  <div className="flow-root ">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products.map((cartProduct) => (
                        <li key={cartProduct.product.id} className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={cartProduct?.product.thumbnail}
                              alt={cartProduct.product.title}
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={"#"}>{cartProduct.product.title}</a>
                                </h3>
                                <p className="ml-4">
                                  {cartProduct.product.price}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {cartProduct.product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="quantityChange w-17 flex justify-between">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleChange(
                                      Math.max(0, cartProduct.quantity - 1),
                                      cartProduct
                                    )
                                  }
                                  className="border-1 border-gray-300 w-5 h-5 grid items-center justify-center  cursor-pointer"
                                >
                                  {cartProduct.quantity === 1 ? (
                                    <MdDelete />
                                  ) : (
                                    <FaMinus />
                                  )}
                                </button>
                                <p>{cartProduct.quantity}</p>
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleChange(
                                      Math.min(
                                        cartProduct.product.stock,
                                        cartProduct.quantity + 1
                                      ),
                                      cartProduct
                                    )
                                  }
                                  className="border-1 border-gray-300 w-5 h-5 grid items-center justify-center  cursor-pointer"
                                >
                                  {" "}
                                  <FaPlus />{" "}
                                </button>
                              </div>
                              <div className="flex">
                                <button
                                  onClick={() => handleRemove(cartProduct)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{Math.round(subTotal * 100) / 100} ₹</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Tax </p>
                  <p>{Math.round(totalTaxAmount * 100) / 100} ₹</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Shipping </p>
                  <p>{Math.round(totalShippingAmount * 100) / 100} ₹</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{Math.round(total * 100) / 100} ₹</p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
