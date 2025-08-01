import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link,Navigate } from "react-router";

import { updateCartItemAsync,deleteCartItemAsync } from "./CartSlice";
import ModalContainer from "../../commonComponents/ModalPage";
import RemoveProductNotification from "./cartComponents/RemoveProductNotification";

import { toast } from 'react-toastify'
import { FaPlus,FaMinus } from "react-icons/fa6";
import { ThreeDots } from 'react-loader-spinner' 
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state)=>state.cart.totalQuantity)
  const subTotal = useSelector((state) => state.cart.subTotal);
  const amount = useSelector((state) => state.cart.amount);
  const isCartFetched = useSelector((state)=>state.cart.status);
  const cart = useSelector((state)=>state.cart.cart);
  const [open, setOpen] = useState(false);
  // console.log("*(*(*(*(*(*H",isCartFetched,"  ",products);
  const removeProductDispatcher = async (item) =>{
    console.log("Recieved the item ::: ", item);
    await dispatch(deleteCartItemAsync(item));
    toast.success(`${item?.product.title} Deleted Succesfully`);
  }
  const handleRemove = async (item)=>{
    setOpen(item);
    // await dispatch(deleteCartItemAsync({ 
    //   id:(item.id) ,
    //   updateByAmount: -((+item.quantity)*(+item.price)) ,
    //   updateByItem:(-(+item.quantity)) 
    // }));
  }
  const handleChange = async (value, item) => {
    // + means this for integer
    console.log("tell the updated Value",value);
    if( (value) == (item.quantity) ) return ;
    if( value == 0 ) handleRemove(item);
    else {
      console.log(value);
      
      await dispatch(updateCartItemAsync({item:item,newQuantity:(value)}));
    }
  };

  const generateOptions = (value)=>{
    return Array.from({length:+value},(_,index)=>(
      <option
        key={index+1} 
        value={`${index+1}`}>
          {index+1}
      </option>
    ));
  }
  
  if ( (isCartFetched === "idle") && cart.length === 0) {
    toast.warning('Cart Empty, Please Buy Products');
    return <Navigate to="/products"  />;
  }
  if( isCartFetched === "loading" ){
    return (<ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />)
  }
  // console.log(cart);
  
  // console.log(open);
  // console.log(generateOptions(12));
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <ModalContainer
        setOpen={setOpen}
        open={open}
        actionName={"Delete Product"}
        actionType={"Delete"}
        actionMethod={removeProductDispatcher}
        payload={open}
      >
        <RemoveProductNotification itemTitle={open?.title} />
      </ModalContainer>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-medium text-gray-900">Shopping cart</h1>
        </div>

        <div className="mt-8">
          <div className="flow-root pl-10 pr-10">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.map((product) => (
                <li key={product._id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.product?.thumbnail}
                      alt={product.product?.title}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={"#"}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">{product.product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="quantityChange w-17 border-1 max-w-[100px] grid grid-cols-3 justify-around">
                        <div className="self-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleChange(
                                Math.max(0, product.quantity - 1),
                                product
                              )
                            }
                            className="border-1 border-gray-300 w-5 h-5 grid items-center justify-center  cursor-pointer"
                          >
                            {product.quantity === 1 ? (
                              <MdDelete />
                            ) : (
                              <FaMinus />
                            )}
                          </button>
                        </div>
                        <div className="text-center">
                          <p>{product.quantity}</p>
                        </div>
                        <div className="self-center">
                          {product.product.stock > product.quantity && (
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  product.quantity + 1 ==
                                  product.product.stock
                                ) {
                                  toast.warning("Maximum Quantity Reached");
                                }
                                handleChange(
                                  Math.min(
                                    product.product.stock,
                                    product.quantity + 1
                                  ),
                                  product
                                );
                              }}
                              className="border-1 border-gray-300 w-5 h-5 grid items-center justify-center  cursor-pointer"
                            >
                              {" "}
                              <FaPlus />{" "}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => handleRemove(product)}
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

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between  text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p className="mx-2">$ {Math.round(subTotal * 100) / 100}</p>
        </div>
        <div className="flex justify-between  text-base font-medium text-gray-900">
          <p>Total Items</p>
          <p className="mx-2">{totalQuantity}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link
              to="/products"
              type="button"
              onClick={() => setOpen(false)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// <Dialog open={open} onClose={setOpen} className="relative z-10">

//   <div className="fixed inset-0 overflow-hidden">
//     <div className="absolute inset-0 overflow-hidden">
//       <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//         {/* <DialogPanel
//           transition
//           className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
//         > */}

//         {/* </DialogPanel> */}
//       </div>
//     </div>
//   </div>
// </Dialog>

/*
Modal Type feel
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />




      
      
*/
//   <div className="ml-3 flex h-7 items-center">
//     <button
//       type="button"
//       onClick={() => setOpen(false)}
//       className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//     >
//       <span className="absolute -inset-0.5" />
//       {/* <span className="sr-only">Close panel</span> */}
//       <XMarkIcon aria-hidden="true" className="size-6" />
//     </button>
//   </div>;
