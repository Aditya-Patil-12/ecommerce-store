const createTokenUser = ({ user }) => {
    console.log("Here is createToken User");
    
  return { name: user.name, userId: user._id, role: user.role };
};

module.exports = { createTokenUser };
