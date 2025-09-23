import { Link } from "react-router";

export default function ConsultationCard({ item }) {
  return (
    <Link to={`/my-community/${item.id}`} className="consultation-card">
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
