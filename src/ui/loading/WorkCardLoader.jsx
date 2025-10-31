import React from "react";
import { Placeholder } from "react-bootstrap";

export default function WorkCardLoader() {
  return (
    <div className="work-card">
      <Placeholder xs={12} animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <div className="d-flex align-items-center justify-content-between">
        <Placeholder xs={5} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder xs={5} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </div>

      <Placeholder xs={5} animation="glow">
        <Placeholder xs={5} />
      </Placeholder>
    </div>
  );
}
