import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import CustomLink from "../CustomLink";
import medalIcon from "../../assets/icons/medal.svg";
import flagIcon from "../../assets/icons/flag.svg";

export default function HelperCard({
  helper,
  toResume = false,
  canNavigate = true,
}) {
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  return (
    <>
      {canNavigate ? (
        <Link
          to={`/helper/${helper.id}`}
          className={`${lang === "en" ? "en" : ""} helper-card`}
        >
          <figure className="image-wrapper">
            <img
              src={helper.image}
              alt={helper.name}
              className="avatar"
              loading="lazy"
            />
            <span className="status-dot" aria-hidden="true"></span>
          </figure>

          <section className="info">
            <header className="info-header">
              <h3>{helper.name}</h3>
              <div className="rating">
                <img
                  src={medalIcon}
                  alt="Medal icon"
                  className="rating-icon"
                  loading="lazy"
                />
                <span>{helper.experience_level}</span>
              </div>
            </header>

            <footer className="meta">
              {helper.country && (
                <span className="country">
                  <img
                    src={flagIcon}
                    alt={`${helper.country.title} flag`}
                    className="flag-icon"
                    loading="lazy"
                  />
                  <span>{helper.country.title}</span>
                </span>
              )}{" "}
              {toResume && (
                <CustomLink to={`/helper/${helper.id}`} size="small">
                  {t("resume")}
                </CustomLink>
              )}
            </footer>
          </section>
        </Link>
      ) : (
        <div className={`${lang === "en" ? "en" : ""} helper-card`}>
          <figure className="image-wrapper">
            <img
              src={helper.image}
              alt={helper.name}
              className="avatar"
              loading="lazy"
            />
            <span className="status-dot" aria-hidden="true"></span>
          </figure>

          <section className="info">
            <header className="info-header">
              <h3>{helper.name}</h3>
              <div className="rating">
                <img
                  src={medalIcon}
                  alt="Medal icon"
                  className="rating-icon"
                  loading="lazy"
                />
                <span>{helper.experience_level}</span>
              </div>
            </header>

            <footer className="meta">
              {helper.country && (
                <span className="country">
                  <img
                    src={flagIcon}
                    alt={`${helper.country.title} flag`}
                    className="flag-icon"
                    loading="lazy"
                  />
                  <span>{helper.country.title}</span>
                </span>
              )}
              {toResume && (
                <CustomLink size="small" to={`/helper/${helper.id}`}>
                  {t("resume")}
                </CustomLink>
              )}
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
