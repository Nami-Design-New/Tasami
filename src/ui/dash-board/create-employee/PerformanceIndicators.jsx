import CustomButton from "../../CustomButton";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import ChartCard from "../cards/ChartCard";
import StatisticsCard from "../cards/StatisticsCard";
const statsData = [
  {
    label: "المهام",
    value: 16,
    icon: "fa-tasks",
    color: "#007bff", // blue
    bgColor: "#dceeff",
  },
  {
    label: "المهام المكتملة",
    value: 8,
    icon: "fa-check-circle",
    color: "#28a745", // green
    bgColor: "#d4edda",
  },
  {
    label: "المهام غير المكتملة",
    value: 8,
    icon: "fa-times-circle",
    color: "#dc3545", // red
    bgColor: "#f8d7da",
  },
];
const statsPerformanceData = [
  {
    label: "نسبة الإنجاز",
    value: "50%",
    icon: "fa-percent",
    color: "#17a2b8", // cyan
    bgColor: "#d1ecf1",
  },
  {
    label: "معدل الإكمال الشهري",
    value: 4,
    icon: "fa-calendar-check",
    color: "#6f42c1", // purple
    bgColor: "#ede6f9",
  },
  {
    label: "متوسط مدة الإنجاز",
    value: "3 أيام",
    icon: "fa-clock",
    color: "#ffc107", // yellow
    bgColor: "#fff3cd",
  },
];
const PerformanceIndicators = () => {
  return (
    <>
      <section className="performance-indicators">
        <FormWrapper title={"خيارات التصفيه"}>
          <div className="filter-section">
            <form className="form_ui">
              <div className="row">
                {/* <div className="col-12">
                <Form.Check
                  type="switch"
                  className={`form-switch ${isRTL ? "rtl" : "ltr"}`}
                  id="duartionType"
                  label=" مده محدده "
                />
              </div> */}

                <div className="col=12 col-md-4">
                  <InputField type="date" label="من تاريخ" />
                </div>
                <div className="col=12 col-md-4">
                  <InputField type="date" label="الي تاريخ" />
                </div>
                {/* <div className="col=12 col-md-4">
                  <SelectField
                    label="نوع التقرير"
                    options={[
                      { value: "detailed", name: " تفصيلي " },
                      { value: " total ", name: " اجمالي " },
                    ]}
                  />
                </div> */}
                <div className="col-12">
                  <div className="d-flex  mt-3 justify-content-end">
                    <CustomButton> تطبيق </CustomButton>
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
              {statsData.map((item, index) => (
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
              {statsPerformanceData.map((item, index) => (
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
