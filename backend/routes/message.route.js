const express = require("express");
const isAuthorizedUser = require("../middleware/jwtTokenVerify");
const {
  getTheUserMessages,
  getTheUserChat,
  addMessages,
} = require("../controllers/message.controller");

const router = express.Router();

router.get("/getMessage", isAuthorizedUser, getTheUserMessages);
router.get("/getChat/:conversationId", isAuthorizedUser, getTheUserChat);
router.post("/addMessage", isAuthorizedUser, addMessages);

module.exports = router;
