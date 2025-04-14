const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 3, maxLenght: 100 },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true },
});


module.exports = AddressSchema;