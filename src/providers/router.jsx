import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/MainDashboardLayout";
import WebsiteLayout from "../layout/WebsiteLayout";
import LoginPage from "../routes/auth/LoginPage";
import RegisterPage from "../routes/auth/RegisterPage";
import ResetPassword from "../routes/auth/ResetPassword";
import ChatPage from "../routes/ChatPage";
import ActionsLogModel from "../routes/dash-board/ActionsLogModel";
import CreateEmployee from "../routes/dash-board/CreateEmployer";
import DataUpdateRequestDetails from "../routes/dash-board/DataUpdateRequestDetails";
import Documents from "../routes/dash-board/Documents";
import EmployeeProfile from "../routes/dash-board/EmployeeProfile";
import Experiences from "../routes/dash-board/Experiences";
import AdministrativeSystems from "../routes/dash-board/list-management/AdministrativeSystems";
import FieldsAndSpecializations from "../routes/dash-board/list-management/FieldsAndSpecializations";
import ListManagement from "../routes/dash-board/list-management/ListManagement";
import OperatingSectors from "../routes/dash-board/list-management/OperatingSectors";
import WorkingGroups from "../routes/dash-board/list-management/WorkingGroups";
import DashboardHome from "../routes/dash-board/MainDashboardHome";
import ModelComponent from "../routes/dash-board/ModelComponent";
import Notifications from "../routes/dash-board/Notifications";
import ActiveTab from "../routes/dash-board/reports/ActiveTab";
import Reports from "../routes/dash-board/reports/Reports";
import Tasks from "../routes/dash-board/tasks/Tasks";
import Communities from "../routes/dash-board/teams/Communities";
import Services from "../routes/dash-board/teams/MyServices";
import PersonalGoals from "../routes/dash-board/teams/PersonalGoals";
import Programs from "../routes/dash-board/teams/Programs";
import Resuems from "../routes/dash-board/teams/Resuems";
import SubscribersAndTeams from "../routes/dash-board/teams/SubscribersAndTeams";
import Teams from "../routes/dash-board/teams/Teams";
import UserAccounts from "../routes/dash-board/teams/UserAccounts";
import UserProfile from "../routes/dash-board/UserProfile";
import WokingGroupDetails from "../routes/dash-board/WokingGroupDetails";
import PageNotFound from "../routes/PageNotFound";
import Home from "../routes/website/Home";
import PersonalGoal from "../routes/website/PersonalGoals";
import LoginForm from "../ui/auth/LoginForm";
import PersonalOffers from "../routes/website/Offers";
import PersonalHelper from "../routes/website/PersonalHelper";
import About from "../routes/website/About";
import FAQsSection from "../routes/website/Faqs";
import HowItWorks from "../routes/website/HowItWorks";
import Contact from "../routes/website/contact";
import Terms from "../routes/website/terms";
import Privacy from "../routes/website/privacy";
import NewGoal from "../routes/website/NewGoal";
import NewHelpOffer from "../routes/website/NewHelpOffer";
import GoalDetails from "../routes/website/GoalDetails";
import OfferDetails from "../routes/website/OfferDetails";
import HelpersDetails from "../routes/website/HelpersDetails";

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
      {
        path: "Personal-goals",
        element: <PersonalGoal />,
      },
      {
        path: "offers",
        element: <PersonalOffers />,
      },
      {
        path: "personal-helpers",
        element: <PersonalHelper />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "faqs",
        element: <FAQsSection />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "terms-conditions",
        element: <Terms />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
      {
        path: "new-goal",
        element: <NewGoal />,
      },
      {
        path: "goal/:id",
        element: <GoalDetails />
      },
      {
        path: "new-help",
        element: <NewHelpOffer />,
      },
       {
        path: "offer/:id",
        element: <OfferDetails />
      },
       {
        path: "helper/:id",
        element: <HelpersDetails />
      },

    ],
  },
  {
    path: "/dashboard/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginForm /> }],
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
        path: "working-group/:id",
        element: <WokingGroupDetails />,
      },
      {
        path: "user-details/:id",
        element: <UserProfile />,
      },
      {
        path: "tasks",
        element: <Tasks />,
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
            path: "personal-goals",
            element: <PersonalGoals />,
          },
          {
            path: "communities",
            element: <Communities />,
          },
          {
            path: "resuems",
            children: [
              { index: true, element: <Resuems /> },
              { path: "experiences", element: <Experiences /> },
              { path: "documents", element: <Documents /> },
            ],
          },

          {
            path: "teams",
            element: <Teams />,
          },
        ],
      },
      {
        path: "create-employee",
        element: <CreateEmployee />,
      },
      {
        path: "employee-details/:id",
        element: <CreateEmployee />,
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
          {
            path: "administrative-systems",
            element: <AdministrativeSystems />,
          },
        ],
      },
      {
        path: "reports",
        element: <Reports />,
        children: [
          {
            index: true,
            element: <ActiveTab />,
          },
          {
            path: "users",
            element: <ActiveTab />,
          },
          {
            path: "services",
            element: <ActiveTab />,
          },
          {
            path: "contracts",
            element: <ActiveTab />,
          },
          {
            path: "communities",
            element: <ActiveTab />,
          },
          {
            path: "sales",
            element: <ActiveTab />,
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
