const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true,default:"" },
    email: { type: String, required: true,default:"" },
    phoneNo: { type: String, required: true,default:"" },
    streetAddress: { type: String, required: true,default:"" },
    city: { type: String, required: true,default:"" },
    postalCode: { type: String, required: true,default:"" },
    region: { type: String, required: true,default:"" },
    country: { type: String, required: true,default:"" },
  },
  { _id: true }
);

module.exports = AddressSchema;