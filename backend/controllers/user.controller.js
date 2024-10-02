const tryCatch = require("../utils/tryCatch.js");
const {
  BAD_REQUEST,
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  FORBIDDEN,
} = require("../utils/httpStatusCodes.js");
const ApiError = require("../utils/ApiError.js");
const userSchema = require("../models/user.model.js");
const { hashPassword, compairPassword } = require("../utils/hashPassword.js");
const { default: mongoose } = require("mongoose");
const {
  distroyFileFromCloudinary,
  uploadFiletoCloudinary,
} = require("../utils/cloudinayFileUpload.js");
const Notification = require("../models/notification.model.js");
const generateJwtToken = require("../utils/generatejwttoken.js");
const jwt = require("jsonwebtoken");
const sendMailToResetPassword = require("../utils/nodemailer.js");

const getUserProfile = tryCatch(async (req, res) => {
  const user = req.params.id;
  if (!user) throw new ApiError(NOT_FOUND, "User profile not found !");

  const userProfileData = await userSchema
    .findById({ _id: user })
    .select("-password");
  if (!userProfileData)
    throw new ApiError(BAD_REQUEST, "User profile details not found!");

  return res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "fetch user data",
    data: userProfileData,
  });
});
const userProfileUpadate = tryCatch(async (req, res) => {
  const { id } = req.params;
  let { username, fullName, email, bio, profileImg, coverImg } = req.body;
  let currentUserInfo = await userSchema.findById(id).select("-password");
  if (!currentUserInfo)
    throw new ApiError(
      BAD_REQUEST,
      "can not find the user! ,please try after sometime !"
    );

  if (profileImg) {
    if (profileImg != currentUserInfo.profileImg) {
      if (currentUserInfo.profileImg) {
        await distroyFileFromCloudinary(currentUserInfo.profileImg);
      }
      const uploadedResponse = await uploadFiletoCloudinary(profileImg);
      profileImg = uploadedResponse.secure_url;
    }
  }
  if (coverImg) {
    if (coverImg != currentUserInfo.coverImg) {
      if (currentUserInfo.coverImg) {
        await distroyFileFromCloudinary(currentUserInfo.coverImg);
      }
    }
    const uploadedResponse = await uploadFiletoCloudinary(coverImg);
    coverImg = uploadedResponse.secure_url;
  }

  currentUserInfo.fullName = fullName || currentUserInfo.fullName;
  currentUserInfo.email = email || currentUserInfo.email;
  currentUserInfo.username = username || currentUserInfo.username;
  currentUserInfo.bio = bio || currentUserInfo.bio;
  currentUserInfo.profileImg = profileImg || currentUserInfo.profileImg;
  currentUserInfo.coverImg = coverImg || currentUserInfo.coverImg;

  try {
    const updateUser = await currentUserInfo.save();
    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "User profile updated successfully",
      updateUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyPattern)[0];
      const duplicateValue = error.keyValue[duplicateKey];
      throw new ApiError(BAD_REQUEST, {
        error: "DUPLICATE",
        errorMessage: `Duplicate key error: ${duplicateKey} with value "${duplicateValue}" already exists.`,
      });
    } else {
      // Handle other errors if necessary
      throw new ApiError(
        INTERNAL_SERVER_ERROR,
        "Cannot update profile! Try after some time."
      );
    }
  }
});
const suggestedUsers = tryCatch(async (req, res) => {
  const user = req.userId;
  const alreadyFollowed = await userSchema.findById(user).select("following");
  const getRamdomUser = await userSchema.aggregate([
    {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(user) },
      },
    },
    {
      $sample: { size: 10 },
    },
  ]);
  const whoNotfollowByUser = getRamdomUser.filter(
    (userData) => !alreadyFollowed.following.includes(userData._id)
  );

  return res.status(200).json({ whoNotfollowByUser });
});
const followUnfollowUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.userId;
  const currentLogedInUser = await userSchema.findById(currentUserId).exec();
  const userInfoToFollow = await userSchema.findById(id).exec();

  if (id === req.userId.toString())
    throw new ApiError(BAD_REQUEST, "You can't follow/unfollow yourself");

  if (!currentLogedInUser || !userInfoToFollow)
    throw new ApiError(BAD_REQUEST, "User not found !");
  const isUserAlreadyFollow = currentLogedInUser?.following?.includes(id);
  if (isUserAlreadyFollow) {
    const removeFollowers = await userSchema.findByIdAndUpdate(id, {
      $pull: { followers: currentUserId },
    });
    const removeFollowing = await userSchema.findByIdAndUpdate(currentUserId, {
      $pull: { following: id },
    });

    if (!removeFollowers || !removeFollowing)
      throw new ApiError(
        FORBIDDEN,
        "can not unfollow the user ! try after sometime"
      );

    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "unfollow user successfully.",
    });
  } else {
    const addFollowers = await userSchema.findByIdAndUpdate(id, {
      $push: { followers: currentUserId },
    });
    const addFollowing = await userSchema.findByIdAndUpdate(currentUserId, {
      $push: { following: id },
    });

    if (!addFollowers || !addFollowing)
      throw new ApiError(
        FORBIDDEN,
        "can not follow the user ! try after sometime"
      );
    const newNotification = new Notification({
      type: "follow",
      from: req.userId,
      to: userInfoToFollow._id,
    });

    await newNotification.save();

    return res.status(SUCCESS).json({
      SUCCESS: true,
      message: "follow user successfully.",
    });
  }
});
const getUser = tryCatch(async (req, res) => {
  const user = req.userId;
  if (!user) throw new ApiError(NOT_FOUND, "User profile not found !");

  const userProfileData = await userSchema
    .findById({ _id: user })
    .select("-password");
  if (!userProfileData)
    throw new ApiError(BAD_REQUEST, "User profile details not found!");

  return res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "fetch user data",
    data: userProfileData,
  });
});
const getFollowersDetails = tryCatch(async (req, res) => {
  const { id } = req.params;
  const followingUserDetails = await userSchema
    .find({ _id: id })
    .select("followers")
    .populate({
      path: "followers",
      select: "-password -likedPost -bio -followers -following",
    });
  if (!followingUserDetails) {
    throw new ApiError(NOT_FOUND, "user not found");
  }

  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "data fetch successfully",
    data: followingUserDetails,
  });
});
const getFolloweingDetails = tryCatch(async (req, res) => {
  const { id } = req.params;
  const followingUserDetails = await userSchema
    .find({ _id: id })
    .select("following")
    .populate({
      path: "following",
      select: "-password -likedPost -bio -followers -following",
    });
  if (!followingUserDetails) {
    throw new ApiError(NOT_FOUND, "user not found");
  }

  res.status(SUCCESS).json({
    status: "SUCCESS",
    message: "data fetch successfully",
    data: followingUserDetails,
  });
});

const getSearchUserData = tryCatch(async (req, res) => {
  const { search } = req.query;
  const searchRegex = new RegExp(search, "i");
  const searchUser = await userSchema
    .find({
      $or: [{ username: searchRegex }, { fullName: searchRegex }],
    })
    .select("fullName username _id profileImg");
  res.status(SUCCESS).json({
    status: "SUCCESS",
    data: searchUser,
  });
});
const verifyEmailId = tryCatch(async (req, res) => {
  const { emailId } = req.body;
  if (!emailId) throw new ApiError(BAD_REQUEST, "email is required");

  const isUserFind = await userSchema.findOne({ email: emailId });
  if (!isUserFind) {
    throw new ApiError(BAD_REQUEST, {
      invalidEmail: true,
      error: "email id can not find ! use valid email is.",
    });
  }

  const token = generateJwtToken(
    isUserFind._id,
    process.env.EMAIL_VERIFY_TOKEN,
    "15m"
  );
  const passwordRestLink = `${process.env.BACK_END_URL}/api/v1/user/reset-password/${isUserFind._id}/${token}`;
  const isSendMail = await sendMailToResetPassword(passwordRestLink, emailId);
  if (!isSendMail) {
    throw new ApiError(INTERNAL_SERVER_ERROR, {
      error: "can not send password reset link! try after sometime!",
    });
  }
  res.status(SUCCESS).json({
    status: "SUCCESS",
  });
});

const resetPassword = tryCatch(async (req, res) => {
  const { id, token } = req.params;
  if (!id && !token) {
    throw new ApiError(
      BAD_REQUEST,
      "Unable to process the url ! please try after sometime."
    );
  }
  const isTokenValid = jwt.verify(token, process.env.EMAIL_VERIFY_TOKEN);
  if (!isTokenValid) {
    throw new ApiError(BAD_REQUEST, "can not validate the token !");
  }
  res.render("index", { id, token, status: "Not Verified" });
});
const getNewPassword = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  if (!id && !password) {
    throw new ApiError(
      BAD_REQUEST,
      "Unable to process the url ! please try after sometime."
    );
  }
  if (password !== confirmPassword) {
    res.render("index", { status: "FAIL" });
  }
  const newHasedPassword = await hashPassword(password);

  const updateNewPassword = await userSchema.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        password: newHasedPassword,
      },
    }
  );
  if (!updateNewPassword) {
    throw new ApiError(BAD_REQUEST, "somthing went wrong!");
  }
  res.render("index", { status: "SUCCESS" });
});

module.exports = {
  userProfileUpadate,
  suggestedUsers,
  followUnfollowUser,
  getUserProfile,
  getUser,
  getFollowersDetails,
  getFolloweingDetails,
  getSearchUserData,
  verifyEmailId,
  resetPassword,
  getNewPassword,
};
