import Notification from "../models/Notifications.js";
export const sendNotification = async (io, recipientId, notificationData) => {
  try {
    // Saving to Database
    const notification = await Notification.create({
      recipient: recipientId,
      ...notificationData,
    });

    // notification through socket.io

    // I have done this to make sure that the message is sent in the socket to all the connected ports but only to the user ( belong to this particular user group).
    if (io) {
      io.to(`user:${recipientId}`).emit("new_notification", notification);
    }
  } catch (err) {
    console.error("Error sending notification:", err);
  }
};
