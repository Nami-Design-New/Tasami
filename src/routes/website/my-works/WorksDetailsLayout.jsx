import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import useCompleteGoal from "../../../hooks/website/MyWorks/useCompleteGoal";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import useWithdrawOfferHelp from "../../../hooks/website/contracts/useWithdrawOfferHelp";

export default function WorksDetailsLayout() {
  let tabs;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [tasksSummary, setTasksSummary] = useState(null);
  const { workDetails, isLoading } = useGetWorkDetails();
  const { completeGoal, isPending } = useCompleteGoal();
  const { withdrawOffer, isPending: isWithdrawing } = useWithdrawOfferHelp();

  const handleCompleteGoal = (id) => {
    completeGoal(id, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
        queryClient.refetchQueries("work-details");
        queryClient.refetchQueries("work-tasks");
        queryClient.refetchQueries("my-works");
      },
    });
  };

  const handleWithdrawOffer = (id) => {
    withdrawOffer(id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        navigate("/my-works");
        queryClient.refetchQueries("my-works");
      },
      onError: (error) => {
        toast.error(error.message || "حدث خطأ أثناء تنفيذ العملية");
      },
    });
  };

  if (isLoading) return <Loading />;
  if (workDetails.status === "completed") {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },

      { id: 4, label: t("works.tasks"), link: "tasks" },
    ];
  } else {
    if (workDetails?.rectangle === "personal_goal_with_helper") {
      if (workDetails?.helper === null) {
        tabs = [
          {
            id: 1,
            label: t("works.details"),
            end: true,
          },
          { id: 3, label: t("works.group"), link: "group" },
          { id: 3, label: t("works.offers"), link: "offers" },
          { id: 4, label: t("works.tasks"), link: "tasks" },
          { id: 5, label: t("works.assistants"), link: "assistants" },
        ];
      } else {
        tabs = [
          {
            id: 1,
            label: t("works.details"),
            end: true,
          },
          { id: 3, label: t("works.group"), link: "group" },

          { id: 4, label: t("works.tasks"), link: "tasks" },
          { id: 5, label: t("works.assistants"), link: "assistants" },
        ];
      }
    } else if (workDetails?.rectangle === "help_service_from_helper") {
      if (
        workDetails.status === "wait_for_user_payment" ||
        workDetails.status === "wait_helper_to_accept" ||
        workDetails.status === "offer_sent"
      ) {
        tabs = [
          {
            id: 1,
            label: t("works.details"),
            end: true,
          },
        ];
      } else {
        tabs = [
          {
            id: 1,
            label: t("works.details"),
            end: true,
          },
          { id: 2, label: t("works.group"), link: "group" },
          { id: 3, label: t("works.tasks"), link: "tasks" },
          { id: 4, label: t("works.assistants"), link: "assistants" },
        ];
      }
    } else {
      tabs = [
        {
          id: 1,
          label: t("works.details"),
          end: true,
        },
        { id: 2, label: t("works.group"), link: "group" },
        { id: 3, label: t("works.tasks"), link: "tasks" },
        { id: 4, label: t("works.assistants"), link: "assistants" },
      ];
    }
  }
  return (
    <section className="page work-details-layout">
      <div className="container ">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <div className="d-flex align-items-center gap-2">
                <RoundedBackButton
                  onClick={() => navigate(`/my-works`)}
                ></RoundedBackButton>
                <h1>{workDetails?.code}</h1>
              </div>
              {workDetails.rectangle === "help_service_from_helper" ? (
                <>
                  {(workDetails.status === "wait_for_user_payment" ||
                    workDetails.status === "wait_helper_to_accept" ||
                    workDetails.status === "offer_sent") && (
                    <OptionsMenu
                      toggleButton={"fa-solid fa-ellipsis"}
                      options={[
                        {
                          label: t("works.cancelRequest"),
                          className: "text-danger",
                          onClick: () => setShowAlertModal(true),
                          props: {
                            disabled: isPending,
                          },
                        },
                      ]}
                    />
                  )}
                </>
              ) : (
                <>
                  {workDetails.status !== "completed" && (
                    <OptionsMenu
                      toggleButton={"fa-light fa-shield-exclamation"}
                      options={
                        tasksSummary?.exePercentage === 100
                          ? [
                              {
                                label: t("works.complete"),
                                className: "text-green",
                                onClick: () =>
                                  handleCompleteGoal(workDetails?.id),
                                props: {
                                  disabled: isPending,
                                },
                              },
                              {
                                label: t("works.delete"),
                                className: "text-danger",
                              },
                            ]
                          : [
                              {
                                label: t("works.delete"),
                                className: "text-danger",
                              },
                            ]
                      }
                    />
                  )}
                </>
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
                setTasksSummary,
              }}
            />
          </div>
        </div>
      </div>
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() => handleWithdrawOffer(workDetails.id)}
        loading={isPending}
      >
        سيؤدي هذا الإجراء إلى فقدان تفاصيل العرض ولن تتمكن من استعادته لاحقًا
      </AlertModal>
    </section>
  );
}
