import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../ui/loading/Loading";

/* ---------------- WEBSITE ROUTES ---------------- */

import WebsiteLayout from "../layout/WebsiteLayout";
import About from "../routes/website/About";
import Consultations from "../routes/website/Consultations";
import Contact from "../routes/website/contact";
import EditProfile from "../routes/website/EditProfile";
import FAQsSection from "../routes/website/Faqs";
import GoalDetails from "../routes/website/GoalDetails";
import HelpersDetails from "../routes/website/HelpersDetails";
import Home from "../routes/website/Home";
import HowItWorks from "../routes/website/HowItWorks";
import Interests from "../routes/website/Interests";
import Cv from "../routes/website/my-platform/Cv";
import MyAssistance from "../routes/website/my-platform/MyAssistance";
import MyAudience from "../routes/website/my-platform/MyAudience";
import MyClients from "../routes/website/my-platform/MyClients";
import MyCommunity from "../routes/website/my-platform/MyCommunity";
import MyGroups from "../routes/website/my-platform/MyGroups";
import MyOpportunities from "../routes/website/my-platform/MyOpportunities";
import MyPlatform from "../routes/website/my-platform/MyPlatform";
import SupscriptionManagment from "../routes/website/my-platform/SupscriptionManagment";
import MyWorks from "../routes/website/my-works/MyWorks";
import MyNotifications from "../routes/website/MyNotifications";
import OfferDetails from "../routes/website/OfferDetails";
import PersonalHelper from "../routes/website/PersonalHelper";
import Posts from "../routes/website/Posts";
import Privacy from "../routes/website/privacy";
import Profile from "../routes/website/Profile";
import MyWallet from "../routes/website/profile/MyWallet";
import NotificationSetting from "../routes/website/profile/NotificationSetting";
import Savings from "../routes/website/Savings";

/* ---------------- AUTH ROUTES ---------------- */
import WebsiteAuthLayout from "../layout/WebsiteAuthLayout";
import ChatPage from "../routes/ChatPage";
import ActionsLogModel from "../routes/dash-board/ActionsLogModel";
import CommunitiesDetails from "../routes/dash-board/CommunitiesDetails";
import CommunityPostDetails from "../routes/dash-board/CommunityPostDetails";
import CreateEmployee from "../routes/dash-board/CreateEmployer";
import Documents from "../routes/dash-board/Documents";
import EmployeeProfile from "../routes/dash-board/EmployeeProfile";
import Experiences from "../routes/dash-board/Experiences";
import AdministrativeSystems from "../routes/dash-board/list-management/AdministrativeSystems";
import FieldsAndSpecializations from "../routes/dash-board/list-management/FieldsAndSpecializations";
import ListManagement from "../routes/dash-board/list-management/ListManagement";
import OperatingSectors from "../routes/dash-board/list-management/OperatingSectors";
import WorkingGroups from "../routes/dash-board/list-management/WorkingGroups";
import ModelComponent from "../routes/dash-board/ModelComponent";
import Notifications from "../routes/dash-board/Notifications";
import ActiveTab from "../routes/dash-board/reports/ActiveTab";
import Reports from "../routes/dash-board/reports/Reports";
import ResuemeDetails from "../routes/dash-board/resuems/ResuemeDetails";
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
import Banners from "../routes/dash-board/websiteManagment/Banners";
import ContentManagment from "../routes/dash-board/websiteManagment/ContentManagment";
import FaqManagment from "../routes/dash-board/websiteManagment/FaqManagment";
import SocialLinksManage from "../routes/dash-board/websiteManagment/SocialLinksManage";
import SubscriptionManagement from "../routes/dash-board/websiteManagment/SubscriptionManagement";
import TasksManagment from "../routes/dash-board/websiteManagment/TasksManagment";
import ViolationsManagment from "../routes/dash-board/websiteManagment/ViolationsManagment";
import WokingGroupDetails from "../routes/dash-board/WokingGroupDetails";
import PageNotFound from "../routes/PageNotFound";
import AreasOfInterest from "../routes/website-auth/AreasOfInterest";
import LoginPage from "../routes/website-auth/LoginPage";
import Register from "../routes/website-auth/Register";
import ResetPassword from "../routes/website-auth/ResetPassword";
import PersonalGoal from "../routes/website/PersonalGoals";
import Terms from "../routes/website/terms";

/* ---------------- DASHBOARD ROUTES ---------------- */

const DashboardLayout = lazy(() => import("../layout/MainDashboardLayout"));
const DashboardHome = lazy(() =>
  import("../routes/dash-board/MainDashboardHome")
);

/* ---------------- DASHBOARD AUTH ---------------- */
import DashboardAuthlayout from "../layout/DashboardAuthlayout";
import DashboardLoginPage from "../routes/dashboard-auth/DashboardLoginPage";
import DashBoardResetPassword from "../routes/dashboard-auth/DashBoardResetPassword";

/* ---------------- ERROR / EXTRA ---------------- */

import Forbidden from "../routes/Forbidden";
import CommunityChat from "../routes/website/CommunityChat";
import CommunityDetails from "../routes/website/CommunityDetails";
import Followings from "../routes/website/Followings";
import Meetings from "../routes/website/Meetings";
import ConsultaionDetails from "../routes/website/my-platform/ConsultaionDetails";
import GroupDetails from "../routes/website/my-platform/GroupDetails";
import MyCommunityConsultations from "../routes/website/my-platform/MyCommunityConsultations";
import MyContracts from "../routes/website/my-platform/MyContracts";
import CompletedWorks from "../routes/website/my-works/CompletedWorks";
import InProgressWorks from "../routes/website/my-works/InProgressWorks";
import PendingWorks from "../routes/website/my-works/PendingWorks";
import TaskDetails from "../routes/website/my-works/TaskDetails";
import WorksAssistants from "../routes/website/my-works/WorksAssistants";
import WorksContractDetails from "../routes/website/my-works/WorksContractDetails";
import WorksDetails from "../routes/website/my-works/WorksDetails";
import WorksDetailsLayout from "../routes/website/my-works/WorksDetailsLayout";
import WorksGroup from "../routes/website/my-works/WorksGroup";
import WorksOffers from "../routes/website/my-works/WorksOffers";
import WorksTasks from "../routes/website/my-works/WorksTasks";
import PersonalOffers from "../routes/website/PersonalOffers";
import PersonalOffersDetails from "../routes/website/PersonalOffersDetails";
import MyCommunities from "../routes/website/profile/MyCommunities";
import Reels from "../routes/website/Reels";
import ErrorFallback from "../ui/ErrorFallback";
import ProtectedRoute from "./ProtectedRoute";
import PendingContracts from "../routes/website/my-platform/contracts/PendingContracts";
import InProgressContracts from "../routes/website/my-platform/contracts/InProgressContracts";
import CompletedContracts from "../routes/website/my-platform/contracts/CompletedContracts";
import ContractDetailsLayout from "../routes/website/my-platform/contracts/ContractDetailsLayout";
import ContractDetails from "../routes/website/my-platform/contracts/ContractDetails";
import ContractTasks from "../routes/website/my-platform/contracts/ContractTasks";
import ContractsGroup from "../routes/website/my-platform/contracts/ContractsGroup";
import ContractsBeneficiaries from "../routes/website/my-platform/contracts/ContractsBeneficiaries";
import GroupChat from "../routes/website/my-works/GroupChat";
import UserContractChat from "../routes/website/userContractChat";

export const router = createBrowserRouter([
  /* WEBSITE AUTH */
  {
    element: <WebsiteAuthLayout />,
    errorElement: <ErrorFallback />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <Register /> },
    ],
  },

  /* AREAS OF INTEREST */
  {
    path: "/areas-of-interest",
    element: <AreasOfInterest />,
  },

  /* RESET PASSWORD */
  { path: "/reset-password", element: <ResetPassword /> },

  /* WEBSITE */
  {
    element: <WebsiteLayout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "personal-goals",
        element: <PersonalGoal />,
      },
      {
        path: "goal/:id",
        element: <GoalDetails />,
      },
      {
        path: "offers",
        element: <PersonalOffers />,
      },
      {
        path: "offers/:id",
        element: <PersonalOffersDetails />,
      },
      {
        path: "personal-helpers",
        element: <PersonalHelper />,
      },
      {
        path: "helper/:id",
        element: <HelpersDetails />,
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
        path: "reels",
        element: <Reels />,
      },

      {
        path: "my-works",
        element: (
          <ProtectedRoute>
            <MyWorks />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <PendingWorks /> },
          { path: "in-progress", element: <InProgressWorks /> },
          { path: "completed", element: <CompletedWorks /> },
        ],
      },
      {
        path: "my-works/:id",
        element: <WorksDetailsLayout />,
        children: [
          { index: true, element: <WorksDetails /> },
          {
            path: "tasks",
            element: <WorksTasks />,
          },
          { path: "offers", element: <WorksOffers /> },
          { path: "group", element: <WorksGroup /> },
          { path: "assistants", element: <WorksAssistants /> },
        ],
      },
      {
        path: "assisatant/contarct/:id",
        element: <WorksContractDetails />,
      },
      {
        path: "/tasks/:taskId",
        element: (
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            <MyNotifications />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <EditProfile />,
          },
          {
            path: "my-notifications",
            element: <NotificationSetting />,
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
            path: "my-communities",
            element: <MyCommunities />,
          },
          {
            path: "Followings",
            element: <Followings />,
          },
        ],
      },

      {
        path: "/my-platform",
        element: (
          <ProtectedRoute>
            <MyPlatform />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <SupscriptionManagment />,
          },
          {
            path: "my-cv",
            element: <Cv />,
          },
          {
            path: "my-assistances",
            element: <MyAssistance />,
          },
          {
            path: "my-opportunities",
            element: <MyOpportunities />,
          },

          {
            path: "my-groups",
            element: <MyGroups />,
          },
          {
            path: "my-communities",
            element: <MyCommunities />,
          },
          {
            path: "my-audience",
            element: <MyAudience />,
          },
          {
            path: "my-clients",
            element: <MyClients />,
          },
        ],
      },
      {
        path: "my-contracts",
        element: (
          <ProtectedRoute>
            <MyContracts />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <PendingContracts /> },
          { path: "in-progress", element: <InProgressContracts /> },
          { path: "completed", element: <CompletedContracts /> },
        ],
      },
      {
        path: "my-contracts/:id",
        element: <ContractDetailsLayout />,
        children: [
          { index: true, element: <ContractDetails /> },
          {
            path: "tasks",
            element: <ContractTasks />,
          },
          { path: "group", element: <ContractsGroup /> },
          { path: "beneficiaries", element: <ContractsBeneficiaries /> },
        ],
      },
      {
        path: "group/chat/:id",
        element: (
          <ProtectedRoute>
            <GroupChat />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-chat/:id",
        element: (
          <ProtectedRoute>
            <UserContractChat />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-assistances/:id",
        element: <OfferDetails />,
      },
      {
        path: "my-community",
        element: (
          <ProtectedRoute>
            <MyCommunity />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <MyCommunityConsultations />,
          },
          {
            path: "meetings",
            element: <Meetings />,
          },
          {
            path: "posts",
            element: <Posts />,
          },
        ],
      },
      {
        path: "consultaion-details/:id",
        element: <ConsultaionDetails />,
      },
      {
        path: "community/:id",
        element: <CommunityDetails />,
        children: [
          {
            index: true,
            element: <Consultations />,
          },
          {
            path: "meetings",
            element: <Meetings isMyCommuntiy={false} />,
          },
          {
            path: "posts",
            element: <Posts isMyCommuntiy={false} />,
          },
        ],
      },
      {
        path: "community/:id/chats",
        element: (
          <ProtectedRoute>
            <CommunityChat />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:id",
        element: <CommunityPostDetails />,
      },
      {
        path: "my-group/:id",
        element: <GroupDetails />,
      },
    ],
  },

  /* Dashboard Auth */
  {
    path: "/dashboard/login",
    element: <DashboardAuthlayout />,
    children: [{ index: true, element: <DashboardLoginPage /> }],
  },

  /* Dashboard reset password */

  {
    path: "/dashboard/reset-password",
    element: <DashBoardResetPassword />,
  },

  /* Dashboard */

  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <DashboardLayout />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,

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
        path: "communities-details/:id",
        element: <CommunitiesDetails />,
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
      { path: "resuems/:id", element: <ResuemeDetails /> },
      // {
      //   path: "contracts/:id",
      //   element: <ContractDetails />,
      // },
      {
        path: "community-post-details/:id",
        element: <CommunityPostDetails />,
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

  /* ERRORS */
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
]);
