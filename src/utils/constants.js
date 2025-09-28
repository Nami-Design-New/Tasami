export const TASKS_TABS = [
  {
    icon: "/sys-icons/info.svg",
    alt: "main-info",
    label: "المهام التنفيذية",
    to: "executive-tasks",
  },
  {
    icon: "/sys-icons/media.svg",
    alt: "supervisory-tasks",
    label: "المهام الاشرافيه ",
    to: "supervisory-tasks",
  },
  {
    icon: "/sys-icons/ancor.svg",
    alt: "supervisory-tasks",
    label: "مهام خدمه العملاء",
    to: "customer-service-tasks",
  },
];

export const QUALIFICATION_VALUES = {
  BACHELOR: "bachelor",
  MASTER: "master",
  DOCTORATE: "doctorate",
  OTHER: "other",
};

export const CONSULTATION_TYPE = [
  { id: "1", title: "public", value: 0 },
  { id: "2", title: "private", value: 1 },
];

export const SUB_TABS = [
  { id: 1, label: "الحسابات", to: "user-accounts" },
  { id: 2, label: "الاهداف الشخصيه", to: "personal-goals" },
  { id: 3, label: "طلبات المساعده", to: "services" },
  { id: 4, label: "عروض المساعد ", to: "programs" },
  { id: 4, label: " المجتمعات ", to: "communities" },
  { id: 5, label: "السير الذاتيه", to: "resuems" },
];
export const REPORT_TABS = [
  { id: 1, label: "المستخدمون", to: "/dashboard/reports/users" },
  { id: 2, label: "الخدمات", to: "/dashboard/reports/services" },
  { id: 3, label: "العقود", to: "/dashboard/reports/contracts" },
  { id: 4, label: "المجتمعات", to: "/dashboard/reports/communities" },
  { id: 4, label: "المبيعات", to: "/dashboard/reports/sales" },
];

export const STATUS_AR = ["مكتمل", "قيد التنفيذ", "غير مضاف"];
export const STATUS_EN = ["Completed", "Pending", "Not Added"];
export const ROLE_REDIRECTS = {
  dashboard: "/dashboard",
};
export const USERS_CATEGORIES = [
  "متسفيد",
  " (اساسي) مقدم برامج",
  "(متميز) مقدم برامج",
  " (رواد)  مقدم برامج",
];

export const USER_ACCOUNT_STATUS = [
  {
    status: "نشط",
    color: "#28A745",
  },
  {
    status: "غير نشط",
    color: "#007BFF",
  },
  {
    status: "موقوف",
    color: "#DC3545",
  },
];

export const PROGRAMS_STATUS = [
  {
    status: "محذوفه",
    color: "",
  },
  {
    status: "مؤرشفه",
    color: "",
  },
  {
    status: "النشطه",
    color: "",
  },
];

export const tasksStatus = [
  {
    status: "مكتمل",
    color: "",
  },
  {
    status: "غير مكتمل",
    color: "",
  },
  {
    status: "مضاف",
    color: "",
  },
];

export const WORKING_GROPUS_CALSSIFICATIONS = ["operational", "administrative"];
