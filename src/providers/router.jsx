import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/MainDashboardLayout";
import WebsiteLayout from "../layout/WebsiteLayout";
import LoginPage from "../routes/auth/LoginPage";
import OtpConfirmationPage from "../routes/auth/OtpConfirmationPage";
import RegisterInfo from "../routes/auth/RegisterInfo";
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
import ContentManagment from "../routes/dash-board/websiteManagment/ContentManagment";
import FaqManagment from "../routes/dash-board/websiteManagment/FaqManagment";
import SocialLinksManage from "../routes/dash-board/websiteManagment/SocialLinksManage";
import ViolationsManagment from "../routes/dash-board/websiteManagment/ViolationsManagment";
import WokingGroupDetails from "../routes/dash-board/WokingGroupDetails";
import PageNotFound from "../routes/PageNotFound";
import About from "../routes/website/About";
import Consultations from "../routes/website/Consultations";
import Contact from "../routes/website/contact";
import EditProfile from "../routes/website/EditProfile";
import Encounters from "../routes/website/Encounters";
import FAQsSection from "../routes/website/Faqs";
import GoalDetails from "../routes/website/GoalDetails";
import HelpersDetails from "../routes/website/HelpersDetails";
import Home from "../routes/website/Home";
import HowItWorks from "../routes/website/HowItWorks";
import MyNotifications from "../routes/website/MyNotifications";
import MyWallet from "../routes/website/MyWallet";
import MyWorks from "../routes/website/MyWorks";
import NewGoal from "../routes/website/NewGoal";
import NewHelpOffer from "../routes/website/NewHelpOffer";
import OfferDetails from "../routes/website/OfferDetails";
import PersonalOffers from "../routes/website/Offers";
import PersonalCommunity from "../routes/website/PersonalCommunity";
import PersonalGoal from "../routes/website/PersonalGoals";
import PersonalHelper from "../routes/website/PersonalHelper";
import Posts from "../routes/website/Posts";
import Privacy from "../routes/website/privacy";
import Profile from "../routes/website/Profile";

import Terms from "../routes/website/terms";
import Views from "../routes/website/Views";
import LoginForm from "../ui/auth/LoginForm";
import TasksManagment from "../routes/dash-board/websiteManagment/TasksManagment";
import SubscriptionManagement from "../routes/dash-board/websiteManagment/SubscriptionManagement";
import Banners from "../routes/dash-board/websiteManagment/Banners";

import Interests from "../routes/website/Interests";
import Savings from "../routes/website/Savings";
import Followers from "../routes/website/Followers";

export const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/confirm-otp", element: <OtpConfirmationPage /> },
          { path: "/register-info", element: <RegisterInfo /> },
        ],
      },
      { path: "/reset-password", element: <ResetPassword /> },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "personal-goals",
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
        path: "my-notifications",
        element: <MyNotifications />,
      },
      {
        path: "my-wallet",
        element: <MyWallet />,
      },
      {
        path: "goal/:id",
        element: <GoalDetails />,
      },
      {
        path: "new-help",
        element: <NewHelpOffer />,
      },
      {
        path: "my-works",
        element: <MyWorks />,
      },
      {
        path: "offer/:id",
        element: <OfferDetails />,
      },
      {
        path: "helper/:id",
        element: <HelpersDetails />,
      },
      {
        path: "my-profile",
        element: <Profile />,
        children: [
          {
            index: true,
            element: <EditProfile />,
          },
          {
            path: "my-notifications",
            element: <MyNotifications />,
          },
          {
            path: "my-wallet",
            element: <MyWallet />,
          },
          {
            path: "interests",
            element: <Interests />,
          },
          {
            path: "savings",
            element: <Savings />,
          },
          {
            path: "Followers",
            element: <Followers />,
          },
        ],
      },
      {
        path: "personal-community/:id",
        element: <PersonalCommunity />,
        children: [
          {
            path: "consultations",
            element: <Consultations />,
          },
          {
            path: "encounters",
            element: <Encounters />,
          },
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "views",
            element: <Views />,
          },
        ],
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

      {
        path: "violations-management",
        element: <ViolationsManagment />,
      },
      {
        path: "social-links-management",
        element: <SocialLinksManage />,
      },
      {
        path: "content-management",
        element: <ContentManagment />,
      },
      {
        path: "faq-management",
        element: <FaqManagment />,
      },
      {
        path: "tasks-management",
        element: <TasksManagment />,
      },
      {
        path: "subscription-management",
        element: <SubscriptionManagement />,
      },
      {
        path: "banners",
        element: <Banners />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
