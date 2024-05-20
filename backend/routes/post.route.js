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
router.get("/userOwnPost",isAuthorizedUser, userOwnPost);
router.post("/getFollowingPost/:id", getFollowingPost);
router.post("/updatePost/:id", updatePost);
router.post("/deletePost/:id",isAuthorizedUser, deletePost);

//like
router.post("/like/:id", likeUnlikePost);
router.get("/likedpost/:id", likedPost);

//comment
router.post("/comment/:id", commentPost);
// router.post("/likeComment/:id",likeCommentPost);
// router.post('/deleteComment/:id',deleteCommet);
// router.post('/updateComment/:id',updateComment;

module.exports = router;
