export const DASHBOARD_PERMISSIONS = {
  HOME: "dh-home",
  TASKS: "dh-tasks",
  TASKS_CREATE: "dh-tasks-create",
  TASKS_REASSIGN: "dh-tasks-reassign",
  REPORTS: "dh-reports",
  WITHDRAW_REQUESTS: "dh-withdraw-requests",
  USERS: "dh-users",
  GOALS: "dh-goals",
  HELP_REQUESTS: "dh-help-requests",
  PROGRAMS: "dh-programs",
  COMMUNITIES: "dh-communities",
  RESUMES: "dh-resuems",
  USERS_DETAILS: "dh-users-details",
  STOP_USERS: "dh-stop-users",
  EMPLOYEES: "dh-employees",
  EMPLOYEES_CREATE_DRAFT: "dh-employees-create-draft",
  EMPLOYEES_CREATE: "dh-employees-create",
  EMPLOYEES_EDIT: "dh-employees-edit",
  EMPLOYEES_DETAILS: "dh-employees-details",
  STOP_EMPLOYEE: "dh-stop-employee",
  PERMISSIONS: "dh-permissions",
  PERMISSIONS_EDIT: "dh-permissions-edit",
  REGIONS: "dh-regions",
  WORKING_GROUPS: "dh-working-groups",
  CATEGORIES: "dh-categories",
  SUBCATEGORIES: "dh-subcategories",
  TASK_SYSTEMS: "dh-task-systems",
  BANNERS: "dh-banners",
  FAQS: "dh-fqs",
  SETTINGS: "dh-settings",
  GENERAL_NOTIFICATIONS: "dh-general-notifications",
  SOCIAL_LINKS: "dh-social-links",
};

export const EMPLOYEE_CREATE_PERMISSIONS = [
  DASHBOARD_PERMISSIONS.EMPLOYEES_CREATE,
  DASHBOARD_PERMISSIONS.EMPLOYEES_CREATE_DRAFT,
];

export const LIST_MANAGEMENT_PERMISSIONS = [
  DASHBOARD_PERMISSIONS.REGIONS,
  DASHBOARD_PERMISSIONS.WORKING_GROUPS,
  DASHBOARD_PERMISSIONS.CATEGORIES,
  DASHBOARD_PERMISSIONS.SUBCATEGORIES,
  DASHBOARD_PERMISSIONS.TASK_SYSTEMS,
];

export const WEBSITE_MANAGEMENT_PERMISSIONS = [
  DASHBOARD_PERMISSIONS.BANNERS,
  DASHBOARD_PERMISSIONS.FAQS,
  DASHBOARD_PERMISSIONS.SETTINGS,
  DASHBOARD_PERMISSIONS.GENERAL_NOTIFICATIONS,
  DASHBOARD_PERMISSIONS.SOCIAL_LINKS,
];

export const SUBSCRIBERS_AND_TEAM_PERMISSIONS = [
  DASHBOARD_PERMISSIONS.USERS,
  DASHBOARD_PERMISSIONS.GOALS,
  DASHBOARD_PERMISSIONS.HELP_REQUESTS,
  DASHBOARD_PERMISSIONS.PROGRAMS,
  DASHBOARD_PERMISSIONS.COMMUNITIES,
  DASHBOARD_PERMISSIONS.RESUMES,
  DASHBOARD_PERMISSIONS.EMPLOYEES,
];

export const normalizePermissionRequirement = (permission) => {
  if (!permission) return [];
  return Array.isArray(permission) ? permission.filter(Boolean) : [permission];
};

export const flattenGrantedPermissions = (groups = []) => {
  if (!Array.isArray(groups)) return [];

  return groups.flatMap((group) =>
    Array.isArray(group?.permissions)
      ? group.permissions
          .filter((permission) => permission?.is_taken && permission?.name)
          .map((permission) => permission.name)
      : [],
  );
};

export const getGrantedPermissionSet = (groups = []) =>
  new Set(flattenGrantedPermissions(groups));

export const hasPermission = (groups = [], permission) => {
  if (!permission) return true;
  return getGrantedPermissionSet(groups).has(permission);
};

export const hasAnyPermission = (groups = [], permissions) => {
  const requiredPermissions = normalizePermissionRequirement(permissions);
  if (requiredPermissions.length === 0) return true;

  const grantedPermissionSet = getGrantedPermissionSet(groups);
  return requiredPermissions.some((permission) =>
    grantedPermissionSet.has(permission),
  );
};

export const getTakenPermissionItems = (groups = []) => {
  if (!Array.isArray(groups)) return [];

  return groups.flatMap((group) =>
    Array.isArray(group?.permissions)
      ? group.permissions
          .filter((permission) => permission?.is_taken)
          .map((permission) => ({
            ...permission,
            group_id: group.id,
            group_title: group.title,
          }))
      : [],
  );
};

