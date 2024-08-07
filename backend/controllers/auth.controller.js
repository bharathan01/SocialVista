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

const createTokenCookies = (res, userId) => {
  const accessToken = generateJwtToken(
    userId,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    "15m"
  );
  const refreshToken = generateJwtToken(
    userId,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    "15d"
  );
  const options = { httpOnly: true, sameSite: "Strict", secure: true };

  res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options);
};

const userRegistration = tryCatch(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (await userSchema.findOne({ $or: [{ username }, { email }] })) {
    throw new ApiError(BAD_REQUEST, {
      errors: [
        {
          path: "usernameOrEmail",
          msg: "Username or Email is already present!",
        },
      ],
    });
  }

  const encryptPassword = await hashPassword(password);

  const newUser = new userSchema({
    username,
    fullName,
    email,
    password: encryptPassword,
  });
  await newUser.save();

  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "Registered Successfully!",
    data: {
      _id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  });
});

const userLogin = tryCatch(async (req, res) => {
  const { username, email, password } = req.body;
  const userId = username || email;

  const userInfo = await userSchema.findOne({
    $or: [{ username: userId }, { email: userId }],
  });

  if (!userInfo || !(await compairPassword(password, userInfo.password))) {
    throw new ApiError(BAD_REQUEST, {
      errors: [{ path: "usernameOrEmail", msg: "Invalid user credentials!" }],
    });
  }

  createTokenCookies(res, userInfo._id);

  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "Login Successfully!",
    data: {
      id: userInfo._id,
      username: userInfo.username,
      email: userInfo.email,
      fullName: userInfo.fullName,
      bio: userInfo.bio,
      profileImg: userInfo.profileImg,
      coverImg: userInfo.coverImg,
    },
  });
});

const registerOrLoginWithGoogle = tryCatch(async (req, res) => {
  const { email, username, profileImg, fullName } = req.body;

  if (!email || !username || !fullName) {
    throw new ApiError(BAD_REQUEST, {
      errors: [
        { path: "invalidCredentials", msg: "Invalid user credentials!" },
      ],
    });
  }

  let user = await userSchema.findOne({ email });

  if (!user) {
    user = new userSchema({ username, fullName, email, profileImg });
    await user.save();
  }

  createTokenCookies(res, user._id);

  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "Login Successfully!",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      bio: user.bio,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    },
  });
});

const userLogout = tryCatch((req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "Logout Successfully",
  });
});

module.exports = {
  userLogin,
  userRegistration,
  userLogout,
  registerOrLoginWithGoogle,
};
