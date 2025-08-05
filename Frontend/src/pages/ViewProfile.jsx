import { useState, useEffect } from "react";
import MainNavbar from "../tools/MainNavbar";
import API from "../api/axios";

export default function ViewProfilePage() {
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/auth/me");
        setUserData(res.data.user);
        setOriginalUserData(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleNestedChange = (group, key, value) => {
    setUserData({
      ...userData,
      [group]: {
        ...userData[group],
        [key]: value,
      },
    });
  };

  const handleSave = async () => {
    try {
      await API.put(
        "/api/auth/edit-profile",
        {
          Bio: userData.Bio,
          location: userData.location,
          availability: userData.availability,
          skills: userData.skills,
          interests: userData.interests,
          links: {
            github: userData.links?.github || "",
            linkedin: userData.links?.linkedin || "",
          },
        },
        
      );
      setOriginalUserData(userData);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile changes:", err);
    }
  };

  const handleCancel = () => {
    setUserData(originalUserData);
    setIsEditing(false);
  };

  if (!userData) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 pt-20 pb-12 overflow-y-auto
     overflow-x-hidden">
      <MainNavbar />

      <div className="max-w-5xl mx-auto mt-6 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">
          {/* Avatar and buttons */}
          <div className="flex flex-col items-center">
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 border-white/20 shadow-lg object-cover"
            />

            <button
              className="mt-4 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
            >
              {isEditing ? "Cancel" : "Edit Details"}
            </button>

            {isEditing && (
              <button
                className="mt-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-lg transition"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Name & Email */}
          <div className="text-center md:text-left my-0.5">
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
            <p className="text-white/80 pt-2">Username: @{userData.username}</p>
            <p className="text-white/60 mt-1 pt-2">Email: {userData.email}</p>
          </div>
        </div>

        <hr className="my-6 border-white/10" />

        {/* Profile Fields */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left */}
          <div className="flex-1 space-y-4">
            {/* Bio */}
            <div>
              <h3 className="font-medium text-white/80 ">Bio:</h3>
              {isEditing ? (
                <textarea
                  value={userData.Bio}
                  onChange={(e) => handleChange("Bio", e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 "
                />
              ) : (
                <p className="text-white/60 text-white whitespace-pre-wrap">{userData.Bio}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-medium text-white/80">Skills:</h3>
              {isEditing ? (
                <input
                  value={userData.skills?.join(", ")}
                  onChange={(e) =>
                    handleChange("skills", e.target.value.split(",").map((s) => s.trim()))
                  }
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.skills?.join(", ")}</p>
              )}
            </div>

            {/* Interests */}
            <div>
              <h3 className="font-medium text-white/80">Interests:</h3>
              {isEditing ? (
                <input
                  value={userData.interests?.join(", ")}
                  onChange={(e) =>
                    handleChange("interests", e.target.value.split(",").map((s) => s.trim()))
                  }
                  className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              ) : (
                <p className="text-white/60">{userData.interests?.join(", ")}</p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 space-y-4">
            {/* Availability */}
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

            {/* Location */}
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

            {/* Links */}
            <div>
              <h3 className="font-medium text-white/80">Links:</h3>
              {isEditing ? (
                <>
                  <input
                    value={userData.links?.github || ""}
                    onChange={(e) => handleNestedChange("links", "github", e.target.value)}
                    className="w-full mt-1 mb-2 p-2 rounded bg-white/10 border border-white/20 text-white"
                    placeholder="GitHub"
                  />
                  <input
                    value={userData.links?.linkedin || ""}
                    onChange={(e) => handleNestedChange("links", "linkedin", e.target.value)}
                    className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                    placeholder="LinkedIn"
                  />
                </>
              ) : (
                <div className="flex flex-col gap-1 text-white/60">
                  {userData.links?.github && (
                    <a href={userData.links.github} target="_blank" rel="noreferrer" className="hover:underline">
                      GitHub
                    </a>
                  )}
                  {userData.links?.linkedin && (
                    <a href={userData.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
