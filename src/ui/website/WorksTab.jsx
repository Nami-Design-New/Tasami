import { NavLink } from "react-router";

export default function WorksTab() {
  return (
    <div className="tab-nav">
      <NavLink to={"/my-works"} end>
        بانتظار التنفيذ
      </NavLink>
      <NavLink to={"in-progress"}>قيد التنفيذ</NavLink>
      <NavLink to={"completed"}>مكتملة</NavLink>
    </div>
  );
}
