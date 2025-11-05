import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import useGetWorkDetails from "../../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../../ui/loading/Loading";
import RoundedBackButton from "../../../../ui/website-auth/shared/RoundedBackButton";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CancelContractModal from "../../../../ui/website/my-works/CancelContractModal";
import useWithdrawOfferHelp from "../../../../hooks/website/contracts/useWithdrawOfferHelp";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AlertModal from "../../../../ui/website/platform/my-community/AlertModal";

export default function ContractDetailsLayout() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { workDetails, isLoading } = useGetWorkDetails();
  const { withdrawOffer, isPending: isWithdrawing } = useWithdrawOfferHelp();

  const handleWithdrawOffer = (id) => {
    withdrawOffer(id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        navigate("/my-contracts");
        queryClient.refetchQueries("my-contracts");
      },
      onError: (error) => {
        toast.error(error.message || t("works.errorOccurred"));
      },
    });
  };

  let options;
  let tabs = [];

  if (isLoading) return <Loading />;

  // Optins menu Logic

  if (workDetails?.rectangle === "personal_goal_with_helper") {
    if (workDetails?.status === "offer_sent") {
      options = [
        {
          id: 1,
          label: t("works.contractDetails.withDraw"),
          className: "text-fire",
          onClick: () => setShowAlertModal(true),
        },
      ];
    } else {
      options = [
        {
          id: 1,
          label: t("works.contractDetails.endContract"),
          className: "text-fire",
          onClick: () => setShowCancelModal(true),
        },
      ];
    }
  } else if (workDetails?.rectangle === "help_service_from_helper") {
    if (
      workDetails?.status === "wait_for_user_payment" ||
      workDetails?.status === "wait_helper_to_accept"
    ) {
      options = [
        {
          id: 1,
          label: t("works.cancelRequest"),
          className: "text-fire",
          onClick: () => setShowAlertModal(true),
        },
      ];
    } else {
      options = [
        {
          id: 1,
          label: t("works.contractDetails.endContract"),
          className: "text-fire",
          onClick: () => setShowCancelModal(true),
        },
      ];
    }
  }

  // Tabs Logic
  if (
    workDetails?.status === "wait_for_user_payment" ||
    workDetails?.status === "wait_helper_to_accept" ||
    workDetails?.status === "offer_sent"
  ) {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
    ];
  } else if (workDetails?.status === "completed") {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
      { id: 2, label: t("works.beneficiary"), link: "beneficiaries" },
    ];
  } else if (
    workDetails?.helper === null &&
    (workDetails?.status === "planning" || workDetails?.status === "execution")
  ) {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
      // { id: 3, label: t("works.myGroup"), link: "group" },
      // { id: 4, label: t("works.tasks"), link: "tasks" },
      { id: 5, label: t("works.beneficiary"), link: "beneficiaries" },
    ];
  } else {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
      { id: 3, label: t("works.myGroup"), link: "group" },
      { id: 4, label: t("works.tasks"), link: "tasks" },
      { id: 5, label: t("works.beneficiary"), link: "beneficiaries" },
    ];
  }

  return (
    <section className="page work-details-layout">
      <div className="container ">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <div className="d-flex align-items-center gap-2">
                <RoundedBackButton
                  onClick={() => navigate(`/my-contracts`)}
                ></RoundedBackButton>
                <h1>{workDetails?.code}</h1>
              </div>
              {workDetails?.rectangle === "help_service_from_helper" &&
              workDetails?.status === "wait_helper_to_accept" &&
              workDetails.status !== "completed" ? (
                <></>
              ) : (
                <div className={`work-actions `}>
                  <div className="options-menu" ref={menuRef}>
                    <button className="action-buttons" onClick={toggleMenu}>
                      <img src="/icons/contract-flag.svg" />
                    </button>
                    {menuOpen && (
                      <div
                        className={`options-list  ${
                          lang === "en" ? "en" : ""
                        } `}
                      >
                        {options.map((option, index) => (
                          <button
                            key={index}
                            className={`options-item ${option.className || ""}`}
                            onClick={() => {
                              option.onClick?.();
                              setMenuOpen(false);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="works-details-tabs">
              {tabs.map((tab) => (
                <NavLink
                  className="tab-link"
                  to={tab.link || ""}
                  key={tab.id}
                  end={tab.end}
                >
                  {tab.label}
                  {tab.link === "offers" && (
                    <span className="offer-count-badge">
                      {workDetails?.offers_count}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="col-12 p-2">
            <Outlet
              context={{
                contractId: workDetails?.helper_last_contract_id,
              }}
            />
          </div>
        </div>
      </div>{" "}
      <CancelContractModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        workId={workDetails?.id}
        contractId={workDetails?.helper_last_contract_id}
      />{" "}
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleWithdrawOffer(workDetails.id)}
        loading={isWithdrawing}
      >
        {t("works.withdrawWarning")}
      </AlertModal>
    </section>
  );
}
