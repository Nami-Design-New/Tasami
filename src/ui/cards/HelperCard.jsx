import { Link } from "react-router";
export default function HelperCard({ helper }) {
  return (
    <Link
      to={`/helper/${helper.id}`}
      className=" text-decoration-none text-dark"
    >
      <div className="helper-card">
        <div className="image-wrapper">
          <img src={helper.image} alt={helper.name} className="avatar" />
          {helper.status && <span className="status-dot"></span>}
        </div>

        <div className="info">
          <div className="info-header">
            <h3>{helper.name}</h3>
            <div className="rating">
              <img src="/icons/medal.svg" />
              <span>{helper.rating}</span>
            </div>
          </div>

          <div className="meta">
            <span className="country">
              <img src="/icons/flag.svg" />
              <span>{helper.country}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
