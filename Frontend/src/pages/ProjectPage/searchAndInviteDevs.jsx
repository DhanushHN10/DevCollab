import { useEffect, useState } from "react";
import API from "../../api/axios";
import Select from "react-select";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Github, Linkedin, User as UserIcon } from "lucide-react";
import { UserCircle } from "lucide-react";




const skillsOptions = [
  { label: "React", value: "React" },
  { label: "Next.js", value: "Next.js" },
  { label: "Vue.js", value: "Vue.js" },
  { label: "Angular", value: "Angular" },
  { label: "Node.js", value: "Node.js" },
  { label: "Express", value: "Express" },
  { label: "Django", value: "Django" },
  { label: "Flask", value: "Flask" },
  { label: "Spring Boot", value: "Spring Boot" },
  { label: "Laravel", value: "Laravel" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "MySQL", value: "MySQL" },
  { label: "GraphQL", value: "GraphQL" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C++", value: "C++" },
  { label: "Go", value: "Go" },
  { label: "Rust", value: "Rust" },
  { label: "Docker", value: "Docker" },
  { label: "Kubernetes", value: "Kubernetes" },
  { label: "AWS", value: "AWS" },
  { label: "Firebase", value: "Firebase" },
  { label: "TensorFlow", value: "TensorFlow" },
  { label: "PyTorch", value: "PyTorch" },
  { label: "Pandas", value: "Pandas" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "Figma", value: "Figma" },
  { label: "UI/UX Design", value: "UI/UX Design" },
];
const interestsOptions = [
  { label: "Artificial Intelligence", value: "Artificial Intelligence" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Deep Learning", value: "Deep Learning" },
  { label: "Web Development", value: "Web Development" },
  { label: "App Development", value: "App Development" },
  { label: "Open Source", value: "Open Source" },
  { label: "DevOps", value: "DevOps" },
  { label: "Cloud Computing", value: "Cloud Computing" },
  { label: "Blockchain", value: "Blockchain" },
  { label: "Cybersecurity", value: "Cybersecurity" },
  { label: "Data Science", value: "Data Science" },
  { label: "Competitive Programming", value: "Competitive Programming" },
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "Product Design", value: "Product Design" },
  { label: "Game Development", value: "Game Development" },
  { label: "Augmented Reality", value: "Augmented Reality" },
  { label: "Virtual Reality", value: "Virtual Reality" },
  { label: "Internet of Things (IoT)", value: "Internet of Things (IoT)" },
  { label: "FinTech", value: "FinTech" },
  { label: "EdTech", value: "EdTech" },
  { label: "Startups", value: "Startups" },
  { label: "SaaS Products", value: "SaaS Products" },
  { label: "Design Systems", value: "Design Systems" },
  { label: "Accessibility", value: "Accessibility" },
  { label: "Sustainability Tech", value: "Sustainability Tech" },
  { label: "Tech for Social Good", value: "Tech for Social Good" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "System Design", value: "System Design" },
  { label: "Agile Methodology", value: "Agile Methodology" },
  { label: "Hackathons", value: "Hackathons" },
];


const availabilityOptions = [
  { label: "Any", value: "Any" },  // For no filter
  { label: "Available", value: "Available" },
  { label: "Busy", value: "Busy" },
  { label: "Short-Term", value: "Short-Term" },
  { label: "Looking for Projects", value: "Looking for Projects" },
  { label: "Not specified", value: "Not specified" },
];


export default function SearchAndInviteDevs({ projectId, onInviteSuccess }) {
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [availability, setAvailability] = useState({ label: "Any", value: "Any" });
  const [RecommendedUsers, setRecommendedUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);






  const hasActiveFilter = query.trim("")!=="" || skills.length > 0 || interests.length > 0 ||   (availability && availability.value !== "Any");;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const params = new URLSearchParams();

      try {
        let endpoint = `/api/recommendations/users/${projectId}`; 
        
        if (hasActiveFilter) {


          endpoint = `/api/projects/${projectId}/search-devs`;
          if (query) params.append("q", query);
          if (skills.length) params.append("skills", skills.map(s => s.value).join(","));
          if (interests.length) params.append("interests", interests.map(i => i.value).join(","));
          if (availability && availability.value !== "Any")
  params.append("availability", availability.value);
        
          
        
        
        
        const { data } = await API.get(`${endpoint}?${params.toString()}`);
         const searched = data.users || [];
        setUsers(searched);
       setDisplayUsers(searched);      
      }
        else{
          const { data } = await API.get(`/api/recommendations/users/${projectId}`);
          const recommended = data.recommendedUsers || [];
      setRecommendedUsers(recommended);
  setDisplayUsers(recommended);
        }




      } catch (err) {
        console.error("Error fetching users:", err);
        // setUsers([]); // Clear users on error
        console.log(users);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchUsers, 500);
    return () => clearTimeout(debounce);
  }, [projectId, query, skills, interests, hasActiveFilter, availability]);

  const handleInvite = async (userIdToInvite) => {
    try {
      const {data} = await API.post(`/api/projects/${projectId}/invite/${userIdToInvite}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userIdToInvite));

          onInviteSuccess?.(data.userIdToInvite);

    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userIdToInvite));
    } catch (err) {
      console.error("Error inviting user:", err);
      alert(err.response?.data?.message || "Could not send invite.");
    }
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
      {/* <h2 className="text-2xl font-semibold mb-4">Search & Invite Developers</h2> */}
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search by name or username"
          className="bg-[#1a1a1a] text-white border-gray-700 flex-grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select options={skillsOptions} value={skills} isMulti onChange={setSkills} placeholder="Skills" className="text-black min-w-[200px] flex-grow" />
        <Select options={interestsOptions} value={interests} isMulti onChange={setInterests} placeholder="Interests" className="text-black min-w-[200px] flex-grow" />
        <Select
  options={availabilityOptions}
  value={availability}
  onChange={setAvailability}
  placeholder="Select availability"
  className="text-black min-w-[220px] flex-grow"
/>

      </div>

      <h3 className="text-lg font-semibold text-white/80 pt-4">
        {hasActiveFilter ? "Search Results" : "AI Recommended Developers"}
      </h3>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : displayUsers.length === 0 ? (
        <p className="text-gray-400">{hasActiveFilter ? "No users found with these criteria." : "No recommendations available."}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayUsers.map((user) => (
            <Card key={user._id} className="bg-[#1a1a1a] border border-gray-800 text-white flex flex-col justify-between">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  {user.avatar ? (
  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
) : (
  <UserCircle className="w-12 h-12 text-gray-400" />
)}
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-400">@{user.username}</p>
                     <p className="text-sm text-gray-400">@{user.email}</p>
                  </div>
                  
                </div>
                {user.similarity !== undefined && (
  <p className="text-sm text-green-400 mt-2">
    {user.similarity}% match
  </p>
)}


                <div className="flex items-center gap-3 mt-2">
                  {user.links?.github && <a href={user.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Github size={20} /></a>}
                  {user.links?.linkedin && <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>}
                  {user.links?.portfolio && <a href={user.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><UserIcon size={20} /></a>}
                </div>
              </CardContent>
              <div className="p-4 pt-0">
                <Button onClick={() => handleInvite(user._id)} className="w-full bg-blue-600 hover:bg-blue-700">
                  Invite
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


