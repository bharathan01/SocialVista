const app = require("./app.js");
const connectDb = require("./db/connectDb.js");
require("dotenv").config();

const PORT = process.env.PORT ? process.env.PORT : 8000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Can not connected to DataBase..!", err);
  });
