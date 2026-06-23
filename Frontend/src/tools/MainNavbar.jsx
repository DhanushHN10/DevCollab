import { Bell, CheckCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DevCollabLogo from "../assets/DevCollab_Logo.png";
import useNotificationSocket from "../context/useNotificationSocket.js";
import logout from "../utils/logout.js";
export default function MainNavbar() {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotificationSocket();
  const visibleNotifications = useMemo(
    () => notifications.slice(0, 6),
    [notifications],
  );

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Left: Logo */}
        <img src={DevCollabLogo} className='h-13 w-13' />
        <h1 className='text-xl font-semibold font-mono text-white'>
          <Link to='/' className='hover:text-blue-400 transition'>
            <span className='text-white/70'>Dev</span>
            <span className='text-blue-500/70'>Collab</span>
          </Link>
        </h1>

        {/* Center Links */}
        <div className='space-x-6 hidden md:flex'>
          <Link to='/dashboard' className='text-white hover:text-blue-400'>
            Dashboard
          </Link>
          <Link
            to='/project/shared-view?tabs=projects'
            className='text-white hover:text-blue-400'
          >
            My Projects
          </Link>
          <Link
            to='/project/shared-view?tabs=collabs'
            className='text-white hover:text-blue-400'
          >
            My Collaborations
          </Link>
          <Link
            to='/project/shared-view?tabs=invites'
            className='text-white hover:text-blue-400'
          >
            Invites Received
          </Link>
          <Link
            to='/project/shared-view?tabs=sent'
            className='text-white hover:text-blue-400'
          >
            Sent Requestes
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          <div className='relative'>
            <button
              type='button'
              className='relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15'
              onClick={() => setNotificationOpen((open) => !open)}
            >
              <Bell className='h-5 w-5' />
              {unreadCount > 0 && (
                <span className='absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white'>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            <div
              className={`absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#141414] text-white shadow-2xl transition-all duration-200 ${
                notificationOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <div className='flex items-center justify-between border-b border-white/10 px-4 py-3'>
                <div>
                  <p className='text-sm font-semibold'>Notifications</p>
                  <p className='text-xs text-white/50'>
                    Live updates from the socket
                  </p>
                </div>
                <button
                  type='button'
                  onClick={markAllNotificationsAsRead}
                  className='inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white transition hover:bg-white/20'
                >
                  <CheckCheck className='h-3.5 w-3.5' />
                  Mark all read
                </button>
              </div>

              <div className='max-h-96 overflow-y-auto'>
                {visibleNotifications.length === 0 ? (
                  <div className='px-4 py-8 text-center text-sm text-white/50'>
                    No notifications yet.
                  </div>
                ) : (
                  visibleNotifications.map((notification) => (
                    <button
                      key={notification._id}
                      type='button'
                      onClick={() => markNotificationAsRead(notification._id)}
                      className={`block w-full border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5 ${
                        notification.read ? "bg-transparent" : "bg-white/5"
                      }`}
                    >
                      <div className='flex items-start gap-3'>
                        <div
                          className={`mt-1 h-2.5 w-2.5 rounded-full ${notification.read ? "bg-white/20" : "bg-cyan-400"}`}
                        />
                        <div className='min-w-0 flex-1'>
                          <p className='text-sm font-semibold text-white'>
                            {notification.title}
                          </p>
                          <p className='mt-1 text-sm text-white/70'>
                            {notification.message}
                          </p>
                          <p className='mt-2 text-xs text-white/40'>
                            {notification.createdAt
                              ? new Date(
                                  notification.createdAt,
                                ).toLocaleString()
                              : "Just now"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Avatar + Dropdown */}
          <div
            className='relative'
            onMouseLeave={() => {
              setTimeout(() => {
                if (avatarHovered) setDropdownOpen(false);
              }, 100);
            }}
          >
            <img
              src='#'
              alt='Profile'
              className='w-10 h-10 rounded-full cursor-pointer border border-white/30 hover:scale-105 transition'
              onMouseEnter={() => {
                setDropdownOpen(true);
                setAvatarHovered(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!avatarHovered) setDropdownOpen(false);
                }, 2000);
              }}
            />

            <div
              className={`absolute right-0.5 mt-0.6 w-48 bg-[#1a1a1a] text-white border border-white/10 rounded-xl shadow-xl z-50 transition-all group-text-center duration-200 ${
                dropdownOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              onMouseEnter={() => setAvatarHovered(true)}
              onMouseLeave={() => {
                setAvatarHovered(false);
                setDropdownOpen(false);
              }}
            >
              <Link
                to='/view-profile'
                className='block px-4 py-2 hover:bg-white/10 hover:text-blue-400 hover:pl-6 transition-all duration-200 rounded-t-xl'
              >
                👤 View Profile
              </Link>
              <button
                onClick={() => logout(navigate)}
                className='block w-full text-left px-4 py-2 hover:bg-white/10 hover:text-red-400 hover:pl-6 transition-all duration-200 rounded-b-xl'
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
