import { Link } from "react-router";

export default function HelperCard({ helper }) {
  return (
    <Link to={`/helper/${helper.id}`} className="helper-card">
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
            <span>{helper.contract_numbers}</span>
          </div>
        </header>

        {helper.country && (
          <footer className="meta">
            <span className="country">
              <img
                src="/icons/flag.svg"
                alt={`${helper.country.title} flag`}
                className="flag-icon"
                loading="lazy"
              />
              <span>{helper.country.title}</span>
            </span>
          </footer>
        )}
      </section>
    </Link>
  );
}
