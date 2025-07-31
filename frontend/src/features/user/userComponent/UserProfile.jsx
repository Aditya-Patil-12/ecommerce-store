import { useSelector, useDispatch } from "react-redux";
import { updateUserInfoAsync } from "../UserSlice";
import { useState } from "react";
import UserOrderForm from "./UserOrderForm";
import { AiOutlineLogout } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import ProfileInfo from "./profileInfo/ProfileInfo";
import { SiGmail } from "react-icons/si";
import './userProfile.css';
import UserAddress from "./Address/userAddress";
import PaymentInfo from "./Payment/PaymentInfo";
import { Link } from "react-router";
const accountInfoOptions = [
  {
    name:"Profile",
    component: ProfileInfo,
    key:"1",
  },
  {
    name: "Address Info",
    component: UserAddress,
    key:"2",
  }
];
const paymentInfoOptions = [
  {
    name: "Payment Info",
    component: PaymentInfo,
  },
];


export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=>state.user.userInfo);
  const {name:userName,email : userEmail , addresses : userAddresses} = userInfo;
  const [isAddressModalOpen,setIsAddressModalOpen] = useState(0);
  const [seeInfo,setSeeInfo] = useState(-1);
  let InfoComp = null;
  if( seeInfo != -1 ){
    InfoComp = accountInfoOptions[seeInfo].component;
  }
  // console.log(InfoComp);
  
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
      <div className="flex items-start justify-between border-1 border-green-1000">
        <h1 className="text-2xl font-medium text-gray-900">My Profile</h1>
      </div>
      {/* ====================== */}

      <div className="mx-auto min-w-0.9">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1 bg-transparent">
          {/* TODO : For Every Order we need a seperate below componenet ....
          the div below duplicates order=========== */}

          <div className="lg:col-span-1 relative border-red-500">
            {!!isAddressModalOpen && (
              <UserOrderForm
                isAddressModalOpen={isAddressModalOpen}
                setIsAddressModalOpen={setIsAddressModalOpen}
              />
            )}

            <div className="grid gap-x-7 gap-y-7 grid-rows-3 shadow-xl border-red-950 bg-transparent profileArea">
              {/* Profile Picture &  Name =========================== */}
              <div className="profilePhotoArea bg-white">
                <div className="h-full">
                  <div className="h-4/5 grid place-items-center">
                    <div className="h-9/10 w-3/5 rounded-2xl border-1">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile-Pic"
                        className="w-1/1 h-1/1 object-cover overflow-hidden rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="h-1/5 border-1">{userInfo.name}</div>
                </div>
              </div>
              <div className="bg-white min-h-150 infoDisplay">
                {
                InfoComp &&
                <InfoComp />
                }
              </div>
              <div className="border-1 bg-white optionDisplay">
                <div className="accountInfo">
                  <h1>Account Information</h1>
                  <ul className="pl-5">
                    {accountInfoOptions.map((info, index) => {
                      return (
                        <li key={info.key}>
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => {
                              setSeeInfo(index);
                            }}
                          >
                            {info.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="paymentInfo">paymentInfo</div>
                <div className="Logout border">
                  <Link
                    to="/logout"
                    className="w-full cursor-pointer block"
                    type="button"
                  >
                    <AiOutlineLogout className="inline" /> Logout
                  </Link>
                </div>
              </div>
              <div className="contactUs bg-white h-20">
                <h2 className="">Contact Us </h2>
                <div className="pl-2">
                  <div>
                    <FaPhoneAlt className="inline" /> +91 9326753816
                  </div>
                  <div>
                    <SiGmail className="inline" /> ecommercestore@gmail.com
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

/*

*/