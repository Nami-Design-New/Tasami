import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function NotificationCard({ item }) {
  const { t } = useTranslation();
  return (
    <div className="notification-card" key={item.id}>
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
              <Dropdown.Item className="edit-item" eventKey="read">
                {t("selectAsReads")}
              </Dropdown.Item>
              <Dropdown.Item className="deactive-item" eventKey="deactive">
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
