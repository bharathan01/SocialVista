const express = require("express");
const router = require("./routes/auth.route.js");
const errorHandle = require("./middleware/errorHander.js");
const ApiError = require("./utils/ApiError.js");
const {NOT_FOUND} = require("./utils/httpStatusCodes.js");

const app = express();
app.use(express.json());

app.use("/api/v1/auth", router);

app.use("**", (req, res) => {
  throw new ApiError(NOT_FOUND , "Page not found")
});
app.use(errorHandle)

module.exports = app;
