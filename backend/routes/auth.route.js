const express = require("express");
const {
  userLogin,
  userRegistration,
  registerOrLoginWithGoogle,
  userLogout,
} = require("../controllers/auth.controller.js");
const isAuthorizedUser = require("../middleware/jwtTokenVerify.js");
const {
  validateLoginFields,
  validateRegisterFields,
} = require("../middleware/authValidator.js");

const router = express.Router();

router.post("/login", validateLoginFields, userLogin);
router.post("/register", validateRegisterFields, userRegistration);
router.post("/loginWithGoogle", registerOrLoginWithGoogle);
router.get("/logout", userLogout);

module.exports = router;
