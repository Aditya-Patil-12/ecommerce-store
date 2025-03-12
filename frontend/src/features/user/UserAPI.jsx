// import axios from 'axios'
import { default as axios } from "axios";

const loggedInUserInfo = async (userId) => {
  try {
    console.log("Finally in Api",userId);
    const resp = await axios.get('http://localhost:5000/users/'+userId);
    console.log(resp);
    
    return {data:resp.data,success:true};
  } catch (error) {
    console.log("This an Error In Fetching Details of Logged In User");
    return { msg: " Fetched User Details Error ", success: false }; 
  }
};
const loggedInUserOrders = async (userId) => {
  try {
    const resp = await axios.get("http://localhost:5000/orders?userId=" + userId);
    console.log("Axios response",resp);
    
    return { data: resp.data, success: true };
  } catch (error) {
    console.log("This an Error In Fetching Details of Logged In User");
  }
  return { msg: " Fetched User Details Error ", success: false };
};

const updateUserInfo = async (userInfo) => {
  let resp=null;
  try {
    resp = await axios.patch("http://localhost:5000/users/" + userInfo.id,userInfo);
    console.log("Server Response ", resp.data);
  } catch (error) {
    return { msg: "Update Address Failed", success: false };
  }
  return { data: resp.data, success: true };
};

const logOutUserInfo = async (userId) => {
  let resp = null;
  try {
    resp = await axios.delete(
      "http://localhost:5000/users/" + userId);
    console.log("Server Response ", resp.data);
  } catch (error) {
    return { msg: "Update Address Failed", success: false };
  }
  return { data: resp.data, success: true };
};

export { loggedInUserOrders, loggedInUserInfo, updateUserInfo, logOutUserInfo };
