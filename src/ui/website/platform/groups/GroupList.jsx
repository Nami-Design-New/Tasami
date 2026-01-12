import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import groupsIcon from "../../../../assets/icons/Groups.svg";
export default function GroupList({ allGroups }) {
  const { t } = useTranslation();
  console.log("all groups", allGroups);

  return (
    <ul
      className="groups__list no-scroll-bar"
      style={{ maxHeight: "auto", overflowY: "auto" }}
    >
      {allGroups.map((group) => (
        <Link key={group.id} to={`/my-group/${group.id}`}>
          <li className="groups__list-item">
            <div className="d-flex gap-2 align-items-center">
              <img src={groupsIcon} alt={group.title} />
              <p className="groups__item-text">{group.title}</p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              {group?.total_pending_sum > 0 && (
                <span className="notification_span">
                  {group?.total_pending_sum}
                </span>
              )}
              <button
                type="button"
                className="groups__item-action"
                aria-label={t("website.platform.cv.viewExperience")}
              >
                <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
              </button>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
