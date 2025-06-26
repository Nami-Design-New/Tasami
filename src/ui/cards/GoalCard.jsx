import { Link } from "react-router";

const GoalCard = ({ id, name, title, country, date, type, offers, image, status }) => {
  return (
    <Link to={`/goal/${id}`} className="goal-card text-decoration-none text-dark">
      <div className="image-wrapper">
        <img src={image} alt={name} className="avatar" />
        {status && <span className="status-dot"></span>}
      </div>
      <div className="info">
        <h2>{name}</h2>
        <p>{title}</p>
        <div className="meta">
          <span><i className="fa-regular fa-flag"></i> {country}</span>
          <span><i className="fa-solid fa-calendar-days"></i> {date}</span>
          <span><i className="fa-solid fa-tags"></i> {type}</span>
          <span><i className="fa-light fa-layer-group"></i> {offers} عرض مقدم</span>
        </div>
      </div>
    </Link>
  );
};

export default GoalCard;
