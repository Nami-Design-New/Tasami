import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import adminAuth from "../../redux/slices/authAdmin";
import PermissionGate from "./PermissionGate";
import { DASHBOARD_PERMISSIONS } from "../../utils/dashboardPermissions";

const renderWithPermissions = (permissions, ui) => {
  const store = configureStore({
    reducer: {
      adminAuth,
    },
    preloadedState: {
      adminAuth: {
        user: {
          permissions: [
            {
              id: 1,
              permissions: permissions.map((name, index) => ({
                id: index + 1,
                name,
                title: name,
                is_taken: true,
              })),
            },
          ],
        },
        role: null,
        isAuthed: true,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("PermissionGate", () => {
  it("shows only actions with granted permissions", () => {
    renderWithPermissions(
      [DASHBOARD_PERMISSIONS.TASKS_REASSIGN],
      <>
        <PermissionGate permission={DASHBOARD_PERMISSIONS.TASKS_CREATE}>
          <button>Create task</button>
        </PermissionGate>
        <PermissionGate permission={DASHBOARD_PERMISSIONS.TASKS_REASSIGN}>
          <button>Reassign task</button>
        </PermissionGate>
        <PermissionGate permission={DASHBOARD_PERMISSIONS.PERMISSIONS_EDIT}>
          <button>Edit permissions</button>
        </PermissionGate>
      </>,
    );

    expect(screen.queryByText("Create task")).not.toBeInTheDocument();
    expect(screen.getByText("Reassign task")).toBeInTheDocument();
    expect(screen.queryByText("Edit permissions")).not.toBeInTheDocument();
  });
});

