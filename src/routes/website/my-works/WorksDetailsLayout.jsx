import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

import useCancelRequestOffer from "../../../hooks/website/MyWorks/useCancelRequestOffer";
import useCompleteGoal from "../../../hooks/website/MyWorks/useCompleteGoal";
import useDeleteWork from "../../../hooks/website/MyWorks/useDeleteWork";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";

import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksDetailsLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showAlertModal, setShowAlertModal] = useState(false);
  // const [showAlertWithdrawOfferModal, setShowAlertWithdrawOfferModal] =
  //   useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tasksSummary, setTasksSummary] = useState(null);

  const { workDetails, isLoading } = useGetWorkDetails();
  const { completeGoal, isPending: isCompleting } = useCompleteGoal();
  const { deleteWork, isPending: isDeleting } = useDeleteWork();
  const { cancelRequestOffer, isPending: isCanceling } =
    useCancelRequestOffer();
  // const { withdrawOffer, isPending: isWithdrawing } = useWithdrawOfferHelp();

  // Destructure safely
  const {
    id,
    code,
    status,
    helper,
    rectangle,
    offers_count,
    has_working_contract,
    had_helpers,
  } = workDetails || {};

  // === Handlers (must be declared before conditional returns) ===
  const handleCompleteGoal = useCallback(
    (goalId) => {
      completeGoal(goalId, {
        onSuccess: (res) => {
          toast.success(res?.data?.message);
          queryClient.refetchQueries("work-details");
          queryClient.refetchQueries("work-tasks");
          queryClient.refetchQueries("my-works");
        },
      });
    },
    [completeGoal, queryClient]
  );

  const handleDeleteGoal = useCallback(
    (goalId) => {
      deleteWork(goalId, {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.refetchQueries({ queryKey: ["my-works"] });
          navigate("/my-works");
        },
        onError: (err) => toast.error(err.message),
      });
    },
    [deleteWork, navigate, queryClient]
  );

  const handleCancelOffer = useCallback(
    (offerId) => {
      cancelRequestOffer(offerId, {
        onSuccess: (res) => {
          toast.success(res?.message);
          navigate("/my-works");
          queryClient.refetchQueries("my-works");
        },
        onError: (error) =>
          toast.error(error.message || t("works.errorOccurred")),
      });
    },
    [cancelRequestOffer, navigate, queryClient, t]
  );

  // const handleWithdrawOffer = useCallback(
  //   (offerId) => {
  //     withdrawOffer(offerId, {
  //       onSuccess: (res) => {
  //         toast.success(res?.message);
  //         navigate("/my-contracts");
  //         queryClient.refetchQueries("my-contracts");
  //       },
  //       onError: (error) =>
  //         toast.error(error.message || t("works.errorOccurred")),
  //     });
  //   },
  //   [withdrawOffer, navigate, queryClient, t]
  // );

  // === Tabs Computation (memoized) ===
  const tabs = useMemo(() => {
    if (!workDetails) return [];

    if (status === "completed") {
      if (had_helpers > 0) {
        return [
          { id: 1, label: t("works.details"), end: true },
          { id: 2, label: t("works.tasks"), link: "tasks" },
          { id: 2, label: t("works.assistants"), link: "assistants" },
        ];
      } else {
        return [
          { id: 1, label: t("works.details"), end: true },
          { id: 2, label: t("works.tasks"), link: "tasks" },
        ];
      }
    }

    if (rectangle === "personal_goal_with_helper") {
      if (!helper) {
        return [
          { id: 1, label: t("works.details"), end: true },
          { id: 2, label: t("works.myGroup"), link: "group" },
          { id: 3, label: t("works.offers"), link: "offers" },
          { id: 4, label: t("works.tasks"), link: "tasks" },
          { id: 5, label: t("works.assistants"), link: "assistants" },
        ];
      }
      return [
        { id: 1, label: t("works.details"), end: true },
        { id: 2, label: t("works.myGroup"), link: "group" },
        { id: 3, label: t("works.tasks"), link: "tasks" },
        { id: 4, label: t("works.assistants"), link: "assistants" },
      ];
    }

    if (rectangle === "help_service_from_helper") {
      const waitingStatuses = [
        "wait_for_user_payment",
        "wait_helper_to_accept",
        "offer_sent",
      ];

      if (waitingStatuses.includes(status)) {
        return [{ id: 1, label: t("works.details"), end: true }];
      }

      return [
        { id: 1, label: t("works.details"), end: true },
        { id: 2, label: t("works.myGroup"), link: "group" },
        { id: 3, label: t("works.tasks"), link: "tasks" },
        { id: 4, label: t("works.assistants"), link: "assistants" },
      ];
    }

    return [
      { id: 1, label: t("works.details"), end: true },
      { id: 2, label: t("works.myGroup"), link: "group" },
      { id: 3, label: t("works.tasks"), link: "tasks" },
      { id: 4, label: t("works.assistants"), link: "assistants" },
    ];
  }, [rectangle, helper, status, t, workDetails]);

  // === Option menu configs ===
  const deleteOption = {
    label: t("works.delete"),
    className: "text-danger",
    onClick: () => setShowDeleteModal(true),
    props: { disabled: isCompleting },
  };

  const completeOption = {
    label: t("works.complete"),
    className: "text-green",
    onClick: () => handleCompleteGoal(id),
    props: { disabled: isCompleting },
  };

  const cancelOption = {
    label: t("works.cancelRequest"),
    className: "text-fire",
    onClick: () => setShowAlertModal(true),
    props: { disabled: isCompleting },
  };

  // === Conditional Menu Rendering ===
  const renderOptionsMenu = () => {
    if (status !== "completed" && !helper) {
      const options =
        tasksSummary?.exePercentage === 100
          ? [completeOption, deleteOption]
          : [deleteOption];
      return (
        <OptionsMenu
          toggleButton="fa-regular fa-shield-exclamation color-main"
          options={options}
          aria-label="work options"
        />
      );
    }

    if (
      rectangle === "help_service_from_helper" &&
      (status === "wait_helper_to_accept" || status === "wait_for_user_payment")
    ) {
      return (
        <OptionsMenu
          toggleButton="fa-regular fa-flag"
          options={[cancelOption]}
          aria-label="cancel offer"
        />
      );
    }

    return null;
  };

  // === JSX ===
  return (
    <section className="page work-details-layout">
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row">
            {/* Header */}
            <div className="col-12 p-2">
              <div className="header d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <RoundedBackButton onClick={() => navigate("/my-works")} />
                  <h1>{code}</h1>
                </div>
                {renderOptionsMenu()}
              </div>
            </div>

            {/* Tabs */}
            <div className="col-12 p-2">
              <div className="works-details-tabs">
                {tabs.map(({ id, label, link, end }) => (
                  <NavLink
                    key={id}
                    className="tab-link"
                    to={link || ""}
                    end={end}
                  >
                    {label}
                    {link === "offers" && (
                      <span className="offer-count-badge">{offers_count}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Outlet */}
            <div className="col-12 p-2">
              <Outlet context={{ setTasksSummary }} />
            </div>
          </div>
        )}
      </div>

      {/* === Alert Modals === */}
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleCancelOffer(id)}
        loading={isCanceling}
      >
        {t("works.withdrawWarning")}
      </AlertModal>

      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirm={() => handleDeleteGoal(id)}
        loading={isDeleting}
      >
        {t("goalDeleteWarning")}
      </AlertModal>

      {/* <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertWithdrawOfferModal}
        setShowModal={setShowAlertWithdrawOfferModal}
        onConfirm={() => handleWithdrawOffer(id)}
        loading={isWithdrawing}
      >
        {t("works.withdrawWarning")}
      </AlertModal> */}
    </section>
  );
}
