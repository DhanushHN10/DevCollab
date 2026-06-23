import Notification from "../models/Notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "name username")
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      read: false,
    });

    res.json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      details: error.message,
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipient: req.user._id },
      { read: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ notification });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark notification as read",
      details: error.message,
    });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true },
    );

    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark notifications as read",
      details: error.message,
    });
  }
};
