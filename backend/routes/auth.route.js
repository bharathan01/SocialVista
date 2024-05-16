const express = require("express");
const {
  userLogin,
  userRegsitration,
  userProfileUpadate,
  userLoguot,
} = require("../controllers/auth.controller.js");
const isAuthorizedUser = require("../middleware/jwtTokenVerify.js");

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegsitration);
router.put("/updateprofile/:id", isAuthorizedUser, userProfileUpadate);
router.get("logout/:id", isAuthorizedUser, userLoguot);

module.exports = router;
