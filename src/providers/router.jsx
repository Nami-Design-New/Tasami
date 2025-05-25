import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashBoardLayout from "../layout/DashboradLayout";
import WebsiteLayout from "../layout/WebsiteLayout";
import LoginPage from "../routes/auth/LoginPage";
import RegisterPage from "../routes/auth/RegisterPage";
import DashBoardHome from "../routes/dash-board/DashboardHome";
import PageNotFound from "../routes/PageNotFound";
import ResetPassword from "../routes/auth/ResetPassword";
import Home from "../routes/website/Home";
import Notifications from "../routes/dash-board/Notifications";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    element: <WebsiteLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <DashBoardHome />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
