import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TaskDistributionCharts from "./TaskDistributionCharts";

vi.mock("react-apexcharts", () => ({
  default: () => <div data-testid="distribution-chart" />,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const baseProps = {
  currentDistribution: [],
  optimalDistribution: [],
  isCurrentLoading: false,
  isCurrentRefreshing: false,
  isCurrentError: false,
  onRefreshCurrent: vi.fn(),
  isOptimalLoading: false,
  isOptimalError: false,
  improvement: { comparison: [], overall_assessment: "" },
  isImprovementLoading: false,
  isImprovementError: false,
  onGenerateImprovement: vi.fn(),
};

describe("TaskDistributionCharts", () => {
  it("shows the generation button before improvement data exists", () => {
    const onGenerateImprovement = vi.fn();

    render(
      <TaskDistributionCharts
        {...baseProps}
        onGenerateImprovement={onGenerateImprovement}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "works.myTasks.distribution.recommendation",
      }),
    );

    expect(onGenerateImprovement).toHaveBeenCalledOnce();
  });

  it("replaces the generation button with a table after data is generated", () => {
    render(
      <TaskDistributionCharts
        {...baseProps}
        improvement={{
          overall_assessment: "Overall assessment",
          comparison: [
            {
              task_category_title: "Preparation",
              ideal_percentage: 40,
              actual_percentage: 25,
              gap: -15,
              gap_type: "shortfall",
              impact: "Progress may slow.",
              guidelines: ["Add focused tasks."],
              concrete_examples: ["Reserve one hour."],
            },
          ],
        }}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "works.myTasks.distribution.recommendation",
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Preparation")).toBeInTheDocument();
    expect(screen.getByText("Overall assessment")).toBeInTheDocument();
  });
});
