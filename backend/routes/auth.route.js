const express = require("express");
const {
  userLogin,
  userRegsitration,
  userLoguot,
} = require("../controllers/auth.controller.js");
const isAuthorizedUser = require("../middleware/jwtTokenVerify.js");
const {
  validateLoginFields,
  validateRegisterFields,
} = require("../middleware/authValidator.js");

const router = express.Router();

router.post("/login", validateLoginFields, userLogin);
router.post("/register", validateRegisterFields, userRegsitration);
router.get("/logout", isAuthorizedUser, userLoguot);

module.exports = router;
