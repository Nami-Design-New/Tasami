import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AccountStatusModal from "./AccountStatusModal";

const mocks = vi.hoisted(() => ({
  updateAccountStatus: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock(
  "../../hooks/dashboard/accountStatus/useUpdateAccountStatus",
  () => ({
    default: () => ({
      updateAccountStatus: mocks.updateAccountStatus,
      isPending: false,
    }),
  }),
);

vi.mock("../forms/FileUPloader", () => ({
  default: ({ files, label, onFilesChange }) => (
    <div>
      <span data-testid="file-count">{files.length}</span>
      <button
        type="button"
        onClick={() =>
          onFilesChange([...files, new File(["proof"], "proof.pdf")])
        }
      >
        {label}
      </button>
    </div>
  ),
}));

vi.mock("sonner", () => ({
  toast: {
    success: mocks.toastSuccess,
    error: mocks.toastError,
  },
}));

const translations = {
  "dashboard.userProfile.accountStatusModal.title": "Account Status",
  "dashboard.userProfile.accountStatusModal.status": "Status",
  "dashboard.userProfile.accountStatusModal.currentStatus": "Current status",
  "dashboard.userProfile.accountStatusModal.active": "Active",
  "dashboard.userProfile.accountStatusModal.suspended": "Suspended",
  "dashboard.userProfile.accountStatusModal.fromDate": "Suspended From",
  "dashboard.userProfile.accountStatusModal.toDate": "Suspended To",
  "dashboard.userProfile.accountStatusModal.noEndDate": "No end date",
  "dashboard.userProfile.accountStatusModal.hasEndDate": "Set an end date",
  "dashboard.userProfile.accountStatusModal.duration": "Suspension Duration",
  "dashboard.userProfile.accountStatusModal.indefinite": "Indefinite",
  "dashboard.userProfile.accountStatusModal.reason": "Suspension reason",
  "dashboard.userProfile.accountStatusModal.reasonLabel": "Suspension reason",
  "dashboard.userProfile.accountStatusModal.attachments": "Attachments",
  "dashboard.userProfile.accountStatusModal.attachment": "Attachment",
  "dashboard.userProfile.accountStatusModal.addFiles": "Add files",
  "dashboard.userProfile.accountStatusModal.fileLimit": "Up to 5 files",
  "dashboard.userProfile.accountStatusModal.noAttachments": "No attachments",
  "dashboard.userProfile.accountStatusModal.activeTitle": "Account Active",
  "dashboard.userProfile.accountStatusModal.activeMessage":
    "This account currently has full access.",
  "dashboard.userProfile.accountStatusModal.saveChanges": "Save Changes",
  "dashboard.userProfile.accountStatusModal.suspendAccount": "Suspend Account",
  "dashboard.userProfile.accountStatusModal.activateConfirmation":
    "Are you sure you want to activate this account?",
  "dashboard.userProfile.accountStatusModal.confirmActivation":
    "Confirm Activation",
  "dashboard.userProfile.accountStatusModal.cancel": "Cancel",
  "dashboard.userProfile.accountStatusModal.close": "Close",
  "dashboard.userProfile.accountStatusModal.startRequired": "Start required",
  "dashboard.userProfile.accountStatusModal.endRequired": "End required",
  "dashboard.userProfile.accountStatusModal.endAfterStart":
    "End must follow start",
  "dashboard.userProfile.accountStatusModal.reasonMax": "Reason too long",
  "dashboard.userProfile.accountStatusModal.filesMin": "File required",
  "dashboard.userProfile.accountStatusModal.filesMax": "Too many files",
  "dashboard.userProfile.accountStatusModal.staleConflict": "Status refreshed",
  "dashboard.userProfile.accountStatusModal.updateFailed": "Update failed",
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => translations[key] || key,
    i18n: { dir: () => "ltr" },
  }),
}));

const renderModal = (props = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const defaultProps = {
    show: true,
    onHide: vi.fn(),
    userDetails: { id: 7, status: "active", current_suspension: null },
    canChangeStatus: true,
  };

  render(
    <QueryClientProvider client={queryClient}>
      <AccountStatusModal {...defaultProps} {...props} />
    </QueryClientProvider>,
  );

  return { queryClient, ...defaultProps, ...props };
};

const getPayload = () => mocks.updateAccountStatus.mock.calls[0][0];

describe("AccountStatusModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("creates a dated user suspension from the same modal", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("tab", { name: "Suspended" }));
    await user.type(screen.getByLabelText("Suspended From"), "2026-07-12");
    await user.click(screen.getByLabelText("Set an end date"));
    await user.type(screen.getByLabelText("Suspended To"), "2026-08-12");
    await user.type(screen.getByLabelText("Suspension reason"), "Policy review");
    await user.click(screen.getByRole("button", { name: "Add files" }));
    await user.click(screen.getByRole("button", { name: "Suspend Account" }));

    const { accountType, id, payload } = getPayload();
    expect(accountType).toBe("user");
    expect(id).toBe(7);
    expect(payload.get("status")).toBe("stopped");
    expect(payload.get("from_date")).toBe("2026-07-12");
    expect(payload.get("to_date")).toBe("2026-08-12");
    expect(payload.get("reason")).toBe("Policy review");
    expect(payload.get("version")).toBe("0");
    expect(payload.get("files[]")).toBeInstanceOf(File);
  });

  it("creates an indefinite suspension with an empty end date", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("tab", { name: "Suspended" }));
    await user.type(screen.getByLabelText("Suspended From"), "2026-07-12");
    await user.click(screen.getByRole("button", { name: "Add files" }));
    await user.click(screen.getByRole("button", { name: "Suspend Account" }));

    expect(getPayload().payload.get("to_date")).toBe("");
    expect(screen.getByText("No end date")).toBeInTheDocument();
  });

  it("prefills and updates a suspension while retaining its attachment", async () => {
    const user = userEvent.setup();
    const { queryClient, onHide } = renderModal({
      userDetails: {
        id: 7,
        status: "stopped",
        current_suspension: {
          id: 42,
          from_date: "2026-07-12",
          to_date: "2026-08-12",
          reason: "Original reason",
          files: [{ id: 8, name: "proof.pdf", url: "/proof.pdf" }],
          version: 3,
          can_edit_from_date: false,
        },
      },
    });
    const refetchQueries = vi
      .spyOn(queryClient, "refetchQueries")
      .mockResolvedValue();

    expect(screen.getByLabelText("Suspended From")).toBeDisabled();
    expect(screen.getByLabelText("Suspended To")).toHaveValue("2026-08-12");
    expect(screen.getByLabelText("Suspension reason")).toHaveValue(
      "Original reason",
    );
    expect(screen.getByTestId("file-count")).toHaveTextContent("1");

    await waitFor(() =>
      expect(screen.getByLabelText("Suspended To")).toBeEnabled(),
    );
    await user.clear(screen.getByLabelText("Suspended To"));
    await user.type(screen.getByLabelText("Suspended To"), "2026-09-12");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    const payload = getPayload().payload;
    expect(payload.get("suspension_id")).toBe("42");
    expect(payload.get("version")).toBe("3");
    expect(payload.get("to_date")).toBe("2026-09-12");
    expect(payload.get("keep_file_ids[]")).toBe("8");

    const [, callbacks] = mocks.updateAccountStatus.mock.calls[0];
    await callbacks.onSuccess({
      message: "Suspension updated",
      data: {
        status: "stopped",
        current_suspension: {
          id: 42,
          to_date: "2026-09-12",
        },
      },
    });

    expect(refetchQueries).toHaveBeenCalledWith({
      queryKey: ["user-details", 7],
      type: "active",
    });
    expect(
      queryClient.getQueryData(["user-details", 7]).data.current_suspension
        .version,
    ).toBe(4);
    expect(onHide).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    expect(
      mocks.updateAccountStatus.mock.calls[1][0].payload.get("version"),
    ).toBe("4");
  });

  it("adds an end date to an indefinite suspension", async () => {
    const user = userEvent.setup();
    renderModal({
      userDetails: {
        id: 7,
        status: "stopped",
        current_suspension: {
          id: 42,
          from_date: "2026-07-12",
          to_date: null,
          reason: "",
          files: [{ id: 8, name: "proof.pdf", url: "/proof.pdf" }],
          version: 3,
          can_edit_from_date: false,
        },
      },
    });

    expect(screen.getByText("No end date")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Set an end date"));
    await user.type(screen.getByLabelText("Suspended To"), "2026-09-12");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(getPayload().payload.get("to_date")).toBe("2026-09-12");
  });

  it("activates a suspended account only after confirmation", async () => {
    const user = userEvent.setup();
    const { queryClient } = renderModal({
      userDetails: {
        id: 7,
        status: "stopped",
        current_suspension: {
          id: 42,
          from_date: "2026-07-12",
          to_date: null,
          reason: "",
          files: [],
          version: 3,
          can_edit_from_date: false,
        },
      },
    });
    const refetchQueries = vi
      .spyOn(queryClient, "refetchQueries")
      .mockResolvedValue();

    await user.click(screen.getByRole("tab", { name: "Active" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Are you sure you want to activate this account?",
    );
    await user.click(screen.getByRole("button", { name: "Confirm Activation" }));

    const { payload } = getPayload();
    expect(payload.get("status")).toBe("active");
    expect(payload.get("suspension_id")).toBe("42");
    expect(payload.get("version")).toBe("3");

    const [, callbacks] = mocks.updateAccountStatus.mock.calls[0];
    await callbacks.onSuccess({
      message: "Account activated",
      data: { status: "active", current_suspension: null },
    });
    expect(mocks.toastSuccess).toHaveBeenCalledWith("Account activated");
    expect(refetchQueries).toHaveBeenCalledWith({
      queryKey: ["user-details", 7],
      type: "active",
    });
    expect(
      queryClient.getQueryData(["user-details", 7]).data.status,
    ).toBe("active");
  });

  it("renders the suspended account as read-only without mutation actions", () => {
    renderModal({
      canChangeStatus: false,
      userDetails: {
        id: 7,
        status: "stopped",
        current_suspension: {
          id: 42,
          from_date: "2026-07-12",
          to_date: null,
          reason: "Read only reason",
          files: [{ id: 8, name: "proof.pdf", url: "/proof.pdf" }],
          version: 3,
          can_edit_from_date: false,
        },
      },
    });

    expect(screen.getByRole("tab", { name: "Active" })).toBeDisabled();
    expect(screen.getByRole("tab", { name: "Suspended" })).toBeDisabled();
    expect(screen.getByLabelText("Suspension reason")).toBeDisabled();
    expect(screen.getByRole("link", { name: "proof.pdf" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Save Changes" }),
    ).not.toBeInTheDocument();
  });

  it("refreshes employee details when an employee update succeeds", async () => {
    const user = userEvent.setup();
    const { queryClient } = renderModal({
      isUser: false,
      userDetails: { id: 12, status: "active", current_suspension: null },
    });
    const refetchQueries = vi
      .spyOn(queryClient, "refetchQueries")
      .mockResolvedValue();

    await user.click(screen.getByRole("tab", { name: "Suspended" }));
    await user.type(screen.getByLabelText("Suspended From"), "2026-07-12");
    await user.click(screen.getByRole("button", { name: "Add files" }));
    await user.click(screen.getByRole("button", { name: "Suspend Account" }));

    expect(getPayload().accountType).toBe("employee");
    const [, callbacks] = mocks.updateAccountStatus.mock.calls[0];
    await callbacks.onSuccess({
      message: "Employee suspended",
      data: {
        status: "stopped",
        current_suspension: { id: 50, version: 1 },
      },
    });
    expect(refetchQueries).toHaveBeenCalledWith({
      queryKey: ["dashboard-employee-details", 12],
      type: "active",
    });
    expect(
      queryClient.getQueryData(["dashboard-employee-details", 12]).data
        .current_suspension.version,
    ).toBe(1);
  });

  it("reloads server data after a stale-version conflict", async () => {
    const user = userEvent.setup();
    const { queryClient } = renderModal();
    const refetchQueries = vi
      .spyOn(queryClient, "refetchQueries")
      .mockResolvedValue();

    await user.click(screen.getByRole("tab", { name: "Suspended" }));
    await user.type(screen.getByLabelText("Suspended From"), "2026-07-12");
    await user.click(screen.getByRole("button", { name: "Add files" }));
    await user.click(screen.getByRole("button", { name: "Suspend Account" }));

    const [, callbacks] = mocks.updateAccountStatus.mock.calls[0];
    await callbacks.onError({
      response: {
        status: 409,
        data: {
          data: {
            status: "stopped",
            current_suspension: { id: 42, version: 4 },
          },
        },
      },
    });

    expect(mocks.toastError).toHaveBeenCalledWith("Status refreshed");
    expect(refetchQueries).toHaveBeenCalledWith({
      queryKey: ["user-details", 7],
      type: "active",
    });
    expect(
      queryClient.getQueryData(["user-details", 7]).data.current_suspension
        .version,
    ).toBe(4);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
