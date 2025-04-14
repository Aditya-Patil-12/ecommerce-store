const CustomError = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToResponse,checkPermissions } = require("../utils");
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
  checkPermissions({requestUser:req.user,resourceUserId:user._id});
  const {_id ,name,role,email,addresses} = user;
  return res
    .status(StatusCodes.OK)
    .json({ id: _id, name, role, email, addresses });
};
const currentUser = async (req, res) => {
  const {userId} = req.user;
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
const updateUser = async (req, res) => {
  const { name, email , addresses } = req.body;
  if (!name || !email || !addresses) {
    throw new CustomError.BadRequestError("Please Provide All Values");
  }
  console.log(name, " ", email, "  ", req.user);
  const user = await User.findOne(
    { _id: req.user.userId }
  );
  user.email = email;
  user.name = name;
  user.addresses= addresses;
  await user.save()
  console.log(user);
  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ payload: tokenUser, res });
  return res.status(StatusCodes.OK).json(user);
};
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
};
