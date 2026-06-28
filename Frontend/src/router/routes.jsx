import { createBrowserRouter } from "react-router-dom";

import Homepage from "../pages/Homepage";

import CompleteProfilePage from "../pages/CompleteProfilePage";
import CreateProjectPage from "../pages/CreateProjectPage";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import SharedView from "../pages/SharedViewPage";
import SignupPage from "../pages/SignupPage";
import ViewProfile from "../pages/ViewProfile";
import WorkspacePage from "../pages/WorkspacePage/WorkspacePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/complete-profile",
    element: <CompleteProfilePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/view-profile",
    element: <ViewProfile />,
  },
  {
    path: "/create-project",
    element: <CreateProjectPage />,
  },

  {
    path: "/project/shared-view",
    element: <SharedView />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectPage />,
  },

  {
    path: "/project/:projectId/workspace",
    element: <WorkspacePage />,
  },
]);
