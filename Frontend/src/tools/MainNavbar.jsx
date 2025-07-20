import { useState } from "react";
import { Link } from "react-router-dom";
import logout from "../utils/logout.js";
import { useNavigate } from "react-router-dom";
export default function MainNavbar() {
  const navigate = useNavigate();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <h1 className="text-xl font-semibold font-mono text-white">
          <Link to="/" className="hover:text-blue-400 transition">
            <span className="text-white/70">Dev</span>
            <span className="text-blue-500/70">Collab</span>
          </Link>
        </h1>

        {/* Center Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
          <Link to="/project/shared-view?tabs=projects" className="text-white hover:text-blue-400">My Projects</Link>
          <Link to="/project/shared-view?tabs=collabs" className="text-white hover:text-blue-400">My Collaborations</Link>
          <Link to="/project/shared-view?tabs=invites" className="text-white hover:text-blue-400">Invites Received</Link>
          <Link to="/project/shared-view?tabs=sent" className="text-white hover:text-blue-400">Sent Requestes</Link>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative"  onMouseLeave={() => {
              setTimeout(() => {
                if (avatarHovered) setDropdownOpen(false);
              },100); 
            }} >
          <img
            src="#"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border border-white/30 hover:scale-105 transition"
            onMouseEnter={() => {
              setDropdownOpen(true);
              setAvatarHovered(true);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                if (!avatarHovered) setDropdownOpen(false);
              },2000); 
            }}
          />

          <div
            className={`absolute right-0.5 mt-0.6 w-48 bg-[#1a1a1a] text-white border border-white/10 rounded-xl shadow-xl z-50 transition-all group-text-center duration-200 ${
              dropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => {
              setAvatarHovered(false);
              setDropdownOpen(false);
            }}
          >
            <Link
              to="/view-profile"
              className="block px-4 py-2 hover:bg-white/10 hover:text-blue-400 hover:pl-6 transition-all duration-200 rounded-t-xl"
            >
              👤 View Profile
            </Link>
            <button
             onClick={() =>logout(navigate)}
              className="block w-full text-left px-4 py-2 hover:bg-white/10 hover:text-red-400 hover:pl-6 transition-all duration-200 rounded-b-xl"
           >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


