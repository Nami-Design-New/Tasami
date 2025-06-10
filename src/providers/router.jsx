import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/MainDashboardLayout";
import AuthLayout from "../layout/AuthLayout";
import WebsiteLayout from "../layout/WebsiteLayout";
import LoginPage from "../routes/auth/LoginPage";
import RegisterPage from "../routes/auth/RegisterPage";
import ResetPassword from "../routes/auth/ResetPassword";
import ActionsLogModel from "../routes/dash-board/ActionsLogModel";
import CreateEmployee from "../routes/dash-board/CreateEmployer";
import EmployeeProfile from "../routes/dash-board/EmployeeProfile";
import FieldsAndSpecializations from "../routes/dash-board/list-management/FieldsAndSpecializations";
import ListManagement from "../routes/dash-board/list-management/ListManagement";
import OperatingSectors from "../routes/dash-board/list-management/OperatingSectors";
import WorkingGroups from "../routes/dash-board/list-management/WorkingGroups";
import ModelComponent from "../routes/dash-board/ModelComponent";
import Notifications from "../routes/dash-board/Notifications";
import CustomerServiseTasks from "../routes/dash-board/tasks/CustomerServiseTasks";
import ExecutiveTasks from "../routes/dash-board/tasks/ExecutiveTasks";
import SupervisoryTasks from "../routes/dash-board/tasks/SupervisoryTasks";
import Tasks from "../routes/dash-board/tasks/Tasks";
import Programs from "../routes/dash-board/teams/Programs";
import Resuems from "../routes/dash-board/teams/Resuems";
import Services from "../routes/dash-board/teams/MyServices";
import SubscribersAndTeams from "../routes/dash-board/teams/SubscribersAndTeams";
import Teams from "../routes/dash-board/teams/Teams";
import UserAccounts from "../routes/dash-board/teams/UserAccounts";
import WokingGroupDetails from "../routes/dash-board/WokingGroupDetails";
import PageNotFound from "../routes/PageNotFound";
import Home from "../routes/website/Home";
import UserProfile from "../routes/dash-board/UserProfile";
import ChatPage from "../routes/ChatPage";
import DashboardHome from "../routes/dash-board/MainDashboardHome";
import DataUpdateRequestDetails from "../routes/dash-board/DataUpdateRequestDetails";

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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "chats",
        element: <ChatPage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "model/:id",
        element: <ModelComponent />,
      },
      {
        path: "actions-log",
        element: <ActionsLogModel />,
      },
      {
        path: "woking-group/:id",
        element: <WokingGroupDetails />,
      },
      {
        path: "user-details/:id",
        element: <UserProfile />,
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
        path: "profile",
        element: <EmployeeProfile />,
      },
      {
        element: <SubscribersAndTeams />,
        children: [
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

          {
            path: "teams",
            element: <Teams />,
          },
          {
            path: "create-employee",
            element: <CreateEmployee />,
          },
          {
            path: "employee-details/:id",
            element: <CreateEmployee />,
          },
        ],
      },
      {
        path: "requests/:id",
        element: <DataUpdateRequestDetails />,
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
