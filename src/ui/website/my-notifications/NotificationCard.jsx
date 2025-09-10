import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useMarkAsRead from "../../../hooks/website/notification/useMarkAsRead";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteNotification from "../../../hooks/website/notification/useDeleteNotification";

export default function NotificationCard({ item }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { markAsRead, isPending } = useMarkAsRead();
  const { deleteNotification, isPending: isDeleting } = useDeleteNotification();

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
    <div
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
    </div>
  );
}
