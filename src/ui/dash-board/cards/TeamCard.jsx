import { useTranslation } from "react-i18next";
import CustomButton from "../../CustomButton";
import ProgressStats from "../teams/ProgressStats";
import TeamInfoItem from "../teams/TeamInfoItem";
import useDeleteSharedGroup from "../../../hooks/dashboard/workingGroups/SharedGroups/useDeleteSharedGroup";
import { useState } from "react";
import ConfirmDeleteModal from "../../modals/ConfirmationDeleteModal";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TeamCard = ({ team }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState();
  //-----------------------
  // delete shared Group hook
  //-----------------------
  const { deleteSharedGroup, isPending: isDeleting } = useDeleteSharedGroup();

  const handelDeleteSharedGroups = (sharedId) => {
    const payload = {
      groupId: id,
      shared_id: sharedId,
    };
    deleteSharedGroup(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["available-groups"],
        });
        queryClient.invalidateQueries({
          queryKey: ["shared-groups"],
        });
        setShowConfirmDeleteModal(false);
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  return (
    <div className="teams__card teams__card--main">
      <div className="teams__card-header">
        <div className="teams__card-header-info">
          <h4 className="teams__card-id">{team?.name}</h4>
          <p className="teams__card-location">
            {team?.country?.title} | {team?.city?.title}
          </p>
        </div>
        <span className="teams__card-region">{team.region.title}</span>
      </div>

      <div className="teams__card-body">
        <div className="teams__card-body-list">
          <TeamInfoItem
            title={t("dashboard.sharedGroups.executivesCount")}
            value={team.executive_count}
          />
          <TeamInfoItem
            title={t("dashboard.sharedGroups.leadersCount")}
            value={team.leader_count}
          />
          <TeamInfoItem
            title={t("dashboard.sharedGroups.managersCount")}
            value={team.manager_count}
          />
          <TeamInfoItem
            title={t("dashboard.sharedGroups.supervisorsCount")}
            value={team.CustomerService_count}
          />
          <TeamInfoItem
            title={t("dashboard.sharedGroups.employeesCount")}
            value={team.employees_count}
          />
          <TeamInfoItem
            title={t("dashboard.sharedGroups.creationDate")}
            value={team.created_at}
          />
        </div>

        {/* <div className="teams__progress">
          <div className="teams__progress-data">
            <div className="teams__progress-summary">
              <span>{t("dashboard.sharedGroups.tasksProgress")}</span>
              <span>{team.progress.percent}%</span>
            </div>

            <div className="teams__progress-bar">
              <div
                className="teams__progress-fill"
                style={{ width: `${team.progress.percent}%` }}
              />
            </div>

            <ProgressStats
              completed={team.progress.completed}
              pending={team.progress.pending}
            />
          </div>
        </div> */}
      </div>
      <div className="teams__card-footer">
        <CustomButton
          size="small"
          color="fire"
          onClick={() => {
            setShowConfirmDeleteModal(true);
          }}
          disabled={isDeleting}
        >
          {t("delete")}
        </CustomButton>
      </div>
      <ConfirmDeleteModal
        setShowDeleteModal={setShowConfirmDeleteModal}
        showDeleteModal={showConfirmDeleteModal}
        onConfirm={() => handelDeleteSharedGroups(team?.id)}
        loading={isDeleting}
      />
    </div>
  );
};

export default TeamCard;
