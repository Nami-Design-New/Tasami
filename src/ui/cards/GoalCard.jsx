import { Link } from "react-router";

const GoalCard = ({
  id,
  name,
  title,
  type,
  offers,
  image,
  status,
  showfav = false,
}) => {
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
          <div className="d-flex align-items-center  justify-content-between  ">
            <h2>{name}</h2>
            {showfav && <i className="fa-solid fa-heart"></i>}
          </div>
          <p>{title}</p>
        </div>
      </div>
      <div className="meta">
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
