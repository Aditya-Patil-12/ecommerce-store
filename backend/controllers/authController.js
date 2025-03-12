
const signinController = async (req, res) => {
  console.log(req.body);
  return res.json({
    msg: "User Creation Succesfully",
    success: true,
  });
};

const loginController = async (req, res) => {
  console.log("Server caught Request " , req.body);
  return res.json({
    msg: "User Credentials verified Succesfully",
    success: true,
  });
};


const logoutController = async (req, res) => {
  return res.json({
    msg: "User Logout Succesfully",
    success: true,
  });
};

module.exports = {
  signinController,
  loginController,
  logoutController,
};
