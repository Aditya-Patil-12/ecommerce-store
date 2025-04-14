// regular exports ........
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
// const jwt = require("jsonwebtoken");
const {
  attachCookiesToResponse,
  expireCookie,
} = require("../utils");
const { createTokenUser } = require('../utils')
// models ....
const User = require("../models/User");

const registerController = async (req, res) => {
  // we are doing this to ensure that role property in not passed
  const { email, password, name } = req.body;
  const isUserAlreadyRegsitered = await User.findOne({ email: email });
  // email alredy present  ======> 
  if (isUserAlreadyRegsitered) {
    throw new CustomError.AlreadyExistsError(`${email} has already registered`);
  }
  // User.countDocuments({}) === 0 -> this is first user
  // which we cant set as admin

  // create User => password is Salted ....
  const user = await User.create({
    email: email,
    password: password,
    name: name,
  });
  // const 

  // const tokenUser = createTokenUser({user});

  // token -> JWT
  // JWT Token -> Cookie Transfer kiya hai
  // res.cookie(jwt); -> it is attached ....
  // over here res object is passed by reference ...
  // attachCookiesToResponse({ payload: tokenUser, res: res });

  return res
    .status(StatusCodes.CREATED)
    .json({});
};

const loginController = async (req, res) => {
  console.log("Ok neterd");
  const { email, password } = req.body;
  // email and password will not be empty ====>
  // format will be verified .....
  const isUserAlreadyRegsitered = await User.findOne({ email: email });
  if (!isUserAlreadyRegsitered) {
    // not registered =====>
    throw new CustomError.NotFoundError("Please Register with your email "+`email`);
  }
  // this is not how hashed password are checked  ....
  // if (correctPassword !== password) {
  //   throw new UnauthenticatedError("Given Credentials Are Invalid");
  // }
  console.log("Ok neterd");

  const isPasswordCorrect = await isUserAlreadyRegsitered.comparePassword(password); 
  console.log(isPasswordCorrect)
  console.log("Ok neterd");

  // over here we attach a cookie to response ====>
  if( !isPasswordCorrect ){
    throw new CustomError.UnauthenticatedError("Given Credentials Are Invalid Password Incorrect");
  }

  // user Is Verified ==> attach a cookie 
  const user = isUserAlreadyRegsitered;
  const { name, role, addresses,_id } = isUserAlreadyRegsitered;
  console.log(user);
  
  const tokenUser = createTokenUser({ user: user });
  // // console.log(tokenUser);
  attachCookiesToResponse({ payload: tokenUser, res: res });
  // // console.log(res);
  return res.status(StatusCodes.OK).json({id: _id ,email});
};

const logoutController = async (req, res) => {
  // token : random text set karna hai ..
  // cookie expire then it is done 
  expireCookie({ res:res });
  // console.log(res);
  
  return res.status(StatusCodes.OK).json({
    msg: "User Logout Succesfully"
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
