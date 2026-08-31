import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ContractTasks from "./ContractTasks";

const mocks = vi.hoisted(() => ({
  getTasks: vi.fn(),
  getCurrentDistribution: vi.fn(),
  getOptimalDistribution: vi.fn(),
  getImprovement: vi.fn(),
  getStatus: vi.fn(),
  toastSuccess: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: mocks.toastSuccess,
  },
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
  default: ({
    currentDistribution,
    improvement,
    isCurrentRefreshing,
    onRefreshCurrent,
  }) => (
    <div>
      <div data-testid="current-distribution">
        {currentDistribution
          .map((item) => `${item.task_title}:${item.percentage}`)
          .join(",") || "empty"}
      </div>
      <div data-testid="current-distribution-refreshing">
        {String(isCurrentRefreshing)}
      </div>
      <div data-testid="improvement">
        {improvement?.overall_assessment || "empty"}
      </div>
      <button type="button" onClick={onRefreshCurrent}>
        Refresh current distribution
      </button>
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

  it("renders the recalculated current distribution after refresh", async () => {
    const refreshCurrentDistribution = vi.fn().mockResolvedValue({
      data: {
        current_distribution: [
          { task_title: "Execution", percentage: 75 },
          { task_title: "Review", percentage: 25 },
        ],
      },
      error: null,
    });
    const refreshTaskDistributionStatus = vi.fn().mockResolvedValue({
      data: {
        current_distribution: [
          { task_title: "Execution", percentage: 50 },
          { task_title: "Review", percentage: 50 },
        ],
      },
      error: null,
    });

    mocks.getCurrentDistribution.mockReturnValue({
      currentTaskDistribution: [],
      isFetching: false,
      isError: false,
      refetch: refreshCurrentDistribution,
    });
    mocks.getStatus.mockReturnValue({
      taskDistributionStatus: {
        current_distribution: [
          { task_title: "Execution", percentage: 50 },
          { task_title: "Review", percentage: 50 },
        ],
        optimal_distribution: [],
        analysis: {
          strengths: [],
          conclusion: "",
          improvement_points: [],
        },
        improvement: {
          comparison: [],
          overall_assessment: "",
        },
        optimal_distribution_generated: false,
        improvement_generated: false,
      },
      isLoading: false,
      refetch: refreshTaskDistributionStatus,
    });

    render(<ContractTasks />);

    expect(screen.getByTestId("current-distribution")).toHaveTextContent(
      "Execution:50,Review:50",
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Refresh current distribution" }),
    );

    await waitFor(() =>
      expect(screen.getByTestId("current-distribution")).toHaveTextContent(
        "Execution:75,Review:25",
      ),
    );
    expect(refreshCurrentDistribution).toHaveBeenCalledOnce();
    expect(refreshTaskDistributionStatus).toHaveBeenCalledOnce();
    expect(mocks.toastSuccess).toHaveBeenCalledWith(
      "works.myTasks.distribution.refreshSuccess",
    );
  });

  it("keeps the current distribution loader active through the status refresh", async () => {
    let resolveStatusRefresh;
    const refreshCurrentDistribution = vi.fn().mockResolvedValue({
      data: {
        current_distribution: [
          { task_title: "Execution", percentage: 100 },
        ],
      },
      error: null,
    });
    const refreshTaskDistributionStatus = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveStatusRefresh = resolve;
        }),
    );

    mocks.getCurrentDistribution.mockReturnValue({
      currentTaskDistribution: [],
      isFetching: false,
      isError: false,
      refetch: refreshCurrentDistribution,
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
          overall_assessment: "",
        },
        optimal_distribution_generated: false,
        improvement_generated: false,
      },
      isLoading: false,
      refetch: refreshTaskDistributionStatus,
    });

    render(<ContractTasks />);

    fireEvent.click(
      screen.getByRole("button", { name: "Refresh current distribution" }),
    );

    await waitFor(() =>
      expect(
        screen.getByTestId("current-distribution-refreshing"),
      ).toHaveTextContent("true"),
    );
    await waitFor(() =>
      expect(refreshTaskDistributionStatus).toHaveBeenCalledOnce(),
    );

    resolveStatusRefresh({ data: {}, error: null });

    await waitFor(() =>
      expect(
        screen.getByTestId("current-distribution-refreshing"),
      ).toHaveTextContent("false"),
    );
  });
});
