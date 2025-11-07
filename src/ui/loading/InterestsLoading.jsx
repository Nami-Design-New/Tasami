import { Placeholder } from "react-bootstrap";

export default function InterestsLoading() {
  return (
    <div
      className="d-flex align-items-center justify-content-between"
      style={{
        backgroundColor: "rgba(13, 13, 13, 0.0196078431)",
        color: "#0d0d0d",
        borderRadius: "12px",
        padding: "0.75rem 1rem",
        marginBottom: "12px",
      }}
    >
      <Placeholder xs={10} animation="glow">
        <Placeholder xs={3} />
      </Placeholder>
      <Placeholder
        xs={12}
        animation="glow"
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          display: "block",
        }}
      >
        <Placeholder xs={12} />
      </Placeholder>
    </div>
  );
}
