const Post = require("../models/post.model.js");
const ApiError = require("../utils/ApiError.js");
const { uploadFiletoCloudinary } = require("../utils/cloudinayFileUpload.js");
const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} = require("../utils/httpStatusCodes.js");
const tryCatch = require("../utils/tryCatch.js");
const { cloudinary } = require("cloudinary").v2;

const getAllPost = async (req, res) => {
  const allPost = await Post.find()
    .sort({ createAt: -1 })
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments.user",
      select: "-passowrd",
    });

  if (!allPost)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "can not fetch all post! try after sometime."
    );
  res.status(SUCCESS).json({
    SUCCESS: true,
    message: "successfully fetch all posts",
    allPost,
  });
};

const creatNewPost = tryCatch(async (req, res) => {
  let { postImage, postContent } = req.body;
  const currentUser = req.userId;
  if (!postContent && !postImage)
    throw new ApiError(BAD_REQUEST, "post is empty");
  if (!currentUser) throw new ApiError(UNAUTHORIZED, "unauthorized access");

  if (postImage) {
    const postUrl = await uploadFiletoCloudinary(postImage);
    postImage = postUrl.secure_url;
  }
  console.log(postImage);
  const newPost = new Post({
    user: currentUser,
    text: postContent,
    img: postImage,
  });

  const uploadedPost = await newPost.save();

  if (!uploadedPost)
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "Can not upload your post! try after sometime"
    );

  return res.status(SUCCESS).json({
    SUCCESS: true,
    Message: "post created successfully",
    uploadedPost,
  });
});
const getFollowingPost = (req, res) => {};
const userOwnPost = (req, res) => {};
const updatePost = (req, res) => {};
const deletePost = (req, res) => {};
const likeUnlikePost = (req, res) => {};
const likedPost = (req, res) => {};
const commentPost = (req, res) => {};

module.exports = {
  getAllPost,
  creatNewPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  likedPost,
  commentPost,
  getFollowingPost,
  userOwnPost,
};
