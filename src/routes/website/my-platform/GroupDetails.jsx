import { useNavigate } from "react-router";
import useGetGroupDetails from "../../../hooks/website/my-groups/useGetGroupDetails";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import InfoCard from "../../../ui/cards/InfoCard";

export default function GroupDetails() {
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  const { groupDetails, isLoading } = useGetGroupDetails();

  if (isLoading) return <Loading />;

  if (!groupDetails) {
    return (
      <section className="group-details page">
        <div className="container">
          <p>No group found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="group-details page">
      <div className="container">
        <div className="header">
          <RoundedBackButton onClick={() => navigate(-1)}>
            {lang === "ar" ? (
              <i className="fa-solid fa-angle-right"></i>
            ) : (
              <i className="fa-solid fa-angle-left"></i>
            )}
          </RoundedBackButton>
          <h1>
            {" "}
            {t("group")} <span> {groupDetails.title}</span>
          </h1>
          <Dropdown className="custom-dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="edit-item"
                eventKey="edit"
                // onClick={() => setShowEditModal(true)}
              >
                {t("edit")}
              </Dropdown.Item>

              {/* Handle activate/deactivate */}
              <Dropdown.Item className="deactive-item" eventKey="deactive">
                {t("delete")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="row">
          <div className="col-12 col-lg-5 p-2">
            <div className="desxription">
              <h3>{t("description")}</h3>
              <p>{groupDetails.desc}</p>
            </div>
            <div className="info">
              <InfoCard title={t("created_at")} data={""} />
              <InfoCard title={t("members")} data={""} />
            </div>
          </div>
          <div className="col-12 col-lg-7 p-2"></div>
        </div>
      </div>
    </section>
  );
}
