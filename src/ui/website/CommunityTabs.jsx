import { NavLink } from "react-router";

export default function CommunityTabs() {
  return (
    <div className="community-tabs">
      <NavLink to="consultations">استشارات</NavLink>
      <NavLink to="Encounters">اللقاءات</NavLink>
      <NavLink to="posts">منشورات</NavLink>
      <NavLink to="views">مشاهدات</NavLink>
    </div>
  );
}
