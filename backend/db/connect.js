const mongoose = require("mongoose");
// final setup database setup ......
const connectDB = (url) => {
  const connection = mongoose.connect(url);
  return connection;
};

module.exports = connectDB;
