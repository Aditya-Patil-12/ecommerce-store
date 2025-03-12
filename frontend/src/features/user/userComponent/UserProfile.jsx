import { useSelector, useDispatch } from "react-redux";
import { updateUserInfoAsync } from "../UserSlice";
import { useState } from "react";
import UserOrderForm from "./UserOrderForm";
export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=>state.user.userInfo);
  const [isAddressModalOpen,setIsAddressModalOpen] = useState(0);
  const {userName,email : userEmail , addresses : userAddresses} = userInfo;
  const handleRemove = async (e, index) => {
    console.log(userInfo," ",index);

    // remember Shallow Copy , newAddresses and userInfo are same as newAddresses = userInfo
    const newAddresses = {...userInfo,addresses:[...userInfo.addresses]};
    newAddresses.addresses.splice(index, 1);
    console.log("old :" ,userInfo);
    console.log("new :",newAddresses);
    await dispatch(updateUserInfoAsync(newAddresses));
  }

  return (
    <>
      {/* Heading ============== */}
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-medium text-gray-900">My Profile</h1>
      </div>
      {/* ====================== */}

      <div className="mx-auto max-w-7xl border-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1 ">
          {/* TODO : For Every Order we need a seperate below componenet ....
          the div below duplicates order=========== */}

          <div className="mt-2 lg:col-span-1 relative border-1 ">
            { !(!isAddressModalOpen) && (
              <UserOrderForm
                isAddressModalOpen={isAddressModalOpen}
                setIsAddressModalOpen={setIsAddressModalOpen}
              />
            )}
            <div className="flex  flex-col overflow-y-scroll bg-white shadow-xl ">
              {/* Outermost Border .... Below  */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
                <div className="info-center flex flex-row justify-between mb-3 border-8">
                  {/* Profile Picture &  Name =========================== */}
                  <div className="profile-center grid place-items-center">
                    <div className="size-50 shrink-0 rounded-full overflow-hidden border-gray-200">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile-Pic"
                        className="size-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-medium text-gray-900">
                      Name : {userName ? null : "Guest"}
                    </h1>
                  </div>
                  {/* ====================================== */}

                  <div className="primary-info flex flex-col gap-2 justify-center">
                    <h1 className="text-2xl font-medium text-gray-900">
                      Email : {userEmail ? null : "guest@gmail.com"}
                    </h1>
                    <h1 className="text-2xl font-medium text-gray-900">
                      Phone : {!userEmail ? userEmail : "+91 0000000000"}
                    </h1>
                  </div>
                </div>

                <div className="mt-8 border-10">
                  <div className="address-heading flex flex-row justify-between">
                    <h1>Addresses</h1>
                    <button
                      type="button"
                      className="bg-indigo-600 border-8 cursor-pointer"
                      onClick={() => setIsAddressModalOpen("add")}
                    >
                      Add Address
                    </button>
                  </div>

                  {/* TODO : study flow root */}

                  <div className="flow-root mt-5 px-2 py-2">
                    <ul
                      role="list"
                      className="-my-6 divide-y divide-black-1000"
                    >
                      {userAddresses.length === 0 && (
                        <li>
                          <h1>Please Provide At Least One Address</h1>
                        </li>
                      )}
                      {userAddresses &&
                        userAddresses.map((address, index) => (
                          <div
                            className="flex flex-col py-6"
                            key={address.fullName}
                          >
                            <div className="flex flex-col">
                              <div className="address-info flex flex-row justify-between">
                                <div className="flex min-w-0 gap-x-4">
                                  <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-bold text-gray-900">
                                      {address.fullName}
                                    </p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                                      {address.phoneNo}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                  <p className="font-bold text-gray-900">
                                    {address.city}
                                  </p>
                                  <p className="mt-1 text-xs/5 text-gray-500">
                                    {address["postal-code"]}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between px-2">
                                <button
                                  type="button"
                                  onClick={(e) => setIsAddressModalOpen(index+1)}
                                  className="px-3 py-2 text-sm font-semibold text-indigo-600  hover:text-indigo-500"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleRemove(e, index)}
                                  className="px-3 py-2 text-sm font-semibold text-indigo-600  hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

