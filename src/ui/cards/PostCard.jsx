import { Link } from "react-router";

export default function PostCard({ item }) {
  return (
    <Link
      to={`/post-details/${item.id}`}
      className={"consultation-card "}
    >
      {item.image && (
        <div className="image-wrapper">
          <img src={item.image} alt="post" />
        </div>
      )}
        <p className="date">
          <i className="fa-solid fa-calendar-days"></i> {item.date}
        </p>
       <p className="title">{item.title}</p>
      <p className="desc">{item.desc}</p>

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
      
    </Link>
  );
}
