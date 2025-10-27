import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Currency from "../../../ui/Currency";
import CustomButton from "../../../ui/CustomButton";
import Loading from "../../../ui/loading/Loading";
import OfferRequestPaymentModal from "../../../ui/website/platform/contracts/OfferRequestPaymentModal";

export default function WorksDetails() {
  const { t } = useTranslation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { workDetails, isLoading } = useGetWorkDetails();
  const { lang } = useSelector((state) => state.language);
  if (isLoading) return <Loading />;
  return (
    <section className="work-details-page">
      <div
        className={`status-info  ${
          workDetails.status !== "completed" ? "not-completed" : "completed"
        }`}
      >
        <span>
          {workDetails.status === "wait_helper_to_accept" &&
            "بإنتظار موافقة المساعد"}{" "}
          {workDetails?.status === "wait_for_user_payment" && "بانتظار الدفع"}
          {workDetails.status === "planning" && " بانتظار بدء خطة التنفيذ"}
          {workDetails.status === "offers" && "بانتظار قبول العرض المناسب"}
          {workDetails.status === "execution" && " بانتظار خطة التنفيذ"}
          {workDetails.status === "payment" &&
            "تم الدفع وبإنتظار بدء خطة التنفيذ"}
          {workDetails.status === "completed" && "مكتمل"}
        </span>
        <span>{workDetails.status_date}</span>
      </div>
      <div className="my-3 work-description">
        <div className="label">
          {workDetails.rectangle === "personal_goal_with_helper" && (
            <>
              <img src="/icons/triangle-with-helper.svg" />{" "}
              {t("website.offerDetails.goal")}
            </>
          )}
          {workDetails.rectangle === "help_service_from_helper" && (
            <>
              <img src="/icons/help_service_from_helper.svg" />{" "}
              {t("website.offerDetails.offer")}
            </>
          )}
        </div>
        <p className="value">{workDetails?.title}</p>
      </div>
      <div className="goal-info">
        <div className="info-grid">
          <div className="info-box">
            <div className="label">{t("website.offerDetails.field")}</div>
            <div className="value">{workDetails.category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.specialty")}</div>
            <div className="value">{workDetails.sub_category_title}</div>
          </div>{" "}
          {workDetails.rectangle !== "help_service_from_helper" && (
            <div className="info-box">
              <div className="label">{t("website.offerDetails.startDate")}</div>
              <div className="value">{workDetails?.goal?.start_date}</div>
            </div>
          )}{" "}
          {workDetails?.offer_price >= 0 && (
            <div className="notse-box">
              <div className="label">{t("website.offerDetails.price")}</div>
              <div className="value">
                {workDetails?.offer_price} <Currency />
              </div>
            </div>
          )}
          {workDetails.goal.notes && (
            <div className="info-box">
              <div className="label">
                {t("website.offerDetails.extraTerms")}
              </div>
              <div className="value">{workDetails.goal.notes}</div>
            </div>
          )}
          {workDetails.rectangle === "help_service_from_helper" && (
            <div className="info-box">
              <div className="label">تفضيل هوية المستفيد</div>
              <div className="value">
                {workDetails?.creator_help_service?.preferred_gender}
              </div>
            </div>
          )}
          {workDetails.rectangle === "help_service_from_helper" && (
            <div className="info-box">
              <div className="label">الفئة العمرية للمستفيد</div>
              <div className="value">
                {workDetails?.creator_help_service?.from_age} -{" "}
                {workDetails?.creator_help_service?.to_age}
              </div>
            </div>
          )}
          {workDetails.rectangle === "help_service_from_helper" && (
            <div className="info-box">
              <div className="label">المدة المتوقعة لتقديم المساعدة</div>
              <div className="value">
                {workDetails?.goal?.expected_duration_human}
              </div>
            </div>
          )}
          {workDetails.rectangle !== "help_service_from_helper" && (
            <div className="info-box">
              <div className="label">
                {t("website.offerDetails.expectedData")}
              </div>
              <div className="value">
                {workDetails?.goal?.expected_duration_human}
              </div>
            </div>
          )}
        </div>
      </div>{" "}
      {workDetails?.help_mechanisms.length > 0 && (
        <div className="extra-terms">
          <h2>{t("website.offerDetails.mechanisms")}</h2>
          <ul className="mechanisms-list">
            {workDetails?.help_mechanisms.map((item) => (
              <li
                key={item.id}
                className={`mech-item  ${lang === "en" ? "en" : ""} `}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {workDetails?.status === "wait_for_user_payment" && (
        <>
          <div className="d-flex align-items-center justify-content-end mt-3 ">
            <CustomButton onClick={() => setShowPaymentModal(true)}>
              اتمام الدفع
            </CustomButton>
          </div>
          <OfferRequestPaymentModal
            showModal={showPaymentModal}
            setShowModal={setShowPaymentModal}
            workId={workDetails?.id}
            plan={workDetails?.creator_help_service?.price}
          />
        </>
      )}{" "}
    </section>
  );
}
