const mongoose = require("mongoose");
// final setup database setup ......
const connectDB = (url) => {
  const connection = mongoose.connect(url);
  console.log("databse conencted guys ....");
  return connection;
};

module.exports = connectDB;
