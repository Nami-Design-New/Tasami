import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function GroupList({ allGroups }) {
  const { t } = useTranslation();

  return (
    <ul
      className="groups__list no-scroll-bar"
      style={{ maxHeight: "auto", overflowY: "auto" }}
    >
      {allGroups.map((group) => (
        <Link key={group.id} to="">
          <li className="groups__list-item">
            <div className="d-flex gap-2 align-items-center">
              <img src="/icons/Groups.svg" alt={group.title} />
              <p className="groups__item-text">{group.title}</p>
            </div>
            <button
              type="button"
              className="groups__item-action"
              aria-label={t("website.platform.cv.viewExperience")}
            >
              <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
            </button>
          </li>
        </Link>
      ))}
    </ul>
  );
}
