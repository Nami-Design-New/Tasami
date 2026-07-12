import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";
import adminAuth from "../redux/slices/authAdmin";
import RequireAdminPermission from "./RequireAdminPermission";
import { DASHBOARD_PERMISSIONS } from "../utils/dashboardPermissions";

vi.mock("../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

const renderRoute = (grantedPermissions, requiredPermission) => {
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
              permissions: grantedPermissions.map((name, index) => ({
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

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/dashboard/tasks"]}>
        <Routes>
          <Route
            path="/dashboard/tasks"
            element={
              <RequireAdminPermission permission={requiredPermission}>
                <div>Tasks page</div>
              </RequireAdminPermission>
            }
          />
          <Route path="/forbidden" element={<div>Forbidden page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("RequireAdminPermission", () => {
  it("renders the route when permission is granted", () => {
    renderRoute(
      [DASHBOARD_PERMISSIONS.TASKS],
      DASHBOARD_PERMISSIONS.TASKS,
    );

    expect(screen.getByText("Tasks page")).toBeInTheDocument();
  });

  it("redirects to forbidden when permission is missing", async () => {
    renderRoute(
      [DASHBOARD_PERMISSIONS.HOME],
      DASHBOARD_PERMISSIONS.TASKS,
    );

    expect(await screen.findByText("Forbidden page")).toBeInTheDocument();
  });
});
