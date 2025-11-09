import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useMarkAsRead from "../../../hooks/website/notification/useMarkAsRead";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteNotification from "../../../hooks/website/notification/useDeleteNotification";
import { Link } from "react-router";

export default function NotificationCard({ item }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { markAsRead, isPending } = useMarkAsRead();
  const { deleteNotification, isPending: isDeleting } = useDeleteNotification();

  let url = "/";

  switch (item.notification_type) {
    case "wallet":
      url = `/my-profile/my-wallet`;
      break;
    case "package":
      url = `/my-platform`;
      break;
    case "offer_accepted":
      url = `/my-works/${item?.operation_id}`;
      break;
    case "contract_request":
      url = `/my-contracts/${item?.operation_id}`;
      break;
    case "help_service ":
      url = `/offers/${item?.operation_id}`;
      break;
    case "goal":
      url = `/goal/${item?.operation_id}`;
      break;
    case "follow":
      url = `/my-audience`;
      break;
    case "community_new_member":
      url = `/my-audience`;
      break;
    case "consultation":
      url = `/consultaion-details/${item.operation_id}`;
      break;
    case "inquiry":
      url = `/notifications?tab=inquries`;
      break;
    case "meeting":
      url = `my-community/meetings`;
      break;
    case "post":
      url = `/posts/${item.operation_id}`;
      break;
    case "comment":
      url = `/posts/${item.operation_id}`;
      break;
    case "offer":
      url = `/goal/${item?.operation_id}`;
      break;
    case "work":
      url = `/goal/${item?.operation_id}`;
      break;
    case "general":
      url = `/notifications`;
      break;
    case "community_chat":
      url = `/community/${item.operation_id}/chats/`;
      break;
    case "group_chat":
      url = `/chat/${item.operation_id}`;
      break;
    default:
      url = "/ ";
  }

  const handleMarkAsRead = (id) => {
    markAsRead(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
    });
  };
  const handleDeleteNotification = (id) => {
    deleteNotification(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notifications"],
        });
      },
    });
  };

  return (
    <Link
      to={url}
      className={`notification-web-card ${item.is_read === true ? "read" : ""}`}
      key={item.id}
    >
      <div className="notification-icon">
        <img src={item.from_user_image} alt="icon" />
      </div>
      <div className="notification-content-wrapper">
        <div className="notification-content">
          <h6>{item.from_user_name}</h6>
          <span className="notification-date">{item.created_at}</span>
          <Dropdown className="custom-dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="edit-item"
                eventKey="read"
                disabled={isPending}
                onClick={() => handleMarkAsRead(item.id)}
              >
                {t("selectAsReads")}
              </Dropdown.Item>
              <Dropdown.Item
                className="deactive-item"
                eventKey="deactive"
                disabled={isDeleting}
                onClick={() => handleDeleteNotification(item.id)}
              >
                {t("delete")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <p className="notification-message">{item.desc}</p>
      </div>
    </Link>
  );
}
