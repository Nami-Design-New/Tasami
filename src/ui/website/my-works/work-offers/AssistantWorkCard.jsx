import { Link } from "react-router";
import flagIcon from "../../../../assets/icons/flag.svg";
import medalIcon from "../../../../assets/icons/medal.svg";
import chatWhiteIcon from "../../../../assets/icons/chat-white-icon.svg";
export default function AssistantWorkCard({
  helper,
  contractId,
  chat = true,
  prevAssistant = false,
  canNavigate = true,
  tohelper = false,
  unReadMessage,
}) {
  return (
    <>
      {canNavigate ? (
        <Link
          to={
            tohelper
              ? `/helper/${helper.id}`
              : `/assisatant/contarct/${contractId}`
          }
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

              {chat && (
                <Link
                  to={`/user-chat/${contractId}`}
                  className="chat position-relative"
                >
                  <img
                    src={chatWhiteIcon}
                    alt="chat"
                    className="flag-icon "
                    loading="lazy"
                  />
                  {unReadMessage > 0 && (
                    <span className="notification_span notification_position">
                      {unReadMessage}
                    </span>
                  )}
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
                  src={flagIcon}
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
