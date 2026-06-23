export const DEFAULT_GROUP_LIMIT = 10;

export function getActiveGroupsCount(user) {
  const activeGroups = user?.active_groups;

  return Array.isArray(activeGroups)
    ? activeGroups.length
    : Number(activeGroups) || 0;
}

export function getGroupLimit(user) {
  return (
    Number(user?.my_package_details?.package?.groups_count) ||
    DEFAULT_GROUP_LIMIT
  );
}

export function hasReachedGroupLimit(user) {
  return getActiveGroupsCount(user) >= getGroupLimit(user);
}
