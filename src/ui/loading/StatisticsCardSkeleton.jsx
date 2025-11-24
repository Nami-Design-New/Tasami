import { Placeholder } from "react-bootstrap";

export default function StatisticsCardSkeleton() {
  return (
    <div className="stat-item--card">
      <Placeholder
        animation="glow"
        xs={6}
        className="icon"
        style={{ height: "50px", borderRadius: "10px" }}
      >
        <Placeholder xs={12} style={{ height: "50px", borderRadius: "10px" }} />
      </Placeholder>
      <div className="text d-flex flex-column gap-2 w-100">
        <Placeholder xs={6} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder xs={12} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </div>
    </div>
  );
}
