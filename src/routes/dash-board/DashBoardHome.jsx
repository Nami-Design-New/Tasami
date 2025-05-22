import ReactApexChart from "react-apexcharts";
import DonutChart from "./DonutChart";

export default function DashBoardHome() {
  return (
    <section className="dashboard--home">
      <div className="dashboard--home__header">
        <div className="welcome">
          <h3>مرحبًا بك مرة أخرى، محمود عباس !</h3>
          <p>قم بتتبع نشاط المبيعات لديك، والعملاء المحتملين والصفقات هنا.</p>
        </div>
        <div className="actions">
          <button className="button btn-icon">
            {" "}
            <i className="fa-light fa-filter"></i>
            <span>التصفية</span>
          </button>
          <button className="button btn-light btn-icon">
            <i className="fa-light fa-upload"></i>
            <span>تصدير</span>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-9 col-xl-12">
          <div className="row">
            <div className="col-xl-4">
              <div className="row">
                <div className="col-xl-12">
                  <DonutChart />
                </div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  111
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-xxl-6 col-lg-6 col-md-6">1</div>
                <div className="col-xxl-6 col-lg-6 col-md-6">1</div>
                <div className="col-xxl-6 col-lg-6 col-md-6">1</div>
              </div>
            </div>
            <div className="col-xl-12">11</div>
          </div>
        </div>
        <div className="col-xxl-3 col-xl-12">
          <div className="row">
            <div className="col-xxl-12 col-xl-12">
              <div className="row">
                <div className="col-xl-12 col-xl-6">1</div>
                <div className="col-xl-12 col-xl-6">1</div>
                <div className="col-xl-12 col-xl-6">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
