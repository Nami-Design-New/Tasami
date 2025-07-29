import { Link } from "react-router";

export default function ConsultationCard({ item }) {
  return (
    <Link to={`/consultation-details/${item.id}`} className={`consultation-card ${item.type === "qes" ? "qes" : ""}`}>
      <p className="title">{item.title}</p>
      <p className="desc">{item.desc}</p>

      {item.stats && (
        <div className="icons-row">
          {item.stats.map((stat, idx) => (
            <span key={idx}>
              <div className="icon-circle">
                <i className={stat.icon}></i>
              </div>
              {stat.value}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
