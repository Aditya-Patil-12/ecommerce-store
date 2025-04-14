// import axios from 'axios'
import axios from '../../app/axiosConfig'
const authUrl ="auth/"; 
const createUser = async (registerDetails) => {
  // console.log(info);
  try {
    // console.log("trying to Create User ....", info);
    const data = await axios.post(authUrl + "register", registerDetails,{
      withCredentials:true
    });
    console.log(data);
    // if(  )
    return { success: true };
  } catch (error) {
    console.log(error);
    return { msg:error.response.data.msg, success: false };
  }
};

const checkUser = async (info) => {
  const {email,password} = info;
  try {
    // console.log("trying to Create User ....", info);
    let response = await axios.post(
      authUrl + "login",
      { email, password },
      {
        withCredentials: true,
      }
    );
    // console.log(response.data);
    // {user:{},success}
    return { user: response.data, success: true };
  } catch (error) {
    return { msg: "Invalid Credentials", success: false };
  }
};





export { createUser, checkUser };
