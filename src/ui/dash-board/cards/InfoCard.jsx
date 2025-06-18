const InfoCard = ({ title, withBorder, link, children }) => (
  <div className="user-dashboard__card">
    <div className="user-dashboard__card-header">
      <h3 className="user-dashboard__card-title">{title}</h3>
      {link && <button className="button button--add">{link}</button>}
    </div>
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
