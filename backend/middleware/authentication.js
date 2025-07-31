const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const { token } = req.signedCookies;
  console.log("here there is a token : ",token);
  if (!token) {
    throw new CustomError.UnauthenticatedError("Token Not Present");
  }
  try {
      const {name,userId,role} =  isTokenValid({ token });
      req.user = {name , userId , role }
      console.log("Checking req.user: ::::",req.user);
    //   console.log("in authenticateUser",req.user);
  } catch (error) {
      throw new CustomError.UnauthenticatedError("Token Not Valid");
  }
  next();
};

const authorizePermissions = (...roles) =>{
    console.log("in authorizePermissions",roles);
    return (req,res,next) =>{
      const userRole = req.user.role;
      
      const findIndex = roles.findIndex((role)=> (role === userRole));
      console.log(findIndex," ");
      if( findIndex == -1 ){
          throw new CustomError.UnauthorizedError(`Unauthorized to Access this route`);
      } 
      return next();
        // // console.log(roles);
        
        
        // next();
    }
}
const authorizeProduct = (req,res,next) =>{
  const {token} = req.signedCookies;
  // this is the only difference 
  if( !token ) return ;
  try {
      const {name,userId,role} =  isTokenValid({ token });
      req.user = {name , userId , role }
    //   console.log(req.user);
  } catch (error) {
      throw new CustomError.UnauthenticatedError("No Token Not Valid");
  }
  next();
}
module.exports = { authenticateUser, authorizePermissions, authorizeProduct };
