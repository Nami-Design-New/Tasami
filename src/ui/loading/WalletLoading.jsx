import { Placeholder } from "react-bootstrap";

export default function WalletLoading() {
  return (
    <Placeholder animation="glow" className="transaction-item">
      <div className="top-row">
        <Placeholder animation="glow" xs={8} className="type">
          <Placeholder xs={4} /> {/* fake text for desc */}
        </Placeholder>
        <Placeholder
          animation="glow"
          xs={4}
          className="amount d-flex align-items-center justify-content-end gap-1"
        >
          <Placeholder xs={2} /> {/* fake price */}
          <Placeholder xs={1} />
        </Placeholder>
      </div>

      <div className="bottom-row d-flex justify-content-between">
        <Placeholder animation="glow" xs={8} className="contract-id">
          <Placeholder xs={5} /> {/* fake operation number */}
        </Placeholder>
        <Placeholder
          animation="glow"
          xs={4}
          className="date d-flex  justify-content-end"
        >
          <Placeholder xs={3} /> {/* fake date */}
        </Placeholder>
      </div>

      <hr />
    </Placeholder>
  );
}
