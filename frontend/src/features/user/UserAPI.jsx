// import axios from 'axios'
import axios from "../../app/axiosConfig";
const userServerURL = "user";
const orderServerURL = "orders";
const authServerURL = "auth";
const loggedInUserInfo = async (userId) => {
  try {
    // console.log("Finally in Api",userId);
    const resp = await axios.get(userServerURL + "/showMe");
    // console.log("server response ",resp);
    return {user:resp.data,success:true};
  } catch (error) {
    console.log(error);
    return { msg:error.response.data.msg, success: false }; 
  }
};
const loggedInUserOrders = async () => {
  try {
    const resp = await axios.get(orderServerURL + "/showAllMyOrders");
    console.log("Axios response",resp);
    return { ...resp.data, success: true };
  } catch (error) {
    console.log(error);
    return { msg: error.response.data.msg, success: false }; 
  }
};

const updateUserInfo = async (userInfo) => {
  let resp=null;
  console.log(userInfo);
  
  try {
    resp = await axios.patch(userServerURL + "/updateUser", userInfo);
    console.log(resp);
    
    console.log("Server Response ", resp.data);
  } catch (error) {
    return { msg: "Update/Addtion Address Failed", success: false };
  }
  return { data: resp.data, success: true };
};
const deleteUserAddress = async (addressId) => {
  let resp=null;
  console.log("Address to be deleted : ",addressId);
  
  try {
    resp = await axios.delete(userServerURL + "/deleteUserAddress", {data : {addressId}});
    console.log("Server response after deleting the Address : ", resp);
  } catch (error) {
    return { msg: "Deleting Address Failed", success: false };
  }
  return { data: resp.data, success: true };
};

const logOutUserInfo = async () => {
  try {
    await axios.get(authServerURL + "/logout");
    return { msg:"Logged Out Succesfully" , success: true };
  } catch (error) {
    return { msg: "Update Address Failed", success: false };
  }
};

export {
  loggedInUserOrders,
  loggedInUserInfo,
  updateUserInfo,
  logOutUserInfo,
  deleteUserAddress,
};
