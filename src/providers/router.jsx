import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashBoardLayout from "../layout/DashboradLayout";
import WebsiteLayout from "../layout/WebsiteLayout";
import LoginPage from "../routes/auth/LoginPage";
import RegisterPage from "../routes/auth/RegisterPage";
import DashBoardHome from "../routes/dash-board/DashBoardHome";
import PageNotFound from "../routes/PageNotFound";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <WebsiteLayout />,
    children: [
      {
        path: "/",
        element: <p>home</p>,
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
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
