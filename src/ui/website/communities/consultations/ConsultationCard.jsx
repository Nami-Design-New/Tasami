import { Link } from "react-router";
import useCheckDashboard from "../../../../hooks/dashboard/checkDashboard/useCheckDashboard";

export default function ConsultationCard({ item }) {
  const isDashboard = useCheckDashboard();

  return (
    <Link
      to={`${
        isDashboard
          ? `/dashboard/consultaion-dash-details/${item.id}`
          : `/consultaion-details/${item.id}`
      }`}
      className={`${
        item.answer?.trim()
          ? "consultation-card"
          : "consultation-card-no-answer"
      }`}
    >
      <p className="title">{item.title}</p>
      <p className="desc ellipsis">{item.desc}</p>

      {!item.is_private && (
        <div className="icons-row">
          {" "}
          <div className="icons-wrapper">
            <div className="icon-circle">
              <i className="fa-solid fa-eye"></i>
            </div>
            <span>{item.views_count}</span>
          </div>
          <div className="icons-wrapper">
            <div className="icon-circle">
              <i className="fa-solid fa-heart"></i>
            </div>
            <span>{item.likes_count}</span>
          </div>{" "}
          <div className="icons-wrapper">
            <div className="icon-circle">
              <i className="fa-solid fa-comment"></i>
            </div>
            <span>{item.comments_count}</span>
          </div>
          <div className="icons-wrapper">
            <div className="icon-circle">
              <i className="fa-solid fa-share"></i>
            </div>
            <span>{item.shares_count}</span>
          </div>
        </div>
      )}
    </Link>
  );
}
