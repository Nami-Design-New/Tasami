import medalIcon from "../../../assets/icons/medal.svg";

export default function UserCard({ user }) {
  return (
    <div className="user-profile">
      <img src={user.image} alt={user.name} className="avatar" />
      <div className="content">
        <div className="name-rating">
          <h6>{user.name}</h6>{" "}
          <div className="rating">
            <img src={medalIcon} />
            <span>{user.experience_level}</span>
          </div>
        </div>
        <div>{user.account_code}</div>
      </div>
    </div>
  );
}
