// import { useQueryClient } from "@tanstack/react-query";
// import { useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { NavLink, Outlet, useNavigate } from "react-router";
// import { toast } from "sonner";
// import useCancelRequestOffer from "../../../hooks/website/MyWorks/useCancelRequestOffer";
// import useCompleteGoal from "../../../hooks/website/MyWorks/useCompleteGoal";
// import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
// import Loading from "../../../ui/loading/Loading";
// import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
// import OptionsMenu from "../../../ui/website/OptionsMenu";
// import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
// import useDeleteWork from "../../../hooks/website/MyWorks/useDeleteWork";
// import useWithdrawOfferHelp from "../../../hooks/website/contracts/useWithdrawOfferHelp";

// export default function WorksDetailsLayout() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [showAlertModal, setShowAlertModal] = useState(false);
//   const [showAlertwithdrawOfferModal, setShowAlertwithdrawOfferModal] =
//     useState(false);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [tasksSummary, setTasksSummary] = useState(null);

//   const { workDetails, isLoading } = useGetWorkDetails();
//   const { completeGoal, isPending } = useCompleteGoal();
//   const { deleteWork, isPending: isdeletingWork } = useDeleteWork();
//   const { cancelRequestOffer, isPending: isCanceling } =
//     useCancelRequestOffer();
//   const { withdrawOffer, isPending: isWithdrawing } = useWithdrawOfferHelp();

//   const handleCompleteGoal = (id) => {
//     completeGoal(id, {
//       onSuccess: (res) => {
//         toast.success(res?.data?.message);
//         queryClient.refetchQueries("work-details");
//         queryClient.refetchQueries("work-tasks");
//         queryClient.refetchQueries("my-works");
//       },
//     });
//   };

//   const handleDeleteGoal = (id) => {
//     deleteWork(id, {
//       onSuccess: (res) => {
//         toast.success(res?.message);
//         queryClient.refetchQueries({ queryKey: ["my-works"] });
//         navigate("/my-works");
//       },
//       onError: (err) => {
//         toast.error(err.message);
//       },
//     });
//   };

//   const handleCancelOffer = (id) => {
//     cancelRequestOffer(id, {
//       onSuccess: (res) => {
//         toast.success(res?.message);
//         navigate("/my-works");
//         queryClient.refetchQueries("my-works");
//       },
//       onError: (error) => {
//         toast.error(error.message || t("works.errorOccurred"));
//       },
//     });
//   };

//   const handleWithdrawOffer = (id) => {
//     withdrawOffer(id, {
//       onSuccess: (res) => {
//         toast.success(res?.message);
//         navigate("/my-contracts");
//         queryClient.refetchQueries("my-contracts");
//       },
//       onError: (error) => {
//         toast.error(error.message || t("works.errorOccurred"));
//       },
//     });
//   };

//   if (isLoading) return <Loading />;

//   const tabs = useMemo(() => {
//     if (!workDetails) return [];
//     const { rectangle, helper, status } = workDetails;

//     // Case 1: Completed work
//     if (status === "completed") {
//       return [
//         { id: 1, label: t("works.details"), end: true },
//         { id: 2, label: t("works.assistants"), link: "assistants" },
//       ];
//     }

//     // Case 2: Personal goal with helper
//     if (rectangle === "personal_goal_with_helper") {
//       if (helper === null) {
//         return [
//           { id: 1, label: t("works.details"), end: true },
//           { id: 2, label: t("works.myGroup"), link: "group" },
//           { id: 3, label: t("works.offers"), link: "offers" },
//           { id: 4, label: t("works.tasks"), link: "tasks" },
//           { id: 5, label: t("works.assistants"), link: "assistants" },
//         ];
//       }
//       return [
//         { id: 1, label: t("works.details"), end: true },
//         { id: 2, label: t("works.myGroup"), link: "group" },
//         { id: 3, label: t("works.tasks"), link: "tasks" },
//         { id: 4, label: t("works.assistants"), link: "assistants" },
//       ];
//     }

//     // Case 3: Help service from helper
//     if (rectangle === "help_service_from_helper") {
//       const waitingStatuses = [
//         "wait_for_user_payment",
//         "wait_helper_to_accept",
//         "offer_sent",
//       ];

//       if (waitingStatuses.includes(status)) {
//         return [{ id: 1, label: t("works.details"), end: true }];
//       }

//       return [
//         { id: 1, label: t("works.details"), end: true },
//         { id: 2, label: t("works.myGroup"), link: "group" },
//         { id: 3, label: t("works.tasks"), link: "tasks" },
//         { id: 4, label: t("works.assistants"), link: "assistants" },
//       ];
//     }

//     // Default case
//     return [
//       { id: 1, label: t("works.details"), end: true },
//       { id: 2, label: t("works.myGroup"), link: "group" },
//       { id: 3, label: t("works.tasks"), link: "tasks" },
//       { id: 4, label: t("works.assistants"), link: "assistants" },
//     ];
//   }, [workDetails, t]);

//   return (
//     <section className="page work-details-layout">
//       <div className="container">
//         <div className="row">
//           <div className="col-12 p-2">
//             <div className="header">
//               <div className="d-flex align-items-center gap-2">
//                 <RoundedBackButton onClick={() => navigate(`/my-works`)} />
//                 <h1>{workDetails?.code}</h1>
//               </div>

//               {workDetails.status !== "completed" &&
//               workDetails.helper === null ? (
//                 <OptionsMenu
//                   toggleButton={"fa-light fa-shield-exclamation"}
//                   options={
//                     tasksSummary?.exePercentage === 100
//                       ? [
//                           {
//                             label: t("works.complete"),
//                             className: "text-green",
//                             onClick: () => handleCompleteGoal(workDetails?.id),
//                             props: {
//                               disabled: isPending,
//                             },
//                           },
//                           {
//                             label: t("works.delete"),
//                             className: "text-danger",
//                             onClick: () => {
//                               console.log("clicked");
//                               setShowDeleteModal(true);
//                             },
//                             props: {
//                               disabled: isPending,
//                             },
//                           },
//                         ]
//                       : [
//                           {
//                             label: t("works.delete"),
//                             className: "text-danger",
//                             onClick: () => {
//                               console.log("clicked");
//                               setShowDeleteModal(true);
//                             },
//                             props: {
//                               disabled: isPending,
//                             },
//                           },
//                         ]
//                   }
//                 />
//               ) : (
//                 <>
//                   {workDetails?.rectangle === "help_service_from_helper" &&
//                   workDetails?.status === "wait_helper_to_accept" &&
//                   workDetails.status !== "completed" ? (
//                     <OptionsMenu
//                       toggleButton={"fa-regular fa-flag"}
//                       options={[
//                         {
//                           label: t("works.cancelRequest"),
//                           className: "text-fire",
//                           onClick: () => setShowAlertwithdrawOfferModal(true),
//                           props: {
//                             disabled: isPending,
//                           },
//                         },
//                       ]}
//                     />
//                   ) : (
//                     <></>
//                   )}{" "}
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="col-12 p-2">
//             <div className="works-details-tabs">
//               {tabs.map((tab) => (
//                 <NavLink
//                   key={tab.id}
//                   className="tab-link"
//                   to={tab.link || ""}
//                   end={tab.end}
//                 >
//                   {tab.label}
//                   {tab.link === "offers" && (
//                     <span className="offer-count-badge">
//                       {workDetails?.offers_count}
//                     </span>
//                   )}
//                 </NavLink>
//               ))}
//             </div>
//           </div>

//           <div className="col-12 p-2">
//             <Outlet context={{ setTasksSummary }} />
//           </div>
//         </div>
//       </div>

//       <AlertModal
//         confirmButtonText={t("confirm")}
//         showModal={showAlertModal}
//         setShowModal={setShowAlertModal}
//         onConfirm={() => handleCancelOffer(workDetails.id)}
//         loading={isCanceling}
//       >
//         {t("works.withdrawWarning")}
//       </AlertModal>

//       <AlertModal
//         confirmButtonText={t("confirm")}
//         showModal={showDeleteModal}
//         setShowModal={setShowDeleteModal}
//         onConfirm={() => handleDeleteGoal(workDetails.id)}
//         loading={isdeletingWork}
//       >
//         {t("goalDeleteWarning")}
//       </AlertModal>
//       <AlertModal
//         confirmButtonText={t("confirm")}
//         showModal={showAlertwithdrawOfferModal}
//         setShowModal={setShowAlertwithdrawOfferModal}
//         onConfirm={() => handleWithdrawOffer(workDetails.id)}
//         loading={isWithdrawing}
//       >
//         {t("works.withdrawWarning")}
//       </AlertModal>
//     </section>
//   );
// }

import { useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

import useCancelRequestOffer from "../../../hooks/website/MyWorks/useCancelRequestOffer";
import useCompleteGoal from "../../../hooks/website/MyWorks/useCompleteGoal";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import useDeleteWork from "../../../hooks/website/MyWorks/useDeleteWork";
import useWithdrawOfferHelp from "../../../hooks/website/contracts/useWithdrawOfferHelp";

import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksDetailsLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlertWithdrawOfferModal, setShowAlertWithdrawOfferModal] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tasksSummary, setTasksSummary] = useState(null);

  const { workDetails, isLoading } = useGetWorkDetails();
  const { completeGoal, isPending: isCompleting } = useCompleteGoal();
  const { deleteWork, isPending: isDeleting } = useDeleteWork();
  const { cancelRequestOffer, isPending: isCanceling } =
    useCancelRequestOffer();
  const { withdrawOffer, isPending: isWithdrawing } = useWithdrawOfferHelp();

  // Destructure safely
  const { id, code, status, helper, rectangle, offers_count } =
    workDetails || {};

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

  const handleWithdrawOffer = useCallback(
    (offerId) => {
      withdrawOffer(offerId, {
        onSuccess: (res) => {
          toast.success(res?.message);
          navigate("/my-contracts");
          queryClient.refetchQueries("my-contracts");
        },
        onError: (error) =>
          toast.error(error.message || t("works.errorOccurred")),
      });
    },
    [withdrawOffer, navigate, queryClient, t]
  );

  // === Tabs Computation (memoized) ===
  const tabs = useMemo(() => {
    if (!workDetails) return [];

    if (status === "completed") {
      return [
        { id: 1, label: t("works.details"), end: true },
        { id: 2, label: t("works.assistants"), link: "assistants" },
      ];
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
    onClick: () => setShowAlertWithdrawOfferModal(true),
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
          toggleButton="fa-light fa-shield-exclamation"
          options={options}
          aria-label="work options"
        />
      );
    }

    if (
      rectangle === "help_service_from_helper" &&
      status === "wait_helper_to_accept" &&
      status !== "completed"
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

      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertWithdrawOfferModal}
        setShowModal={setShowAlertWithdrawOfferModal}
        onConfirm={() => handleWithdrawOffer(id)}
        loading={isWithdrawing}
      >
        {t("works.withdrawWarning")}
      </AlertModal>
    </section>
  );
}
