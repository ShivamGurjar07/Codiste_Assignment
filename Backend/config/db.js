const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.url);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
};
module.exports = connectDB;
