const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_connect, {});
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
