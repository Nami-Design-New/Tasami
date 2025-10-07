import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function CommunitiesCard({ community }) {
  const { t } = useTranslation();
  return (
    <Link className="communities-card" to={`/community/${community.id}`}>
      <img src={community.helper_image} className="" />
      <h2>
        {t("website.assistants.community")} {community.helper_name}
      </h2>
      <span className="arrow-icon">
        <i className="fa-solid fa-angle-left"></i>
      </span>
    </Link>
  );
}
