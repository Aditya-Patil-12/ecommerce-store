const CustomError = require('../errors')

const checkPermissions = ({requestUser,resourceUserId})=>{
  console.log(requestUser);
  console.log(resourceUserId);
  console.log(typeof resourceUserId);
  if (requestUser.role === "admin") {
    return;
  }
  // remember that resourceUserId.toString()
  if (requestUser.userId === resourceUserId.toString()) {
    return;
  }
  throw new CustomError.UnauthorizedError("Not Authorized to Access the Route");
};

module.exports = checkPermissions;