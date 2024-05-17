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

const getUserProfile = tryCatch(async (req, res) => {
  const user = req.params.id;
  if (!user) throw new ApiError(NOT_FOUND, "User profile not found !");

  const userProfileData = await userSchema
    .findById({ _id: user })
    .select("-password");
  if (!userProfileData)
    throw new ApiError(BAD_REQUEST, "User profile details not found!");

  return res.status(SUCCESS).json({
    SUCCESS: true,
    message: "fetch user data",
    data: userProfileData,
  });
});

const userProfileUpadate = tryCatch((req, res) => {
  const { id } = req.params;
  if (!user) throw new ApiError(NOT_FOUND, "User profile not found !");

  return res.status(200).json({ user });
});
const suggestedUsers = tryCatch((req, res) => {
  const user = req.userId;
  return res.status(200).json({ user });
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
