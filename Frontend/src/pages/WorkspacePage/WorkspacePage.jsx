import { ArrowLeft, CircleAlert, Send, ShieldAlert, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import MainNavbar from "../../tools/MainNavbar";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import useWorkspaceChatSocket from "./useWorkspaceChatSocket";
import { WORKSPACE_SOCKET_EVENTS } from "./workspaceSocketEvents";

const THREADS = {
  GROUP: "group",
  DM: "dm",
};

const emptyDrafts = {
  [THREADS.GROUP]: "",
  [THREADS.DM]: "",
};

const createLocalMessage = ({
  text,
  senderId,
  senderName,
  thread,
  recipientId = null,
}) => ({
  clientMessageId:
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  text,
  senderId,
  senderName,
  thread,
  recipientId,
  createdAt: new Date().toISOString(),
  status: "sending",
});

const mergeMessages = (currentMessages, nextMessage) => {
  const messageId =
    nextMessage.clientMessageId || nextMessage._id || nextMessage.id;
  const existingIndex = currentMessages.findIndex((message) => {
    const currentId = message.clientMessageId || message._id || message.id;
    return currentId === messageId;
  });

  if (existingIndex === -1) {
    return [...currentMessages, nextMessage];
  }

  const updatedMessages = [...currentMessages];
  updatedMessages[existingIndex] = {
    ...updatedMessages[existingIndex],
    ...nextMessage,
  };

  return updatedMessages;
};

const formatMessageTime = (value) => {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getStatusTone = (socketStatus) => {
  if (socketStatus === "websocket") {
    return {
      label: "WebSocket live",
      className: "border-emerald-500/30 bg-emerald-500/15 text-emerald-200",
    };
  }

  if (socketStatus === "polling") {
    return {
      label: "Polling fallback",
      className: "border-amber-500/30 bg-amber-500/15 text-amber-200",
    };
  }

  if (socketStatus === "offline") {
    return {
      label: "Offline",
      className: "border-rose-500/30 bg-rose-500/15 text-rose-200",
    };
  }

  return {
    label: "Connecting",
    className: "border-white/20 bg-white/10 text-white/70",
  };
};

export default function WorkspacePage() {
  const { projectId } = useParams();
  const messagesEndRef = useRef(null);
  const activeThreadRef = useRef(THREADS.GROUP);
  const selectedDmIdRef = useRef(null);

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [workspace, setWorkspace] = useState(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(true);
  const [workspaceError, setWorkspaceError] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);
  const [activeThread, setActiveThread] = useState(THREADS.GROUP);
  const [selectedDmId, setSelectedDmId] = useState(null);
  const [drafts, setDrafts] = useState(emptyDrafts);
  const [groupMessages, setGroupMessages] = useState([]);
  const [directMessages, setDirectMessages] = useState({});
  const [memberUnread, setMemberUnread] = useState({});
  const [groupUnread, setGroupUnread] = useState(0);

  const currentUserId = getUserIdFromToken();

  useEffect(() => {
    activeThreadRef.current = activeThread;
  }, [activeThread]);

  useEffect(() => {
    selectedDmIdRef.current = selectedDmId;
  }, [selectedDmId]);

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
    let active = true;

    const fetchWorkspace = async () => {
      setWorkspaceLoading(true);
      setWorkspaceError("");
      setAccessDenied(false);

      try {
        const response = await API.get(`/api/projects/${projectId}/workspace`);
        if (!active) return;

        setWorkspace(response.data);
      } catch (error) {
        if (!active) return;

        const status = error?.response?.status;
        if (status === 403) {
          setAccessDenied(true);
          setWorkspace(null);
        } else {
          setWorkspaceError(
            error?.response?.data?.message || "Failed to load workspace.",
          );
        }
      } finally {
        if (active) {
          setWorkspaceLoading(false);
        }
      }
    };

    if (token) {
      fetchWorkspace();
    } else {
      setWorkspaceLoading(false);
    }

    return () => {
      active = false;
    };
  }, [projectId, token]);

  const workspaceMembers = useMemo(() => workspace?.members || [], [workspace]);
  const workspaceId =
    workspace?.workspaceId || workspace?._id || workspace?.project?.workspaceId || projectId;
  const groupConversationId = workspace?.groupConversationId || null;

  const currentMember = useMemo(
    () => workspaceMembers.find((member) => member.id === currentUserId),
    [currentUserId, workspaceMembers],
  );

  const directConversationMembers = useMemo(
    () => workspaceMembers.filter((member) => member.id !== currentUserId),
    [currentUserId, workspaceMembers],
  );

  const selectedDmMember = useMemo(
    () =>
      directConversationMembers.find((member) => member.id === selectedDmId) ||
      null,
    [directConversationMembers, selectedDmId],
  );

  useEffect(() => {
    if (activeThread !== THREADS.DM) return;
    if (selectedDmId || directConversationMembers.length === 0) return;

    setSelectedDmId(directConversationMembers[0].id);
  }, [activeThread, directConversationMembers, selectedDmId]);

  const handleGroupMessage = (incomingMessage) => {
    setGroupMessages((currentMessages) =>
      mergeMessages(currentMessages, {
        ...incomingMessage,
        thread: THREADS.GROUP,
        status: "sent",
      }),
    );

    if (activeThreadRef.current !== THREADS.GROUP) {
      setGroupUnread((count) => count + 1);
    }
  };

  const handleDirectMessage = (incomingMessage) => {
    const senderId =
      incomingMessage.senderId ||
      incomingMessage.sender?._id ||
      incomingMessage.sender;
    const recipientId =
      incomingMessage.recipientId ||
      incomingMessage.recipient?._id ||
      incomingMessage.recipient;

    const conversationKey = senderId === currentUserId ? recipientId : senderId;

    if (!conversationKey) return;

    setDirectMessages((currentMessages) => {
      const currentConversation = currentMessages[conversationKey] || [];

      return {
        ...currentMessages,
        [conversationKey]: mergeMessages(currentConversation, {
          ...incomingMessage,
          senderId,
          recipientId,
          thread: THREADS.DM,
          status: "sent",
        }),
      };
    });

    if (
      activeThreadRef.current !== THREADS.DM ||
      selectedDmIdRef.current !== conversationKey
    ) {
      setMemberUnread((current) => ({
        ...current,
        [conversationKey]: (current[conversationKey] || 0) + 1,
      }));
    }
  };

  const handleChatNotification = (notification) => {
    if (notification?.thread === THREADS.GROUP) {
      setGroupUnread((count) => count + 1);
    }
  };

  const { socketRef, transportName } = useWorkspaceChatSocket({
    token,
    workspaceId,
    projectId,
    currentUserId,
    onGroupMessage: handleGroupMessage,
    onDirectMessage: handleDirectMessage,
    onChatNotification: handleChatNotification,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeThread, groupMessages, selectedDmId, directMessages]);

  useEffect(() => {
    if (activeThread === THREADS.GROUP) {
      setGroupUnread(0);
      return;
    }

    if (selectedDmId) {
      setMemberUnread((current) => ({ ...current, [selectedDmId]: 0 }));
    }
  }, [activeThread, selectedDmId]);

  const sendMessage = () => {
    const trimmedMessage = drafts[activeThread].trim();

    if (!trimmedMessage || !workspace || !currentMember) return;

    const socket = socketRef.current;
    const canSendOverSocket = Boolean(socket?.connected);

    if (activeThread === THREADS.GROUP) {
      const outgoingMessage = createLocalMessage({
        text: trimmedMessage,
        senderId: currentUserId,
        senderName: currentMember.name || "You",
        thread: THREADS.GROUP,
      });

      setGroupMessages((currentMessages) => [
        ...currentMessages,
        outgoingMessage,
      ]);
      setDrafts((currentDrafts) => ({ ...currentDrafts, [THREADS.GROUP]: "" }));

      if (groupConversationId) {
        API.post(
          `/api/workspaces/${workspaceId}/conversations/${groupConversationId}/messages`,
          {
            text: trimmedMessage,
            clientMessageId: outgoingMessage.clientMessageId,
            senderId: currentUserId,
          },
        )
          .then((response) => {
            const savedMessage = response?.data?.message;
            if (!savedMessage) return;

            setGroupMessages((currentMessages) =>
              mergeMessages(currentMessages, {
                ...savedMessage,
                thread: THREADS.GROUP,
                status: "sent",
              }),
            );
          })
          .catch((error) => {
            console.error("Failed to persist group message", error);
          });
      }

      if (canSendOverSocket) {
        socket.emit(WORKSPACE_SOCKET_EVENTS.GROUP_MESSAGE, {
          projectId,
          workspaceId,
          clientMessageId: outgoingMessage.clientMessageId,
          text: trimmedMessage,
          senderId: currentUserId,
          senderName: currentMember.name || "You",
          createdAt: outgoingMessage.createdAt,
        });
      }

      return;
    }

    if (!selectedDmMember) return;

    const outgoingMessage = createLocalMessage({
      text: trimmedMessage,
      senderId: currentUserId,
      senderName: currentMember.name || "You",
      thread: THREADS.DM,
      recipientId: selectedDmMember.id,
    });

    setDirectMessages((currentMessages) => {
      const currentConversation = currentMessages[selectedDmMember.id] || [];

      return {
        ...currentMessages,
        [selectedDmMember.id]: [...currentConversation, outgoingMessage],
      };
    });
    setDrafts((currentDrafts) => ({ ...currentDrafts, [THREADS.DM]: "" }));
    setMemberUnread((current) => ({ ...current, [selectedDmMember.id]: 0 }));

    if (canSendOverSocket) {
      socket.emit(WORKSPACE_SOCKET_EVENTS.DIRECT_MESSAGE, {
        projectId,
        workspaceId,
        clientMessageId: outgoingMessage.clientMessageId,
        text: trimmedMessage,
        senderId: currentUserId,
        senderName: currentMember.name || "You",
        recipientId: selectedDmMember.id,
        recipientName: selectedDmMember.name,
        createdAt: outgoingMessage.createdAt,
      });
    }
  };

  const activeMessages =
    activeThread === THREADS.GROUP
      ? groupMessages
      : directMessages[selectedDmId] || [];
  const statusTone = getStatusTone(transportName);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (workspaceLoading) {
    return (
      <div className='min-h-screen bg-[#0e0e0e] text-white'>
        <MainNavbar />
        <div className='flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 pt-20'>
          <Card className='w-full max-w-2xl border-white/10 bg-white/5 text-white'>
            <CardContent className='p-8 text-center'>
              <div className='mx-auto mb-4 h-12 w-12 animate-pulse rounded-full border border-white/20 bg-white/10' />
              <h1 className='text-2xl font-semibold'>Loading workspace</h1>
              <p className='mt-2 text-white/60'>
                Fetching the project workspace and membership list.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (workspaceError && !workspace) {
    return (
      <div className='min-h-screen bg-[#0e0e0e] text-white'>
        <MainNavbar />
        <div className='flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 pt-20'>
          <Card className='w-full max-w-2xl border-rose-500/20 bg-rose-500/10 text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-rose-100'>
                <CircleAlert className='h-5 w-5' />
                Workspace unavailable
              </CardTitle>
              <CardDescription className='text-rose-100/70'>
                {workspaceError}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex gap-3'>
              <Button asChild className='bg-white text-black hover:bg-white/90'>
                <Link to={`/project/${projectId}`}>Back to project</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className='min-h-screen bg-[#0e0e0e] text-white'>
        <MainNavbar />
        <div className='flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 pt-20'>
          <Card className='w-full max-w-2xl border-amber-500/20 bg-amber-500/10 text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-amber-100'>
                <ShieldAlert className='h-5 w-5' />
                Access blocked
              </CardTitle>
              <CardDescription className='text-amber-100/70'>
                You need to be a workspace member before the chat shell opens.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-3'>
              <Button asChild className='bg-white text-black hover:bg-white/90'>
                <Link to={`/project/${projectId}`}>Go back to project</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return null;
  }

  const groupMessageCount = groupMessages.length + groupUnread;
  const dmMessageCount = Object.values(directMessages).reduce(
    (sum, messages) => sum + messages.length,
    0,
  );

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(45,54,94,0.38),_transparent_40%),linear-gradient(180deg,_#0a0c14_0%,_#0e0e0e_100%)] text-white'>
      <MainNavbar />

      <main className='mx-auto w-full max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8'>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div className='space-y-2'>
            <Button
              asChild
              variant='ghost'
              className='pl-0 text-white/70 hover:text-white'
            >
              <Link to={`/project/${projectId}`}>
                <ArrowLeft className='h-4 w-4' />
                Back to project
              </Link>
            </Button>
            <div>
              <p className='text-sm uppercase tracking-[0.28em] text-white/40'>
                Workspace
              </p>
              <h1 className='text-3xl font-black sm:text-4xl'>
                {workspace.project?.title || "Project Workspace"}
              </h1>
              <p className='mt-2 max-w-3xl text-sm text-white/65 sm:text-base'>
                {workspace.project?.description ||
                  "A shared collaboration space for group chat, direct messages, and future project tooling."}
              </p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2 text-sm'>
            <span
              className={`rounded-full border px-3 py-1 ${statusTone.className}`}
            >
              {statusTone.label}
            </span>
            <span className='rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white/70'>
              {workspaceMembers.length} member
              {workspaceMembers.length === 1 ? "" : "s"}
            </span>
            {currentMember && (
              <span className='rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white/70'>
                Signed in as {currentMember.name}
              </span>
            )}
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]'>
          <Card className='border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20'>
            <CardHeader className='border-b border-white/10 pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Users className='h-5 w-5 text-cyan-300' />
                Workspace Members
              </CardTitle>
              <CardDescription className='text-white/55'>
                Switch to a direct message by selecting a teammate.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3 p-4'>
              {workspaceMembers.map((member) => {
                const isCurrentUser = member.id === currentUserId;
                const unreadCount = memberUnread[member.id] || 0;

                return (
                  <button
                    key={member.id}
                    type='button'
                    onClick={() => {
                      if (isCurrentUser) return;
                      setActiveThread(THREADS.DM);
                      setSelectedDmId(member.id);
                      setMemberUnread((current) => ({
                        ...current,
                        [member.id]: 0,
                      }));
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition hover:border-white/20 hover:bg-white/5 ${
                      selectedDmId === member.id && activeThread === THREADS.DM
                        ? "border-cyan-400/30 bg-cyan-400/10"
                        : "border-white/10 bg-white/5"
                    } ${isCurrentUser ? "cursor-default opacity-80" : "cursor-pointer"}`}
                    disabled={isCurrentUser}
                  >
                    <img
                      src={
                        member.avatar || "https://via.placeholder.com/40?text=U"
                      }
                      alt={member.name}
                      className='h-10 w-10 rounded-full border border-white/10 object-cover'
                    />
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2'>
                        <p className='truncate font-semibold text-white'>
                          {member.name}
                        </p>
                        {isCurrentUser && (
                          <span className='rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200'>
                            You
                          </span>
                        )}
                      </div>
                      <p className='truncate text-xs text-white/50'>
                        @{member.username}
                      </p>
                      <p className='text-[11px] uppercase tracking-[0.24em] text-white/35'>
                        {member.role || "Member"}
                      </p>
                    </div>

                    {unreadCount > 0 && (
                      <span className='rounded-full bg-rose-500 px-2 py-1 text-[11px] font-bold text-white'>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}

              {workspaceMembers.length === 0 && (
                <div className='rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-white/55'>
                  No members found for this workspace.
                </div>
              )}

              <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/60'>
                <p className='font-semibold text-white/80'>Chat contract</p>
                <p className='mt-1'>
                  Group chat stays shared across the workspace. Direct messages
                  are scoped to one teammate at a time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='flex min-h-[72vh] flex-col border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20'>
            <CardHeader className='border-b border-white/10 pb-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <CardTitle className='text-white'>
                    {activeThread === THREADS.GROUP
                      ? "Group Chat"
                      : selectedDmMember
                        ? `DM with ${selectedDmMember.name}`
                        : "Direct Messages"}
                  </CardTitle>
                  <CardDescription className='text-white/55'>
                    {activeThread === THREADS.GROUP
                      ? "Visible to all workspace members"
                      : selectedDmMember
                        ? `Private conversation with @${selectedDmMember.username}`
                        : "Choose a teammate to open a private thread"}
                  </CardDescription>
                </div>

                <div className='flex items-center gap-2 rounded-full border border-white/10 bg-black/20 p-1 text-sm'>
                  <button
                    type='button'
                    onClick={() => {
                      setActiveThread(THREADS.GROUP);
                      setGroupUnread(0);
                    }}
                    className={`rounded-full px-4 py-2 font-medium transition ${
                      activeThread === THREADS.GROUP
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Group Chat
                    <span className='ml-2 rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-semibold'>
                      {groupMessageCount}
                    </span>
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveThread(THREADS.DM)}
                    className={`rounded-full px-4 py-2 font-medium transition ${
                      activeThread === THREADS.DM
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Direct Messages
                    <span className='ml-2 rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-semibold'>
                      {dmMessageCount}
                    </span>
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className='flex flex-1 flex-col p-0'>
              <div className='flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6'>
                {activeThread === THREADS.DM && !selectedDmMember ? (
                  <div className='flex min-h-[24rem] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-black/10 px-6 text-center'>
                    <div className='max-w-md space-y-3'>
                      <h3 className='text-xl font-semibold text-white'>
                        Pick a teammate for a DM
                      </h3>
                      <p className='text-sm text-white/60'>
                        Select one of the workspace members on the left to start
                        a private conversation.
                      </p>
                    </div>
                  </div>
                ) : activeMessages.length === 0 ? (
                  <div className='flex min-h-[24rem] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-black/10 px-6 text-center'>
                    <div className='max-w-md space-y-3'>
                      <h3 className='text-xl font-semibold text-white'>
                        {activeThread === THREADS.GROUP
                          ? "No group messages yet"
                          : "No direct messages yet"}
                      </h3>
                      <p className='text-sm text-white/60'>
                        {activeThread === THREADS.GROUP
                          ? "Start the workspace conversation from here."
                          : "Say hello to begin the private thread."}
                      </p>
                    </div>
                  </div>
                ) : (
                  activeMessages.map((message) => {
                    const isMine = message.senderId === currentUserId;

                    return (
                      <div
                        key={
                          message.clientMessageId || message._id || message.id
                        }
                        className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-3xl border px-4 py-3 sm:max-w-[70%] ${
                            isMine
                              ? "border-cyan-400/20 bg-cyan-400/15"
                              : "border-white/10 bg-white/8"
                          }`}
                        >
                          {!isMine && (
                            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/45'>
                              {message.senderName || "Member"}
                            </p>
                          )}
                          <p className='mt-1 whitespace-pre-wrap text-sm leading-6 text-white'>
                            {message.text}
                          </p>
                          <div className='mt-2 flex items-center justify-between gap-3 text-[11px] text-white/45'>
                            <span>{formatMessageTime(message.createdAt)}</span>
                            {message.status && message.status !== "sent" && (
                              <span className='rounded-full border border-white/10 bg-white/5 px-2 py-0.5 uppercase tracking-[0.18em]'>
                                {message.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className='border-t border-white/10 bg-black/10 p-4 sm:p-5'>
                <div className='mb-3 flex items-center justify-between gap-3 text-xs text-white/45'>
                  <span>
                    {activeThread === THREADS.GROUP
                      ? "Everyone in the workspace will see this message."
                      : selectedDmMember
                        ? `Only you and ${selectedDmMember.name} will see this thread.`
                        : "Select a teammate to continue."}
                  </span>
                  <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.24em] text-white/55'>
                    {activeThread === THREADS.GROUP ? "Shared" : "Private"}
                  </span>
                </div>

                <Textarea
                  value={drafts[activeThread]}
                  onChange={(event) =>
                    setDrafts((currentDrafts) => ({
                      ...currentDrafts,
                      [activeThread]: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" || event.shiftKey) return;

                    event.preventDefault();
                    sendMessage();
                  }}
                  placeholder={
                    activeThread === THREADS.GROUP
                      ? "Write to the whole workspace..."
                      : selectedDmMember
                        ? `Message @${selectedDmMember.username}...`
                        : "Choose a teammate first"
                  }
                  className='min-h-28 border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-cyan-400/30'
                  disabled={activeThread === THREADS.DM && !selectedDmMember}
                />

                <div className='mt-3 flex flex-wrap items-center justify-between gap-3'>
                  <p className='text-xs text-white/40'>
                    Socket status is tracked live so you can confirm whether the
                    session is staying on polling or upgrading to websocket.
                  </p>
                  <Button
                    type='button'
                    onClick={sendMessage}
                    className='bg-cyan-500 px-5 text-black hover:bg-cyan-400'
                    disabled={activeThread === THREADS.DM && !selectedDmMember}
                  >
                    <Send className='h-4 w-4' />
                    Send message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
