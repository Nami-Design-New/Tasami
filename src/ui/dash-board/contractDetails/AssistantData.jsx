import medalIcon from "../../../assets/icons/medal.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import profileIcon from "../../../images/profile2.png";

export default function AssistantData() {
  return (
    <div className="assistant-card">
      <div className="card-body">
        <div className="user-data">
          <div className="img-wrapper">
            <img
              src={profileIcon}
              alt="احمد التطاوي"
              className="assistant-avatar"
            />
          </div>
          <div className="assistant-name">
            <h3>
              <span> احمد التطاوي</span>{" "}
              <div className="stats">
                <img src={medalIcon} />
                <span>11</span>
              </div>
            </h3>
            <div className="location">
              <img src={locationIcon} />
              <span>السعودية </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
