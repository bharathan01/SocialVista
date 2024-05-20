const Notification = require("../models/notification.model.js");
const tryCatch = require("../utils/tryCatch.js");
const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
} = require("../utils/httpStatusCodes.js");

const getNotification = tryCatch(async (req, res) => {
  const userId = req.userId;

  const notifications = await Notification.find({ to: userId }).populate({
    path: "from",
    select: "username profileImg _id",
  });

  await Notification.updateMany({ to: userId }, { read: true });

  res.status(SUCCESS).json({
    SUCCESS: true,
    message: "notificaton",
    notifications,
  });
});
const deleteNotification = tryCatch(async (req, res) => {
  const userId = req.userId;

  await Notification.deleteMany({ to: userId });
  res
    .status(SUCCESS)
    .json({ SUCCESS: true, message: "Notifications deleted successfully" });
});

module.exports = {
  getNotification,
  deleteNotification,
};
