import { Spinner } from "react-bootstrap";

const SpinnerLoader = ({ size = "md", text = "Loading..." }) => {
  let spinnerSize;

  switch (size) {
    case "sm":
      spinnerSize = "sm";
      break;
    case "lg":
      spinnerSize = "lg";
      break;
    default:
      spinnerSize = null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Spinner animation="border" size={spinnerSize} role="status">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      {text && <span style={{ marginTop: "0.5rem" }}>{text}</span>}
    </div>
  );
};

export default SpinnerLoader;
