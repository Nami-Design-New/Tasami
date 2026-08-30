import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EncounterDetailsModal from "./EncounterDetailsModal";

const { useGetMeetingDetails, useGetMeetingDashDetails } = vi.hoisted(() => ({
  useGetMeetingDetails: vi.fn(() => ({
    meetingDetails: { id: 104, title: "Website meeting", link: "" },
    isLoading: false,
    error: null,
  })),
  useGetMeetingDashDetails: vi.fn(() => ({
    meetingDashDetails: { id: 104, title: "Dashboard meeting", link: "" },
    isLoading: false,
  })),
}));

let isDashboard = false;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { dir: () => "ltr" } }),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ refetchQueries: vi.fn() }),
}));

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("../../../../hooks/dashboard/checkDashboard/useCheckDashboard", () => ({
  default: () => isDashboard,
}));

vi.mock(
  "../../../../hooks/website/communities/mettings/useGetMeetingDetails",
  () => ({ default: useGetMeetingDetails }),
);

vi.mock(
  "../../../../hooks/dashboard/subscription/useGetMeetingDashDetails",
  () => ({ default: useGetMeetingDashDetails }),
);

vi.mock(
  "../../../../hooks/website/communities/mettings/useDeleteMeeting",
  () => ({ default: () => ({ deleteMeeting: vi.fn(), isMeetingDelete: false }) }),
);

vi.mock(
  "../../../../hooks/dashboard/subscription/community/useDeleteDhMeeting",
  () => ({
    default: () => ({ deleteDhMeeting: vi.fn(), isDhMeetingDelete: false }),
  }),
);

vi.mock("../../../GlobalModal", () => {
  const GlobalModal = function MockGlobalModal({ children }) {
    return <div>{children}</div>;
  };
  GlobalModal.Header = function MockHeader({ children }) {
    return <div>{children}</div>;
  };
  GlobalModal.Body = function MockBody({ children }) {
    return <div>{children}</div>;
  };
  return { default: GlobalModal };
});

describe("EncounterDetailsModal data source", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("never queries the dashboard endpoint from the website", () => {
    isDashboard = false;
    render(
      <EncounterDetailsModal show setShow={vi.fn()} meetingId={104} />,
    );

    expect(useGetMeetingDetails).toHaveBeenCalledWith(104, true);
    expect(useGetMeetingDashDetails).not.toHaveBeenCalled();
    expect(screen.getByText("Website meeting")).toBeInTheDocument();
  });

  it("never queries the website endpoint from the dashboard", () => {
    isDashboard = true;
    render(
      <EncounterDetailsModal show setShow={vi.fn()} meetingId={104} />,
    );

    expect(useGetMeetingDashDetails).toHaveBeenCalledWith(104, true);
    expect(useGetMeetingDetails).not.toHaveBeenCalled();
    expect(screen.getByText("Dashboard meeting")).toBeInTheDocument();
  });
});
