import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../api/axios";
import { buildSocketUrl } from "../utils/socketUrl.js";
import { NotificationSocketContext } from "./notificationSocketContext.js";

export function NotificationSocketProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const syncAuthState = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("auth-token-changed", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("auth-token-changed", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setNotifications([]);
      setUnreadCount(0);
      setSocketConnected(false);
      return undefined;
    }

    let active = true;
    const socketUrl = buildSocketUrl();

    const socket = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    const loadNotifications = async () => {
      try {
        const res = await API.get("/api/notifications");
        if (!active) return;

        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    socket.on("connect", () => {
      if (active) {
        setSocketConnected(true);
      }
      loadNotifications();
    });

    socket.on("disconnect", () => {
      if (active) {
        setSocketConnected(false);
      }
    });

    socket.on("new_notification", (notification) => {
      if (!active) return;

      setNotifications((current) => [notification, ...current].slice(0, 50));
      if (!notification.read) {
        setUnreadCount((count) => count + 1);
      }
    });

    return () => {
      active = false;
      socket.disconnect();
    };
  }, [token]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      await API.patch(`/api/notifications/${notificationId}/read`);
      setNotifications((current) =>
        current.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification,
        ),
      );
      setUnreadCount((count) => Math.max(count - 1, 0));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await API.patch("/api/notifications/read-all");
      setNotifications((current) =>
        current.map((notification) => ({ ...notification, read: true })),
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const refreshNotifications = async () => {
    try {
      const res = await API.get("/api/notifications");
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (error) {
      console.error("Failed to refresh notifications:", error);
    }
  };

  const value = {
    notifications,
    unreadCount,
    socketConnected,
    refreshNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };

  return (
    <NotificationSocketContext.Provider value={value}>
      {children}
    </NotificationSocketContext.Provider>
  );
}
