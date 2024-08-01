const Conversation = require("../models/userchat.model/chatConversation.model");
const Message = require("../models/userchat.model/message.model");
const { SUCCESS } = require("../utils/httpStatusCodes");
const tryCatch = require("../utils/tryCatch");

const getTheUserMessages = tryCatch(async (req, res) => {
  const userId = req.userId;
  const conversations = await Conversation.find({ participants: userId })
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "username profileImg",
      },
    })
    .populate("participants", "username profileImg");

  res.status(SUCCESS).json({
    status: "SUCCESS",
    conversations,
  });
});

const getTheUserChat = tryCatch(async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({
    conversation: conversationId,
  }).populate("sender", "username profileImg");
  res.status(200).json(messages);
});

const addMessages = tryCatch(async (req, res) => {
  const senderId = req.userId;
  const { receiverId, content } = req.body;

  // Check if a conversation exists between the two users
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  // If no conversation exists, create a new one
  if (!conversation) {
    conversation = new Conversation({
      participants: [senderId, receiverId],
    });
    await conversation.save();
  }

  // Create a new message
  const message = new Message({
    sender: senderId,
    content,
    conversation: conversation._id,
  });
  const savedMessage = await message.save();

  // Update the conversation with the last message
  conversation.lastMessage = savedMessage._id;
  await conversation.save();

  res.status(201).json(savedMessage);
});

module.exports = {
  getTheUserMessages,
  getTheUserChat,
  addMessages,
};
