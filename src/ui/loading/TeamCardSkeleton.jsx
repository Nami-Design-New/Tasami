import { Card, Placeholder } from "react-bootstrap";

const TeamCardSkeleton = () => {
  return (
    <Card className="p-3 teams__card teams__card--main">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <Placeholder as="h4" animation="wave">
            <Placeholder xs={4} />
          </Placeholder>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={6} />
          </Placeholder>
        </div>

        <Placeholder as="span" animation="wave">
          <Placeholder xs={3} />
        </Placeholder>
      </div>

      {/* Body */}
      <div className="teams__card-body">
        {/* Employees list */}
        <div className="mb-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-2">
              <Placeholder as="p" animation="wave">
                <Placeholder xs={8} /> <Placeholder xs={3} />
              </Placeholder>
            </div>
          ))}
        </div>

        {/* Progress section */}
        <div className="mb-3">
          <Placeholder as="p" animation="wave">
            <Placeholder xs={4} /> <Placeholder xs={2} />
          </Placeholder>

          <Placeholder animation="wave">
            <Placeholder xs={12} style={{ height: "12px" }} />
          </Placeholder>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3">
        <Placeholder.Button variant="secondary" xs={3} />
      </div>
    </Card>
  );
};

export default TeamCardSkeleton;
