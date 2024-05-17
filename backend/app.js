const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const errorHandle = require("./middleware/errorHander.js");
const ApiError = require("./utils/ApiError.js");
const {NOT_FOUND} = require("./utils/httpStatusCodes.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.use("**", (req, res) => {
  throw new ApiError(NOT_FOUND , "Page not found")
});
app.use(errorHandle)

module.exports = app;
