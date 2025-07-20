
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JoinRequestsSent() {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/projects/my/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
       

        setJoinRequests(res.data.requests);
      } catch (err) {
        console.error("Failed to fetch join requests sent", err);
        setError("Failed to fetch join requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinRequests();
  }, []);

  const handleUnsend = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/projects/my/requests/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJoinRequests((prev) => prev.filter((req) => req.projectId !== projectId));
    } catch (err) {
      console.error("Failed to unsend join request", err);
      setError("Failed to unsend join request.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">
        Join Requests Sent
      </h2>

      {loading ? (
        <p className="text-gray-400 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : joinRequests.length === 0 ? (
        <p className="text-gray-400 text-center">
          You haven’t sent any join requests yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] pr-2">
          {joinRequests.map((req) => (
            <Card
              key={req.projectId}
              className="bg-[#1c1c1c] text-white border border-white/10 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-1 truncate">
                  {req.projectTitle || "Untitled Project"}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                  {req.projectDescription || "No description available."}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => handleUnsend(req.projectId)}
                  className="w-full"
                >
                  Unsend Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
