import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TaskDistributionCharts from "./TaskDistributionCharts";

const apexMocks = vi.hoisted(() => ({
  updateOptions: vi.fn(),
  updateSeries: vi.fn(),
  mountCount: 0,
}));

vi.mock("react-apexcharts", async () => {
  const { useEffect, useState } = await import("react");

  return {
    default: function MockApexChart({ series, chartRef }) {
      const [displayedSeries, setDisplayedSeries] = useState(series);

      useEffect(() => {
        const instance = {
          updateOptions: (...args) => {
            apexMocks.updateOptions(...args);
            return Promise.resolve();
          },
          updateSeries: (...args) => {
            apexMocks.updateSeries(...args);
            setDisplayedSeries(args[0]);
            return Promise.resolve();
          },
        };
        apexMocks.mountCount += 1;
        chartRef.current = instance;

        return () => {
          if (chartRef.current === instance) chartRef.current = null;
        };
      }, [chartRef]);

      return (
        <div data-testid="distribution-chart">{displayedSeries.join(",")}</div>
      );
    },
  };
});

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
  isOptimalGenerating: false,
  isOptimalError: false,
  onGenerateOptimal: vi.fn(),
  isGenerationStatusLoading: false,
  isOptimalGenerated: false,
  improvement: { comparison: [], overall_assessment: "" },
  analysis: { strengths: [], conclusion: "", improvement_points: [] },
  isImprovementLoading: false,
  isImprovementError: false,
  onGenerateImprovement: vi.fn(),
  isImprovementGenerated: false,
};

describe("TaskDistributionCharts", () => {
  beforeEach(() => {
    apexMocks.updateOptions.mockClear();
    apexMocks.updateSeries.mockClear();
    apexMocks.mountCount = 0;
  });

  it("updates the existing chart instance when distribution values change", async () => {
    const { rerender } = render(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 25 },
          { task_title: "Execution", percentage: 75 },
        ]}
      />,
    );
    const initialChart = screen.getByTestId("distribution-chart");

    rerender(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 60 },
          { task_title: "Execution", percentage: 40 },
        ]}
      />,
    );

    const updatedChart = screen.getByTestId("distribution-chart");
    expect(updatedChart).toBe(initialChart);
    expect(apexMocks.mountCount).toBe(1);
    await waitFor(() => {
      expect(updatedChart).toHaveTextContent("60,40");
      expect(apexMocks.updateOptions).toHaveBeenCalledWith(
        {
          labels: ["Preparation", "Execution"],
          colors: ["#1385a5", "#f4772e"],
        },
        true,
        false,
        false,
      );
      expect(apexMocks.updateSeries).toHaveBeenCalledWith(
        [60, 40],
        false,
        true,
      );
    });
  });

  it("keeps the latest values when updates happen in quick succession", async () => {
    const { rerender } = render(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 25 },
          { task_title: "Execution", percentage: 75 },
        ]}
      />,
    );

    rerender(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 60 },
          { task_title: "Execution", percentage: 40 },
        ]}
      />,
    );
    rerender(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 80 },
          { task_title: "Execution", percentage: 20 },
        ]}
      />,
    );

    await waitFor(() => expect(apexMocks.updateSeries).toHaveBeenCalled());
    const lastUpdate = apexMocks.updateSeries.mock.calls.at(-1);
    expect(lastUpdate[0]).toEqual([80, 20]);
    expect(screen.getByTestId("distribution-chart")).toHaveTextContent(
      "80,20",
    );
  });

  it("mounts the chart with fresh values after its loading state ends", () => {
    const { rerender } = render(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 25 },
          { task_title: "Execution", percentage: 75 },
        ]}
      />,
    );

    rerender(
      <TaskDistributionCharts
        {...baseProps}
        isCurrentLoading
        currentDistribution={[
          { task_title: "Preparation", percentage: 60 },
          { task_title: "Execution", percentage: 40 },
        ]}
      />,
    );
    expect(screen.queryByTestId("distribution-chart")).not.toBeInTheDocument();

    apexMocks.updateOptions.mockClear();
    apexMocks.updateSeries.mockClear();
    rerender(
      <TaskDistributionCharts
        {...baseProps}
        currentDistribution={[
          { task_title: "Preparation", percentage: 60 },
          { task_title: "Execution", percentage: 40 },
        ]}
      />,
    );

    expect(screen.getByTestId("distribution-chart")).toHaveTextContent(
      "60,40",
    );
    expect(apexMocks.updateOptions).not.toHaveBeenCalled();
    expect(apexMocks.updateSeries).not.toHaveBeenCalled();
  });

  it("restores the persisted generation state even when saved chart data is empty", () => {
    render(
      <TaskDistributionCharts
        {...baseProps}
        isOptimalGenerated
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "works.myTasks.distribution.generateOptimal",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "works.myTasks.distribution.generateAnalysis",
      }),
    ).toBeInTheDocument();
  });

  it("only enables analysis after the recommended distribution is generated", () => {
    const onGenerateImprovement = vi.fn();

    render(
      <TaskDistributionCharts
        {...baseProps}
        onGenerateImprovement={onGenerateImprovement}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "works.myTasks.distribution.generateAnalysis",
      }),
    ).not.toBeInTheDocument();
  });

  it("shows the analysis action after the recommended distribution is generated", () => {
    const onGenerateImprovement = vi.fn();

    render(
      <TaskDistributionCharts
        {...baseProps}
        optimalDistribution={[{ task_title: "Preparation", percentage: 100 }]}
        isOptimalGenerated
        onGenerateImprovement={onGenerateImprovement}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "works.myTasks.distribution.generateAnalysis",
      }),
    );

    expect(onGenerateImprovement).toHaveBeenCalledOnce();
  });

  it("shows and disables the update loader while refreshing", () => {
    render(
      <TaskDistributionCharts
        {...baseProps}
        isCurrentRefreshing
      />,
    );

    const updateButton = screen.getByRole("button", {
      name: "works.myTasks.distribution.update",
    });

    expect(updateButton).toBeDisabled();
    expect(updateButton.querySelector(".btn__spinner")).toBeInTheDocument();
  });

  it("replaces the generation button with a table after data is generated", () => {
    render(
      <TaskDistributionCharts
        {...baseProps}
        optimalDistribution={[{ task_title: "Preparation", percentage: 100 }]}
        isOptimalGenerated
        isImprovementGenerated
        analysis={{
          conclusion: "The plan is usable.",
          strengths: ["All categories are represented."],
          improvement_points: ["Validate actual effort."],
        }}
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
        name: "works.myTasks.distribution.generateAnalysis",
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Preparation")).toBeInTheDocument();
    expect(screen.getByText("Overall assessment")).toBeInTheDocument();
    expect(screen.getByText("The plan is usable.")).toBeInTheDocument();
    expect(
      screen.getByText("All categories are represented."),
    ).toBeInTheDocument();
  });
});
