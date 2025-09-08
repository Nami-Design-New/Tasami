import { Link } from "react-router";

const GoalCard = ({ goal }) => {
  return (
    <Link
      to={`/goal/${goal.id}`}
      className="goal-card text-decoration-none text-dark"
    >
      <div className="d-flex gap-2">
        <div className="image-wrapper">
          <img src={goal.image} alt={goal.name} className="avatar" />
          {goal.status && <span className="status-dot"></span>}
        </div>
        <div className="info">
          <div className="d-flex align-items-center  justify-content-between  ">
            <h2>{goal.name}</h2>
            {goal.is_favorites && <i className="fa-solid fa-heart"></i>}
          </div>
          <p>{goal.title}</p>
        </div>
      </div>
      <div className="meta">
        <span>
          <img src="/icons/title.svg" /> {goal.type}
        </span>
        <span>
          <img src="/icons/offers-icon.svg" />
          {goal.count} عرض مقدم
        </span>
      </div>
    </Link>
  );
};

export default GoalCard;
