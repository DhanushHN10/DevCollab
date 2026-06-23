import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import API from "../api/axios";
import getUserIdFromToken from "../utils/getUserIdFromToken";

const NotificationSocketContext = createContext(null);

const buildSocketUrl = () => {
  const baseUrl =
    import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || "";
  return baseUrl.replace(/\/api\/?$/, "");
};

export function NotificationSocketProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);
  const [userId, setUserId] = useState(() => getUserIdFromToken());

  useEffect(() => {
    const syncAuthState = () => {
      setUserId(getUserIdFromToken());
    };

    window.addEventListener("auth-token-changed", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("auth-token-changed", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      setSocketConnected(false);
      return undefined;
    }

    let active = true;
    const socketUrl = buildSocketUrl();

    const socket = io(socketUrl, {
      auth: { userId },
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
  }, [userId]);

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

export function useNotificationSocket() {
  const context = useContext(NotificationSocketContext);

  if (!context) {
    throw new Error(
      "useNotificationSocket must be used within NotificationSocketProvider",
    );
  }

  return context;
}
