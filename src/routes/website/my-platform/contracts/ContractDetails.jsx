import { useTranslation } from "react-i18next";
import useGetWorkDetails from "../../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../../ui/loading/Loading";
import AssistantWorkCard from "../../../../ui/website/my-works/work-offers/AssistantWorkCard";
import { useSelector } from "react-redux";
import Currency from "../../../../ui/Currency";
import CustomButton from "../../../../ui/CustomButton";
import useAcceptOrRefuseContract from "../../../../hooks/website/contracts/useAcceptOrRefuseContract";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AlertModal from "../../../../ui/website/platform/my-community/AlertModal";
import { useState } from "react";
import { useNavigate } from "react-router";
import AcceptModal from "../../../../ui/website/platform/contracts/AcceptModal";

export default function ContractDetails() {
  const { t } = useTranslation();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { lang } = useSelector((state) => state.language);
  const { acceptOrRefuse, isPending } = useAcceptOrRefuseContract();
  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;

  const handleRefuseAction = (status) => {
    acceptOrRefuse(
      {
        id: workDetails?.id,
        status,
      },
      {
        onSuccess: () => {
          toast.success(t("contract.acceptedSuccessfully"));
          navigate("/my-contracts");
          queryClient.invalidateQueries(["workDetails"]);
          queryClient.refetchQueries(["my-contracts"]);
        },
        onError: (error) => {
          toast.error(error.message || t("contract.errorOccurred"));
        },
      }
    );
  };

  // const statusText = {
  //   wait_helper_to_accept: t("contract.status.waitHelperToAccept"),
  //   wait_for_user_payment: t("contract.status.waitForUserPayment"),
  //   offer_sent: t("works.status.offerSent"),
  //   planning: t("contract.status.planning"),
  //   offers: t("contract.status.offers"),
  //   execution: t("contract.status.execution"),
  //   payment: t("contract.status.payment"),
  //   completed: t("contract.status.completed"),
  // }[workDetails?.status];

  return (
    <section className="work-details-page">
      <div
        className={`status-info ${
          workDetails?.status !== "completed" ? "not-completed" : "completed"
        }`}
      >
        <span>{workDetails.status_text}</span>
        <span>{workDetails?.status_date}</span>
      </div>

      <div className="mb-3">
        <AssistantWorkCard helper={workDetails?.user} />
      </div>

      <div className="my-3 work-description">
        <div className="label">
          {workDetails.rectangle === "personal_goal_with_helper" && (
            <>
              <img src="/icons/triangle-with-helper.svg" alt="" />{" "}
              {t("website.offerDetails.goal")}
            </>
          )}
          {workDetails.rectangle === "help_service_from_helper" && (
            <>
              <img src="/icons/help_service_from_helper.svg" alt="" />{" "}
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
            <div className="value">{workDetails?.category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.specialty")}</div>
            <div className="value">{workDetails?.sub_category_title}</div>
          </div>
          <div className="info-box">
            <div className="label">
              {t("website.offerDetails.expectedData")}
            </div>
            <div className="value">
              {workDetails?.goal?.expected_duration_human}
            </div>
          </div>
          <div className="info-box">
            <div className="label">{t("website.offerDetails.startDate")}</div>
            <div className="value">{workDetails?.goal?.start_date}</div>
          </div>
        </div>
      </div>

      {workDetails?.goal?.notes && (
        <div className="notse-box my-3">
          <div className="label">{t("website.offerDetails.extraTerms")}</div>
          <div className="value">{workDetails?.goal.notes}</div>
        </div>
      )}

      {workDetails?.help_mechanisms.length > 0 && (
        <div className="extra-terms">
          <h2>{t("website.offerDetails.mechanisms")}</h2>
          <ul className="mechanisms-list">
            {workDetails?.help_mechanisms.map((item) => (
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

      {workDetails?.offer_price >= 0 && (
        <div className="notse-box my-3" style={{ width: "fit-content" }}>
          <div className="label">{t("website.offerDetails.price")}</div>
          <div className="value">
            {workDetails?.offer_price} <Currency />
          </div>
        </div>
      )}

      {workDetails.status === "wait_helper_to_accept" && (
        <div className="buttons d-flex align-items-center justify-content-end gap-2 ">
          <CustomButton
            size="large"
            color="fire"
            variant="outlined"
            disabled={isPending}
            onClick={() => setShowAlertModal(true)}
          >
            {t("reject")}
          </CustomButton>

          <CustomButton
            size="large"
            color="success"
            style={{ minWidth: "250px" }}
            disabled={isPending}
            onClick={() => setShowAcceptModal(true)}
          >
            {t("accept")}
          </CustomButton>
        </div>
      )}

      <AlertModal
        confirmButtonText={t("common.confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleRefuseAction("refused_by_helper")}
        loading={isPending}
      >
        {t("contract.refuseWarning")}
      </AlertModal>

      <AcceptModal
        workId={workDetails.id}
        showModal={showAcceptModal}
        setShowModal={setShowAcceptModal}
      />
    </section>
  );
}
