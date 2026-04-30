import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connect from "./pages/Connect";
import Companies from "./pages/Companies";
import ProjectDetail from "./pages/ProjectDetail";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import Customization from "./pages/Customization";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/connect",
    Component: Connect,
  },
  {
    path: "/companies",
    Component: Companies,
  },
  {
    path: "/project/:id",
    Component: ProjectDetail,
  },
    {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/help",
    Component: Help,
  },
  {
    path: "/customization",
    Component: Customization,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);