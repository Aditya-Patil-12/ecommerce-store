import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
const ViewInfo = ({heading,text}) => {
    const [isShow,setIsShow] = useState(false);
  return (
    <div className="my-5 px-5 py-5 border-1">
      <div className="flex items-center justify-between cursor-pointer mb-3" onClick={()=>{setIsShow((s)=>(!s))}}>
        <h1>{heading}</h1>
        <div className={(isShow)?"-rotate-90":""}>
            <FaAngleDown />
        </div>
      </div>
      {isShow && <div className='mx-10'>{text}</div>}
    </div>
  );
}

export default ViewInfo
