import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router";
import useGetWorkDetails from "../../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../../ui/loading/Loading";
import RoundedBackButton from "../../../../ui/website-auth/shared/RoundedBackButton";

export default function ContructDetailsLayout() {
  const { t } = useTranslation();
  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;
  const tabs = [
    {
      id: 1,
      label: t("works.details"),
      end: true,
    },
    { id: 3, label: t("works.group"), link: "group" },
    { id: 3, label: t("works.offers"), link: "offers" },
    { id: 4, label: t("works.tasks"), link: "tasks" },
    { id: 5, label: t("works.assistants"), link: "assistants" },
  ];
  return (
    <section className="page work-details-layout">
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
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="works-details-tabs">
              {tabs.map((tab) => (
                <NavLink
                  className="tab-link"
                  to={tab.link || ""}
                  key={tab.id}
                  end={tab.end}
                >
                  {tab.label}
                  {tab.link === "offers" && (
                    <span className="offer-count-badge">
                      {workDetails?.offers_count}
                    </span>
                  )}
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
