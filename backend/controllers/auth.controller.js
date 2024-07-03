const tryCatch = require("../utils/tryCatch.js");
const {
  BAD_REQUEST,
  SUCCESS,
  INTERNAL_SERVER_ERROR,
} = require("../utils/httpStatusCodes.js");

const ApiError = require("../utils/ApiError.js");
const userSchema = require("../models/user.model.js");
const { hashPassword, compairPassword } = require("../utils/hashPassword.js");
const generateJwtToken = require("../utils/generatejwttoken.js");

const userRegsitration = tryCatch(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  const isUserPresent = await userSchema.findOne({ username });
  if (isUserPresent)
    throw new ApiError(BAD_REQUEST, {
      errors: [
        {
          path: "username",
          msg: "Username is already present !",
        },
      ],
    });

  const isEmailPresent = await userSchema.findOne({ email });
  if (isEmailPresent)
    throw new ApiError(BAD_REQUEST, {
      errors: [
        {
          path: "email",
          msg: "email is already present !",
        },
      ],
    });

  const encryptPassword = await hashPassword(password);

  const userData = new userSchema({
    username,
    fullName,
    email,
    password: encryptPassword,
  });
  const newUser = await userData.save();
  if (newUser) {
    res.status(SUCCESS).json({
      status: "SUCCESS",
      meassage: "Register SuccessFully !",
      data: {
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } else {
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "Can't register a new user ! please try after sometime."
    );
  }
});

const userLogin = tryCatch(async (req, res) => {
  const userId = req.body.username ? req.body.username : req.body.email;
  const password = req.body.password;
  const userInfo = await userSchema.findOne({
    $or: [{ username: userId }, { email: userId }],
  });
  if (!userInfo) {
    throw new ApiError(BAD_REQUEST, {
      errors: [
        {
          path: "usernameOrEmail",
          msg: "invalid user credentials!",
        },
      ],
    });
  }
  if (!(await compairPassword(password, userInfo.password))) {
    throw new ApiError(BAD_REQUEST, {
      errors: [
        {
          path: "usernameOrEmail",
          msg: "invalid user credentials!",
        },
      ],
    });
  }

  const accessToken = generateJwtToken(
    userInfo._id,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    "15m"
  );
  const refreshToken = generateJwtToken(
    userInfo._id,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    "1d"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({
      status: "SUCCESS",
      data: {
        id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
        fullName: userInfo.fullName,
        bio: userInfo.bio,
        profileImg: userInfo.profileImg,
        coverImg: userInfo.coverImg,
      },
      messge: "login successfully",
    });
});

const userLoguot = tryCatch((req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "Logout Successfully",
  });
});

module.exports = { userLogin, userRegsitration, userLoguot };
