import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { describe, expect, it, vi } from "vitest";
import NotificationCard from "./NotificationCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../../hooks/website/notification/useMarkAsRead", () => ({
  default: () => ({ markAsRead: vi.fn(), isPending: false }),
}));

vi.mock("../../../hooks/website/notification/useDeleteNotification", () => ({
  default: () => ({ deleteNotification: vi.fn(), isPending: false }),
}));

const Location = () => {
  const location = useLocation();
  return (
    <span data-testid="location">
      {location.pathname}
      {location.search}
    </span>
  );
};

describe("NotificationCard", () => {
  it("opens meeting details for a meeting notification", () => {
    const { container } = render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={["/notifications"]}>
          <NotificationCard
            item={{
              id: 1,
              type: "meeting",
              operation_id: 55,
              community_id: 77,
              is_read: true,
            }}
          />
          <Location />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    fireEvent.click(container.querySelector(".notification-web-card"));

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/community/77/meetings?meeting_id=55",
    );
  });
});
