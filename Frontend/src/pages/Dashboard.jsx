import MainNavbar from "../tools/MainNavbar";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pt-20 px-6">
      <MainNavbar />

      {/* Create Project Button */}
      <div className="flex justify-end mb-4 mt-10">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition" onClick={()=> navigate("/create-project")}>
          Create Project
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full max-w-xl px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Recommended Projects */}
      <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-10">
        {/* Project cards will go here */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white/10 rounded-xl shadow border border-white/10 hover:bg-white/20 transition"
          >
            <h3 className="text-lg font-bold mb-2">AI Project #{i + 1}</h3>
            <p className="text-sm text-white/70">
              This is a placeholder for a recommended project. We'll later replace with dynamic AI results.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
