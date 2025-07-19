// // // // import { Link } from "react-router-dom";
// // // // import { useState } from "react";



// // // // export default function MainNavbar() {

// // // //     const [open,setOpen] =useState(false);

// // // //     return (
// // // //     <nav className="w-full bg-black/60 backdrop-blur-lg text-white/60 px-6 py-3 flex justify-between items-center shadow-md fixed top-0 z-50">
// // // //         {/* Logo */}

// // // //         <div className="flex items-center gap-2">
// // // //             <img src="/logo.svg" alt="logo"  className="h-8 w-8"/>
// // // //             <h1 className="text-xl font-semibold font-mono"><span className="text-white/60">Dev</span><span className="text-blue-600/70">Collab</span></h1>
// // // //         </div>

// // // //         {/* links */}

// // // //         <div className="hidden md:flex gap-6 text-sm font-medium">
// // // //             <Link to="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
// // // //              <Link to="/my-projects" className="hover:text-indigo-300">My Projects</Link>
// // // //         <Link to="/my-collaborations" className="hover:text-indigo-300">My Collaborations</Link>
// // // //         </div>

// // // //         <div className="relative">
// // // //             <img src="" alt="Profile"  className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
// // // //             onClick={() => setOpen(!open)}
// // // //             />
// // // //             {open && (
// // // //                 <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
// // // //             <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</Link>
// // // //             <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
// // // //           </div>

// // // //             )}
// // // //         </div>
// // // //     </nav>

// // // //     );
// // // // }

// // // // import React from "react";
// // // // import { Link } from "react-router-dom";

// // // // export default function MainNavbar() {
// // // //   return (
// // // //     <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-xl">
// // // //       <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
// // // //         {/* Left: Logo */}
       
// // // //          <h1 className="text-xl font-semibold font-mono"><Link to="/"><span className="text-white/60">Dev</span><span className="text-blue-600/70">Collab</span></Link></h1>

// // // //         {/* Center: Navigation */}
// // // //         <div className="space-x-4 hidden md:flex">
// // // //           <Link to="/dashboard" className="text-white hover:text-indigo-400 transition">
// // // //             Dashboard
// // // //           </Link>
// // // //           <Link to="/my-projects" className="text-white hover:text-indigo-400 transition">
// // // //             My Projects
// // // //           </Link>
// // // //           <Link to="/collaborations" className="text-white hover:text-indigo-400 transition">
// // // //             My Collaborations
// // // //           </Link>
// // // //         </div>

// // // //         {/* Right: Profile Avatar */}
// // // //         <div className="relative group">
// // // //           <img
// // // //             src="https://i.pravatar.cc/40?img=5"
// // // //             alt="Profile"
// // // //             className="w-10 h-10 rounded-full cursor-pointer border border-white/30"
// // // //           />
// // // //           <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
// // // //             <Link
// // // //               to="/profile"
// // // //               className="block px-4 py-2 text-white hover:bg-white/10 transition"
// // // //             >
// // // //               View Profile
// // // //             </Link>
// // // //             <button
// // // //               className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
// // // //             >
// // // //               Logout
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // //}

// // // import { Link } from "react-router-dom";
// // // import { useState } from "react";

// // // export default function MainNavbar() {
// // //   const [open, setOpen] = useState(false);

// // //   return (
// // //     <nav className="w-full bg-[#0e0e0e]/80 backdrop-blur-md text-white px-6 py-3 flex justify-between items-center shadow-xl fixed top-0 z-50 border-b border-white/10">
// // //       {/* Logo */}
// // //       <div className="flex items-center gap-2">
// // //         <img src="/logo.svg" alt="logo" className="h-8 w-8" />
// // //         <h1 className="text-xl font-semibold font-mono">
// // //           <span className="text-white">Dev</span>
// // //           <span className="text-indigo-400">Collab</span>
// // //         </h1>
// // //       </div>

// // //       {/* Links */}
// // //       <div className="hidden md:flex gap-6 text-sm font-medium text-white/80">
// // //         <Link to="/dashboard" className="hover:text-indigo-300 transition">
// // //           Dashboard
// // //         </Link>
// // //         <Link to="/my-projects" className="hover:text-indigo-300 transition">
// // //           My Projects
// // //         </Link>
// // //         <Link
// // //           to="/my-collaborations"
// // //           className="hover:text-indigo-300 transition"
// // //         >
// // //           My Collaborations
// // //         </Link>
// // //       </div>

// // //       {/* Avatar & Dropdown */}
// // //       <div className="relative">
// // //         <img
// // //           src="/avatar.png"
// // //           alt="Profile"
// // //           className="h-10 w-10 rounded-full cursor-pointer border-2 border-white/20 hover:border-white transition"
// // //           onClick={() => setOpen(!open)}
// // //         />
// // //         {open && (
// // //           <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden animate-fadeIn">
// // //             <Link
// // //               to="/profile"
// // //               className="block px-4 py-2 hover:bg-gray-100 transition"
// // //             >
// // //               View Profile
// // //             </Link>
// // //             <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition">
// // //               Logout
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // }


// // import React from "react";
// // import { Link } from "react-router-dom";

// // export default function MainNavbar() {
// //   return (
// //     <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
// //       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center min-w-screen">
// //         {/* Left: Logo */}
// //         <h1 className="text-xl font-semibold font-mono text-white">
// //           <Link to="/" className="hover:text-blue-400 transition">
// //             <span className="text-white/70">Dev</span>
// //             <span className="text-blue-500/70">Collab</span>
// //           </Link>
// //         </h1>

// //         {/* Center: Nav Links (hidden on small screens) */}
// //         <div className="space-x-6 hidden md:flex">
// //           <Link to="/dashboard" className="text-white hover:text-blue-400 transition">
// //             Dashboard
// //           </Link>
// //           <Link to="/my-projects" className="text-white hover:text-blue-400 transition">
// //             My Projects
// //           </Link>
// //           <Link to="/collaborations" className="text-white hover:text-blue-400 transition">
// //             My Collaborations
// //           </Link>
// //         </div>

// //         {/* Right: Profile Avatar with dropdown */}
// //         <div className="relative inline-block">
// //   {/* Wrapper for both image and dropdown */}
// //   <div className="group">
// //     {/* Avatar */}
// //     <img
// //       src="https://i.pravatar.cc/40?img=5"
// //       alt="Profile"
// //       className="w-10 h-10 rounded-full cursor-pointer border border-white/30 hover:scale-105"
// //     />

// //     {/* Dropdown (no transparency) */}
// //     <div
// //       className=" block hover:visible absolute right-0 mt-2 w-48 bg-[#1a1a1a] text-white border border-white/10 rounded-xl shadow-xl 
// //                  opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
// //                  pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-out"
// //     >

// //       <Link
// //         to="/view-profile"
// //         className=" px-4 py-2 text-white  hover:bg-white/10 hover:text-blue-400 hover:pl-6 rounded-t-xl"
// //       >
// //         👤 View Profile
// //       </Link>
// //       <button
// //         className=" w-full text-left px-4 py-2 text-white  hover:bg-white/10 hover:text-red-400 hover:pl-6 rounded-b-xl"
// //       >
// //         🚪 Logout
// //       </button>
// //     </div>
// //   </div>
// // </div>


// //       </div>
// //     </nav>
// //   );
// // }


// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function MainNavbar() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center min-w-screen">
//         {/* Left: Logo */}
//         <h1 className="text-xl font-semibold font-mono text-white">
//           <Link to="/" className="hover:text-blue-400 transition">
//             <span className="text-white/70">Dev</span>
//             <span className="text-blue-500/70">Collab</span>
//           </Link>
//         </h1>

//         {/* Center: Nav Links */}
//         <div className="space-x-6 hidden md:flex">
//           <Link to="/dashboard" className="text-white hover:text-blue-400 transition">
//             Dashboard
//           </Link>
//           <Link to="/my-projects" className="text-white hover:text-blue-400 transition">
//             My Projects
//           </Link>
//           <Link to="/collaborations" className="text-white hover:text-blue-400 transition">
//             My Collaborations
//           </Link>
//         </div>

//         {/* Right: Avatar & Dropdown */}
//         <div
//           className="relative inline-block"
//           onMouseEnter={() => setDropdownOpen(true)}
//           onMouseLeave={() => setDropdownOpen(false)}
//         >
//           <img
//             src="https://i.pravatar.cc/40?img=5"
//             alt="Profile"
//             className="w-10 h-10 rounded-full cursor-pointer border border-white/30 hover:scale-105 transition"
//           />

//           {/* Dropdown */}
//           {dropdownOpen && (
//             <div
//             onMouseEnter={()=> setDropdownOpen(true) }
//               className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] text-white border border-white/10 rounded-xl shadow-xl 
//                         z-50 transition-all duration-300 ease-out"
//             >
//               <Link
//                 to="/view-profile"
//                 className="block px-4 py-2 hover:bg-white/10 hover:text-blue-400 hover:pl-6 transition-all duration-200 rounded-t-xl"
//               >
//                 👤 View Profile
//               </Link>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-white/10 hover:text-red-400 hover:pl-6 transition-all duration-200 rounded-b-xl"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



import { useState } from "react";
import { Link } from "react-router-dom";

export default function MainNavbar() {
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
          <Link to="/my-projects" className="text-white hover:text-blue-400">My Projects</Link>
          <Link to="/collaborations" className="text-white hover:text-blue-400">My Collaborations</Link>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative"  onMouseLeave={() => {
              setTimeout(() => {
                if (avatarHovered) setDropdownOpen(false);
              },100); // small delay to allow dropdown hover
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
              },2000); // small delay to allow dropdown hover
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
