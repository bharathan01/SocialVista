const express = require("express");
const {
  getAllPost,
  creatNewPost,
  updatePost,
  deletePost,
  userOwnPost,
  getFollowingPost,
  likeUnlikePost,
  likedPost,
  commentPost,
} = require("../controllers/post.controller.js");
const isAuthorizedUser = require("../middleware/jwtTokenVerify.js");

const router = express.Router();

//post
router.get("/allPost",isAuthorizedUser, getAllPost);
router.post("/newPost",isAuthorizedUser, creatNewPost);
router.get("/userOwnPost/:id",isAuthorizedUser, userOwnPost);
router.get("/getFollowingPost",isAuthorizedUser, getFollowingPost);
router.post("/updatePost/:id",isAuthorizedUser, updatePost);
router.post("/deletePost/:id",isAuthorizedUser, deletePost);

//like
router.get("/like/:id",isAuthorizedUser, likeUnlikePost);
router.get("/likedpost/:id",isAuthorizedUser, likedPost);

//comment
router.post("/comment/:id",isAuthorizedUser, commentPost);
// router.post("/likeComment/:id",likeCommentPost);
// router.post('/deleteComment/:id',isAuthorizedUser,deleteCommet);

module.exports = router;
