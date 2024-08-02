const app = require("./app.js");
const connectDb = require("./db/connectDb.js");
const { server } = require("./webSocket.io/socket.io.js");
require("dotenv").config();

const PORT = process.env.PORT ? process.env.PORT : 8000;

connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server started at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Can not connected to DataBase..!", err);
  });
