export default function TopInfo({ goal }) {
  return (
    <div className="top-info col-lg-4 col-12">
      <div style={{ position: "relative" }}>
        <img src={goal.image} alt={goal.name} className="avatar" />
      </div>

      <div className="details">
        <div className="d-flex flex-1 justify-content-between ">
          <div className="personal-info">
            <h5>{goal.name}</h5>
            <div className="country">
              <img src="/icons/flag.svg" />
              {goal.country}
            </div>
          </div>
          <div className="rating">
            <img src="/icons/hz-bars.svg" />
            <span>11</span>
          </div>
        </div>
      </div>
    </div>
  );
}
