import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import GoalsHelpSection from "./GoalsHelpSection";

const navigate = vi.fn();
let counterQuery;
let currentUser;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("react-redux", () => ({
  useSelector: (selector) =>
    selector({
      language: { lang: "en" },
      authRole: { user: currentUser },
    }),
}));

vi.mock("react-router", () => ({
  useNavigate: () => navigate,
}));

vi.mock("../../../hooks/website/useGetCountersNotify", () => ({
  default: () => counterQuery,
}));

vi.mock("../../../hooks/website/my-groups/useFirstGroupGuard", () => ({
  default: () => ({
    requestAssistanceCreation: vi.fn(),
    showFirstGroupWarning: false,
    closeFirstGroupWarning: vi.fn(),
    createFirstGroup: vi.fn(),
  }),
}));

vi.mock("../gaols/AddGoalModal", () => ({
  default: ({ showModal }) =>
    showModal ? <div data-testid="add-goal-modal" /> : null,
}));

vi.mock("../offers/AddAssistanceModal", () => ({
  default: () => null,
}));

vi.mock("../platform/PlatformModal", () => ({
  default: () => null,
}));

vi.mock("../platform/FirstGroupRequiredModal", () => ({
  default: () => null,
}));

vi.mock("../ActivityLimitAlert", () => ({
  default: ({ showModal, limit }) =>
    showModal ? <div data-testid="activity-limit-alert">{limit}</div> : null,
}));

describe("GoalsHelpSection activity limit", () => {
  beforeEach(() => {
    navigate.mockReset();
    currentUser = {
      country: { id: 1 },
      city: { id: 2 },
      nationality: { id: 3 },
    };
    counterQuery = {
      counterNotify: {
        activity_limits: {
          beneficiary: { active_count: 9, limit: 10, can_create: true },
        },
      },
      isLoading: false,
    };
  });

  it("opens the goal form below the beneficiary limit", async () => {
    const user = userEvent.setup();
    render(<GoalsHelpSection />);

    await user.click(
      screen.getByRole("button", { name: /website.hero.personalGoal/ }),
    );

    expect(screen.getByTestId("add-goal-modal")).toBeInTheDocument();
    expect(screen.queryByTestId("activity-limit-alert")).not.toBeInTheDocument();
  });

  it("shows the alert instead of the form at the beneficiary limit", async () => {
    counterQuery.counterNotify.activity_limits.beneficiary = {
      active_count: 10,
      limit: 10,
      can_create: false,
    };
    const user = userEvent.setup();
    render(<GoalsHelpSection />);

    await user.click(
      screen.getByRole("button", { name: /website.hero.personalGoal/ }),
    );

    expect(screen.getByTestId("activity-limit-alert")).toHaveTextContent("10");
    expect(screen.queryByTestId("add-goal-modal")).not.toBeInTheDocument();
  });

  it("falls back to backend validation when counters are unavailable", async () => {
    counterQuery = {
      counterNotify: undefined,
      isLoading: false,
      isError: true,
    };
    const user = userEvent.setup();
    render(<GoalsHelpSection />);

    await user.click(
      screen.getByRole("button", { name: /website.hero.personalGoal/ }),
    );

    expect(screen.getByTestId("add-goal-modal")).toBeInTheDocument();
  });

  it("disables the guarded action during the initial counters request", () => {
    counterQuery = {
      counterNotify: undefined,
      isLoading: true,
    };
    render(<GoalsHelpSection />);

    expect(
      screen.getByRole("button", { name: /website.hero.personalGoal/ }),
    ).toBeDisabled();
  });
});
