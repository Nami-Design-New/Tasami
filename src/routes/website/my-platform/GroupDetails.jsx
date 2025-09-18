import { useNavigate } from "react-router";
import useGetGroupDetails from "../../../hooks/website/my-groups/useGetGroupDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import InfoCard from "../../../ui/cards/InfoCard";
import GroupMembersList from "../../../ui/website/platform/groups/GroupMembersList";
import AddGroupModal from "../../../ui/website/platform/groups/AddGroupModal";
import { useState } from "react";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import useDeleteGroup from "../../../hooks/website/my-groups/useDeleteGroup";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function GroupDetails() {
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  const { groupDetails, isLoading } = useGetGroupDetails();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const queryClient = useQueryClient();

  const { deleteGroup, isPending: isDeleteingGroup } = useDeleteGroup();

  const handleDeleteGroup = (id, members) => {
    if (members.length == 0) {
      deleteGroup(id, {
        onSuccess: (res) => {
          navigate("/my-platform/my-groups");
          queryClient.refetchQueries({ queryKey: ["my-groups"] });
          toast.success(res?.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
        onSettled: () => {
          setShowAlertModal(false);
        },
      });
    } else {
      toast.info(t("canNotDelete"));
    }
  };

  if (isLoading) return <Loading />;

  if (!groupDetails) {
    return (
      <section className="group-details page">
        <div className="container">
          <p>No group found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="group-details page">
      <div className="container">
        <div className="header">
          <RoundedBackButton onClick={() => navigate(-1)}>
            {lang === "ar" ? (
              <i className="fa-solid fa-angle-right"></i>
            ) : (
              <i className="fa-solid fa-angle-left"></i>
            )}
          </RoundedBackButton>
          <h1>
            {" "}
            {t("website.platform.groups.group")}{" "}
            <span> {groupDetails.title}</span>
          </h1>
          <Dropdown className="custom-dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="edit-item"
                eventKey="edit"
                onClick={() => setShowAddGroupModal(true)}
              >
                {t("edit")}
              </Dropdown.Item>

              {/* Handle activate/deactivate */}
              <Dropdown.Item
                className="deactive-item"
                eventKey="deactive"
                onClick={() => setShowAlertModal(true)}
              >
                {t("delete")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row">
          <div className="col-12 p-2">
            <div className="description">
              <h3>{t("website.platform.groups.description")}</h3>
              <p>{groupDetails.desc}</p>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="exp-info-grid">
              <InfoCard
                title={t("website.platform.groups.field")}
                data={groupDetails.category_title}
              />
              <InfoCard
                title={t("website.platform.groups.strength")}
                data={groupDetails.strength_indicator}
              />
            </div>
          </div>
          <div className="col-12 p-2">
            <h2 className="group-label">
              {" "}
              {t("website.platform.groups.groupMembers")}{" "}
            </h2>
            <GroupMembersList members={groupDetails.members} />
          </div>
        </div>
      </div>

      <AddGroupModal
        setShowModal={setShowAddGroupModal}
        showModal={showAddGroupModal}
        group={groupDetails}
      />
      <AlertModal
        confirmButtonText={t("confirm")}
        showModal={showAlertModal}
        setShowModal={setShowAlertModal}
        onConfirm={() =>
          handleDeleteGroup(groupDetails?.id, groupDetails?.members)
        }
        loading={isDeleteingGroup}
      >
        {t("website.platform.groups.deleteAlertMessage")}
      </AlertModal>
    </section>
  );
}
