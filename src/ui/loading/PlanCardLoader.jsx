import { Placeholder } from "react-bootstrap";

export default function PlanCardLoader() {
  return (
    <div className="subscription-current-plan">
      {/* Header Placeholder */}
      <Placeholder as="h2" animation="glow">
        <Placeholder xs={6} />
      </Placeholder>

      {/* Plan Card Placeholder */}
      <div className="plan-header ">
        <div className="plan-info ">
          <Placeholder
            animation="glow"
            className="plan-icon "
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          >
            <Placeholder
              xs={12}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </Placeholder>
          <Placeholder className="account-type" xs={12} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </div>
        <Placeholder className="plan-duration" xs={3} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </div>

      {/* Features List Placeholder */}
      <ul className="features-list">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="feature-item ">
            <Placeholder className="feature-text" xs={6} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder className="feature-value" xs={2} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </li>
        ))}
      </ul>
    </div>
  );
}
