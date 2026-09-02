import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import CustomButton from "../../../CustomButton";

const CHART_COLORS = [
  "#1385a5",
  "#f4772e",
  "#19752b",
  "#16a5d4",
  "#ad269f",
  "#42aa2d",
  "#8c3b0d",
  "#e7ad19",
  "#6f42c1",
];

function ControlledApexPieChart({ options, series, chartKey }) {
  const chartRef = useRef(null);
  const initialOptionsRef = useRef(options);
  const initialSeriesRef = useRef(series);
  const lastChartKeyRef = useRef(chartKey);
  const updateQueueRef = useRef(Promise.resolve());

  useEffect(() => {
    if (lastChartKeyRef.current === chartKey) return undefined;

    lastChartKeyRef.current = chartKey;
    const nextChartData = JSON.parse(chartKey);
    let isCancelled = false;

    const updateTask = updateQueueRef.current.then(async () => {
      if (isCancelled) return;

      const chart = chartRef.current;
      if (!chart?.updateOptions || !chart?.updateSeries) return;

      const { series: nextSeries, ...nextOptions } = nextChartData;
      await chart.updateOptions(nextOptions, true, false, false);

      if (!isCancelled) {
        await chart.updateSeries(nextSeries, false, true);
      }
    });

    updateQueueRef.current = updateTask.catch((error) => {
      if (!isCancelled && import.meta.env.DEV) {
        console.error("Failed to update distribution chart", error);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [chartKey]);

  return (
    <ReactApexChart
      chartRef={chartRef}
      type="pie"
      height={390}
      options={initialOptionsRef.current}
      series={initialSeriesRef.current}
    />
  );
}

function DistributionChart({
  title,
  data,
  categoryColors,
  isLoading = false,
  hasError = false,
  onRefresh,
  isRefreshing = false,
  action,
}) {
  const { t } = useTranslation();
  const labels = data.map((item) => item.label);
  const series = data.map((item) => item.value);
  const colors = data.map((item) => categoryColors.get(item.label));
  const chartKey = JSON.stringify({ labels, series, colors });

  const options = {
    chart: {
      fontFamily: "Dubai, sans-serif",
      toolbar: { show: false },
      animations: { enabled: false },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    labels,
    colors,
    stroke: {
      colors: ["#ffffff"],
      width: 2,
    },
    dataLabels: {
      enabled: true,
      formatter: (percentage) => `${Math.round(percentage)}%`,
      style: {
        fontSize: "12px",
        fontWeight: 700,
      },
      dropShadow: { enabled: false },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
      markers: {
        size: 6,
        shape: "circle",
      },
    },
    tooltip: {
      y: {
        formatter: (value) => value,
      },
    },
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: { height: 360 },
          legend: { fontSize: "12px" },
        },
      },
    ],
  };

  return (
    <article className="task-distribution-card">
      <h2>{title}</h2>
      {isLoading ? (
        <div className="task-distribution-state" role="status">
          <span className="spinner-border" aria-hidden />
          <span className="visually-hidden">
            {t("works.myTasks.distribution.loading")}
          </span>
        </div>
      ) : hasError || data.length === 0 ? (
        <div className="task-distribution-state">
          {t("works.myTasks.distribution.noData")}
        </div>
      ) : (
        <ControlledApexPieChart
          chartKey={chartKey}
          options={options}
          series={series}
        />
      )}
      
      {action || onRefresh ? (
        <div className="task-distribution-actions">
          {action || (
            <CustomButton
              type="button"
              size="small"
              loading={isRefreshing && !isLoading}
              onClick={() => onRefresh()}
            >
              {t("works.myTasks.distribution.update")}
            </CustomButton>
          )}
        </div>
      ) : null}
    </article>
  );
}

function PlanAnalysis({ data }) {
  const { t } = useTranslation();
  const strengths = Array.isArray(data?.strengths) ? data.strengths : [];
  const improvementPoints = Array.isArray(data?.improvement_points)
    ? data.improvement_points
    : [];

  if (
    !data?.conclusion &&
    strengths.length === 0 &&
    improvementPoints.length === 0
  ) {
    return null;
  }

  return (
    <article className="task-improvement-assessment">
      <h3>{t("works.myTasks.distribution.analysisTitle")}</h3>
      {data?.conclusion ? <p>{data.conclusion}</p> : null}
      {strengths.length > 0 ? (
        <>
          <h4>{t("works.myTasks.distribution.strengths")}</h4>
          <ul>
            {strengths.map((strength, index) => (
              <li key={`${strength}-${index}`}>{strength}</li>
            ))}
          </ul>
        </>
      ) : null}
      {improvementPoints.length > 0 ? (
        <>
          <h4>{t("works.myTasks.distribution.improvementPoints")}</h4>
          <ul>
            {improvementPoints.map((point, index) => (
              <li key={`${point}-${index}`}>{point}</li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}

function ImprovementRecommendations({ data, analysis, hasError }) {
  const { t } = useTranslation();
  const comparison = Array.isArray(data?.comparison) ? data.comparison : [];
  const hasAssessment = Boolean(data?.overall_assessment);
  const hasAnalysis =
    Boolean(analysis?.conclusion) ||
    (Array.isArray(analysis?.strengths) && analysis.strengths.length > 0) ||
    (Array.isArray(analysis?.improvement_points) &&
      analysis.improvement_points.length > 0);

  if (hasError && comparison.length === 0 && !hasAssessment && !hasAnalysis) {
    return (
      <div className="task-improvement-state">
        {t("works.myTasks.distribution.improvingNoData")}
      </div>
    );
  }

  if (comparison.length === 0 && !hasAssessment && !hasAnalysis) return null;

  return (
    <div className="task-improvement-content">
      <PlanAnalysis data={analysis} />
      {data?.overall_assessment ? (
        <div className="task-improvement-assessment">
          <h3>{t("works.myTasks.distribution.assessmentTitle")}</h3>
          <p>{data.overall_assessment}</p>
        </div>
      ) : null}

      {comparison.length > 0 ? (
        <div className="task-improvement-guidance">
          <h3>{t("works.myTasks.distribution.guidanceTitle")}</h3>
          <div className="task-improvement-table-wrapper">
          <table className="task-improvement-table">
            <thead>
              <tr>
                <th>{t("works.myTasks.distribution.category")}</th>
                <th>{t("works.myTasks.distribution.ideal")}</th>
                <th>{t("works.myTasks.distribution.actual")}</th>
                <th>{t("works.myTasks.distribution.gap")}</th>
                <th>{t("works.myTasks.distribution.status")}</th>
                <th>{t("works.myTasks.distribution.impact")}</th>
                <th>{t("works.myTasks.distribution.guidelines")}</th>
                <th>{t("works.myTasks.distribution.examples")}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((item, index) => {
                const gap = Number(item?.gap) || 0;
                const gapType = ["shortfall", "excess", "balanced"].includes(
                  item?.gap_type,
                )
                  ? item.gap_type
                  : "balanced";
                const guidelines = Array.isArray(item?.guidelines)
                  ? item.guidelines
                  : [];
                const examples = Array.isArray(item?.concrete_examples)
                  ? item.concrete_examples
                  : [];

                return (
                  <tr
                    key={`${item?.task_category_title || "category"}-${index}`}
                  >
                    <th scope="row">
                      {item?.task_category_title ||
                        t("works.myTasks.distribution.uncategorized")}
                    </th>
                    <td>{item?.ideal_percentage ?? 0}%</td>
                    <td>{item?.actual_percentage ?? 0}%</td>
                    <td>
                      <span className={`task-improvement-gap ${gapType}`}>
                        {gap > 0 ? "+" : ""}
                        {gap}%
                      </span>
                    </td>
                    <td>{t(`works.myTasks.distribution.${gapType}`)}</td>
                    <td>{item?.impact || "---"}</td>
                    <td>
                      {guidelines.length > 0 ? (
                        <ul>
                          {guidelines.map((guideline, guidelineIndex) => (
                            <li key={`${guideline}-${guidelineIndex}`}>
                              {guideline}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "---"
                      )}
                    </td>
                    <td>
                      {examples.length > 0 ? (
                        <ul>
                          {examples.map((example, exampleIndex) => (
                            <li key={`${example}-${exampleIndex}`}>
                              {example}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "---"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function TaskDistributionCharts({
  currentDistribution = [],
  optimalDistribution = [],
  isCurrentLoading,
  isCurrentRefreshing,
  isCurrentError,
  onRefreshCurrent,
  isOptimalLoading,
  isOptimalGenerating,
  isOptimalError,
  onGenerateOptimal,
  isGenerationStatusLoading,
  isOptimalGenerated,
  improvement,
  analysis,
  isImprovementLoading,
  isImprovementError,
  onGenerateImprovement,
  isImprovementGenerated,
}) {
  const { t } = useTranslation();

  const formattedCurrentDistribution = currentDistribution.map((item) => ({
    label: item.task_title || t("works.myTasks.distribution.uncategorized"),
    value: Number(item.percentage) || 0,
  }));

  const formattedOptimalDistribution = optimalDistribution.map((item) => ({
    label: item.task_title || t("works.myTasks.distribution.uncategorized"),
    value: Number(item.percentage) || 0,
  }));

  const categoryColors = new Map();
  const categories = [
    ...formattedCurrentDistribution,
    ...formattedOptimalDistribution,
  ];

  categories.forEach(({ label }) => {
    if (!categoryColors.has(label)) {
      categoryColors.set(
        label,
        CHART_COLORS[categoryColors.size % CHART_COLORS.length],
      );
    }
  });
  const hasImprovementData =
    Boolean(improvement?.overall_assessment) ||
    (Array.isArray(improvement?.comparison) &&
      improvement.comparison.length > 0);
  const hasOptimalDistribution = formattedOptimalDistribution.length > 0;
  const hasOptimalBeenGenerated =
    isOptimalGenerated ?? hasOptimalDistribution;
  const hasImprovementBeenGenerated =
    isImprovementGenerated ?? hasImprovementData;

  return (
    <section className="task-distribution-section">
      <div className="task-distribution-grid">
        <DistributionChart
          title={t("works.myTasks.distribution.currentTitle")}
          data={formattedCurrentDistribution}
          categoryColors={categoryColors}
          isLoading={isCurrentLoading}
          isRefreshing={isCurrentRefreshing}
          hasError={isCurrentError}
          onRefresh={onRefreshCurrent}
        />
        <DistributionChart
          title={t("works.myTasks.distribution.optimalTitle")}
          data={formattedOptimalDistribution}
          categoryColors={categoryColors}
          isLoading={isOptimalLoading}
          hasError={isOptimalError}
          action={
            !isGenerationStatusLoading && !hasOptimalBeenGenerated ? (
              <CustomButton
                type="button"
                color="warning"
                size="small"
                loading={isOptimalGenerating}
                onClick={() => onGenerateOptimal()}
              >
                {t("works.myTasks.distribution.generateOptimal")}
              </CustomButton>
            ) : null
          }
        />
      </div>

      {hasOptimalBeenGenerated &&
      !isGenerationStatusLoading &&
      !hasImprovementBeenGenerated ? (
        <button
          type="button"
          className="task-distribution-recommendation"
          disabled={isImprovementLoading}
          onClick={() => onGenerateImprovement()}
        >
          {isImprovementLoading ? (
            <i className="fas fa-spinner fa-spin" aria-hidden />
          ) : (
            <i className="fa-solid fa-sparkles" aria-hidden />
          )}
          <span>
            {isImprovementLoading
              ? t("works.myTasks.distribution.improvingLoading")
              : t("works.myTasks.distribution.generateAnalysis")}
          </span>
        </button>
      ) : null}

      <ImprovementRecommendations
        data={improvement}
        analysis={analysis}
        hasError={isImprovementError}
      />
    </section>
  );
}
