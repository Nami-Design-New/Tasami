import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function AudienceCard({ data }) {
  const { t } = useTranslation();

  return (
    <Link to={`/helper/${data.user.id}`} className="audience-card">
      <div className="user-image-wrapper">
        <img
          className="user-image"
          src={data.user.image || "/images/profile image.svg"}
          alt="profile photo"
        />
      </div>
      <div className="info">
        <h2>
          <span>{data.user.name}</span>
          <span className="score">
            <img src="/icons/medal.svg" />
            {0}
          </span>
        </h2>

        <div className="country-date">
          {data.user?.country && (
            <p className="country">
              <img src={"/icons/flag.svg"} />
              <span>{data.user?.country?.title}</span>
            </p>
          )}
          {data.created_at && (
            <p className="date">
              {t("website.platform.audience.memberSince")} {data.created_at}{" "}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
