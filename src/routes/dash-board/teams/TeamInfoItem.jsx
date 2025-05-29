const TeamInfoItem = ({ title, value }) => (
  <div className="teams__card-info">
    <h5 className="teams__card-info-title">{title}</h5>
    <span className="teams__card-info-value">{value}</span>
  </div>
);

export default TeamInfoItem;
