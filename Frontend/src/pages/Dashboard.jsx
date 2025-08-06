import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import API from "../api/axios";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import MainNavbar from "../tools/MainNavbar";
import getUserIdFromToken from "../utils/getUserIdFromToken";

const techStackOptions = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "nodejs", label: "Node.js" },
  { value: "express", label: "Express.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "springboot", label: "Spring Boot" },
  { value: "laravel", label: "Laravel" },
  { value: "ruby_on_rails", label: "Ruby on Rails" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "chakraui", label: "Chakra UI" },
  { value: "redux", label: "Redux" },
  { value: "graphql", label: "GraphQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "firebase", label: "Firebase" },
  { value: "supabase", label: "Supabase" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "GCP" },
  { value: "azure", label: "Azure" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "solidity", label: "Solidity" },
  { value: "pytorch", label: "PyTorch" },
  { value: "tensorflow", label: "TensorFlow" },
];

const tagOptions = [
  { value: "webdev", label: "Web Development" },
  { value: "appdev", label: "App Development" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "machinelearning", label: "Machine Learning" },
  { value: "deeplearning", label: "Deep Learning" },
  { value: "ai", label: "AI" },
  { value: "data_science", label: "Data Science" },
  { value: "nlp", label: "NLP" },
  { value: "cv", label: "Computer Vision" },
  { value: "game_dev", label: "Game Development" },
  { value: "web3", label: "Web3" },
  { value: "blockchain", label: "Blockchain" },
  { value: "open_source", label: "Open Source" },
  { value: "devops", label: "DevOps" },
  { value: "cloud", label: "Cloud" },
  { value: "education", label: "EdTech" },
  { value: "healthcare", label: "HealthTech" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "social", label: "Social Media" },
  { value: "design", label: "UI/UX Design" },
  { value: "automation", label: "Automation" },
  { value: "iot", label: "IoT" },
  { value: "robotics", label: "Robotics" },
  { value: "sustainability", label: "Sustainability" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "productivity", label: "Productivity" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(true);
  const [cachedRecommendations, setCachedRecommendations] = useState([]);
  const [hasFetchedRecommendationsOnce, setHasFetchedRecommendationsOnce] =
    useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);

      navigate(location.pathname, { replace: true });
    }

    setIsTokenProcessed(true);
  }, [location, navigate]);

  const userId = useMemo(() => {
    if (!isTokenProcessed) return null;
    return getUserIdFromToken();
  }, [isTokenProcessed]);

  useEffect(() => {
    if (!isTokenProcessed) return;

    const debounce = setTimeout(() => {
      const tagsParam = selectedTags.map((item) => item.value).join(",");
      const techStackParam = selectedTechStack
        .map((item) => item.value)
        .join(",");

      if (!query && !tagsParam && !techStackParam) {
        setProjects([]);
        return;
      }

      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (tagsParam) params.append("tags", tagsParam);
      if (techStackParam) params.append("techStack", techStackParam);

      API.get(`/api/projects/search-projects?${params.toString()}`)
        .then((res) => setProjects(res.data))
        .catch((err) => console.error("Search error:", err))
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(debounce);
  }, [query, selectedTags, selectedTechStack, isTokenProcessed]);

  const hasSearchCriteria =
    query || selectedTags.length > 0 || selectedTechStack.length > 0;

  useEffect(() => {
    if (!isTokenProcessed || hasSearchCriteria) return;

    const fetchRecommendedProjects = async () => {
      if (hasFetchedRecommendationsOnce) {
        setRecommendedProjects(cachedRecommendations);
        return;
      }

      setIsRecommendationsLoading(true);
      try {
        const res = await API.get("/api/recommendations/projects");
        setRecommendedProjects(res.data.recommendedProjects || []);
        setCachedRecommendations(res.data.recommendedProjects || []);
        setHasFetchedRecommendationsOnce(true);
      } catch (error) {
        console.error("Error fetching recommended projects:", error);
        setRecommendedProjects([]);
      } finally {
        setIsRecommendationsLoading(false);
      }
    };

    fetchRecommendedProjects();
  }, [
    isTokenProcessed,
    hasSearchCriteria,
    hasFetchedRecommendationsOnce,
    cachedRecommendations,
  ]);

  const displayProjects = hasSearchCriteria ? projects : recommendedProjects;
  const isDisplayLoading = hasSearchCriteria
    ? loading
    : isRecommendationsLoading;
  const displayTitle = hasSearchCriteria
    ? "Search Results"
    : "Recommended For You";

  return (
    <div className='min-h-screen bg-[#0e0e0e] text-white pt-20 px-6'>
      <MainNavbar />
      <div className='flex justify-end mb-4 mt-10'>
        <button
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition'
          onClick={() => navigate("/create-project")}
        >
          Create Project
        </button>
      </div>
      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <div className='relative w-full md:w-1/2'>
          <input
            type='text'
            placeholder='Search by title, description...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
          {query && (
            <X
              className='absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer'
              onClick={() => setQuery("")}
            />
          )}
        </div>
        <div className='w-full md:w-1/4 z-20'>
          <Select
            isMulti
            options={techStackOptions}
            value={selectedTechStack}
            onChange={setSelectedTechStack}
            placeholder='Filter by Tech Stack'
            className='text-black'
            classNamePrefix='react-select'
          />
        </div>
        <div className='w-full md:w-1/4 z-20'>
          <Select
            isMulti
            options={tagOptions}
            value={selectedTags}
            onChange={setSelectedTags}
            placeholder='Filter by Tags'
            className='text-black'
            classNamePrefix='react-select'
          />
        </div>
      </div>
      <h2 className='text-xl font-semibold mb-4'>{displayTitle}</h2>
      {isDisplayLoading ? (
        <p className='text-gray-400'>Loading projects...</p>
      ) : (
        <ProjectGrid
          projects={displayProjects}
          navigate={navigate}
          currentUserId={userId}
        />
      )}
    </div>
  );
}

const ProjectGrid = ({ projects, navigate, currentUserId }) => {
  const [requestStatus, setRequestStatus] = useState({});

  useEffect(() => {
    if (!currentUserId) return;

    const fetchSentRequests = async () => {
      try {
        const res = await API.get("/api/projects/my/requests");
        const sentRequests = res.data.requests.reduce((acc, req) => {
          acc[req._id] = "requested";
          return acc;
        }, {});
        setRequestStatus(sentRequests);
      } catch (error) {
        console.error("Could not fetch sent requests", error);
      }
    };
    fetchSentRequests();
  }, [currentUserId]);

  const handleRequestJoin = async (projectId) => {
    try {
      await API.post(`/api/projects/${projectId}/request`);
      setRequestStatus((prev) => ({ ...prev, [projectId]: "requested" }));
    } catch (error) {
      console.error("Failed to send join request", error);
      alert("Error sending request. You may have already requested to join.");
    }
  };

  const handleCancelRequest = async (projectId) => {
    try {
      await API.delete(`/api/projects/my/requests/${projectId}`);
      setRequestStatus((prev) => ({ ...prev, [projectId]: null }));
    } catch (error) {
      console.error("Failed to cancel join request", error);
      alert("Error cancelling request.");
    }
  };

  if (!projects || projects.length === 0) {
    return <p className='text-gray-400'>No projects found.</p>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10'>
      {projects.map((proj) => {
        const isCollaborator = proj.collaborators?.includes(currentUserId);
        const status = requestStatus[proj._id];

        return (
          <Card
            key={proj._id}
            className='bg-[#1c1c1c] text-white border border-white/10 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between'
          >
            <CardContent className='p-5 text-center'>
              <h3 className='font-bold mb-1 truncate text-2xl'>{proj.title}</h3>
              <p className='text-sm text-gray-300 line-clamp-8 pt-2'>
                {proj.description}
              </p>
              <div className='flex flex-wrap gap-2 mb-3 pt-2 mt-5 justify-center'>
                {proj.techStack?.slice().map((tech, i) => (
                  <span
                    key={i}
                    className='bg-white/10 px-2 py-1 rounded-full text-xs border border-white/20'
                  >
                    {tech}
                  </span>
                ))}
                {proj.tags?.slice().map((tag, i) => (
                  <span
                    key={i}
                    className='bg-white/10 px-2 py-1 rounded-full text-xs border border-white/20'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              {proj.similarity !== undefined && (
                <p className='text-sm text-green-400 mt-2'>
                  {proj.similarity}% match
                </p>
              )}
            </CardContent>
            <div className='p-4'>
              {isCollaborator ? (
                <Button
                  onClick={() => navigate(`/project/${proj._id}`)}
                  className='w-full bg-purple-600 hover:bg-purple-700 text-white mt-2'
                >
                  View Project
                </Button>
              ) : status === "requested" ? (
                <Button
                  onClick={() => handleCancelRequest(proj._id)}
                  className='w-full bg-gray-500 hover:bg-gray-600 text-white mt-2'
                >
                  Request Sent
                </Button>
              ) : (
                <Button
                  onClick={() => handleRequestJoin(proj._id)}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-2'
                >
                  Request to Join
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
