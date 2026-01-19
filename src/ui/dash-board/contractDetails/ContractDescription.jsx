import helpTriangle from "../../../assets/icons/help-triangle.svg";
import helpTriangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ContractDescription({ work }) {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  return (
    <>
      <div className="contract-description h-full">
        <div className="hed d-flex align-items-center gap-2">
          {work.type === "goal" && (
            <>
              <img src={helpTriangleWithHelper} />
              <h6 className="fs-4 fw-bold">{t("website.offerDetails.goal")}</h6>
            </>
          )}
          {work.type === "help_service" && (
            <>
              <img src={helpTriangle} />{" "}
              <h6 className="fs-4 fw-bold">
                {t("website.offerDetails.assistance")}
              </h6>
            </>
          )}
        </div>
        <p className="description">{work?.title}</p>
        <div className="info-grid ">
          <div className="info-box info-box-grow-min-width ">
            <div className="label">{t("website.offerDetails.field")}</div>
            <div className="value">{work?.category_title}</div>
          </div>
          <div className="info-box info-box-grow-min-width ">
            <div className="label">{t("website.offerDetails.specialty")}</div>{" "}
            <div className="value">{work?.sub_category_title}</div>
          </div>{" "}
          <div className="info-box info-box-grow-min-width">
            <div className="label">{t("website.offerDetails.startDate")}</div>
            <div className="value">{work?.goal?.help_start_date}</div>
          </div>
          {work?.type === "goal" && (
            <div className="info-box info-box-grow-min-width">
              <div className="label">
                {t("website.offerDetails.expectedData")}
              </div>
              <div className="value">
                {work?.goal?.expected_duration_new_human}
              </div>
            </div>
          )}
          {work?.type === "help_service" && (
            <div className="info-box info-box-grow-min-width">
              <div className="label">{t("website.offerDetails.duration")}</div>
              <div className="value">
                {work.help_service.duration}{" "}
                {work.help_service.duration < 10 ? t("days") : t("day")}
              </div>
            </div>
          )}
          {work?.type === "help_service" && (
            <div className="info-box info-box-grow-min-width">
              {" "}
              <div className="label">{t("website.offerDetails.ageRange")}</div>
              <div className="value">
                <div className="value">
                  {work?.help_service?.from_age === 0 ||
                  work?.help_service?.to_age === 0
                    ? t("undefined")
                    : `${work?.help_service?.from_age} -
                      ${work?.help_service?.to_age}`}{" "}
                </div>
              </div>
            </div>
          )}
          <div className="info-box info-box-grow-min-width ">
            <div className="label">
              {t("website.offerDetails.preferredGender")}
            </div>
            <div className="value">{t(`${work?.preferred_gender}`)}</div>
          </div>
        </div>{" "}
        <div className="extra-terms">
          <h2>{t("website.offerDetails.mechanisms")}</h2>
          <ul className="mechanisms-list">
            {work?.mechanisms?.map((item) => (
              <li
                key={item.id}
                className={`mech-item  ${lang === "en" ? "en" : ""} `}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="row">
          <div className="col-sm-6 p-2">
            <div className="dec-item">
              <h5>المجال</h5>
              <p>{work?.category_title}</p>
            </div>
          </div>
          <div className="col-sm-6 p-2">
            <div className="dec-item">
              <h5>التخصص</h5>
              <p>{work?.sub_category_title}</p>
            </div>
          </div>
          <div className="col-sm-6 p-2">
            {work?.type === "goal" && (
              <div className="dec-item">
                <h5 className="label">
                  {t("website.offerDetails.expectedData")}
                </h5>
                <p>{work?.goal?.expected_duration_new_human}</p>
              </div>
            )}
            {work?.type === "help_service" && (
              <div className="dec-item">
                <h5 className="label">{t("website.offerDetails.helpValue")}</h5>{" "}
                <p>{work?.goal?.expected_duration_new_human}</p>
              </div>
            )}
          </div>
          <div className="col-sm-6 p-2">
            {" "}
            <div className="dec-item">
              <h5>تفضيل هوية المستفيد</h5>
              <p>{t(`${work?.preferred_gender}`)}</p>
            </div>
          </div>
          <div className="col-sm-6 p-2">
            <div className="dec-item">
              <h5>الفئة العمرية للمستفيد</h5>
              <p>15 - 24</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 p-2">
            <h5 className=" mechanisms-title ">آليات المساعدة المناسبة</h5>
            <ul className="mechanisms">
              <li>
                <img src={check} />
                <span>الالتقاء الشخصي</span>
              </li>
              <li>
                <img src={check} />
                <span>الاتصال المرئي والمسموع</span>
              </li>
              <li>
                <img src={check} />
                <span>التراسل النصي والصوتي</span>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
}
