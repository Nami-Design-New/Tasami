import medalIcon from "../../../assets/icons/medal.svg";

export default function UserCard({ user }) {
  return (
    <div className="user-profile">
      <img src={user.image} alt={user.name} className="avatar" />
      <div className="content">
        <h6>{user.name}</h6>
        <span>{user.account_code}</span>
      </div>
      <div className="rating">
        <img src={medalIcon} />
        <span>{user.experience_level}</span>
      </div>
    </div>
  );
}
