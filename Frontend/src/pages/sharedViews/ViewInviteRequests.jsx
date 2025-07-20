// File: components/SharedView/InviteRequests.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InviteRequests() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await axios.get('/api/projects/my/invites', {
          withCredentials: true,
        });
        setInvites(res.data.invites);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch invites', err);
        setError('Failed to load invites');
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  const handleAccept = async (projectId) => {
    try {
      await axios.put(`/api/projects/my/invites/${projectId}`, {}, {
        withCredentials: true,
      });
      setInvites(prev => prev.filter(project => project._id !== projectId));
    } catch (err) {
      console.error('Failed to accept invite', err);
    }
  };

  const handleReject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/my/invites/${projectId}`, {
        withCredentials: true,
      });
      setInvites(prev => prev.filter(project => project._id !== projectId));
    } catch (err) {
      console.error('Failed to reject invite', err);
    }
  };

  if (loading) return <p className="text-white">Loading invites...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-white space-y-4">
      {invites.length === 0 ? (
        <p>No pending invites received.</p>
      ) : (
        invites.map(project => (
          <div
            key={project._id}
            className="bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-300">By: {project.createdBy.name} (@{project.createdBy.username})</p>
              <p className="text-sm text-gray-400">Tags: {project.tags?.join(', ')}</p>
              <p className="text-sm text-gray-400">Tech Stack: {project.techStack?.join(', ')}</p>
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-2">
              <button
                onClick={() => handleAccept(project._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(project._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
