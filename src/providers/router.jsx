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
import CommunitiesDetails from "../routes/dash-board/CommunitiesDetails";
import CommunityPostDetails from "../routes/dash-board/CommunityPostDetails";
import CreateEmployee from "../routes/dash-board/CreateEmployer";
import Documents from "../routes/dash-board/Documents";
import EmployeeProfile from "../routes/dash-board/EmployeeProfile";
import EmployeeSummary from "../routes/dash-board/EmployeeSummary";
import Experiences from "../routes/dash-board/Experiences";
import AdministrativeSystems from "../routes/dash-board/list-management/AdministrativeSystems";
import FieldsAndSpecializations from "../routes/dash-board/list-management/FieldsAndSpecializations";
import ListManagement from "../routes/dash-board/list-management/ListManagement";
import OperatingSectors from "../routes/dash-board/list-management/OperatingSectors";
import WorkingGroups from "../routes/dash-board/list-management/WorkingGroups";
import ModelComponent from "../routes/dash-board/ModelComponent";
import Notifications from "../routes/dash-board/Notifications";
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
const DashboardHome = lazy(
  () => import("../routes/dash-board/MainDashboardHome"),
);

/* ---------------- DASHBOARD AUTH ---------------- */
import DashboardAuthlayout from "../layout/DashboardAuthlayout";
import DashboardLoginPage from "../routes/dashboard-auth/DashboardLoginPage";
import DashBoardResetPassword from "../routes/dashboard-auth/DashBoardResetPassword";

/* ---------------- ERROR / EXTRA ---------------- */

import DashboardContractDetails from "../routes/dash-board/ContractDetails";
import DashboardConsultaions from "../routes/dash-board/DashboardConsultaions";
import DashboardMeetings from "../routes/dash-board/DashboardMeetings";
import DashboardPosts from "../routes/dash-board/DashboardPosts";
import Forbidden from "../routes/Forbidden";
import CustomizeServicesPage from "../routes/website-auth/CustomizeServicesPage";
import CommunityChat from "../routes/website/CommunityChat";
import CommunityDetails from "../routes/website/CommunityDetails";
import Followings from "../routes/website/Followings";
import Meetings from "../routes/website/Meetings";
import ConsultaionDetails from "../routes/website/my-platform/ConsultaionDetails";
import CompletedContracts from "../routes/website/my-platform/contracts/CompletedContracts";
import ContractDetails from "../routes/website/my-platform/contracts/ContractDetails";
import ContractDetailsLayout from "../routes/website/my-platform/contracts/ContractDetailsLayout";
import ContractsBeneficiaries from "../routes/website/my-platform/contracts/ContractsBeneficiaries";
import ContractsGroup from "../routes/website/my-platform/contracts/ContractsGroup";
import ContractTasks from "../routes/website/my-platform/contracts/ContractTasks";
import InProgressContracts from "../routes/website/my-platform/contracts/InProgressContracts";
import PendingContracts from "../routes/website/my-platform/contracts/PendingContracts";
import GroupDetails from "../routes/website/my-platform/GroupDetails";
import MyCommunityConsultations from "../routes/website/my-platform/MyCommunityConsultations";
import MyContracts from "../routes/website/my-platform/MyContracts";
import CompletedWorks from "../routes/website/my-works/CompletedWorks";
import GroupChat from "../routes/website/my-works/GroupChat";
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
import PersonalOffersRates from "../routes/website/PersonalOffersRates";
import MyCommunities from "../routes/website/profile/MyCommunities";
import Reels from "../routes/website/Reels";
import UserContractChat from "../routes/website/userContractChat";
import ErrorFallback from "../ui/ErrorFallback";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import ProtectedRoute from "./ProtectedRoute";
import RequireAdminPermission from "./RequireAdminPermission";
import {
  DASHBOARD_PERMISSIONS,
  EMPLOYEE_CREATE_PERMISSIONS,
  LIST_MANAGEMENT_PERMISSIONS,
  SUBSCRIBERS_AND_TEAM_PERMISSIONS,
} from "../utils/dashboardPermissions";
import SharedGroups from "../routes/dash-board/teams/SharedGroups";
import CompleteDraftedUsers from "../routes/dash-board/list-management/CompleteDraftedUsers";
import ConsultaionDashDetails from "../routes/dash-board/community-dashboard/ConsultaionDashDetails";
import PostDashDetails from "../routes/dash-board/community-dashboard/PostDashDetails";
import PersonalGoalDetails from "../routes/dash-board/teams/PersonalGoalDetails";
import MyServicesDetails from "../routes/dash-board/teams/MyServicesDetails";
import WithdrawRequests from "../routes/dash-board/WithdrawRequests";
import ProgramsDetails from "../routes/dash-board/teams/ProgramsDetails";
import ActiveUserTab from "../routes/dash-board/reports/ActiveUserTab";
import ActiveServiceTab from "../routes/dash-board/reports/ActiveServiceTab";
import ContractsTab from "../routes/dash-board/reports/ContractsTab";
import CommunitiesTab from "../routes/dash-board/reports/CommunitesTab";
import SalesTab from "../routes/dash-board/reports/SalesTab";
import Nationalities from "../routes/dash-board/websiteManagment/Nationalities";
import PublicNotifications from "../routes/dash-board/websiteManagment/PublicNotifications";
import RefundPolicy from "../routes/website/RefundPolicy";
import ClientsRights from "../routes/website/ClientsRights";
import Commissions from "../routes/website/Commissions";
import AboutTasamiiContent from "../routes/dash-board/websiteManagment/AboutTasamiiContent";
import AboutPersonalGoals from "../routes/website/AboutPersonalGoals";
import AboutHelpRequests from "../routes/website/AboutHelpRequests";
import AboutHelpOffers from "../routes/website/AboutHelpOffers";
import AboutPersonalHelpers from "../routes/website/AboutPersonalHelpers";
import AboutTasamiiCommunites from "../routes/website/AboutTasamiiCommunites";

const getBasename = () => {
  const currentUrl = window.location.href;
  return currentUrl.includes("designforge") ? "/Tasami" : "";
};

const withAdminPermission = (element, permission) => (
  <RequireAdminPermission permission={permission}>{element}</RequireAdminPermission>
);

export const router = createBrowserRouter(
  [
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
          path: "offers/:id/rates",
          element: <PersonalOffersRates />,
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
          path: "refund-policy",
          element: <RefundPolicy />,
        },
        {
          path: "clients-rights",
          element: <ClientsRights />,
        },

        {
          path: "about-perosnal-goals",
          element: <AboutPersonalGoals />,
        },
        {
          path: "about-help-requests",
          element: <AboutHelpRequests />,
        },
        {
          path: "about-help-offers",
          element: <AboutHelpOffers />,
        },
        {
          path: "about-personal-helpers",
          element: <AboutPersonalHelpers />,
        },
        {
          path: "about-tasamii-communities",
          element: <AboutTasamiiCommunites />,
        },
        {
          path: "commissions",
          element: <Commissions />,
        },
        {
          path: "reels",
          element: <Reels />,
        },
        {
          path: "/customize-services",
          element: (
            <ProtectedRoute>
              <CustomizeServicesPage />
            </ProtectedRoute>
          ),
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
          path: "my-works/:id/tasks/:taskId",
          element: (
            <ProtectedRoute>
              <TaskDetails mode="beneficiary" />
            </ProtectedRoute>
          ),
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
          path: "my-contracts/:id/tasks/:taskId",
          element: (
            <ProtectedRoute>
              <TaskDetails mode="assistant" />
            </ProtectedRoute>
          ),
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
          <ProtectedAdminRoutes>
            <DashboardLayout />
          </ProtectedAdminRoutes>
        </Suspense>
      ),
      errorElement: <ErrorFallback />,
      children: [
        {
          index: true,
          element: withAdminPermission(
            <DashboardHome />,
            DASHBOARD_PERMISSIONS.HOME,
          ),
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "tasks",
          element: withAdminPermission(
            <Tasks />,
            DASHBOARD_PERMISSIONS.TASKS,
          ),
        },
        {
          path: "profile",
          element: <EmployeeProfile />,
        },
        {
          path: "model/:id",
          element: withAdminPermission(
            <ModelComponent />,
            DASHBOARD_PERMISSIONS.TASKS,
          ),
        },
        {
          path: "withdraw-requests",
          element: withAdminPermission(
            <WithdrawRequests />,
            DASHBOARD_PERMISSIONS.WITHDRAW_REQUESTS,
          ),
        },

        {
          path: "working-group/:id",
          element: withAdminPermission(
            <WokingGroupDetails />,
            DASHBOARD_PERMISSIONS.WORKING_GROUPS,
          ),
        },
        {
          path: "user-details/:id",
          element: withAdminPermission(
            <UserProfile />,
            DASHBOARD_PERMISSIONS.USERS_DETAILS,
          ),
        },
        {
          path: "consultaion-dash-details/:id",
          element: withAdminPermission(
            <ConsultaionDashDetails />,
            DASHBOARD_PERMISSIONS.COMMUNITIES,
          ),
        },
        {
          path: "post-dash-details/:id",
          element: withAdminPermission(
            <PostDashDetails />,
            DASHBOARD_PERMISSIONS.COMMUNITIES,
          ),
        },
        {
          path: "chats",
          element: <ChatPage />,
        },

        {
          path: "communities-details/:id",
          element: withAdminPermission(
            <CommunitiesDetails />,
            DASHBOARD_PERMISSIONS.COMMUNITIES,
          ),
          children: [
            {
              index: true,
              element: <DashboardConsultaions />,
            },
            {
              path: "meetings",
              element: <DashboardMeetings />,
            },
            {
              path: "posts",
              element: <DashboardPosts />,
            },
          ],
        },

        {
          element: withAdminPermission(
            <SubscribersAndTeams />,
            SUBSCRIBERS_AND_TEAM_PERMISSIONS,
          ),
          children: [
            {
              path: "user-accounts",
              element: withAdminPermission(
                <UserAccounts />,
                DASHBOARD_PERMISSIONS.USERS,
              ),
            },
            {
              path: "programs",
              element: withAdminPermission(
                <Programs />,
                DASHBOARD_PERMISSIONS.PROGRAMS,
              ),
            },
            {
              path: "services",
              element: withAdminPermission(
                <Services />,
                DASHBOARD_PERMISSIONS.HELP_REQUESTS,
              ),
            },
            {
              path: "personal-goals",
              element: withAdminPermission(
                <PersonalGoals />,
                DASHBOARD_PERMISSIONS.GOALS,
              ),
            },
            {
              path: "communities",
              element: withAdminPermission(
                <Communities />,
                DASHBOARD_PERMISSIONS.COMMUNITIES,
              ),
            },
            {
              path: "resuems",
              children: [
                {
                  index: true,
                  element: withAdminPermission(
                    <Resuems />,
                    DASHBOARD_PERMISSIONS.RESUMES,
                  ),
                },
                {
                  path: "experiences",
                  element: withAdminPermission(
                    <Experiences />,
                    DASHBOARD_PERMISSIONS.RESUMES,
                  ),
                },
                {
                  path: "documents",
                  element: withAdminPermission(
                    <Documents />,
                    DASHBOARD_PERMISSIONS.RESUMES,
                  ),
                },
              ],
            },
            {
              path: "teams",
              element: withAdminPermission(
                <Teams />,
                DASHBOARD_PERMISSIONS.EMPLOYEES,
              ),
            },
          ],
        },
        {
          path: "personal-goal/:id",
          element: withAdminPermission(
            <PersonalGoalDetails />,
            DASHBOARD_PERMISSIONS.GOALS,
          ),
        },
        {
          path: "services/:id",
          element: withAdminPermission(
            <MyServicesDetails />,
            DASHBOARD_PERMISSIONS.HELP_REQUESTS,
          ),
        },
        {
          path: "programs/:id",
          element: withAdminPermission(
            <ProgramsDetails />,
            DASHBOARD_PERMISSIONS.PROGRAMS,
          ),
        },

        {
          path: "create-employee",
          element: withAdminPermission(
            <CreateEmployee />,
            EMPLOYEE_CREATE_PERMISSIONS,
          ),
        },
        {
          path: "employee-summary/:id",
          element: withAdminPermission(
            <EmployeeSummary />,
            DASHBOARD_PERMISSIONS.EMPLOYEES_DETAILS,
          ),
        },
        {
          path: "employee-details/:id",
          element: withAdminPermission(
            <CreateEmployee />,
            DASHBOARD_PERMISSIONS.EMPLOYEES_EDIT,
          ),
        },
        {
          path: "complete-employee-data/:id",
          element: withAdminPermission(
            <CompleteDraftedUsers />,
            EMPLOYEE_CREATE_PERMISSIONS,
          ),
        },
        {
          path: "shared-groups/:id",
          element: withAdminPermission(
            <SharedGroups />,
            DASHBOARD_PERMISSIONS.EMPLOYEES_DETAILS,
          ),
        },
        {
          path: "resuems/:id",
          element: withAdminPermission(
            <ResuemeDetails />,
            DASHBOARD_PERMISSIONS.RESUMES,
          ),
        },
        {
          path: "contracts/:userId/:id",
          element: withAdminPermission(
            <DashboardContractDetails />,
            DASHBOARD_PERMISSIONS.USERS_DETAILS,
          ),
        },
        {
          path: "community-post-details/:id",
          element: withAdminPermission(
            <CommunityPostDetails />,
            DASHBOARD_PERMISSIONS.COMMUNITIES,
          ),
        },

        {
          path: "list-management",
          element: withAdminPermission(
            <ListManagement />,
            LIST_MANAGEMENT_PERMISSIONS,
          ),
          children: [
            {
              index: true,
              element: withAdminPermission(
                <WorkingGroups />,
                DASHBOARD_PERMISSIONS.WORKING_GROUPS,
              ),
            },
            {
              path: "working-groups",
              element: withAdminPermission(
                <WorkingGroups />,
                DASHBOARD_PERMISSIONS.WORKING_GROUPS,
              ),
            },
            {
              path: "operating-sectors",
              element: withAdminPermission(
                <OperatingSectors />,
                DASHBOARD_PERMISSIONS.REGIONS,
              ),
            },
            {
              path: "fields-and-specializations",
              element: withAdminPermission(
                <FieldsAndSpecializations />,
                [
                  DASHBOARD_PERMISSIONS.CATEGORIES,
                  DASHBOARD_PERMISSIONS.SUBCATEGORIES,
                ],
              ),
            },
            {
              path: "administrative-systems",
              element: withAdminPermission(
                <AdministrativeSystems />,
                DASHBOARD_PERMISSIONS.TASK_SYSTEMS,
              ),
            },
          ],
        },
        {
          path: "reports",
          element: withAdminPermission(
            <Reports />,
            DASHBOARD_PERMISSIONS.REPORTS,
          ),
          children: [
            {
              index: true,
              element: <ActiveUserTab />,
            },
            {
              path: "users",
              element: <ActiveUserTab />,
            },
            {
              path: "services",
              element: <ActiveServiceTab />,
            },
            {
              path: "contracts",
              element: <ContractsTab />,
            },
            {
              path: "communities",
              element: <CommunitiesTab />,
            },
            {
              path: "sales",
              element: <SalesTab />,
            },
          ],
        },

        {
          path: "violations-management",
          element: withAdminPermission(
            <ViolationsManagment />,
            DASHBOARD_PERMISSIONS.SETTINGS,
          ),
        },
        {
          path: "social-links-management",
          element: withAdminPermission(
            <SocialLinksManage />,
            DASHBOARD_PERMISSIONS.SOCIAL_LINKS,
          ),
        },
        {
          path: "content-management",
          element: withAdminPermission(
            <ContentManagment />,
            DASHBOARD_PERMISSIONS.SETTINGS,
          ),
        },
        {
          path: "faq-management",
          element: withAdminPermission(
            <FaqManagment />,
            DASHBOARD_PERMISSIONS.FAQS,
          ),
        },
        {
          path: "tasks-management",
          element: withAdminPermission(
            <TasksManagment />,
            DASHBOARD_PERMISSIONS.SETTINGS,
          ),
        },
        {
          path: "subscription-management",
          element: withAdminPermission(
            <SubscriptionManagement />,
            DASHBOARD_PERMISSIONS.SETTINGS,
          ),
        },
        {
          path: "banners",
          element: withAdminPermission(
            <Banners />,
            DASHBOARD_PERMISSIONS.BANNERS,
          ),
        },
        {
          path: "nationalities-management",
          element: withAdminPermission(
            <Nationalities />,
            DASHBOARD_PERMISSIONS.SETTINGS,
          ),
        },
        {
          path: "about-content",
          element: withAdminPermission(
            <AboutTasamiiContent />,
            DASHBOARD_PERMISSIONS.SETTINGS,
          ),
        },
        {
          path: "public-notifications",
          element: withAdminPermission(
            <PublicNotifications />,
            DASHBOARD_PERMISSIONS.GENERAL_NOTIFICATIONS,
          ),
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
  ],
  { basename: getBasename() },
);
