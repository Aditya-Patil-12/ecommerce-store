import { default as axios } from "axios";
import { productListLimit } from "../../app/constants";
const createOrderAPI = async (orderDetails) => {
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
const fetchAllOrdersAPI = async ({page,orderSortQuery:sortQuery}) => {
  let queryString = "";
  console.log(sortQuery);
  
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
      
      response = await axios.get(
        `http://localhost:5000/orders`
      );
      console.log(response);
        return { data: response.data, totalOrders: response.data.items };
      
    }
    else{
        response = await axios.get(
          `http://localhost:5000/orders?` + `${queryString}`
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
      "http://localhost:5000/orders/"+`${newOrder.id}`,
      newOrder
    );
    console.log(newOrder);
    return await { data: resp.data, success: true };
  } catch (error) {
    console.log(error);
    return { msg: error, success: false };
  }
}

export { createOrderAPI, fetchAllOrdersAPI, updateOrderAPI };
