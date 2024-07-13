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

const getUserProfile = tryCatch(async (req, res) => {
  const user = req.params.id;
  if (!user) throw new ApiError(NOT_FOUND, "User profile not found !");

  const userProfileData = await userSchema
    .findById({ _id: user })
    .select("-password");
  if (!userProfileData)
    throw new ApiError(BAD_REQUEST, "User profile details not found!");

  return res.status(SUCCESS).json({
    status: 'SUCCESS',
    message: "fetch user data",
    data: userProfileData,
  });
});
const userProfileUpadate = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { username, fullName, email, bio, profileImg, coverImg } = req.body;

  const currentUserInfo = await userSchema.findById(id).select("-password");
  if (!currentUserInfo)
    throw new ApiError(
      BAD_REQUEST,
      "can not find the user! ,please try after sometime !"
    );

  if (profileImg) {
    if (currentUserInfo.profileImg) {
      await distroyFileFromCloudinary(currentUserInfo.profileImg);
    }
    const uploadedResponse = await uploadFiletoCloudinary(profileImg);
    profileImg = uploadedResponse.secure_url;
  }
  if (coverImg) {
    if (currentUserInfo.coverImg) {
      await distroyFileFromCloudinary(currentUserInfo.coverImg);
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

  const updateUser = await currentUserInfo.save();
  if (!updateUser)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "can not update profile! try after sometime."
    );

  return res.status(SUCCESS).json({
    SUCCESS: true,
    message: "user profile updated successfully",
    updateUser,
  });
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
      SUCCESS: true,
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

module.exports = {
  userProfileUpadate,
  suggestedUsers,
  followUnfollowUser,
  getUserProfile,
};
