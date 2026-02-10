import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import helpTriangle from "../../../assets/icons/help-triangle.svg";
import triangleWithHelper from "../../../assets/icons/triangle-with-helper.svg";
import triangleWithoutHelper from "../../../assets/icons/triangle-without-helper.png";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import WorksTab from "../../../ui/website/WorksTab";

export default function MyWorks() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("pending");
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  return (
    <div className="myworks page">
      <div className="container">
        <div className="row g-0">
          {/* <RoundedBackButton
            onClick={() => {
              navigate("/");
              // queryClient.invalidateQueries({ queryKey: ["counters-notify"] });
            }}
          ></RoundedBackButton> */}
          <section
            className="col-12 p-2 legend-section"
            aria-labelledby="legend-title"
          >
            <h2 className="legend-title">{t("legendTitle")}</h2>

            <ul className="legend-list">
              <li>
                <figure>
                  <img
                    src={triangleWithoutHelper}
                    alt={t("goalWithoutHelper")}
                  />
                  <figcaption>{t("goalWithoutHelper")}</figcaption>
                </figure>
              </li>
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
              <NavLink
                to={"/my-works"}
                end
                className="d-flex  align-content-center justify-content-center gap-2"
              >
                {t("works.status.pending")}
                <span className="notification_span">0</span>
              </NavLink>
              <NavLink
                to={"in-progress"}
                className="d-flex  align-content-center justify-content-center gap-2"
              >
                {t("works.status.inProgress")}{" "}
                <span className="notification_span">0</span>
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
