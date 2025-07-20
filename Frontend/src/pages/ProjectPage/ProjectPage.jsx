// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';

// export default function ProjectPage() {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.get(`/api/projects/${projectId}/overview`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setProject(res.data.project);
//         setIsOwner(res.data.isOwner);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProject();
//   }, [projectId]);

//   if (!project) return <div className="text-white">Loading...</div>;

//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) section.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-[#0e0e0e] text-white px-6 py-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">{project.title}</h1>
//         <Button onClick={() => scrollToSection('workspace')} className="bg-white text-black">Go to Workspace</Button>
//       </div>

//       <div className="flex flex-wrap gap-2 mb-6">
//         {isOwner && (
//           <>
//             <Button onClick={() => scrollToSection('searchDev')}>Search & Invite Devs</Button>
//             <Button onClick={() => scrollToSection('invites')}>View Invites</Button>
//             <Button onClick={() => scrollToSection('joinRequests')}>Join Requests</Button>
//           </>
//         )}
//         <Button onClick={() => scrollToSection('projectInfo')}>Project Info</Button>
//         <Button onClick={() => scrollToSection('collaborators')}>Collaborators</Button>
//       </div>

//       <div id="projectInfo" className="mb-8">
//         <h2 className="text-2xl font-semibold mb-2">Project Description</h2>
//         <p className="mb-2">{project.description}</p>
//         <div className="flex gap-2 flex-wrap">
//           {project.techStack.map((tech, idx) => (
//             <span key={idx} className="bg-white/10 border border-white/20 px-2 py-1 rounded-md text-sm">{tech}</span>
//           ))}
//           {project.tags.map((tag, idx) => (
//             <span key={idx} className="bg-white/10 border border-white/20 px-2 py-1 rounded-md text-sm">#{tag}</span>
//           ))}
//         </div>
//       </div>

//       <div id="collaborators" className="mb-8">
//         <h2 className="text-2xl font-semibold mb-2">Collaborators</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {project.collaborators.map((collab) => (
//             <Card key={collab._id} className="bg-white/5 border border-white/20">
//               <CardContent className="p-4">
//                 <h3 className="text-lg font-semibold">{collab.name}</h3>
//                 <p className="text-sm text-white/70">@{collab.username}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {isOwner && (
//         <>
//           <div id="searchDev" className="mb-8">
//             <h2 className="text-2xl font-semibold mb-2">Search & Invite Developers</h2>
//             <p className="text-white/60">(Search UI will be implemented here)</p>
//           </div>

//           <div id="invites" className="mb-8">
//             <h2 className="text-2xl font-semibold mb-2">Invitation Status</h2>
//             <p className="text-white/60">(List of invites with unsend buttons will appear here)</p>
//           </div>

//           <div id="joinRequests" className="mb-8">
//             <h2 className="text-2xl font-semibold mb-2">Join Requests</h2>
//             <p className="text-white/60">(List of join requests with accept/decline buttons will appear here)</p>
//           </div>
//         </>
//       )}

//       <div id="workspace" className="mt-12">
//         <Button className="bg-white text-black w-full md:w-auto">Enter Workspace</Button>
//       </div>
//     </div>
//   );
// }


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
              <h2 className="text-2xl font-semibold mb-4">Invitation Status</h2>
              <p className="text-white/60">(List of invites with unsend buttons will appear here)</p>
            </div>

            <div id="joinRequests" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Join Requests</h2>
              <p className="text-white/60">(List of join requests with accept/decline buttons will appear here)</p>
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
