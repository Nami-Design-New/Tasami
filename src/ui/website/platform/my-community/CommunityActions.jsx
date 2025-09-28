import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "sonner";
import useEditMyCommunity from "../../../../hooks/website/communities/useEditMyCommunity";
import useJoinCommunity from "../../../../hooks/website/communities/useJoinCommunity";
import useUnjoinCommunity from "../../../../hooks/website/communities/useUnjoinCommunity";
import CommunityPaymentModal from "../../communities/CommunityPaymentModal";
import AlertModal from "./AlertModal";
import EditCommunityModal from "./EditCommunityModal";

export default function CommunityActions({ community, isMyCommunity = true }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { editCommunity, isPending } = useEditMyCommunity();
  const { unjoinCommunity, isPending: isUnjoinPending } = useUnjoinCommunity();
  const { joinCommunity, isPending: isJoinPending } = useJoinCommunity();
  const [optimisticJoin, setOptimisticJoin] = useState(
    community?.is_subscribed
  );

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
  const handleJoinCommunity = (id, price) => {
    if (optimisticJoin) {
      // ---- Optimistic Unjoin ----
      setOptimisticJoin(false);
      unjoinCommunity(id, {
        onSuccess: (res) => {
          toast.success(res.message);
          // queryClient.invalidateQueries(["community-details"]);
        },
        onError: (err) => {
          setOptimisticJoin(true);
          toast.error(err.message);
        },
      });
    } else {
      if (price > 0) {
        // ---- Show payment modal ----
        setShowPaymentModal(true);
      } else {
        // ---- Optimistic Join ----
        setOptimisticJoin(true);
        joinCommunity(
          { community_id: id },
          {
            onSuccess: (res) => {
              toast.success(res.message);
              // queryClient.invalidateQueries(["my-community"]);
            },
            onError: (err) => {
              setOptimisticJoin(false); // rollback
              toast.error(err.message);
            },
          }
        );
      }
    }
  };
  const onConfirmDeactivate = () => {
    handleUpdateStatus(false);
  };

  const onActivate = () => {
    handleUpdateStatus(true);
  };
  useEffect(() => {
    if (community) {
      setOptimisticJoin(community?.is_subscribed);
    }
  }, [community]);
  return (
    <section className="community-actions">
      <ul className="community-actions-list">
        <li>
          {!isMyCommunity && (
            <button
              className={`follow-btn  ${optimisticJoin ? "unfollow" : ""}`}
              onClick={() => handleJoinCommunity(community.id, community.price)}
              disabled={isUnjoinPending || isJoinPending}
            >
              {optimisticJoin ? (
                <i className="fa-regular fa-user-xmark"></i>
              ) : (
                <i className="fa-regular fa-user-plus"></i>
              )}
              {optimisticJoin
                ? t("website.assistants.unjoin")
                : t("website.assistants.join")}
            </button>
          )}
        </li>
        <li>
          <Link to="" className="chat-link">
            <img src="/icons/chat.svg" />
          </Link>
        </li>
        <li>
          {isMyCommunity && (
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
          )}
        </li>
      </ul>
      {isMyCommunity && (
        <EditCommunityModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          community={community}
        />
      )}
      {/* Alert only for deactivation */}
      {isMyCommunity && (
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
      )}{" "}
      <CommunityPaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
        community={community}
      />
    </section>
  );
}
