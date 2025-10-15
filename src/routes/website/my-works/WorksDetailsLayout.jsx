import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import { useState } from "react";
import useCompleteGoal from "../../../hooks/website/MyWorks/useCompleteGoal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function WorksDetailsLayout() {
  let tabs;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tasksSummary, setTasksSummary] = useState(null);
  const { workDetails, isLoading } = useGetWorkDetails();
  const { completeGoal, isPending } = useCompleteGoal();

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
    if (workDetails.rectangle === "personal_goal_with_helper") {
      tabs = [
        {
          id: 1,
          label: t("works.details"),
          end: true,
        },
        { id: 2, label: t("works.offers"), link: "offers" },
        { id: 3, label: t("works.group"), link: "group" },
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
              {workDetails.status !== "completed" && (
                <OptionsMenu
                  toggleButton={"fa-light fa-shield-exclamation"}
                  options={
                    tasksSummary?.exePercentage === 100
                      ? [
                          {
                            label: t("works.complete"),
                            className: "text-green",
                            onClick: () => handleCompleteGoal(workDetails?.id),
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
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="works-details-tabs">
              {tabs.map((tab) => (
                <NavLink
                  className="tab-link"
                  key={tab.id}
                  to={tab.link || ""}
                  end={tab.end}
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="col-12 p-2">
            <Outlet context={{ setTasksSummary }} />
          </div>
        </div>
      </div>
    </section>
  );
}
