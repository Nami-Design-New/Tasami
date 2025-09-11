import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function UserDropDown() {
  const { user } = useSelector((state) => state.authRole);

  return (
    <Link className="user_dropdown" to="/my-profile">
      <img
        src={user?.image || "/default-avatar.png"}
        alt={user?.name || "User"}
      />
    </Link>
  );
}
