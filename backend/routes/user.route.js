const express = require("express");
const {
  userProfileUpadate,
  getUserProfile,
  followUnfollowUser,
  suggestedUsers,
} = require("../controllers/user.controller.js");
const isAuthorizedUser = require("../middleware/jwtTokenVerify.js");

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.post("/profileUpdate/:id",isAuthorizedUser, userProfileUpadate);
router.post("/followUnfolllow/:id",isAuthorizedUser, followUnfollowUser);
router.get("/suggested",isAuthorizedUser, suggestedUsers);
// router.delete("/deleteAccount/:id",deleteAccount);

module.exports = router;
