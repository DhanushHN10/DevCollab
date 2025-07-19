import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import MainNavbar from "../tools/MainNavbar";

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


export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          techStack: techStack.map((item) => item.value),
          tags: tags.map((item) => item.value),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/project/${data.project._id}`);
      } else {
        alert(data.message || "Error creating project");
      }
    } catch (err) {
      alert(`Something went wrong..\n Error:\n${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pt-20 px-6">
      <MainNavbar />

      <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create a New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a project title"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="What is this project about?"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1">Tech Stack</label>
            <Select
              isMulti
              options={techStackOptions}
              value={techStack}
              onChange={setTechStack}
              className="text-black"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="block mb-1">Tags</label>
            <Select
              isMulti
              options={tagOptions}
              value={tags}
              onChange={setTags}
              className="text-black"
              classNamePrefix="react-select"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
