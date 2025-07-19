// import React, { useEffect, useState } from "react";
// import MainNavbar from "../tools/MainNavbar";
// import axios from "axios";

// export default function ViewProfile() {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("/api/auth/me", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setUser(res.data.user);
//         setForm(res.data.user); // initial form values
//       } catch (err) {
//         console.error("Failed to load profile", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.put(
//         "/api/auth/edit-profile",
//         {
//           Bio: form.Bio,
//           location: form.location,
//           availability: form.availability,
//           skills: form.skills,
//           interests: form.interests,
//           links: {
//             github: form.links.github,
//             linkedin: form.links.linkedin,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setUser(form);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   if (!user) return <div className="text-white text-center mt-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <MainNavbar />
//       <div className="pt-28 px-6 max-w-6xl mx-auto">
//         {/* Top Section */}
//         <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-10">
//           <img
//             src={user.avatar}
//             alt="Avatar"
//             className="w-32 h-32 rounded-full border-2 border-white object-cover shadow-xl"
//           />
//           <div className="flex flex-col gap-2">
//             <h1 className="text-2xl font-semibold">{user.name}</h1>
//             <p className="text-gray-400">@{user.username}</p>
//             <p className="text-gray-300">{user.email}</p>
//             <button
//               onClick={() => setEditMode(!editMode)}
//               className="mt-2 px-4 py-2 bg-white text-black rounded-md shadow hover:bg-gray-200 transition"
//             >
//               {editMode ? "Cancel Edit" : "Edit Details"}
//             </button>
//           </div>
//         </div>

//         {/* Editable Details */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <Field
//             label="Bio"
//             name="Bio"
//             value={form.Bio}
//             onChange={handleChange}
//             editable={editMode}
//           />
//           <Field
//             label="Location"
//             name="location"
//             value={form.location}
//             onChange={handleChange}
//             editable={editMode}
//           />
//           <Field
//             label="Availability"
//             name="availability"
//             value={form.availability}
//             onChange={handleChange}
//             editable={editMode}
//           />
//           <Field
//             label="Skills (comma-separated)"
//             name="skills"
//             value={form.skills}
//             onChange={handleChange}
//             editable={editMode}
//           />
//           <Field
//             label="Interests (comma-separated)"
//             name="interests"
//             value={form.interests}
//             onChange={handleChange}
//             editable={editMode}
//           />
//           <Field
//             label="GitHub"
//             name="links.github"
//             value={form.links?.github || ""}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 links: { ...prev.links, github: e.target.value },
//               }))
//             }
//             editable={editMode}
//             isLink
//           />
//           <Field
//             label="LinkedIn"
//             name="links.linkedin"
//             value={form.links?.linkedin || ""}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 links: { ...prev.links, linkedin: e.target.value },
//               }))
//             }
//             editable={editMode}
//             isLink
//           />
//         </div>

//         {/* Submit Button */}
//         {editMode && (
//           <div className="mt-6 text-right">
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Field({ label, name, value, onChange, editable, isLink }) {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-1">{label}</h2>
//       {editable ? (
//         <input
//           type="text"
//           name={name}
//           value={value}
//           onChange={onChange}
//           className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       ) : isLink ? (
//         <a
//           href={value}
//           target="_blank"
//           rel="noreferrer"
//           className="text-blue-400 hover:underline break-all"
//         >
//           {value}
//         </a>
//       ) : (
//         <p className="text-gray-300 break-words">{value || "—"}</p>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import MainNavbar from "../tools/MainNavbar";

// const ViewProfilePage = () => {
//   // Temporary static user data
//   const [user, setUser] = useState({
//     name: "John Doe",
//     username: "johndoe",
//     email: "john@example.com",
//     avatar: "",
//     location: "San Francisco, USA",
//     skills: ["React", "Node.js", "MongoDB"],
//     interests: ["AI", "Open Source", "Design"],
//     availability: "Weekends",
//     Bio: "Passionate full-stack dev exploring the intersection of AI and UX.",
//     links: {
//       github: "https://github.com/johndoe",
//       linkedin: "https://linkedin.com/in/johndoe"
//     }
//   });

//   const [editing, setEditing] = useState(false);

//   return (
//     <>
//       <MainNavbar />
//       <div className="px-4 md:px-12 py-8 mt-16 max-w-5xl mx-auto">
//         <div className="flex flex-col md:flex-row items-start gap-8">
//           {/* Left: Avatar + Edit Button */}
//           <div className="flex flex-col items-center">
//             <img
//               src={user.avatar}
//               alt="Profile"
//               className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//             />
//             <button
//               onClick={() => setEditing(!editing)}
//               className="mt-4 px-4 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition"
//             >
//               {editing ? "Cancel Edit" : "Edit Details"}
//             </button>
//           </div>

//           {/* Right: Name, Email, Username */}
//           <div className="flex flex-col gap-2 text-white">
//             <h2 className="text-2xl font-semibold">{user.name}</h2>
//             <p className="text-sm text-gray-300">@{user.username}</p>
//             <p className="text-sm text-gray-300">{user.email}</p>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
//           {editing ? (
//             <>
//               <input
//                 className="bg-white/10 p-2 rounded-md"
//                 defaultValue={user.location}
//               />
//               <input
//                 className="bg-white/10 p-2 rounded-md"
//                 defaultValue={user.availability}
//               />
//               <input
//                 className="bg-white/10 p-2 rounded-md"
//                 defaultValue={user.skills.join(", ")}
//               />
//               <input
//                 className="bg-white/10 p-2 rounded-md"
//                 defaultValue={user.interests.join(", ")}
//               />
//               <textarea
//                 className="bg-white/10 p-2 rounded-md col-span-2"
//                 defaultValue={user.Bio}
//               />
//               <input
//                 className="bg-white/10 p-2 rounded-md"
//                 defaultValue={user.links.github}
//               />
//               <input
//                 className="bg-white/10 p-2 rounded-md"
//                 defaultValue={user.links.linkedin}
//               />
//             </>
//           ) : (
//             <>
//               <p><strong>Location:</strong> {user.location}</p>
//               <p><strong>Availability:</strong> {user.availability}</p>
//               <p><strong>Skills:</strong> {user.skills.join(", ")}</p>
//               <p><strong>Interests:</strong> {user.interests.join(", ")}</p>
//               <p className="col-span-2"><strong>Bio:</strong> {user.Bio}</p>
//               <a
//                 href={user.links.github}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-400 underline"
//               >
//                 GitHub
//               </a>
//               <a
//                 href={user.links.linkedin}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-400 underline"
//               >
//                 LinkedIn
//               </a>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewProfilePage;


import { useState } from "react";
import MainNavbar from "../tools/MainNavbar";

export default function ViewProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Dummy user data (to be replaced with backend data later)
  const [userData, setUserData] = useState({
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=devcollab",
    name: "Dhanush H N",
    username: "dhanushhn",
    email: "dhanush@example.com",
    bio: "Full-stack developer passionate about AI/ML and building impactful tools.",
    skills: ["React", "Node.js", "MongoDB"],
    interests: ["Hackathons", "AI Projects", "Collaboration"],
    availability: "Weekends",
    location: "Bangalore, India",
    links: {
      github: "https://github.com/dhanushhn",
      linkedin: "https://linkedin.com/in/dhanushhn",
    },
  });

  const [originalUserData, setOriginalUserData] = useState(userData);


  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 pt-20 pb-12 overflow-y-auto">
      <MainNavbar />

      <div className="max-w-5xl  mx-auto mt-6 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-y-visible relative">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">
          {/* Left - Avatar + Edit */}
          <div className="flex flex-col items-center">
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 border-white/20 shadow-lg object-cover"
            />
           <button
  className="mt-4 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
  onClick={() => {
    if (isEditing) {
      setUserData(originalUserData); // revert to original if cancelling
    }
    setIsEditing(!isEditing);
  }}
>
  {isEditing ? "Cancel" : "Edit Details"}
</button>

{isEditing && (
  <button
    className="mt-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-lg transition"
    onClick={() => {
      setOriginalUserData(userData); // commit changes
      setIsEditing(false);
    }}
  >
    Save Changes
  </button>
)}

          </div>

          {/* Right - Name, Username, Email */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
            <p className="text-white/80">@{userData.username}</p>
            <p className="text-white/60 mt-1">{userData.email}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-white/10" />

        {/* Other Details */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bio, Skills, Interests */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-medium text-white/80">Bio:</h3>
              {isEditing ? (
                <textarea
                  value={userData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.bio}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-white/80">Skills:</h3>
              {isEditing ? (
                <input
                  value={userData.skills.join(", ")}
                  onChange={(e) =>
                    handleChange("skills", e.target.value.split(",").map((s) => s.trim()))
                  }
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.skills.join(", ")}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-white/80">Interests:</h3>
              {isEditing ? (
                <input
                  value={userData.interests.join(", ")}
                  onChange={(e) =>
                    handleChange("interests", e.target.value.split(",").map((s) => s.trim()))
                  }
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.interests.join(", ")}</p>
              )}
            </div>
          </div>

          {/* Availability, Location, Links */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-medium text-white/80">Availability:</h3>
              {isEditing ? (
                <input
                  value={userData.availability}
                  onChange={(e) => handleChange("availability", e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.availability}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-white/80">Location:</h3>
              {isEditing ? (
                <input
                  value={userData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.location}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-white/80">Links:</h3>
              {isEditing ? (
                <>
                  <input
                    value={userData.links.github}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        links: { ...userData.links, github: e.target.value },
                      })
                    }
                    className="w-full mt-1 mb-2 p-2 rounded bg-white/10 border border-white/20 text-white"
                    placeholder="GitHub"
                  />
                  <input
                    value={userData.links.linkedin}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        links: { ...userData.links, linkedin: e.target.value },
                      })
                    }
                    className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                    placeholder="LinkedIn"
                  />
                </>
              ) : (
                <div className="flex flex-col gap-1 text-white/60">
                  <a href={userData.links.github} target="_blank" rel="noreferrer" className="hover:underline">
                    GitHub
                  </a>
                  <a href={userData.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
