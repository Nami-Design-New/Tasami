import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ContractTasks from "./ContractTasks";

const mocks = vi.hoisted(() => ({
  getTasks: vi.fn(),
  getCurrentDistribution: vi.fn(),
  getOptimalDistribution: vi.fn(),
  getImprovement: vi.fn(),
  getStatus: vi.fn(),
}));

vi.mock("react-router", () => ({
  useParams: () => ({ id: "42" }),
  useOutletContext: () => ({ user: { id: 1 } }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../../../hooks/website/MyWorks/tasks/useGetTasks", () => ({
  default: mocks.getTasks,
}));
vi.mock(
  "../../../../hooks/website/MyWorks/tasks/useGetCurrentTaskDistribution",
  () => ({ default: mocks.getCurrentDistribution }),
);
vi.mock(
  "../../../../hooks/website/MyWorks/tasks/useGetTaskDistribution",
  () => ({ default: mocks.getOptimalDistribution }),
);
vi.mock(
  "../../../../hooks/website/MyWorks/tasks/useGetTaskImprovement",
  () => ({ default: mocks.getImprovement }),
);
vi.mock(
  "../../../../hooks/website/MyWorks/tasks/useGetTaskDistributionStatus",
  () => ({ default: mocks.getStatus }),
);

vi.mock("../../../../ui/website/my-works/tasks/TaskCard", () => ({
  default: () => <div data-testid="task-card" />,
}));
vi.mock("../../../../ui/loading/Loading", () => ({
  default: () => <div data-testid="loading" />,
}));
vi.mock("../../../../ui/website/my-works/NoTasks", () => ({
  default: () => <div data-testid="no-tasks" />,
}));
vi.mock("../../../../ui/website/my-works/tasks/TaskDistributionCharts", () => ({
  default: ({ improvement }) => (
    <div data-testid="improvement">
      {improvement?.overall_assessment || "empty"}
    </div>
  ),
}));

describe("ContractTasks", () => {
  beforeEach(() => {
    mocks.getTasks.mockReturnValue({
      goalTasks: {
        data: [{ id: 1 }],
        "additional-data": {},
      },
      isLoading: false,
    });
    mocks.getCurrentDistribution.mockReturnValue({
      currentTaskDistribution: [],
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });
    mocks.getOptimalDistribution.mockReturnValue({
      taskDistribution: [],
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });
    mocks.getImprovement.mockReturnValue({
      taskImprovement: {},
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });
    mocks.getStatus.mockReturnValue({
      taskDistributionStatus: {
        current_distribution: [],
        optimal_distribution: [],
        analysis: {
          strengths: [],
          conclusion: "",
          improvement_points: [],
        },
        improvement: {
          comparison: [],
          overall_assessment: "Saved assessment",
        },
        optimal_distribution_generated: true,
        improvement_generated: true,
      },
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  it("uses the saved improvement when the manual query has no comparison", () => {
    render(<ContractTasks />);

    expect(screen.getByTestId("improvement")).toHaveTextContent(
      "Saved assessment",
    );
  });
});
