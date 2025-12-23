import CustomButton from "../../CustomButton";

const InfoCard = ({ title, withBorder, style, link, event, children }) => (
  <div className="user-dashboard__card" style={style}>
    <div className="user-dashboard__card-header">
      <h3 className="user-dashboard__card-title">{title}</h3>
      {link && (
        <CustomButton onClick={event} color="secondary">
          {link}
        </CustomButton>
      )}
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
