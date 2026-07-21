import { useMemo } from "react";
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

function DistributionChart({
  title,
  data,
  isLoading = false,
  hasError = false,
  onRefresh,
  isRefreshing = false,
}) {
  const { t } = useTranslation();
  const chartConfig = useMemo(() => {
    const labels = data.map((item) => item.label);

    return {
      series: data.map((item) => item.value),
      options: {
        chart: {
          fontFamily: "Dubai, sans-serif",
          toolbar: { show: false },
        },
        labels,
        colors: CHART_COLORS,
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
      },
    };
  }, [data]);

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
        <ReactApexChart
          type="pie"
          height={390}
          options={chartConfig.options}
          series={chartConfig.series}
        />
      )}
      {onRefresh ? (
        <div className="task-distribution-actions">
          <CustomButton
            type="button"
            size="small"
            loading={isRefreshing && !isLoading}
            onClick={() => onRefresh()}
          >
            {t("works.myTasks.distribution.update")}
          </CustomButton>
        </div>
      ) : null}
    </article>
  );
}

function ImprovementRecommendations({ data, hasError }) {
  const { t } = useTranslation();
  const comparison = Array.isArray(data?.comparison) ? data.comparison : [];
  const hasAssessment = Boolean(data?.overall_assessment);

  if (hasError && comparison.length === 0 && !hasAssessment) {
    return (
      <div className="task-improvement-state">
        {t("works.myTasks.distribution.improvingNoData")}
      </div>
    );
  }

  if (comparison.length === 0 && !hasAssessment) return null;

  return (
    <div className="task-improvement-content">
      {data?.overall_assessment ? (
        <div className="task-improvement-assessment">
          <h3>{t("works.myTasks.distribution.assessmentTitle")}</h3>
          <p>{data.overall_assessment}</p>
        </div>
      ) : null}

      {comparison.length > 0 ? (
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
      ) : null}
    </div>
  );
}

export default function TaskDistributionCharts({
  currentDistribution,
  optimalDistribution,
  isCurrentLoading,
  isCurrentRefreshing,
  isCurrentError,
  onRefreshCurrent,
  isOptimalLoading,
  isOptimalError,
  improvement,
  isImprovementLoading,
  isImprovementError,
  onGenerateImprovement,
}) {
  const { t } = useTranslation();

  const formattedCurrentDistribution = useMemo(
    () =>
      currentDistribution.map((item) => ({
        label:
          item.task_title || t("works.myTasks.distribution.uncategorized"),
        value: Number(item.percentage) || 0,
      })),
    [currentDistribution, t],
  );

  const formattedOptimalDistribution = useMemo(
    () =>
      optimalDistribution.map((item) => ({
        label:
          item.task_title || t("works.myTasks.distribution.uncategorized"),
        value: Number(item.percentage) || 0,
      })),
    [optimalDistribution, t],
  );
  const hasImprovementData =
    Boolean(improvement?.overall_assessment) ||
    (Array.isArray(improvement?.comparison) &&
      improvement.comparison.length > 0);

  return (
    <section className="task-distribution-section">
      <div className="task-distribution-grid">
        <DistributionChart
          title={t("works.myTasks.distribution.currentTitle")}
          data={formattedCurrentDistribution}
          isLoading={isCurrentLoading}
          isRefreshing={isCurrentRefreshing}
          hasError={isCurrentError}
          onRefresh={onRefreshCurrent}
        />
        <DistributionChart
          title={t("works.myTasks.distribution.optimalTitle")}
          data={formattedOptimalDistribution}
          isLoading={isOptimalLoading}
          hasError={isOptimalError}
        />
      </div>

      {!hasImprovementData ? (
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
              : t("works.myTasks.distribution.recommendation")}
          </span>
        </button>
      ) : null}

      <ImprovementRecommendations
        data={improvement}
        hasError={isImprovementError}
      />
    </section>
  );
}
