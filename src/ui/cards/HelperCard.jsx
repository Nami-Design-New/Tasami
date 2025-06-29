import { Link } from "react-router";
export default function HelperCard({ helper }) {
  return (
      <Link to={`/helper/${helper.id}`} className=" text-decoration-none text-dark">
    <div className="helper-card">
      <div className="image-wrapper">
        <img src={helper.image} alt={helper.name} className="avatar" />
        {helper.status && <span className="status-dot"></span>}
      </div>

      <div className="info">
        <div className="info-header">
          <h3>{helper.name}</h3>
          <span className="rating">
            <i className="fa-solid fa-star"></i> {helper.rating}
          </span>
        </div>

        <div className="meta">
          <span className="country">
            <i className="fa-regular fa-flag"></i> {helper.country}
          </span>
          <span className="type">
            <i className="fa-solid fa-tags"></i> {helper.type}
          </span>
        </div>

        <div className="prices">
          <span>
            <img src="/icons/member.svg" alt="icon" /> {helper.members} عضو
          </span>
          <span>
            <img src="/icons/Group.svg" alt="icon" /> {helper.price} <img src="/icons/ryal.svg" alt="ryal" />
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}
