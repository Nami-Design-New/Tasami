import { NavLink } from "react-router";

export default function CommunityTabs() {
  return (
    <div className="community-tabs">
   <div className="hed"> القنوات</div>

    <div className="tabs">
      <NavLink to="consultations">استشارات</NavLink>
      <NavLink to="Encounters">اللقاءات</NavLink>
      <NavLink to="posts">منشورات</NavLink>
    </div>
    </div>
  );
}
