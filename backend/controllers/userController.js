const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const CustomError = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");
const allUsers = async (req, res) => {
  console.log(req.user);
  // let users = await User.find({});
  // users = users.filter((user)=>user.role === "customer");
  // users = users.map((user)=>{
  //     const {password,...filteredValue } = user._doc;
  //     return {...filteredValue};
  // });
  let users = await User.find({ role: "customer" }).select("-password");
  return res.status(StatusCodes.OK).json(users);
};
const singleUser = async (req, res) => {
  const { id } = req.params;
  // const user = await User.findById(id).select('-password');;
  // console.log(id);
  let user = await User.findOne({ _id: id }).select("-password -__v");

  console.log(user);
  if (!user) {
    throw new CustomError.NotFoundError(
      "No such user exists with id" + `${id}`
    );
    // throw new BadRequestError("No such user exists with id" + `${id}`);
  }
  checkPermissions({ requestUser: req.user, resourceUserId: user._id });
  const { _id, name, role, email, addresses } = user;
  return res
    .status(StatusCodes.OK)
    .json({ id: _id, name, role, email, addresses });
};
const currentUser = async (req, res) => {
  const { userId } = req.user;
  let user = await User.findOne({ _id: userId }).select("-password -__v");
  console.log(user);
  const { _id, name, role, email, addresses } = user;
  return res
    .status(StatusCodes.OK)
    .json({ id: _id, name, role, email, addresses });
};
// const updateUser = async (req, res) => {
//   const { name, email } = req.body;
//   console.log(name, " ", email, "  ", req.user);

//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   console.log(user);

//   const tokenUser = createTokenUser({ user });
//   attachCookiesToResponse({ payload: tokenUser, res });
//   return res.status(StatusCodes.OK).json({
//     user: tokenUser,
//   });
// };
/*
    // Push address into addresses array
    const result = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: newAddress } },
      { new: true, runValidators: true } // to return updated doc & trigger schema validation
    );

*/
// const updateUser = async (req, res) => {
//   console.log("Here is the body:: ", req.body);
//   const { name, email, addresses } = req.body;
//   if (!name || !email || !addresses) {
//     throw new CustomError.BadRequestError("Please Provide All Values");
//   }
//   let user = await User.findOne({_id:req.user.userId});
//   console.log("here is the user ::",user);
  
//   for(let address of addresses){
//     if( address._id ){
//       //edit  
//       let tempDoc = await user.addresses.id(address._id);

//       // for(let key in address){
//       let key = "fullName";
//         if( tempDoc._doc["fullName"] ){
//           console.log(key,"  ::: Here::::", tempDoc._doc[key]);
          
//           tempDoc[key] = address[key];
//         }
//       // }
//     }
//     else{
//       // add
//       // await user.addresses.push(address);
//       console.log(await user.addresses.push({fullName:"Aditya"}));
//     }
//   }
//   await user.save();
//   console.log("After saving :::::::::", user);

//   const tokenUser = createTokenUser({ user });
//   attachCookiesToResponse({ payload: tokenUser, res });
//   return res.status(StatusCodes.OK).json(user);
// };

const updateUser = async (req, res) => {
  console.log("Here is the body:: ", req.body);
  const { name, email, addresses } = req.body;

  if (!name || !email || !addresses) {
    throw new CustomError.BadRequestError("Please Provide All Values");
  }

  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  user.name = name;
  user.email = email;

  // Delete Addresses Operation .....
  // Handle address updates
    for (const address of addresses) {
      if (address._id) {
        // Update existing address
        const existing = user.addresses.id(address._id);
        if (existing) {
          for (const key in address) {
            if (
              key !== "_id" &&
              address[key] !== undefined &&
              existing[key] !== undefined
            ) {
              existing[key] = address[key];
            }
          }
        }
      } else {
        // Push new address
        user.addresses.push({
          fullName: address.fullName,
          email: address.email,
          phoneNo: address.phoneNo,
          streetAddress: address.streetAddress,
          city: address.city,
          postalCode: address.postalCode,
          region: address.region,
          country: address.country,
        });
      }
    }

  await user.save();
  console.log("After saving :::::::::", user);

  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ payload: tokenUser, res });
  return res.status(StatusCodes.OK).json(user);

};
const deleteAddress = async (req,res) =>{
  const { addressId } = req.body;
  console.log("Address Id: ",req.body);
  
  if (!addressId) {
    throw new CustomError.BadRequestError("Please Provide All Values");
  }

  const user = await User.findById(req.user.userId);
  console.log("user: ", user);
  
  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }
  const result = user.addresses.id(addressId);
  console.log(result);  
  if( result ){
    user.addresses.id(addressId).deleteOne();
  }
  await user.save();
  console.log("After Deletion::: " , user);
  
  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ payload: tokenUser, res });
  return res.status(StatusCodes.OK).json(user);
}
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // const user = User.findOne({ _id :id});
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  // console.log("yes Password Correct", " ",);

  user.password = newPassword;
  await user.save();
  user.populate('addresses');
  return res.status(StatusCodes.OK).json({
    user,
    msg: "password Update Successfully",
    success: false,
  });
};

module.exports = {
  allUsers,
  singleUser,
  currentUser,
  updateUser,
  updateUserPassword,
  deleteAddress,
};
