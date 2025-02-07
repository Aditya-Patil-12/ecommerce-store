import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState();

  const getData = async () => {
    console.log("Fetching data...");
    const resp = await axios.get("http://localhost:5000/api/v1");
    console.log(resp.data.done);
    
    setData(resp.data.done);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{data ? `Data: ${data}` : "Loading..."}</div>; 
};

export default App;
