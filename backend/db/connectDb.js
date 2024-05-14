const mongoose = require("mongoose");
const  mongoDbUrl  = require("../utils/contance.js");

async function connectDb() {
    console.log(mongoDbUrl)
  try {
    const connected = await mongoose.connect(mongoDbUrl);
    console.log(
      "DataBase Connected Successfully!! DB_HOST :",
      connected.connection.host
    );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILD > ", error);
    process.exit(1);
  }
}

module.exports = connectDb
