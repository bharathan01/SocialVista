const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const postRouter = require("./routes/post.route.js");
const notifyRouter = require("./routes/notification.route.js");
const errorHandle = require("./middleware/errorHander.js");
const ApiError = require("./utils/ApiError.js");
const { NOT_FOUND } = require("./utils/httpStatusCodes.js");
const cloudinaryConfig = require("./db/cloudinaryConfig.js");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
cloudinaryConfig();
 
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/notification", notifyRouter);

app.use("**", (req, res) => {
  throw new ApiError(NOT_FOUND, "Page not found");
});
app.use(errorHandle);

module.exports = app;
