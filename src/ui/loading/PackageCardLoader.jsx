import { Placeholder } from "react-bootstrap";

export default function PackageCardLoader() {
  return (
    <div className="plan-card ">
      {/* Image Placeholder */}
      <Placeholder as="div" animation="glow">
        <Placeholder xs={12} style={{ width: "80px", height: "80px" }} />
      </Placeholder>

      {/* Title Placeholder */}
      <Placeholder as="h3" animation="glow">
        <Placeholder xs={6} />
      </Placeholder>

      {/* Features Placeholder */}
      <ul className="plan-features ">
        {[...Array(1)].map((_, i) => (
          <li key={i}>
            <Placeholder xs={6} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder xs={2} animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </li>
        ))}
      </ul>

      {/* Footer Placeholder */}
      <div className="plan-card-foot ">
        <Placeholder.Button
          variant="secondary"
          style={{ width: "75%", height: "35px" }}
        />
        <div className="price">
          <p className="total">
            <Placeholder animation="glow" xs={4}>
              <Placeholder xs={12} />
            </Placeholder>
          </p>
          <p className="monthly">
            <Placeholder animation="glow" xs={3} />
          </p>
        </div>
      </div>
    </div>
  );
}
