import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import WorksTab from "../../../ui/website/WorksTab";
import { useTranslation } from "react-i18next";
import triangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";
import helpTriangle from "../../../assets/icons/help-triangle.svg";
import triangleWithoutHelper from "../../../assets/icons/triangle-without-helper.png";

export default function MyContracts() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="myworks page">
      <div className="container">
        <div className="row g-0">
          {" "}
          <section
            className="col-12 p-2 legend-section"
            aria-labelledby="legend-title"
          >
            <h2 className="legend-title">{t("legendTitle")}</h2>

            <ul className="legend-list">
              {/* <li>
                <figure>
                  <img
                    src={triangleWithoutHelper}
                    alt={t("goalWithoutHelper")}
                  />
                  <figcaption>{t("goalWithoutHelper")}</figcaption>
                </figure>
              </li> */}
              <li>
                <figure>
                  <img src={triangleWithHelper} alt={t("goalWithHelper")} />
                  <figcaption>{t("goalWithHelper")}</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img src={helpTriangle} alt={t("helpOffer")} />
                  <figcaption>{t("helpOffer")}</figcaption>
                </figure>
              </li>
            </ul>
          </section>
          <div className="col-12 p-2">
            <WorksTab activeTab={activeTab} setActiveTab={setActiveTab}>
              <NavLink to={"/my-contracts"} end>
                {t("works.status.pending")}{" "}
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
