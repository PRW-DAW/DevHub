import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connect from "./pages/Connect";
import Companies from "./pages/Companies";
import UserProfile from "./pages/UserProfile";
import ProjectDetail from "./pages/ProjectDetail";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/feed",
    element: <PrivateRoute><Feed /></PrivateRoute>,
  },
  {
    path: "/profile",
    element: <PrivateRoute><Profile /></PrivateRoute>,
  },
  {
    path: "/connect",
    element: <PrivateRoute><Connect /></PrivateRoute>,
  },
  {
    path: "/companies",
    element: <PrivateRoute><Companies /></PrivateRoute>,
  },
  {
    path: "/user/:id",
    element: <PrivateRoute><UserProfile /></PrivateRoute>,
  },
  {
    path: "/project/:id",
    element: <PrivateRoute><ProjectDetail /></PrivateRoute>,
  },
]);
