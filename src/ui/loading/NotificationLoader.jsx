import { Placeholder } from "react-bootstrap";

export default function NotificationLoader() {
  return (
    <div className="notification-web-card">
      <Placeholder
        xs={4}
        style={{ height: "80px", width: "80px", borderRadius: "50%" }}
        as="div"
        animation="glow"
        className="notification-icon"
      >
        <Placeholder
          src={""}
          alt="icon"
          xs={12}
          style={{ height: "80px", width: "80px", borderRadius: "50%" }}
        />
      </Placeholder>
      <div className="notification-content-wrapper">
        <Placeholder xs={12} className="notification-content" animation="glow">
          <Placeholder xs={2} />
          <Placeholder
            xs={3}
            style={{ flexGrow: "0" }}
            className="notification-date"
          />
        </Placeholder>
        <Placeholder xs={12} className="notification-message" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </div>
    </div>
  );
}
