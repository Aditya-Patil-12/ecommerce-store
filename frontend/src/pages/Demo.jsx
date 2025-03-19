import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Demo = () => {
  const [val, setVal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Hello ALL");
  }, [dispatch]);
  return <div>
    hello,
    {val}
    <button onClick={(e)=>setVal(val+1)} className="border-8 block bg-amber-800">Increase</button>
  </div>;
};

export default Demo;
