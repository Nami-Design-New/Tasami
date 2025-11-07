import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetWorkGroup from "../../../../hooks/website/MyWorks/groups/useGetWorkGroup";
import useGetWorkDetails from "../../../../hooks/website/MyWorks/useGetWorkDetails";
import CustomButton from "../../../../ui/CustomButton";
import CustomLink from "../../../../ui/CustomLink";
import Loading from "../../../../ui/loading/Loading";
import ChangeGroupModal from "../../../../ui/website/my-works/tasks/ChangeGroupModal";
import GroupMembersList from "../../../../ui/website/platform/groups/GroupMembersList";

export default function ContractsGroup() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { workDetails, isLoading } = useGetWorkDetails();
  const { workGroup, isLoading: groupLoading } = useGetWorkGroup(
    workDetails?.id ?? null,
    workDetails?.goal?.group_id ?? null
  );
  if (isLoading || groupLoading) return <Loading height={"500px"} />;
  return (
    <>
      <section className="position-relative">
        <section className="work-group-section">
          <div className="row">
            <div className="col-12 p-2">
              <header className="d-flex justify-content-between align-items-center">
                <h1>
                  <span>{t("group")}</span>
                  <span>{workGroup.group.title}</span>
                </h1>
                <CustomButton
                  variant="outlined"
                  color="secondary-website"
                  onClick={() => setShowModal(true)}
                >
                  {t("changeGroup")}
                </CustomButton>
              </header>
            </div>

            <div className="col-12 p-2">
              <p className="group-desc">{workGroup.group.desc}</p>
            </div>

            <div className="col-12 p-2">
              <div className="info-grid">
                <div className="info-box info-box-grow-min-width">
                  <div className="label">{t("website.offerDetails.field")}</div>
                  <div className="value">
                    {workGroup?.group?.category_title}
                  </div>
                </div>
                <div className="info-box info-box-grow-min-width">
                  <div className="label">{t("groupStrengthIndex")}</div>
                  <div className="value">
                    {workGroup?.group?.strength_indicator} %
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
                {t("groupChats")}
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
      </section>
      <ChangeGroupModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
