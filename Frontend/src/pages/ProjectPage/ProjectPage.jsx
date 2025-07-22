import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainNavbar from '../../tools/MainNavbar';



export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${projectId}/overview`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProject(res.data.project);
        setIsOwner(res.data.isOwner);
        setPendingInvites(res.data.project.pendingInvites);
        setJoinRequests(res.data.project.joinRequests)
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) return <div className="text-white">Loading...</div>;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const unsendInvite = async(unsendInviteUserId) =>{
try {
    await axios.delete(
      `/api/projects/${projectId}/invite/${unsendInviteUserId}`,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,

        },
      }
    );

    setPendingInvites((items) => items.filter((invite)=> invite._id !== unsendInviteUserId))
  } catch (error) {
    console.error("Failed to unsend invite: ", error )
    
  }
  }

  const acceptRequest= async (acceptRequestedUserId) => {
    try {
      await axios.put(`api/projects/${projectId}/request/accept/${acceptRequestedUserId}`, {},
        {
           headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,

        },
        }
      );

        setJoinRequests((items) => items.filter((dev) => dev._id !== acceptRequestedUserId))
    } catch (error) {

       console.error("Failed to accept request: ", error);
    }
  }

    const rejectRequest = async (rejectRequestedUserId) => {
    try {
      await axios.delete(`api/projects/${projectId}/request/reject/${rejectRequestedUserId}`,
        {
           headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,

        },
        }
      );

        setJoinRequests((items) => items.filter((dev) => dev._id !== rejectRequestedUserId))
    } catch (error) {

       console.error("Failed to reject request: ", error);
    }
  }



  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <MainNavbar />
      <div className="w-full px-6 pt-20">
        {/* Sub-navigation */}
        <div className="static top-16 z-10 bg-[#323030] py-3 px-4 rounded-xl shadow-md flex flex-wrap justify-center gap-3 mb-6 border border-white/10">
          <Button onClick={() => scrollToSection('projectInfo')} variant="outline" className="bg-white/10 text-white hover:bg-white/20">Project Info</Button>
          <Button onClick={() => scrollToSection('collaborators')} variant="outline" className="bg-white/10 text-white hover:bg-white/20">Collaborators</Button>
          {isOwner && (
            <>
              <Button onClick={() => scrollToSection('searchDev')} variant="outline" className="bg-white/10 text-white hover:bg-white/20">Search & Invite Devs</Button>
              <Button onClick={() => scrollToSection('invites')} variant="outline" className="bg-white/10 text-white hover:bg-white/20">View Invites</Button>
              <Button onClick={() => scrollToSection('joinRequests')} variant="outline" className="bg-white/10 text-white hover:bg-white/20">Join Requests</Button>
            </>
          )}
          <Button onClick={() => scrollToSection('workspace')} className="bg-purple-600 hover:bg-purple-700 text-white">Go to Workspace</Button>
        </div>

        {/* Project Title */}
        
        <div className="mb-6">
          <h1 className="text-4xl font-black mb-1">{project.title}</h1>
          <p className="text-white/70 mt-2 pt-4">{project.description}</p>
        </div>

        {/* Tech Stack and Tags */}
        <div className="flex gap-2 flex-wrap mb-10 justify-center">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm">{tech}</span>
          ))}
          {project.tags.map((tag, idx) => (
            <span key={idx} className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm">#{tag}</span>
          ))}
        </div>

        {/* Collaborators */}
        <div id="collaborators" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 ">Collaborators</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.collaborators.map((collab) => (
              <Card key={collab._id} className="bg-white/5 border border-white/20 justify-center items-center h-max w-max p-4">
                <CardContent className="p-4">
                    <img src={collab.avatar} alt="Profile" className='w-10 h-10 rounded-4xl'/>
                  <h3 className="text-lg font-semibold text-white/80 pt-2">{collab.name}</h3>
                  <p className=" pt-2 text-sm text-white/70">@{collab.username}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Owner-Only Sections */}
        {isOwner && (
          <>
            <div id="searchDev" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Search & Invite Developers</h2>
              <p className="text-white/60">(Search UI will be implemented here)</p>
            </div>

            <div id="invites" className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Invitation Status</h2>

  {pendingInvites.length === 0 ? (
    <p className="text-white/60 text-center">No pending invites.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pendingInvites.map((user) => (
        <Card
          key={user._id}
          className="bg-white/5 border border-white/20 flex flex-col items-center p-4"
        >
          <CardContent className="flex flex-col items-center text-center">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold text-white/80">
              {user.name}
            </h3>
            <p className="text-sm text-white/60 mb-3">@{user.username}</p>
            <Button
              onClick={() => unsendInvite(user._id)}
              className="bg-red-600 hover:bg-red-700 text-white mt-2"
            >
              Unsend Invite
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )}
</div>


                        <div id="joinRequests" className="mb-12">
  <h2 className="text-2xl font-semibold mb-4 text-center">Join Requests</h2>

  {joinRequests.length === 0 ? (
    <p className="text-white/60 text-center">No join requests.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {joinRequests.map((user) => (
        <Card
          key={user._id}
          className="bg-white/5 border border-white/20 flex flex-col items-center p-4"
        >
          <CardContent className="flex flex-col items-center text-center">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold text-white/80">
              {user.name}
            </h3>
            <p className="text-sm text-white/60 mb-3">@{user.username}</p>
            <Button
              onClick={() => rejectRequest(user._id)}
              className="bg-red-600 hover:bg-red-700 text-white mt-2"
            >
              Reject Request
            </Button>

             <Button
              onClick={() => acceptRequest(user._id)}
              className="bg-red-600 hover:bg-red-700 text-white mt-2"
            >
              Accept Request
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )}
</div>


          </>
        )}

        {/* Workspace */}
        <div id="workspace" className="mt-12 text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg">
            Enter Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
