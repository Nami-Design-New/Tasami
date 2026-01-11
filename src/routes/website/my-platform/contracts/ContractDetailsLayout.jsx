import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import useGetWorkDetails from "../../../../hooks/website/MyWorks/useGetWorkDetails";
import Loading from "../../../../ui/loading/Loading";
import RoundedBackButton from "../../../../ui/website-auth/shared/RoundedBackButton";

export default function ContractDetailsLayout() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { workDetails, isLoading } = useGetWorkDetails();

  // let options;
  let tabs = [];

  if (isLoading) return <Loading />;

  // Tabs Logic
  if (
    workDetails?.status === "wait_for_user_payment" ||
    workDetails?.status === "wait_helper_to_accept" ||
    workDetails?.status === "offer_sent"
  ) {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
    ];
  } else if (workDetails?.status === "completed") {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
      { id: 2, label: t("works.beneficiary"), link: "beneficiaries" },
    ];
  } else if (
    workDetails?.helper === null &&
    (workDetails?.status === "planning" || workDetails?.status === "execution")
  ) {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
      { id: 5, label: t("works.beneficiary"), link: "beneficiaries" },
    ];
  } else {
    tabs = [
      {
        id: 1,
        label: t("works.details"),
        end: true,
      },
      { id: 4, label: t("works.tasks"), link: "tasks" },
      { id: 3, label: t("works.myGroup"), link: "group" },

      { id: 5, label: t("works.beneficiary"), link: "beneficiaries" },
    ];
  }

  return (
    <section className="page work-details-layout">
      <div className="container ">
        <div className="row">
          <div className="col-12 p-2">
            <div className="header">
              <div className="d-flex align-items-center gap-2">
                <RoundedBackButton
                  onClick={() => navigate(-1)}
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
                  {tab.id == 4 &&
                    workDetails?.tasks_need_actions_helper > 0 && (
                      <span className="notification_span mx-1">
                        {workDetails?.tasks_need_actions_helper}
                      </span>
                    )}
                  {tab.id == 5 && workDetails?.unread_messages > 0 && (
                    <span className="notification_span mx-1">
                      {workDetails?.unread_messages}
                    </span>
                  )}

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
            <Outlet
              context={{
                contractId: workDetails?.helper_last_contract_id,
                user: workDetails?.user,
              }}
            />
          </div>
        </div>
      </div>{" "}
      {/* <CancelContractModal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        workId={workDetails?.id}
        contractId={workDetails?.helper_last_contract_id}
      /> */}
    </section>
  );
}
