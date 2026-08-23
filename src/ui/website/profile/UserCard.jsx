import HelperCard from "../../cards/HelperCard";

export default function UserCard({ user }) {
  return <HelperCard helper={user} canNavigate={false} />;
}
