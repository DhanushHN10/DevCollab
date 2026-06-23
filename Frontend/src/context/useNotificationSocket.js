import { useContext } from "react";
import { NotificationSocketContext } from "./notificationSocketContext.js";

export default function useNotificationSocket() {
  const context = useContext(NotificationSocketContext);

  if (!context) {
    throw new Error("useNotificationSocket must be used within NotificationSocketProvider");
  }

  return context;
}