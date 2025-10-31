import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import WorksTab from "../../../ui/website/WorksTab";
import { useTranslation } from "react-i18next";

export default function MyWorks() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="myworks page">
      <div className="container">
        <div className="row g-0">
          <div className="col-12 p-2">
            <WorksTab activeTab={activeTab} setActiveTab={setActiveTab}>
              <NavLink to={"/my-works"} end>
                {t("works.status.pending")}
              </NavLink>
              <NavLink to={"in-progress"}>
                {t("works.status.inProgress")}
              </NavLink>
              <NavLink to={"completed"}>{t("works.status.completed")}</NavLink>
            </WorksTab>
          </div>
        </div>
        <div className="row g-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
