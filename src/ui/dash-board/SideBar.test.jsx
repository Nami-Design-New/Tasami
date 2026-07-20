import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import adminAuth from "../../redux/slices/authAdmin";
import SideBar from "./SideBar";
import { DASHBOARD_PERMISSIONS } from "../../utils/dashboardPermissions";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const language = (state = { lang: "en" }) => state;

const renderSidebar = (permissions) => {
  const store = configureStore({
    reducer: {
      adminAuth,
      language,
    },
    preloadedState: {
      language: { lang: "en" },
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

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <SideBar
          collapsed={false}
          hoverExpand={false}
          setHoverExpand={vi.fn()}
        />
      </MemoryRouter>
    </Provider>,
  );
};

describe("SideBar permissions", () => {
  it("hides dashboard links and sections without matching permissions", () => {
    renderSidebar([
      DASHBOARD_PERMISSIONS.HOME,
      DASHBOARD_PERMISSIONS.TASKS,
      DASHBOARD_PERMISSIONS.USERS,
    ]);

    expect(screen.getByText("dashboard.main")).toBeInTheDocument();
    expect(screen.getByText("dashboard.my_tasks")).toBeInTheDocument();
    expect(screen.getByText("dashboard.subscribers")).toBeInTheDocument();
    expect(screen.queryByText("dashboard.performance_reports"))
      .not.toBeInTheDocument();
    expect(screen.queryByText("dashboard.withdraw_requests"))
      .not.toBeInTheDocument();
    expect(screen.queryByText("dashboard.website_management"))
      .not.toBeInTheDocument();
  });
});

