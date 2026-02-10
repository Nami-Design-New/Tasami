import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useWorkWithoutAssistant from "../../../hooks/website/MyWorks/assistants/useWorkWithoutAssistant";
import useGetWorkGroup from "../../../hooks/website/MyWorks/groups/useGetWorkGroup";
import useShowMyGoal from "../../../hooks/website/MyWorks/groups/useShowMyGoal";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";

import CustomButton from "../../../ui/CustomButton";
import CustomLink from "../../../ui/CustomLink";
import Loading from "../../../ui/loading/Loading";
import AssignAssistantModal from "../../../ui/website/my-works/assistants/AssignAssistantModal";
import NoGroup from "../../../ui/website/my-works/noGroup";
import NoOffers from "../../../ui/website/my-works/NoOffers";
import GroupMembersList from "../../../ui/website/platform/groups/GroupMembersList";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";

export default function WorksGroup() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { workDetails, isLoading } = useGetWorkDetails();
  const { removeAssistant, isPending: isRemovingHelperPending } =
    useWorkWithoutAssistant();

  const { workGroup, isLoading: groupLoading } = useGetWorkGroup(
    workDetails?.id ?? null,
    workDetails?.goal?.group_id ?? null,
  );

  const { showMyGoal, isPending } = useShowMyGoal();
  const [shareGoal, setShareGoal] = useState(
    workGroup?.group.i_show_goal === true ? "yes" : "no",
  );

  useEffect(() => {
    if (workGroup?.group.i_show_goal !== undefined) {
      setShareGoal(workGroup.group.i_show_goal ? "yes" : "no");
    }
  }, [workGroup?.group.i_show_goal]);

  if (isLoading || groupLoading) return <Loading height="500px" />;

  const withHelper = workDetails?.rectangle === "personal_goal_with_helper";
  const isHelperAssigned = workDetails?.helper !== null;

  // Handle toggling "share goal"
  const handleShareGoalChange = (option) => {
    setShareGoal(option);
    showMyGoal({
      group_id: workGroup?.group?.id,
      work_id: workDetails?.id,
      show_goal: option === "yes" ? 1 : 0,
    });
  };

  const handleRemoveAssistants = (id) => {
    removeAssistant(id, {
      onSuccess: () => {},
    });
  };

  return (
    <section className="position-relative">
      {workGroup ? (
        <section className="work-group-section">
          <div className="row">
            <div className="col-12 p-2">
              <header>
                <h1>
                  <span>{t("works.group.groupTitle")}</span>
                  <span>{workGroup.group.title}</span>
                </h1>
              </header>
            </div>

            <div className="col-12 p-2">
              <p className="group-desc">{workGroup.group.desc}</p>
            </div>

            <div className="col-12 p-2">
              <div className="info-grid">
                <div className="info-box info-box-grow-min-width">
                  <h4 className="label">{t("works.group.field")}</h4>
                  <p className="value">{workGroup?.group?.category_title}</p>
                </div>
                <div className="info-box info-box-grow-min-width">
                  <h4 className="label">{t("works.group.strengthIndex")}</h4>
                  <p className="value">
                    {workGroup?.group?.strength_indicator} %
                  </p>
                </div>
              </div>
            </div>

            {/* Share Goal */}
            <div className="col-12 p-2">
              <div className="share-goal">
                <p>{t("works.group.shareGoalQuestion")}</p>
                <div className="identity-selector">
                  <div className="identity-container gap-2">
                    {["yes", "no"].map((option) => (
                      <label
                        key={option}
                        className={`identity-option ${
                          shareGoal === option ? "active" : ""
                        } ${isPending ? "disabled" : ""}`}
                        onClick={() =>
                          !isPending && handleShareGoalChange(option)
                        }
                      >
                        <span>{t(`auth.${option}`)}</span>
                        <input
                          type="radio"
                          value={option}
                          checked={shareGoal === option}
                          onChange={() =>
                            !isPending && handleShareGoalChange(option)
                          }
                          disabled={isPending}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 p-2">
              <CustomLink
                to={`/group/chat/${workGroup?.group?.id}`}
                fullWidth
                color="main"
                size="large"
                type="outlined"
              >
                {t("works.group.groupChats")}
                <span className="notification_span">0</span>
                {/* {workDetails?.group?.helper_unread_chats > 0 && (
                  <span className="notification_span">
                    {workDetails?.group?.helper_unread_chats}
                  </span>
                )} */}
              </CustomLink>
            </div>

            <div className="col-12 p-2">
              <h2 className="group-label">
                {t("website.platform.groups.groupMembers")}
              </h2>
              <GroupMembersList members={workGroup.group.members} />
            </div>
          </div>
        </section>
      ) : (
        <>
          {withHelper ? (
            !isHelperAssigned && <NoOffers withHelper={withHelper} />
          ) : (
            <NoGroup />
          )}

          <div className="button-wrapper">
            {!withHelper && (
              <CustomButton
                fullWidth
                size="large"
                style={{ backgroundColor: "#4ECDC4" }}
                onClick={() => setShowModal(true)}
              >
                {t("works.group.assignAssistant")}
              </CustomButton>
            )}
          </div>

          <AssignAssistantModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <AlertModal
            confirmButtonText={t("confirm")}
            showModal={showAlertModal}
            setShowModal={setShowAlertModal}
            onConfirm={() => handleRemoveAssistants(workDetails?.id)}
            loading={isRemovingHelperPending}
          >
            {t("works.group.removeHelperAlert")}
          </AlertModal>
        </>
      )}
    </section>
  );
}
