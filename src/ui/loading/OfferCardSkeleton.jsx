import { Placeholder } from "react-bootstrap";

const OfferCardSkeleton = () => {
  return (
    <div className="offer-card text-decoration-none text-dark">
      <div className="image-wrapper">
        <Placeholder animation="glow">
          <Placeholder
            xs={12}
            style={{ height: "200px", borderRadius: "10px" }}
          />
        </Placeholder>
      </div>
      <div className="info">
        <Placeholder
          as="p"
          className="d-flex justify-content-between"
          animation="glow"
        >
          <Placeholder xs={8} />
          <Placeholder xs={2} />
        </Placeholder>
        <Placeholder as="span" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      </div>
      <div className="data ">
        <Placeholder as="span" animation="glow">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={5} />
        </Placeholder>
      </div>
    </div>
  );
};

export default OfferCardSkeleton;
