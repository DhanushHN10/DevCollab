import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { buildSocketUrl } from "../../utils/socketUrl";
import { WORKSPACE_SOCKET_EVENTS } from "./workspaceSocketEvents";

export default function useWorkspaceChatSocket({
  token,
  workspaceId,
  projectId,
  currentUserId,
  onGroupMessage,
  onDirectMessage,
  onChatNotification,
}) {
  const socketRef = useRef(null);
  const onGroupMessageRef = useRef(onGroupMessage);
  const onDirectMessageRef = useRef(onDirectMessage);
  const onChatNotificationRef = useRef(onChatNotification);
  const [transportName, setTransportName] = useState("connecting");

  useEffect(() => {
    onGroupMessageRef.current = onGroupMessage;
  }, [onGroupMessage]);

  useEffect(() => {
    onDirectMessageRef.current = onDirectMessage;
  }, [onDirectMessage]);

  useEffect(() => {
    onChatNotificationRef.current = onChatNotification;
  }, [onChatNotification]);

  useEffect(() => {
    if (!token || !workspaceId || !currentUserId) {
      setTransportName("connecting");
      return undefined;
    }

    const socket = io(buildSocketUrl(), {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;
    setTransportName("connecting");

    socket.on("connect", () => {
      const currentTransport = socket.io.engine?.transport?.name || "connected";
      setTransportName(currentTransport);

      socket.io.engine?.once("upgrade", (transport) => {
        setTransportName(transport?.name || "websocket");
      });

      socket.emit(WORKSPACE_SOCKET_EVENTS.JOIN, {
        projectId,
        workspaceId,
      });
    });

    socket.on("disconnect", () => {
      setTransportName("offline");
    });

    socket.on("connect_error", () => {
      setTransportName("offline");
    });

    socket.on(WORKSPACE_SOCKET_EVENTS.GROUP_MESSAGE, (message) => {
      onGroupMessageRef.current?.(message);
    });
    socket.on(WORKSPACE_SOCKET_EVENTS.MESSAGE_RECEIVED, (message) => {
      onGroupMessageRef.current?.(message);
    });
    socket.on(WORKSPACE_SOCKET_EVENTS.DIRECT_MESSAGE, (message) => {
      onDirectMessageRef.current?.(message);
    });
    socket.on(WORKSPACE_SOCKET_EVENTS.CHAT_NOTIFICATION, (notification) => {
      onChatNotificationRef.current?.(notification);
    });

    return () => {
      socket.emit(WORKSPACE_SOCKET_EVENTS.LEAVE, {
        projectId,
        workspaceId,
      });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId, projectId, token, workspaceId]);

  return {
    socketRef,
    transportName,
  };
}
