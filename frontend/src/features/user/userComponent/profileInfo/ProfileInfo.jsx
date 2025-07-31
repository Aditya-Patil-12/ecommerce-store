import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { updateUserInfoAsync } from '../../UserSlice';
import './profileInfo.css'
/*
 # TODO : V2 
----> Add Phone , gender  in User Details 
----> Support Editing   
*/
const fields = [
  {
    heading: "Name",
    key: "name",
    type: "text",
    edit: true,
  },
  // {
  //   heading: "Gender",
  //   key: "gender",
  //   type: "radio",
  //   edit: true,
  // },
  // {
  //   heading: "Phone Number",
  //   key: "phoneNo",
  //   type: "tel",
  //   edit: true,
  // },
  {
    heading: "Email",
    key: "email",
    type: "email",
    edit: true,
  },
];

export default function ProfileInfo() {
  
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);  
  const [isEdit,setIsEdit] = useState(false);
  console.log(userInfo);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    
    const tempData = new FormData(e.currentTarget);
    tempData.forEach((data)=>console.log(data))
    
    const data = Object.fromEntries(tempData);
    console.log(data);
    await dispatch(
      updateUserInfoAsync({
        ...userInfo,
        ...data,
      })
    );
    setIsEdit(false);
  }

  return (
    <div className="profileContainer">
      <div className="profile-center">
        <div className="profileHeading flex justify-between ">
          <h1 className="font-bold text-3xl">Profile Information</h1>
          {!isEdit ? (
            <button
              type="button"
              className="mt-2 ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              onClick={(e) => {
                setIsEdit(true);
              }}
            >
              Edit
            </button>
          ) : null}
        </div>
        <div className="profileBody ">
          <form onSubmit={handleSubmit}>
            {fields.map((field) => {
              if (field.heading === "Gender") {
                return (
                  <div className="fieldMain w-3/4 childContainer">
                    <div className="infoHeading flex justify-between">
                      <h1 className="block text-sm/6 font-medium text-gray-900">
                        {field.heading}
                      </h1>
                    </div>
                    <div className="infoHeading mt-2 flex justify-around">
                      <div className="w-50 ">
                        <input
                          type="radio"
                          name="Gender"
                          id="maleId"
                          value="Male"
                        />{" "}
                        <label htmlFor="maleId">Male</label>
                      </div>
                      <div className="w-50">
                        <input
                          type="radio"
                          name="Gender"
                          id="femaleId"
                          value="Female"
                        />{" "}
                        <label htmlFor="femaleId">Female</label>
                      </div>
                    </div>
                  </div>
                );
              }
              if (!userInfo[field.key]) return null;
              return (
                <div className="fieldMain w-3/4 childContainer">
                  <div className="infoHeading flex justify-between">
                    <h1 className="block text-sm/6 font-medium text-gray-900">
                      {field.heading}
                    </h1>
                  </div>
                  <div className="infoHeading mt-2">
                    <input
                      type={`${field.type}`}
                      defaultValue={userInfo[field.key]}
                      name={field.key}
                      className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              );
            })}
            {isEdit ? (
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

