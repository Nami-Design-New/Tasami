import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import OptionsMenu from "../../../ui/website/OptionsMenu";

export default function WorksDetailsLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { workDetails, isLoading } = useGetWorkDetails();

  const tabs = [
    {
      id: 1,
      label: t("works.details"),
      end: true,
    },
    { id: 2, label: t("works.group"), link: "tasks" },
    { id: 3, label: t("works.tasks"), link: "group" },
    { id: 4, label: t("works.assistants"), link: "assistants" },
  ];
  if (isLoading) return <Loading />;
  return (
    <section className="page work-details">
      <div className="container ">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <div className="d-flex align-items-center gap-2">
                <RoundedBackButton
                  onClick={() => navigate(`/my-works`)}
                ></RoundedBackButton>
                <h1>{workDetails?.code}</h1>
              </div>
              <OptionsMenu
                toggleButton={"fa-light fa-shield-exclamation"}
                options={[
                  {
                    label: t("works.complete"),
                    className: "text-green",
                  },
                  {
                    label: t("works.delete"),
                    className: "text-danger",
                  },
                ]}
              />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="works-details-tabs">
              {tabs.map((tab) => (
                <NavLink
                  className="tab-link"
                  key={tab.id}
                  to={tab.link || ""}
                  end={tab.end}
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="col-12 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
