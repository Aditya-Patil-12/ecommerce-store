// import axios from 'axios'
import { default as axios } from "axios";

const createUser = async (info) => {
  let validate = null;
  try {
    console.log("trying to Create User ....", info);

    validate = await axios.post(
      // "http://localhost:5000/api/v1/auth/signin",
      "http://localhost:5000/users",
      {
        ...info,
      }
    );
    console.log(validate);
    // TODO : check if validate exists
    if (!validate) {
      throw new Error("");
    }
    console.log("Server Verified Credentials");
  } catch (error) {
    return { msg: "Authentication Failed", success: false };
  }
  return { data: validate.data, success: true };
};

const checkUser = async (info) => {
  const userEmail = info.email;
  const userPassword = info.password;
  let validate = null;
  try {
    console.log("trying to Login ....", info);
    validate = await axios.get(
      // "http://localhost:5000/api/v1/auth/login"
      "http://localhost:5000/users?email=" + userEmail
    );
    console.log("Server Sent Response ", await validate);
    if (validate.length == 0 || validate.data[0].password !== userPassword)
      throw new Error("asdf");
    if( validate.data[0].role !== info.role ) 
            throw new Error("asdf");

    console.log("Done Logging In ....");
  } catch (error) {
    return { msg: "Login Failed", success: false };
  }
  return { data: validate.data[0], success: true };
};





export { createUser, checkUser };
