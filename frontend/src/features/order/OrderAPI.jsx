import { default as axios } from "axios";

const createOrder = async (orderDetails) => {
  console.log("Entered Order Placement API");
  try {
    console.log(orderDetails);
    const resp = await axios.post("http://localhost:5000/orders",orderDetails);
    return await {data:resp.data,success:true};
  } catch (error) {
    console.log(error);
    return {msg:error,success:false};
  }
};

export { createOrder };
