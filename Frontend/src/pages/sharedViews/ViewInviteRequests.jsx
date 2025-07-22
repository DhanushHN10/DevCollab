import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import API from "../../api/axios";

export default function ViewInviteRequests() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvites = async () => {
    try {
      const res = await API.get("/api/projects/my/invites");
      setInvites(res.data.invites || []);
    } catch (err) {
      toast.error("Failed to fetch invites");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (projectId) => {
    try {
      await API.put(`/api/projects/my/invites/${projectId}`, {});
      toast.success("Invite accepted");
      setInvites(invites.filter(inv => inv._id !== projectId));
    } catch (err) {
      toast.error("Failed to accept invite");
      console.error(err);
    }
  };

  const handleReject = async (projectId) => {
    try {
      await API.delete(`/api/projects/my/invites/${projectId}`);
      toast.info("Invite rejected");
      setInvites(invites.filter(inv => inv._id !== projectId));
    } catch (err) {
      toast.error("Failed to reject invite");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  if (loading) return <div className="text-white text-center mt-8">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Project Invitations</h2>
      {invites.length === 0 ? (
        <p className="text-gray-400">No invites received.</p>
      ) : (
        <div className="grid gap-4">
          {invites.map(invite => (
            <Card key={invite._id} className="bg-[#1e1e1e] border border-gray-700 text-white">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold">{invite.title}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  From: {invite.createdBy.name} ({invite.createdBy.username})
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                   {invite.techStack?.map((teckStack, idx) => (
                    <span key={idx} className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                      {teckStack}
                    </span>
                  ))}
                  {invite.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}

                </div>
                <div className="flex gap-3">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAccept(invite._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleReject(invite._id)}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

