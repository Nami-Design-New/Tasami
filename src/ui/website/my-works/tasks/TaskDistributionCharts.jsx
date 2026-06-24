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

export default function TaskDistributionCharts({
  currentDistribution,
  optimalDistribution,
  isCurrentLoading,
  isCurrentRefreshing,
  isCurrentError,
  onRefreshCurrent,
  isOptimalLoading,
  isOptimalError,
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

      <div className="task-distribution-recommendation">
        <i className="fa-solid fa-sparkles" aria-hidden />
        <span>{t("works.myTasks.distribution.recommendation")}</span>
      </div>
    </section>
  );
}
