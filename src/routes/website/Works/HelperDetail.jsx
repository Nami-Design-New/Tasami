import { Link, useParams } from "react-router";
import SectionHeader from "../../../ui/website/SectionHeader";
import HelperCard from "../../../ui/cards/HelperCard";
import HelperOptionsMenu from "./HelperOptionsMenu";

export default function HelperDetailPage() {
  const { id } = useParams();

  const helper = {
    id: 1,
    name: "أنس تركي",
    country: "السعودية",
    rating: 11,
    image: "/images/p2.png",
    status: true,
  };

  const contractValue = 400;
  const contractDuration = 30;
  const dailyValue = 13.3;
  const progressDays = 5;
  const remainingDays = contractDuration - progressDays;

  const currency = (
    <img
      src="/icons/ryal.svg"
      alt="ريال"
      style={{ width: 16, marginInlineStart: 4 }}
    />
  );

  const progressPercentage = Math.min(
    (progressDays / contractDuration) * 100,
    100
  );

  return (
    <div className="tasks-details page">
      <div className="container">
        <div className="header ">
  <SectionHeader />
  <HelperOptionsMenu />
</div>


        <div className="row">
          <div className="col-md-4 mb-3">
            <HelperCard helper={helper} />
          </div>

          <div className="col-md-8">
            <div className="type">
              <div className="type-tabs mb-3">
                <Link to={`/helper/${helper.id}`}>
                  {" "}
                  <div className="type-tab active">السيرة الذاتية</div>
                </Link>
              </div>
            </div>

            <h5 className="hed">المدفوعات</h5>
            <div className="info-grid">
              <div className="info-box">
                <div className="label">قيمة العقد</div>
                <div className="value">
                  {contractValue} {currency}
                </div>
              </div>

              <div className="info-box">
                <div className="label">مدة العقد</div>
                <div className="value">{contractDuration} يوم</div>
              </div>

              <div className="info-box">
                <div className="label">
                  قيمة الاستحقاق اليومي للمساعد الشخصي
                </div>
                <div className="value">
                  {dailyValue} {currency}
                </div>
              </div>

              <div className="info-box full-width w-50">
                <div className="label">التقدم</div>

                <div className="progress-info d-flex justify-content-between mb-1">
                  <span>{progressDays} أيام</span>
                  <span>{contractDuration} يوم</span>
                </div>

                <div className="progress-bar-wrapper">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="info-box">
                <div className="label">رصيد الضمان المتبقي</div>
                <div className="value">
                  {remainingDays * dailyValue} {currency}
                </div>
              </div>

              <div className="info-box">
                <div className="label">القيمة المستحقة للمساعد</div>
                <div className="value">
                  {progressDays * dailyValue} {currency}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
