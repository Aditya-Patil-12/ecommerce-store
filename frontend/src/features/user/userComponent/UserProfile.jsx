import { useSelector, useDispatch } from "react-redux";
import { updateUserInfoAsync } from "../UserSlice";
import { useState,useEffect } from "react";
import UserOrderForm from "./UserOrderForm";
import UserReviews from "./UserReviews";
import { setSeeProfileInfo } from "../UserSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import ProfileInfo from "./profileInfo/ProfileInfo";
import { SiGmail } from "react-icons/si";
import './userProfile.css';
import UserAddress from "./Address/UserAddress";
import PaymentInfo from "./Payment/PaymentInfo";
import { Link } from "react-router";
const accountInfoOptions = [
  {
    name:"Profile",
    component: ProfileInfo,
    key:1,
  },
  {
    name: "Address Info",
    component: UserAddress,
    key:2,
  }
];
const paymentInfoOptions = [
  {
    name: "Payment Info",
    component: PaymentInfo,
  },
];
const reviewInfoOptions = [
  {
    name: "Reviews",
    component: UserReviews,
    key: 4,
  },
];


export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=>state.user.userInfo); 
  const seeProfileInfo = useSelector((state) => state.user.seeProfileInfo);
  console.log(seeProfileInfo);
  
  const [isAddressModalOpen,setIsAddressModalOpen] = useState(0);
  let InfoComp = null;

    const handleRemove = async (e, index) => {
      console.log(userInfo," ",index);
      
      // remember Shallow Copy , newAddresses and userInfo are same as newAddresses = userInfo
      const newAddresses = {...userInfo,addresses:[...userInfo.addresses]};
      newAddresses.addresses.splice(index, 1);
      console.log("old :" ,userInfo);
      console.log("new :",newAddresses);
      
      await dispatch(updateUserInfoAsync(newAddresses));
    }
    if (seeProfileInfo == 1 || seeProfileInfo == 2) {
      if (seeProfileInfo == 1) InfoComp = accountInfoOptions[0].component;
      else InfoComp = accountInfoOptions[1].component;
    } else if (seeProfileInfo == 4) {
      InfoComp = reviewInfoOptions[0].component;
    }
  return (
    <>
      {/* Heading ============== */}
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-medium text-gray-900">My Profile</h1>
      </div>
      {/* ====================== */}

      <div className="mx-auto min-w-0.9">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1">
          {/* TODO : For Every Order we need a seperate below componenet ....
          the div below duplicates order=========== */}

          <div className="lg:col-span-1 relative border-red-500">
            {!!isAddressModalOpen && (
              <UserOrderForm
                isAddressModalOpen={isAddressModalOpen}
                setIsAddressModalOpen={setIsAddressModalOpen}
              />
            )}

            <div className="grid grid-cols-4 grid-rows-1 gap-x-7 gap-y-7  w-full">
              {/* Profile Picture &  Name =========================== */}
              <div className="col-span-1 flex flex-col gap-y-2">
                <div className="bg-white w-full min-h-[230px]">
                  <div className="h-full w-full">
                    <div className="h-4/5 grid place-items-center w-full">
                      <div className="w-full lg:w-3/5 h-full  flex flex-col justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Profile-Pic"
                          className="w-full h-95/100 object-cover overflow-hidden rounded-2xl"
                        />
                      </div>
                    </div>
                    {/* <h1>Hye</h1>
                  <h1>Hye</h1>
                  <h1>Hye</h1>
                  <h1>Hye</h1> */}
                    <div className="h-1/5 p-2">{userInfo.name}</div>
                  </div>
                </div>
                <div className="bg-white optionDisplay min-h-[200px] w-full">
                  <div className="accountInfo">
                    <h1 className="text-gray-500 text-xl font-bold">
                      Account Information
                    </h1>
                    <ul className="">
                      {accountInfoOptions.map((info, index) => {
                        return (
                          <li
                            key={info.key}
                            className={
                              (seeProfileInfo == info.key
                                ? "bg-gray-200"
                                : "") + " ml-2"
                            }
                          >
                            <button
                              type="button"
                              className="cursor-pointer pl-5"
                              onClick={() => {
                                dispatch(setSeeProfileInfo(info.key));
                                // setSeeInfo(+info.key);
                              }}
                            >
                              {info.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="orders">
                    <h1 className="text-gray-500 text-xl font-bold">
                      My Orders
                    </h1>
                    <div className="">
                      <Link
                        to="/orders"
                        className="w-full cursor-pointer block ml-5"
                        type="button"
                      >
                        Orders
                      </Link>
                    </div>
                  </div>
                  <div className="reviews">
                    <h1 className="text-gray-500 text-xl font-bold">
                      My Reviews
                    </h1>
                    <ul className="">
                      {reviewInfoOptions.map((info, index) => {
                        return (
                          <li
                            key={info.key}
                            className={
                              (seeProfileInfo == info.key
                                ? "bg-gray-200"
                                : "") + " ml-2"
                            }
                          >
                            <button
                              type="button"
                              className="cursor-pointer pl-5"
                              onClick={() => {
                                dispatch(setSeeProfileInfo(info.key));
                              }}
                            >
                              {info.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="Logout ">
                    <Link
                      to="/logout"
                      className="w-full cursor-pointer block text-gray-500 text-xl font-bold"
                      type="button"
                    >
                      <AiOutlineLogout className="inline" /> Logout
                    </Link>
                  </div>
                </div>
                <div className="contactUs bg-white h-20 w-full">
                  <h2 className="">Contact Us </h2>
                  <div className="pl-2">
                    <div>
                      <FaPhoneAlt className="inline" /> +91 9326573816
                    </div>
                    <div>
                      <SiGmail className="inline" /> aditypatil71@gmail.com
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 bg-white min-h-150 ">
                {InfoComp && <InfoComp />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
