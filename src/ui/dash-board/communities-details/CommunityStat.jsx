export function CommunityStat({ title, icon, value, label }) {
  return (
    <div className="community-stat">
      <h2 className="community-stat-title">{title}</h2>
      <div className="community-stat-content">
        <img className="community-stat-icon" src={icon} alt={title} />
        <div className="community-stat-text">
          {value && <span className="community-stat-value">{value}</span>}
          {label && <span className="community-stat-label">{label}</span>}
        </div>
      </div>
    </div>
  );
}
