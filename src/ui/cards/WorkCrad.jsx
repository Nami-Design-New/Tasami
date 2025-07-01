export default function WorkCard({ work }) {
  return (
    <div className="work-card">
      {work.user && (
        <div className="user-info">
          <img src={work.user.image} alt="" />
          <div>
            <h4>{work.user.name}</h4>
            <p>{work.country}</p>
          </div>
        </div>
      )}

      <p className="title">{work.title}</p>

      <div className="details">
        <span><i className="fa-light fa-calendar"></i> {work.date}</span>
        <span>{work.country}</span>
        <span>{work.category}</span>
      </div>

      <div className="time">{work.time}</div>
    </div>
  );
}
