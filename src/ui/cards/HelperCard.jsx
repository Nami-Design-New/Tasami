import { Link } from "react-router";
export default function HelperCard({ helper }) {
  return (
    <Link to={`/helper/${helper.id}`} className="helper-card">
      <div className="content-wrapper ">
        <div className="image-wrapper">
          <img src={helper.image} alt={helper.name} className="avatar" />
          <span className="status-dot"></span>
        </div>

        <div className="info">
          <div className="info-header">
            <h3>{helper.name}</h3>
            <div className="rating">
              <img src="/icons/medal.svg" />
              <span>{helper.contract_numbers}</span>
            </div>
          </div>

          {helper.country && (
            <div className="meta">
              <span className="country">
                <img src="/icons/flag.svg" />
                <span>{helper.country.title}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
