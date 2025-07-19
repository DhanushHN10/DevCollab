import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Particles from "../blocks/Backgrounds/Particles/Particles";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Navbar2 from "../tools/Nav_logsign";
import { Textarea } from "../components/ui/textarea";
import Select from "react-select";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Skills & Interests Options
const skillsOptions = [
  { label: "JavaScript", value: "JavaScript" },
  { label: "React", value: "React" },
  { label: "Node.js", value: "Node.js" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "Python", value: "Python" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "Figma", value: "Figma" },
  { label: "C++", value: "C++" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Next.js", value: "Next.js" },
  { label: "Docker", value: "Docker" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "Firebase", value: "Firebase" },
  { label: "AI/ML", value: "AI/ML" },
];

const interestsOptions = [
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "DevOps", value: "DevOps" },
  { label: "AI", value: "AI" },
  { label: "ML", value: "ML" },
  { label: "App Dev", value: "App Dev" },
  { label: "Web3", value: "Web3" },
  { label: "Cloud", value: "Cloud" },
  { label: "Open Source", value: "Open Source" },
];

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    links: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
    skills: [],
    interests: [],
    availability: "",
    Bio: "",
    location: "",
  });

  useEffect(()=>{
    const checkProfileStatus= async() =>{

      const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");


       if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      const path = location.pathname;
      navigate(path, { replace: true });
    }

      const token= localStorage.getItem("token");
      if(!token){
        navigate('/');
        return;
      }


      try {
        const decoded = jwtDecode(token);
      const userId = decoded.id; // assuming your backend encodes { id: user._id }
      console.log("User ID from token:", userId);
      } catch (error) {
         console.error("Failed to check profile status", error);
        navigate("/");
        
      }
    };
       checkProfileStatus();

  },[navigate,location]);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (["linkedin", "github", "portfolio"].includes(name)) {
    setFormData((prev) => ({
      ...prev,
      links: {
        ...prev.links,
        [name]: value,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async () => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        navigate("/login");
        return;
      }

      const payload = {
        ...formData,
        skills: formData.skills.map((s) => s.value),
        interests: formData.interests.map((i) => i.value),
      };

      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile completed successfully!");
        navigate("/dashboard");
      } else {
        alert(data.Error || data.err || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Profile completion failed.");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-auto bg-black " >
      <Particles
        className="absolute inset-0 overflow-y-visible min"
        particleCount={900}
        particleSpread={20}
        speed={0.14}
        moveParticlesOnHover
        particleHoverFactor={1.2}
        cameraDistance={50}
        particleBaseSize={200}
      />

      {/* <div className="hidden sm:block absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <Navbar2 />
      </div> */}

      <div className="flex items-center justify-center min-h-full px-4 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-5">
       
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/40 shadow-4xl rounded-2xl p-8 text-white z-10 space-y-6">
         <h1 className="text-3xl font-bold text-center mb-6"><span className="text-white/70">Dev</span><span className="text-blue-500/70">Collab</span></h1>
         
          <h3 className="text-3xl font-bold text-center mb-2">
            <span className="text-white/70">Complete Your</span>{" "}
            <span className="text-blue-500/70">Profile</span>
          </h3>

          <div className="space-y-4">
            
            <Input
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.links.linkedin}
              onChange={handleChange}
              className="text-white"
            />
            <Input
              name="github"
              placeholder="GitHub URL"
              value={formData.links.github}
              onChange={handleChange}
              className="text-white"
            />
            <Input
              name="portfolio"
              placeholder="Portfolio URL"
              value={formData.links.portfolio}
              onChange={handleChange}
              className="text-white"
            />

            {/* Multi-select Skills */}
            <div className="text-black">
              <Select
                isMulti
                name="skills"
                options={skillsOptions}
                placeholder="Select Skills"
                value={formData.skills}
                onChange={(selected) =>
                  setFormData({ ...formData, skills: selected })
                }
              />
            </div>

            {/* Multi-select Interests */}
            <div className="text-black">
              <Select
                isMulti
                name="interests"
                options={interestsOptions}
                placeholder="Select Interests"
                value={formData.interests}
                onChange={(selected) =>
                  setFormData({ ...formData, interests: selected })
                }
              />
            </div>

            {/* Availability Dropdown */}
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-black/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Availability</option>
              <option value="Available">Available</option>
              <option value="Not available">Not available</option>
              <option value="Short-Term">Short-Term</option>
              <option value="Long-Term">Long-Term</option>
            </select>

            {/* Location & Bio */}
            <Input
              name="location"
              placeholder="Your Location (e.g., Bengaluru, Remote)"
              value={formData.location}
              onChange={handleChange}
              className="text-white"
            />

            <Textarea
              name="Bio"
              placeholder="Write a short bio..."
              value={formData.Bio}
              onChange={handleChange}
              className="text-white"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-white/20 hover:bg-white/70 hover:text-black border border-white text-white transition-transform duration-200 hover:scale-105"
          >
            Complete Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

