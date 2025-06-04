const InfoCard = ({ title, withBorder, children }) => (
  <div className="user-dashboard__card">
    <h3 className="user-dashboard__card-title">{title}</h3>
    <div
      className={`user-dashboard__card-content  ${
        withBorder ? "border--bottom" : " "
      }`}
    >
      {children}
    </div>
  </div>
);
export default InfoCard;
