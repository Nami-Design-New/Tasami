import { describe, expect, it } from "vitest";
import {
  flattenGrantedPermissions,
  getTakenPermissionItems,
  hasAnyPermission,
  hasPermission,
} from "./dashboardPermissions";

const permissionGroups = [
  {
    id: 1,
    title: "General",
    permissions: [
      { id: 10, name: "dh-home", title: "Home", is_taken: true },
      { id: 11, name: "dh-tasks", title: "Tasks", is_taken: false },
    ],
  },
  {
    id: 2,
    title: "Team",
    permissions: [
      { id: 12, name: "dh-employees", title: "Employees", is_taken: true },
      { id: 13, name: "dh-permissions-edit", title: "Edit", is_taken: true },
    ],
  },
];

describe("dashboard permissions", () => {
  it("flattens only granted permission names", () => {
    expect(flattenGrantedPermissions(permissionGroups)).toEqual([
      "dh-home",
      "dh-employees",
      "dh-permissions-edit",
    ]);
  });

  it("handles missing or empty permission groups", () => {
    expect(flattenGrantedPermissions()).toEqual([]);
    expect(flattenGrantedPermissions(null)).toEqual([]);
    expect(hasPermission([], "dh-home")).toBe(false);
  });

  it("checks one or many permission requirements", () => {
    expect(hasPermission(permissionGroups, "dh-home")).toBe(true);
    expect(hasPermission(permissionGroups, "dh-tasks")).toBe(false);
    expect(hasAnyPermission(permissionGroups, ["dh-tasks", "dh-employees"]))
      .toBe(true);
    expect(hasAnyPermission(permissionGroups, ["dh-tasks", "dh-users"]))
      .toBe(false);
  });

  it("returns granted permission items with their group metadata", () => {
    expect(getTakenPermissionItems(permissionGroups)).toEqual([
      expect.objectContaining({
        id: 10,
        name: "dh-home",
        group_id: 1,
        group_title: "General",
      }),
      expect.objectContaining({
        id: 12,
        name: "dh-employees",
        group_id: 2,
        group_title: "Team",
      }),
      expect.objectContaining({
        id: 13,
        name: "dh-permissions-edit",
        group_id: 2,
        group_title: "Team",
      }),
    ]);
  });
});

