import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashBoardLayout from "../layout/DashboradLayout";
import WebsiteLayout from "../layout/WebsiteLayout";
import LoginPage from "../routes/auth/LoginPage";
import RegisterPage from "../routes/auth/RegisterPage";
import DashboardHome from "../routes/dash-board/DashboardHome";
import PageNotFound from "../routes/PageNotFound";
import ResetPassword from "../routes/auth/ResetPassword";
import Home from "../routes/website/Home";
import Notifications from "../routes/dash-board/Notifications";
import Tasks from "../routes/dash-board/tasks/Tasks";
import ExecutiveTasks from "../routes/dash-board/tasks/ExecutiveTasks";
import SupervisoryTasks from "../routes/dash-board/tasks/SupervisoryTasks";
import CustomerServiseTasks from "../routes/dash-board/tasks/CustomerServiseTasks";
import SubscribersAndTeams from "../routes/dash-board/teams/SubscribersAndTeams";
import Subscribers from "../routes/dash-board/teams/Subscribers";
import Teams from "../routes/dash-board/teams/Teams";
import UserAccounts from "../routes/dash-board/teams/UserAccounts";
import Programs from "../routes/dash-board/teams/Programs";
import Services from "../routes/dash-board/teams/services";
import Resuems from "../routes/dash-board/teams/Resuems";
import CreateEmployer from "../routes/dash-board/CreateEmployer";
import ListManagement from "../routes/dash-board/list-management/ListManagement";
import WorkingGroups from "../routes/dash-board/list-management/WorkingGroups";
import OperatingSectors from "../routes/dash-board/list-management/OperatingSectors";
import FieldsAndSpecializations from "../routes/dash-board/list-management/FieldsAndSpecializations";
import EmployeeProfile from "../routes/dash-board/EmployeeProfile";

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
        element: <DashboardHome />,
      },

      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "tasks",
        element: <Tasks />,
        children: [
          {
            index: true,
            element: <ExecutiveTasks />,
          },
          {
            path: "executive-tasks",
            element: <ExecutiveTasks />,
          },
          {
            path: "supervisory-tasks",
            element: <SupervisoryTasks />,
          },
          {
            path: "customer-service-tasks",
            element: <CustomerServiseTasks />,
          },
        ],
      },
      {
        path: "employee-profile",
        element: <EmployeeProfile />,
      },
      {
        path: "subscribers-and-teams",
        element: <SubscribersAndTeams />,
        children: [
          {
            path: "subscribers",
            element: <Subscribers />,
            children: [
              { index: true, element: <UserAccounts /> },
              {
                path: "user-accounts",
                element: <UserAccounts />,
              },
              {
                path: "programs",
                element: <Programs />,
              },
              {
                path: "services",
                element: <Services />,
              },
              {
                path: "resuems",
                element: <Resuems />,
              },
            ],
          },
          {
            path: "teams",
            element: <Teams />,
          },
          {
            path: "create-employer",
            element: <CreateEmployer />,
          },
        ],
      },
      {
        path: "list-management",
        element: <ListManagement />,
        children: [
          {
            index: true,
            element: <WorkingGroups />,
          },
          {
            path: "working-groups",
            element: <WorkingGroups />,
          },
          {
            path: "operating-sectors",
            element: <OperatingSectors />,
          },
          {
            path: "fields-and-specializations",
            element: <FieldsAndSpecializations />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
