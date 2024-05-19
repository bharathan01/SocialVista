const { default: Post } = require("../models/post.model.js");

const getAllPost = async (req, res) => {
  const allPost = await Post.find()
};



const creatNewPost = (req, res) => {};
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
