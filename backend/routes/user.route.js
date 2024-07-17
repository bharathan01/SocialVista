const express = require("express");
const {
  userProfileUpadate,
  getUserProfile,
  followUnfollowUser,
  suggestedUsers,
  getUser,
  getFollowersDetails,
  getFolloweingDetails,
} = require("../controllers/user.controller.js");
const isAuthorizedUser = require("../middleware/jwtTokenVerify.js");

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.get("/getCurrentUser", isAuthorizedUser, getUser);
router.post("/profileUpdate/:id", isAuthorizedUser, userProfileUpadate);
router.post("/followUnfolllow/:id", isAuthorizedUser, followUnfollowUser);
router.get("/suggested", isAuthorizedUser, suggestedUsers);
router.get("/getFollowers/:id", isAuthorizedUser, getFollowersDetails);
router.get("/getFollowing/:id", isAuthorizedUser, getFolloweingDetails);
// router.delete("/deleteAccount/:id",deleteAccount);

module.exports = router;
