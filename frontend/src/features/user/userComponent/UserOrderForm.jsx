import React from "react";
import { IoMdClose } from "react-icons/io";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useSelector,useDispatch } from "react-redux";
import { updateUserInfoAsync } from "../../user/UserSlice";

const UserOrderForm = ({ isAddressModalOpen, setIsAddressModalOpen }) => {
    const userInfo = useSelector((state)=>state.user.userInfo);
    let editingAddress = null;
    if( !(isAddressModalOpen === "add")  ){
      editingAddress = userInfo.addresses[isAddressModalOpen-1];
    }    
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const orderInfo = Object.fromEntries(data);
        if( isAddressModalOpen === "add" ){
            // add the address ......
            const newAddresses = {
              ...userInfo,
              addresses: [...userInfo.addresses,orderInfo],
            };
            console.log("old :", userInfo);
            console.log("new :", newAddresses);
            await dispatch(updateUserInfoAsync(newAddresses)); 
        }
        else{
            // edit the address .....
            const index = isAddressModalOpen - 1;
            const newAddresses = {
              ...userInfo,
              addresses: [...userInfo.addresses],
            };
            newAddresses.addresses.splice(index, 1, orderInfo);
            console.log("old :" ,userInfo);
            console.log("new :",newAddresses);
            await dispatch(updateUserInfoAsync(newAddresses)); 
        }
        setIsAddressModalOpen(0);
    };
  return (
    <div className="absolute w-full h-full  overflow-y-scroll border-8 z-10 bg-white">

      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="bg-indigo-600 cursor-pointer px-2 py-2  text-white rounded"
          onClick={() => setIsAddressModalOpen(0)}
          >
          <IoMdClose />
        </button>
      </div>

      <div className="address px-2 border-black-400">
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <div className="border-b border-gray-900/10 pb-12 pt-5">
              <h2 className="text-2xl font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Use a permanent address where you can receive mail.
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? ""
                          : editingAddress.fullName
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add" ? "" : editingAddress.email
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? ""
                          : editingAddress.phoneNo
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? "India"
                          : editingAddress.country
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? "India"
                          : editingAddress["streetAddress"]
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? "India"
                          : editingAddress["region"]
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? "India"
                          : editingAddress["city"]
                      }
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
                      defaultValue={
                        isAddressModalOpen == "add"
                          ? "India"
                          : editingAddress["postalCode"]
                      }
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
                {isAddressModalOpen === "add" ? "Add Address" : "Edit Address"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserOrderForm;
