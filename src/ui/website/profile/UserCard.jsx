export default function UserCard({ user }) {
  return (
    <div className="user">
      <img src={user.image} alt={user.name} className="avatar" />
      <div className="content">
        <h6>{user.name}</h6>
        <span>{user.id}</span>
      </div>
      <div className="rating">
        <img src="/icons/medal.svg" />
        <span>11</span>
      </div>
    </div>
  );
}
