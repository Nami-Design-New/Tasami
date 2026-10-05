import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PermissionBoard from "./PermissionBoard";

const { editPermissions, toastSuccess, toastError } = vi.hoisted(() => ({
  editPermissions: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      ({
        "dashboard.permissions.title": "Permissions",
        "dashboard.permissions.searchPlaceholder": "Search permissions",
        "dashboard.permissions.selectAll": "Select all",
        "dashboard.permissions.update": "Update",
      })[key] || key,
  }),
}));

vi.mock("../../../hooks/dashboard/shared/useGetPermissions", () => ({
  default: () => ({
    permissions: {
      data: [
        {
          id: 10,
          title: "Employee management",
          permissions: [
            { id: 1, title: "View employee" },
            { id: 2, title: "Edit employee" },
          ],
        },
      ],
    },
    isLoading: false,
  }),
}));

vi.mock("../../../hooks/dashboard/employee/useGetEmployee", () => ({
  default: () => ({
    employee: {
      data: {
        id: 50,
        permissions: [
          {
            id: 10,
            permissions: [
              { id: 1, is_taken: true },
              { id: 2, is_taken: false },
            ],
          },
        ],
      },
    },
    isLoading: false,
  }),
}));

vi.mock("../../../hooks/dashboard/employee/useEditPermissions", () => ({
  default: () => ({
    editPermissions,
    isPending: false,
  }),
}));

vi.mock("../../../hooks/auth/dashboard/useAdminPermissions", () => ({
  default: () => ({
    hasPermission: () => true,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: toastSuccess,
    error: toastError,
  },
}));

const renderPermissionBoard = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <MemoryRouter initialEntries={["/dashboard/employee-details/50?tab=2"]}>
      <QueryClientProvider client={queryClient}>
        <PermissionBoard />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

const openPermissionGroup = () => {
  fireEvent.click(screen.getByText("Employee management"));
};

const submitPermissions = () => {
  fireEvent.click(screen.getByRole("button", { name: "Update" }));
};

const expectSubmittedPermissions = async (permissions) => {
  await waitFor(() => expect(editPermissions).toHaveBeenCalledOnce());
  expect(editPermissions.mock.calls[0][0]).toEqual({
    employee_id: 50,
    permissions,
  });
};

describe("PermissionBoard", () => {
  beforeEach(() => {
    editPermissions.mockReset();
    toastSuccess.mockReset();
    toastError.mockReset();
  });

  it("submits a newly selected permission with existing permissions", async () => {
    renderPermissionBoard();
    openPermissionGroup();

    fireEvent.click(screen.getByLabelText("Edit employee"));
    submitPermissions();

    await expectSubmittedPermissions([1, 2]);
  });

  it("removes a deselected permission from the payload", async () => {
    renderPermissionBoard();
    openPermissionGroup();

    fireEvent.click(screen.getByLabelText("View employee"));
    submitPermissions();

    await expectSubmittedPermissions([]);
  });

  it("submits every group permission after select all", async () => {
    renderPermissionBoard();
    openPermissionGroup();

    fireEvent.click(screen.getByLabelText("Select all"));
    submitPermissions();

    await expectSubmittedPermissions([1, 2]);
  });

  it("preserves unopened permissions and shows the success notification", async () => {
    editPermissions.mockImplementationOnce((payload, options) => {
      options.onSuccess({ message: "Permissions updated" });
    });
    renderPermissionBoard();

    submitPermissions();

    await expectSubmittedPermissions([1]);
    expect(toastSuccess).toHaveBeenCalledWith("Permissions updated");
  });
});
