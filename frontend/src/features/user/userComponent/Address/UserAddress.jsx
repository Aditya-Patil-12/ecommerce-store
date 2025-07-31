import './address.css'
import { useDispatch,useSelector } from 'react-redux';
import { MdAdd } from "react-icons/md";
import SingleAddress from './SingleAddress';
import AddressForm from './AddressForm';
import { useState } from 'react';
import { deleteUserAddressAsync } from '../../UserSlice';
const UserAddress = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isAddNewAddress,setIsAddNewAddress] = useState("none");
  const {
    name: userName,
    email: userEmail,
    addresses: userAddresses,
  } = userInfo;
  return (
    <div>
      <div className="profileContainer">
        <div className="profileHeading">
          <h1 className="font-bold text-3xl">Manage Addresses</h1>
        </div>
        <div className="profileBody ">
          <div className="childContainer sectionBreak cursor-pointer">
            {
              isAddNewAddress =="add" ? (
                <AddressForm setIsEdit={setIsAddNewAddress} />
              )
              :(<button type="button" className='cursor-pointer' onClick={(e)=>setIsAddNewAddress("add")}>
                <span>
                  {" "}
                  <MdAdd className="inline-block mr-2" /> Add Addresses
                </span>
              </button>)
            }
          </div>
          <ul role="list" className="-my-6 divide-y divide-black-1000">
            {userAddresses &&
              userAddresses.map(
                (address, index) =>{
                  let isSectionBreak = false;
                  if( index == userAddresses.length - 1 ) isSectionBreak =true;
                  return <SingleAddress address={address} isSectionBreak={isSectionBreak}/> 
                } 
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserAddress
