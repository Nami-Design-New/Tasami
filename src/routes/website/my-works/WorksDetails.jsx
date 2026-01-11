import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Currency from "../../../ui/Currency";
import CustomButton from "../../../ui/CustomButton";
import Loading from "../../../ui/loading/Loading";
import OfferRequestPaymentModal from "../../../ui/website/platform/contracts/OfferRequestPaymentModal";
import AssistantWorkCard from "../../../ui/website/my-works/work-offers/AssistantWorkCard";
import triangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";
import helpServiceFromHelper from "../../../assets/icons/help_service_from_helper.svg";

export default function WorksDetails() {
  const { t } = useTranslation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { workDetails, isLoading } = useGetWorkDetails();
  const { lang } = useSelector((state) => state.language);

  if (isLoading) return <Loading />;

  return (
    <section className="work-details-page">
      {/* ---- Status Section ---- */}
      <div
        className={`status-info ${
          workDetails.status !== "completed" ? "not-completed" : "completed"
        }`}
      >
        <span>{workDetails.status_text}</span>
        <span>{workDetails.status_date}</span>
      </div>
      {/* ---- Description Section ---- */}{" "}
      {workDetails.rectangle === "help_service_from_helper" &&
        workDetails.helper && (
          <div className="mb-3">
            <AssistantWorkCard
              helper={workDetails?.helper}
              canNavigate={false}
              chat={false}
            />
          </div>
        )}
      <div className="my-3 work-description">
        <div className="label">
          {workDetails.rectangle === "personal_goal_with_helper" && (
            <>
              <img src={triangleWithHelper} alt="" />
              {t("website.offerDetails.goal")}
            </>
          )}

          {workDetails.rectangle === "help_service_from_helper" && (
            <>
              <img src={helpServiceFromHelper} alt="" />
              {t("website.offerDetails.offer")}
            </>
          )}
        </div>{" "}
        <p className="value">{workDetails?.title}</p>
      </div>
      {/* ---- Info Grid ---- */}
      <div className="goal-info">
        <div className="info-grid">
          <div className="info-box info-box-grow-min-width">
            <div className="label">{t("website.offerDetails.field")}</div>
            <div className="value">{workDetails.category_title}</div>
          </div>

          <div className="info-box info-box-grow-min-width">
            <div className="label">{t("website.offerDetails.specialty")}</div>
            <div className="value">{workDetails.sub_category_title}</div>
          </div>
          {/* {workDetails.rectangle !== "personal_helper" && (
            <div className="info-box">
              <div className="label">{t("website.offerDetails.goal")}</div>
              <div className="value">{workDetails?.title}</div>
            </div>
          )} */}

          {/* Start Date (not shown for helper service) */}
          {workDetails.rectangle !== "help_service_from_helper" && (
            <div className="info-box info-box-grow-min-width ">
              <div className="label">{t("website.offerDetails.startDate")}</div>
              <div className="value">{workDetails?.goal?.start_date}</div>
            </div>
          )}

          {/* Price */}
          {workDetails.rectangle === "help_service_from_helper" &&
            workDetails?.offer_price >= 0 && (
              <div className="info-box info-box-grow-min-width ">
                <div className="label">{t("website.offerDetails.price")}</div>
                <div className="value">
                  {workDetails?.help_price} <Currency />
                </div>
              </div>
            )}

          {/* Notes */}
          {workDetails.goal?.notes && (
            <div
              className="info-box info-box-grow-min-width "
              style={{ minWidth: "100%" }}
            >
              <div className="label">
                {t("website.offerDetails.extraTerms")}
              </div>
              <div className="value">{workDetails.goal.notes}</div>
            </div>
          )}

          {/* Helper Service Only Fields */}
          {workDetails.rectangle === "help_service_from_helper" && (
            <>
              <div className="info-box info-box-grow-min-width ">
                <div className="label">
                  {t("website.offerDetails.preferredGender")}
                </div>
                <div className="value">
                  {t(`${workDetails?.creator_help_service?.preferred_gender}`)}
                </div>
              </div>

              <div className="info-box info-box-grow-min-width ">
                <div className="label">
                  {t("website.offerDetails.ageRange")}
                </div>
                <div className="value">
                  {workDetails?.creator_help_service?.from_age === 0 ||
                  workDetails?.creator_help_service?.to_age === 0
                    ? t("undefined")
                    : `${workDetails?.creator_help_service?.from_age} -
                      ${workDetails?.creator_help_service?.to_age}`}{" "}
                </div>
              </div>
              <div
                className="info-box  info-box-grow-min-width "
                style={{ minWidth: "200px" }}
              >
                <div className="label">
                  {t("website.offerDetails.startDate")}
                </div>
                <div className="value">{t(`${workDetails?.start_date}`)}</div>
              </div>
              <div
                className="info-box info-box-grow-min-width "
                style={{ minWidth: "100%" }}
              >
                <div className="label">
                  {t("website.offerDetails.expectedDuration")}
                </div>
                <div className="value">
                  {workDetails?.goal?.expected_duration_human}
                </div>
              </div>
            </>
          )}

          {/* Personal Goal Only */}
          {workDetails.rectangle !== "help_service_from_helper" && (
            <div
              className="info-box info-box-grow-min-width "
              style={{ minWidth: "100%" }}
            >
              <div className="label">
                {t("website.offerDetails.expectedDurationGoal")}
              </div>
              <div className="value">
                {workDetails?.goal?.expected_duration_human}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ---- Mechanisms ---- */}
      {workDetails?.help_mechanisms?.length > 0 && (
        <div className="extra-terms">
          <h2>{t("website.offerDetails.mechanisms")}</h2>
          <ul className="mechanisms-list">
            {workDetails.help_mechanisms.map((item) => (
              <li
                key={item.id}
                className={`mech-item ${lang === "en" ? "en" : ""}`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* ---- Payment Section ---- */}
      {workDetails?.status === "wait_for_user_payment" && (
        <>
          <div className="d-flex align-items-center justify-content-end mt-3">
            <CustomButton onClick={() => setShowPaymentModal(true)}>
              {t("works.completePayment")}
            </CustomButton>
          </div>
          <OfferRequestPaymentModal
            showModal={showPaymentModal}
            setShowModal={setShowPaymentModal}
            workId={workDetails?.id}
            plan={workDetails?.creator_help_service?.price}
          />
        </>
      )}
    </section>
  );
}
