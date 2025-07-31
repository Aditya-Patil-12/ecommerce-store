const mongoose = require("mongoose");
const childSchema = new mongoose.Schema(
    {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      default: "",
    },
  },
  { _id: true }
);
const NewUserSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, "Please Provide Username"],
  },
  addresses: {
    type: [childSchema],
    default: [],
  },
});

const NewUser = mongoose.model("New User",NewUserSchema);