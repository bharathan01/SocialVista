const Conversation = require("../models/userchat.model/chatConversation.model");
const Message = require("../models/userchat.model/message.model");
const { SUCCESS } = require("../utils/httpStatusCodes");
const tryCatch = require("../utils/tryCatch");
const userSchema = require("../models/user.model");

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
  const userId = req.userId;
  const { receiverId } = req.params;
  const conversation = await Conversation.findOne({
    participants: { $all: [receiverId, userId] },
  });

  if (!conversation) {
    const recieverInfo = await userSchema
      .findOne({ _id: receiverId })
      .select("_id username profileImg");
    return res.status(SUCCESS).json({
      status: "EMPTY",
      message: "No conversation found between the users.",
      recieverInfo,
    });
  }
  await Conversation.updateOne(
    { _id: conversation._id },
    { $set: { readed: true } }
  );
  const messages = await Message.find({ conversation: conversation._id })
    .populate("sender", "username profileImg")
    .populate({
      path: "conversation",
      populate: { path: "participants", select: "username profileImg" },
    });

  res.status(SUCCESS).json({
    status: "SUCCESS",
    messages,
  });
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
