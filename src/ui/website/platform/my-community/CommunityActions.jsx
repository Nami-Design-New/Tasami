import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import EditCommunityModal from "./EditCommunityModal";
import AlertModal from "./AlertModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useEditMyCommunity from "../../../../hooks/website/communities/useEditMyCommunity";

export default function CommunityActions({ community }) {
  const { t } = useTranslation();
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { editCommunity, isPending } = useEditMyCommunity();

  const handleUpdateStatus = (newStatus) => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("is_active", newStatus ? "1" : "0");

    editCommunity(
      { communityId: community.id, formData },
      {
        onSuccess: (res) => {
          setShowAlertModal(false);
          queryClient.invalidateQueries(["my-community"]);
          toast.success(res.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const onConfirmDeactivate = () => {
    handleUpdateStatus(false);
  };

  const onActivate = () => {
    handleUpdateStatus(true);
  };

  return (
    <section className="community-actions">
      <ul className="community-actions-list">
        <li>
          <Link to="" className="chat-link">
            <img src="/icons/chat.svg" />
          </Link>
        </li>
        <li>
          <Dropdown className="custom-dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="edit-item"
                eventKey="edit"
                onClick={() => setShowEditModal(true)}
              >
                {t("edit")}
              </Dropdown.Item>

              {/* Handle activate/deactivate */}
              <Dropdown.Item
                className="deactive-item"
                eventKey="deactive"
                onClick={
                  community.is_active === true
                    ? () => setShowAlertModal(true)
                    : onActivate
                }
              >
                {community.is_active === true ? t("deactive") : t("active")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>

      <EditCommunityModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        community={community}
      />

      {/* Alert only for deactivation */}
      <AlertModal
        setShowModal={setShowAlertModal}
        confirmButtonText={t("deactive")}
        showModal={showAlertModal}
        onConfirm={onConfirmDeactivate}
      >
        <p className="text-center mb-4">
          {t("website.platform.myCommunity.message")}
        </p>
      </AlertModal>
    </section>
  );
}
