import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function HelperCard({ helper, canNavigate = true }) {
  const { lang } = useSelector((state) => state.language);
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
                  src="/icons/medal.svg"
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
                    src="/icons/flag.svg"
                    alt={`${helper.country.title} flag`}
                    className="flag-icon"
                    loading="lazy"
                  />
                  <span>{helper.country.title}</span>
                </span>
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
                  src="/icons/medal.svg"
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
                    src="/icons/flag.svg"
                    alt={`${helper.country.title} flag`}
                    className="flag-icon"
                    loading="lazy"
                  />
                  <span>{helper.country.title}</span>
                </span>
              )}
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
