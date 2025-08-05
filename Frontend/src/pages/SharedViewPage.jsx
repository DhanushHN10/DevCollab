import { Suspense, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import MainNavbar from "../tools/MainNavbar";


const MyProjects = lazy(() => import("./sharedViews/MyProjects"));
const MyCollaborations = lazy(() => import("./sharedViews/MyCollaborations"));
const InviteRequests = lazy(() => import("./sharedViews/ViewInviteRequests"));
const JoinRequestsSent = lazy(() => import("./sharedViews/JoinRequestsSent"));

const tabs = [
  { label: "My Projects", value: "projects" },
  { label: "My Collaborations", value: "collabs" },
  { label: "Invite Requests", value: "invites" },
  { label: "Join Requests Sent", value: "sent" },
];

export default function SharedView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tabs") || "projects";

  const renderTabContent = () => {
    switch (tab) {
      case "projects":
        return <MyProjects />;
      case "collabs":
        return <MyCollaborations />;
      case "invites":
        return <InviteRequests />;
      case "sent":
        return <JoinRequestsSent />;
      default:
        return <MyProjects />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <MainNavbar />

      {/* <div className="static top-16 z-10 bg-[#323030] py-3 px-4 rounded-xl shadow-md flex flex-wrap justify-center gap-3 mb-6 border border-white/10"> */}
      <div className="w-full px-6 pt-20">
       <div className="static top-16 z-10 bg-[#323030] py-3 px-4 rounded-xl shadow-md flex flex-wrap justify-center gap-3 mb-6 border border-white/10">
        {tabs.map(({ label, value }) => (
          <button
            key={value}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              tab === value
                ? "bg-white text-black shadow-md"
                : "bg-black text-white hover:bg-white/10"
            }`}
            onClick={() => setSearchParams({ tabs: value })}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="px-4 md:px-8 lg:px-16">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {renderTabContent()}
        </Suspense>
      </div>
    </div>
    </div>
  );
}
