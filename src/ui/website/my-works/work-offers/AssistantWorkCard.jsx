import { Link } from "react-router";

export default function AssistantWorkCard({
  helper,
  contractId,
  chat = true,
  prevAssistant = false,
  canNavigate = true,
}) {
  return (
    <>
      {canNavigate ? (
        <Link
          to={`/assisatant/contarct/${contractId}`}
          className={`helper-card  ${prevAssistant ? "yellow" : ""}`}
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

              {chat && (
                <Link to={`/user-chat/${contractId}`} className="chat">
                  <img
                    src="/icons/chat-white-icon.svg"
                    alt="chat"
                    className="flag-icon "
                    loading="lazy"
                  />
                </Link>
              )}
            </footer>
          </section>
        </Link>
      ) : (
        <div className={`helper-card  ${prevAssistant ? "yellow" : ""}`}>
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

              {chat && (
                <Link to={`/user-chat/${contractId}`} className="chat">
                  <img
                    src="/icons/chat-white-icon.svg"
                    alt="chat"
                    className="flag-icon "
                    loading="lazy"
                  />
                </Link>
              )}
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
