import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import medalIcon from "../../../../assets/icons/medal.svg";
import flagIcon from "../../../../assets/icons/flag.svg";
export default function AudienceCard({ data, date = false }) {
  const { t } = useTranslation();

  return (
    <Link to={`/helper/${data?.user?.id}`} className="audience-card">
      <div
        className={
          data?.user?.is_online
            ? "user-image-wrapper"
            : "user-image-wrapper offline"
        }
      >
        <img
          className="user-image"
          src={data?.user?.image || "/images/profile image.svg"}
          alt="profile photo"
        />
      </div>
      <div className="info">
        <h2>
          <span>{data?.user?.name}</span>
          <span className="score">
            <img src={medalIcon} />
            {0}
          </span>
        </h2>

        <div className="country-date">
          {data?.user?.country && (
            <p className="country">
              <img src={flagIcon} />
              <span>{data?.user?.country?.title}</span>
            </p>
          )}
          {date && data?.created_at && (
            <p className="date">
              {t("website.platform.audience.memberSince")} {data?.created_at}{" "}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
