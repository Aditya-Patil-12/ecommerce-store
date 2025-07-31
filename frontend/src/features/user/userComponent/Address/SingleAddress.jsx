import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import AddressForm from './AddressForm';
import { useDispatch } from "react-redux";
import { deleteUserAddressAsync } from "../../UserSlice";
const Options = ({ setIsEdit, setIsOptionsEnabled ,address }) => {
  const dispatch = useDispatch();
  return (
    <div className="absolute editDeleteOptions top-0 right-full border-1">
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          setIsEdit("edit");
          setIsOptionsEnabled(false);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          setIsEdit("delete");
          const deleteUserHelper = async () =>{
            await dispatch(deleteUserAddressAsync(address._id));
          }
          deleteUserHelper();
          setIsOptionsEnabled(false);
        }}
      >
        Delete
      </button>
    </div>
  );
};
const SingleAddress = ({address,isSectionBreak}) => {
    console.log(address);
    const [isOptionsEnabled,setIsOptionsEnabled] = useState(false);
    const [isEdit,setIsEdit] = useState("none");
    console.log(isEdit);
    
    return (
      <div
        className={
          "childContainer " + `${isSectionBreak ? "sectionBreak" : ""}`
        }
      >
        {isEdit != "none" && (
          <AddressForm setIsEdit={setIsEdit} address={address} />
        )}
        {isEdit == "none" && (
          <div>
            <div className="part1 flex flex-row-reverse text-2xl">
              <div
                onMouseOver={(e) => {
                  setIsOptionsEnabled(true);
                }}
                onMouseOut={(e) => {
                  console.log("Doing Out for", e.currentTarget);
                  setIsOptionsEnabled(false);
                }}
                className="addressOptions relative border-1 h-7"
              >
                <BsThreeDotsVertical className="hover:" />
                {isOptionsEnabled && (
                  <Options
                    setIsEdit={setIsEdit}
                    setIsOptionsEnabled={setIsOptionsEnabled}
                    address={address}
                  />
                )}
              </div>
            </div>
            {
              <div className="part2 font-bold">
                {/* block text-sm/6 font-medium text-gray-900 */}
                <h1 className="inline-block mr-2">{address.fullName}</h1>{" "}
                <h2 className="inline-block">{address.phoneNo}</h2>
              </div>
            }
            {
              <div className="part3">
                <h1 className="inline-block mr-2">{address.streetAddress}</h1>,
                <h1 className="inline-block mr-2 ml-2">{address.city}</h1>,
                <h1 className="inline-block mr-1 ml-2">{address.region}</h1>-
                <h1 className="inline-block mr-2 ml-2">{address.postalCode}</h1>{" "}
                ,<h1 className="inline-block mr-2 ml-2">{address.country}</h1>
              </div>
            }
          </div>
        )}
      </div>
    );
}

export default SingleAddress
