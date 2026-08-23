import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import GoalDetails from "./GoalDetails";

const deletedGoalMessage = "الصفحة او المسار غير موجود او تم حذفه";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) =>
      key === "website.offerDetails.goalUnavailable"
        ? "This goal is no longer available"
        : key,
  }),
}));

vi.mock("react-redux", () => ({
  useSelector: (selector) =>
    selector({
      authRole: { user: null },
      language: { lang: "en" },
    }),
}));

vi.mock("../../hooks/website/goals/useGetGoalDetails", () => ({
  default: () => ({
    goalDetails: undefined,
    isLoading: false,
    error: {
      response: {
        status: 422,
        data: { code: 422, message: deletedGoalMessage },
      },
    },
  }),
}));

vi.mock("../../hooks/website/goals/useToggleSavedGoals", () => ({
  default: () => ({ toggleSaveGoal: vi.fn(), isPending: false }),
}));

vi.mock("../../hooks/website/useGetCountersNotify", () => ({
  default: () => ({ counterNotify: undefined, isLoading: false }),
}));

vi.mock("../../ui/loading/Loading", () => ({
  default: () => <div>Loading</div>,
}));

describe("GoalDetails", () => {
  it("shows the backend message when the referenced goal was deleted", () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/goal/750"]}>
          <GoalDetails />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText(deletedGoalMessage)).toBeInTheDocument();
  });
});
