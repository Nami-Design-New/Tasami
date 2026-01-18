import medalIcon from "../../../assets/icons/medal.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import profileIcon from "../../../assets/images/profile2.png";

export default function AssistantData({ user }) {
  return (
    <div className="assistant-card">
      <div className="card-body">
        <div className="user-data">
          <div className="img-wrapper ">
            <img
              src={user?.image || profileIcon}
              alt="username"
              className="assistant-avatar"
            />
          </div>
          <div className="assistant-name">
            <h3>
              <span> {user?.name}</span>{" "}
              <div className="stats d-flex align-items-center gap-1">
                <img src={medalIcon} />
                <span>{user?.experience_level}</span>
              </div>
            </h3>
            <div className="location">
              <span>{user?.country?.title} </span>
              <img src={locationIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
