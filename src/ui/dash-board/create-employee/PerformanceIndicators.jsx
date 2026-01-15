import { useState } from "react";
import { useParams, useSearchParams } from "react-router";
import useGetPerformanceIndicators from "../../../hooks/dashboard/employee/useGetPerformanceIndicators";
import CustomButton from "../../CustomButton";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import StatisticsCardSkeleton from "../../loading/StatisticsCardSkeleton";
import ChartCard from "../cards/ChartCard";
import StatisticsCard from "../cards/StatisticsCard";

const PerformanceIndicators = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { perfomanceIndicators, isLoading } = useGetPerformanceIndicators(id);

  // Controlled inputs for date filters
  const [fromDate, setFromDate] = useState(searchParams.get("fromDate") || "");
  const [toDate, setToDate] = useState(searchParams.get("toDate") || "");

  const handleFilter = () => {
    const params = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    // Update URL params → the hook should use them to fetch filtered data
    setSearchParams(params);
  };
  // Map API data to UI arrays
  const statsData = perfomanceIndicators?.data
    ? [
        {
          label: "المهام",
          value: perfomanceIndicators.data.total_tasks_count,
          icon: "fa-tasks",
          color: "#007bff",
          bgColor: "#dceeff",
        },
        {
          label: "المهام المكتملة",
          value: perfomanceIndicators.data.completed_tasks_count,
          icon: "fa-check-circle",
          color: "#28a745",
          bgColor: "#d4edda",
        },
        {
          label: "المهام غير المكتملة",
          value: perfomanceIndicators.data.not_completed_count,
          icon: "fa-times-circle",
          color: "#dc3545",
          bgColor: "#f8d7da",
        },
      ]
    : [];

  const statsPerformanceData = perfomanceIndicators?.data
    ? [
        {
          label: "نسبة الإنجاز",
          value: `${perfomanceIndicators.data.completion_rate}%`,
          icon: "fa-percent",
          color: "#17a2b8",
          bgColor: "#d1ecf1",
        },
        {
          label: "معدل الإكمال الشهري",
          value: perfomanceIndicators.data.monthly_completion_rate,
          icon: "fa-calendar-check",
          color: "#6f42c1",
          bgColor: "#ede6f9",
        },
        {
          label: "متوسط مدة الإنجاز",
          value: `${perfomanceIndicators.data.average_completion_time} أيام`,
          icon: "fa-clock",
          color: "#ffc107",
          bgColor: "#fff3cd",
        },
      ]
    : [];

  return (
    <>
      <section className="performance-indicators">
        <FormWrapper title={"خيارات التصفية"}>
          <div className="filter-section">
            <form className="form_ui">
              <div className="row">
                <div className="col-12 col-md-6">
                  <InputField
                    type="date"
                    label="من تاريخ"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <InputField
                    type="date"
                    label="الي تاريخ"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <div className="d-flex  mt-3 justify-content-end">
                    <CustomButton type="button" onClick={handleFilter}>
                      تطبيق
                    </CustomButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </FormWrapper>
      </section>

      <section className="performance-report">
        <div className=" performance-report__header--container ">
          <h2 className=" performance-report__header ">نتائج التقرير</h2>
          <p> مقاييس ورؤى تفصيلية في الفتره من 2023 الي 2024. </p>
        </div>
        <div className="performacne-report__tasks ">
          <ChartCard title={"مؤشرات  مهام الموظف "}>
            <div className="row">
              {isLoading
                ? [1, 2, 3].map((item, index) => (
                    <div
                      className="col-12  col-md-2 col-lg-3 col-xxl-3 p-2"
                      key={index}
                    >
                      <StatisticsCardSkeleton />{" "}
                    </div>
                  ))
                : statsData.map((item, index) => (
                    <div
                      className="col-12  col-md-2 col-lg-3 col-xxl-3 p-2"
                      key={index}
                    >
                      <StatisticsCard item={item} />
                    </div>
                  ))}
            </div>
          </ChartCard>
        </div>
        <div className="performacne-report__tasks ">
          <ChartCard title={"مؤشرات  اداء الموظف "}>
            <div className="row">
              {isLoading
                ? [1, 2, 3].map((item, index) => (
                    <div
                      className="col-12  col-md-2 col-lg-3 col-xxl-3 p-2"
                      key={index}
                    >
                      <StatisticsCardSkeleton />{" "}
                    </div>
                  ))
                : statsPerformanceData.map((item, index) => (
                    <div
                      className="col-12  col-md-2 col-lg-3 col-xxl-3 p-2"
                      key={index}
                    >
                      <StatisticsCard item={item} />
                    </div>
                  ))}
            </div>
          </ChartCard>
        </div>
      </section>
    </>
  );
};

export default PerformanceIndicators;
