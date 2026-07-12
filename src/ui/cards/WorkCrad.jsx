import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "sonner";

import useDeleteWork from "../../hooks/website/MyWorks/useDeleteWork";
import titleIcon from "../../assets/icons/title.svg";
import offersIcon from "../../assets/icons/offers-icon.svg";
import triangleWithHelper from "../../assets/icons/triangle-with-helper.svg";
import triangleWithoutHelper from "../../assets/icons/triangle-without-helper.png";
import helpServiceFromHelper from "../../assets/icons/help_service_from_helper.svg";
import {
  formatStartDateTimestamp,
  getStartExecutionDeadlineDebugSnapshot,
  getStartExecutionDeadlineState,
} from "../../utils/startExecutionDeadline";
import AlertModal from "../website/platform/my-community/AlertModal";
import HelperCard from "./HelperCard";
import StartExecutionDeadlineAlert from "../website/my-works/StartExecutionDeadlineAlert";
import WorkProgress from "../website/my-works/WorkProgress";

export default function WorkCard({
  work,
  withoutStatus = false,
  showOverdueTasks = false,
}) {
  let steps;
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteWork, isPending: isDeleting } = useDeleteWork();

  if (work.rectangle === "personal_goal") {
    steps = [
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  } else if (work.rectangle === "personal_goal_with_helper") {
    steps = [
      { key: "offers", label: t("works.status.offers") },
      { key: "payment", label: t("works.status.payment") },
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  } else {
    steps = [
      { key: "wait_helper_to_accept", label: t("works.status.waitAccept") },
      { key: "wait_for_user_payment", label: t("works.status.request") },
      { key: "payment", label: t("works.status.payment") },
      { key: "planning", label: t("works.status.plan") },
      {
        key: "execution",
        label: t("works.status.start"),
      },
    ];
  }

  const deadlineState = getStartExecutionDeadlineState(work);
  const isAutoCanceled = Boolean(deadlineState?.isAutoCanceled);
  const isCanceled = work.status === "canceled" || isAutoCanceled;
  const currentIndex = steps.findIndex((s) => s.key === work.status);
  const progressSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex && !isCanceled,
    current: index === currentIndex && !isCanceled,
  }));
  const overdueTasksCount = Number(work?.overdue_tasks_count) || 0;
  const hasOverdueTasks = showOverdueTasks && overdueTasksCount > 0;
  const hasUnreadChats =
    work.status !== "completed" && Number(work?.total_unread_chats) > 0;
  const offersCount = isAutoCanceled ? 0 : Number(work?.offers_count) || 0;
  const startDate = formatStartDateTimestamp(
    work?.start_date_timestamp,
    i18n.language,
  );

  useEffect(() => {
    console.log(
      "[StartExecutionDeadline][WorkCard]",
      getStartExecutionDeadlineDebugSnapshot(work),
    );
  }, [work]);

  const handleDeleteWork = () => {
    deleteWork(work.id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setShowDeleteModal(false);
        queryClient.refetchQueries({ queryKey: ["my-works"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  const cardContent = (
    <>
      {work.code && (
        <div className={`work-reference-code ${work.rectangle ?? ""}`}>
          {work.code}
        </div>
      )}
      {work.status === "execution" && work.helper !== null && (
        <HelperCard helper={work.helper} />
      )}
      <div className="work-title">
        {work.rectangle === "personal_goal_with_helper" && (
          <img src={triangleWithHelper} alt="" />
        )}
        {work.rectangle === "personal_goal" && (
          <img src={triangleWithoutHelper} alt="" />
        )}
        {work.rectangle === "help_service_from_helper" && (
          <img src={helpServiceFromHelper} alt="" />
        )}
        <p className="title ellipsis">{work.title}</p>
      </div>

      <div className="info flex-grow-1 ">
        <div className="row">
          <div className="col-4 p-1">
            <div className="info-item">
              <img src={titleIcon} />
              <p> {work.category_title} </p>
            </div>
          </div>
          <div className="col-4 p-1">
            <div className="info-item">
              <i className="fa-light fa-calendar"></i> <p>{startDate}</p>
            </div>
          </div>
          {(hasUnreadChats || hasOverdueTasks) && (
            <div className="col-4 p-1 d-flex justify-content-end">
              <div className="work-card-alerts">
                {hasUnreadChats && (
                  <span className="notification_span">
                    {work?.total_unread_chats}
                  </span>
                )}
                {hasOverdueTasks && (
                  <span className="overdue-tasks-indicator">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <span>
                      {overdueTasksCount} {t("works.overdueTasksCount")}
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}
          {offersCount > 0 && (
            <div className="col-6 p-1 ">
              <div className="info-item">
                <img src={offersIcon} />
                <p>{offersCount} عروض مقدمة</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!withoutStatus && <WorkProgress steps={progressSteps} />}
      {!isAutoCanceled && <StartExecutionDeadlineAlert item={work} />}
      {isAutoCanceled && (
        <button
          type="button"
          className="start-execution-delete-action"
          disabled={isDeleting}
          onClick={() => setShowDeleteModal(true)}
        >
          {isDeleting && <i className="fas fa-spinner fa-spin"></i>}
          {t("works.startExecutionDeadline.deleteAction")}
        </button>
      )}
      {work.status === "completed" && (
        <div
          className={`status-info m-0  ${
            work.status !== "completed" ? "not-completed" : "completed"
          }`}
        >
          <span>
            {work.status === "planning" && " بانتظار بدء خطة التنفيذ"}
            {work.status === "offers" && "بانتظار قبول العرض المناسب"}
            {work.status === "execution" && " بانتظار خطة التنفيذ"}
            {work.status === "payment" && "تم الدفع وبإنتظار بدء خطة التنفيذ"}
            {work.status === "completed" && "مكتمل"}
          </span>
          <span>{work.status_date}</span>
        </div>
      )}
    </>
  );

  return (
    <>
      {isAutoCanceled ? (
        <article className="work-card work-card--auto-canceled">
          {cardContent}
        </article>
      ) : (
        <Link to={`/my-works/${work.id}`} className="work-card">
          {cardContent}
        </Link>
      )}

      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirm={handleDeleteWork}
        loading={isDeleting}
      >
        {t("goalDeleteWarning")}
      </AlertModal>
    </>
  );
}
