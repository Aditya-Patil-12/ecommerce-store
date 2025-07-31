const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const AddressSchema = require('./basic');
const AddSchema = mongoose.Schema({
  fullName: { type: String, required: true, default: "" },
  email: { type: String, required: true, default: "" },
  phoneNo: { type: String, required: true, default: "" },
  streetAddress: { type: String, required: true, default: "" },
  city: { type: String, required: true, default: "" },
  postalCode: { type: String, required: true, default: "" },
  region: { type: String, required: true, default: "" },
  country: { type: String, required: true, default: "" },
});
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, "Please Provide Username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide Email"],
    // custom Validation
    validate: [validator.isEmail, "Not a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    // custom Validation keep on Frontend for password ==>
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "customer"],
      message: `{VALUE} is not Valid Role`,
    },
    default: "customer",
  },
  addresses: {
    type: [AddSchema],
    default: [],
  },
});

// pre -> hook 
UserSchema.pre("save", async function () {
  // this -> point to userschema
  // if name is modified ...
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// these are instance methods ====>>
// with arrow function it won't be pointing to user ....
UserSchema.methods.comparePassword = async function (candidatePassword){
  console.log(candidatePassword);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log(isMatch);
  
  return isMatch; 
}
module.exports = mongoose.model("User", UserSchema);
