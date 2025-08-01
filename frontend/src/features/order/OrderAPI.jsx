import axios from '../../app/axiosConfig'
import { productListLimit } from "../../app/constants";
const orderServerURL = "orders/";

const createOrderAPI = async (orderDetails) => {
  console.log("Entered Order Placement API");
  try {
    console.log(orderDetails);
    // create order =====>
    const resp = await axios.post(orderServerURL,orderDetails);
    console.log(resp.data);
    // empty cart on your side .....
    return await {data:resp.data,success:true};
  } catch (error) {
    return { msg: error.response.data.msg, success: false };
  }
};
const currentUserOrderAPI = async () => {
  console.log("Entered Order Placement API");
  try {
    const resp = await axios.get(orderServerURL + "showAllMyOrders");
    console.log(resp.data);
    return await { ...(resp.data), success: true };
  } catch (error) {
    return { msg: error.response.data.msg, success: false };
  }
};
const fetchAllOrdersAPI = async ({page,orderSortQuery:sortQuery,orderId}) => {
  let queryString = "";
  console.log(sortQuery," ",orderId);
  if( orderId != "" ){
    queryString+=`_id=${orderId}&`;
  }
  let sortFilter = Object.entries(sortQuery);
  if (sortFilter.length != 0) {
    queryString += "_sort=";
  }
  for (let [key, value] of sortFilter) {
    if (value == "desc") {
      queryString += "-";
    }
    queryString += key + ",";
  }
  if (sortFilter.length != 0) {
    console.log("inside  ", queryString[queryString.length - 1]);
    queryString = queryString.slice(0, -1) + "&";
  }

  // pagination 
  queryString += "_page=" + `${page}` + "&_per_page=" + `${productListLimit}`;
  console.log(queryString);
  try {
    let response ;
    if( queryString.length == 0 ){
      console.log("queried length 0");
      
      response = await axios.get(orderServerURL);
      console.log(response);
        return { data: response.data, totalOrders: response.data.items };
      
    }
    else{
        response = await axios.get(
          `orders?` + `${queryString}`
        );
        return { data: response.data.data, totalOrders: response.data.items };
    }
  } catch (error) {
    return { msg: "Single Product Fetching Error" };
  }
};

const updateOrderAPI = async (newOrder) =>{
  try {
    console.log(newOrder);
    const resp = await axios.patch(
      orderServerURL + `${newOrder._id}`,
      newOrder
    );
    console.log(newOrder);
    return await { data: resp.data, success: true };
  } catch (error) {
    console.log(error);
    return { msg: error, success: false };
  }
}

const verifyOrderPaymentAPI = async (paymentDetails)=>{
  console.log("Entered Order Placement API");
  try {
    console.log(paymentDetails);
    // create order =====>
    const resp = await axios.post(
      orderServerURL + "verifyOrderPayment",
      paymentDetails
    );
    console.log(resp.data);
    // empty cart on your side .....
    return await { data: resp.data, success: true };
  } catch (error) {
    return { msg: error.response.data.msg, success: false };
  }
}
export {
  createOrderAPI,
  fetchAllOrdersAPI,
  updateOrderAPI,
  currentUserOrderAPI,
  verifyOrderPaymentAPI,
};
