import React from "react";
import { Placeholder } from "react-bootstrap";

export default function ChatCardLoader() {
  return (
    <div
      className="audience-card"
      style={{ borderRadius: "10px", padding: "8px" }}
    >
      <Placeholder
        className="user-image"
        xs={4}
        style={{ height: "64px", width: "64px", borderRadius: "50%" }}
        as="div"
        animation="glow"
      >
        <Placeholder
          xs={12}
          style={{ height: "64px", width: "64px", borderRadius: "50%" }}
        />
      </Placeholder>

      {/* Info Skeleton */}
      <div className="info">
        {/* Name */}
        <Placeholder as="h2" animation="glow" className="mb-2">
          <Placeholder xs={6} />
        </Placeholder>

        {/* Country + Date */}
        <div className="country-date">
          <Placeholder className="country" xs={6} as="p" animation="glow">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as="p" xs={6} className="date" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      </div>
    </div>
  );
}
