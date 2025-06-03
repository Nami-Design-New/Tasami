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

export const SUB_TABS = [
  { id: 1, label: "الحسابات", to: "user-accounts" },
  { id: 2, label: "البرامج ", to: "programs" },
  { id: 3, label: "الخدمات", to: "services" },
  { id: 4, label: "السير الذاتيه", to: "resuems" },
];

export const STATUS_AR = ["مكتمل", "قيد التنفيذ", "غير مضاف"];
export const STATUS_EN = ["Completed", "Pending", "Not Added"];

export const USERS_CATEGORIES = [
  "متسفيد",
  " (ملهم) مقدم برامج",
  "(خبير) مقدم برامج",
  " (جدير)  مقدم برامج",
];
