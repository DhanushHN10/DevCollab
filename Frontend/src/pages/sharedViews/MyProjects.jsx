import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/projects/my-projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch my projects", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">My Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-400 text-center">No projects created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] pr-2">
          {projects.map((proj) => (
            <Card
              key={proj._id}
              className="bg-[#1c1c1c] text-white border border-white/10 hover:shadow-lg transition-shadow duration-300 flex justify-center items-center"
            >
              <CardContent className="p-5 text-center">
                <h3 className="text-lg font-semibold mb-1 truncate">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {proj.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
