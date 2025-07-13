import { Link } from "react-router";

const GoalCard = ({ id, name, title, type, offers, image, status }) => {
  return (
    <Link
      to={`/goal/${id}`}
      className="goal-card text-decoration-none text-dark"
    >
      <div className="d-flex gap-2">
        <div className="image-wrapper">
          <img src={image} alt={name} className="avatar" />
          {status && <span className="status-dot"></span>}
        </div>
        <div className="info">
          <h2>{name}</h2>
          <p className="ellipsis" style={{ maxWidth: "240px" }}>
            {title}
          </p>
        </div>
      </div>
      <div className="meta">
        {/* <span>
          <i className="fa-regular fa-flag"></i> {country}
        </span> */}
        {/* <span>
          <i className="fa-solid fa-calendar-days"></i> {date}
        </span> */}
        <span>
          <img src="/icons/title.svg" /> {type}
        </span>
        <span>
          <img src="/icons/offers-icon.svg" />
          {offers} عرض مقدم
        </span>
      </div>
    </Link>
  );
};

export default GoalCard;
