const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});
const virtual = CategorySchema.virtual("id");
virtual.get(function () {
  return this._id;
});

CategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("Category", CategorySchema);
