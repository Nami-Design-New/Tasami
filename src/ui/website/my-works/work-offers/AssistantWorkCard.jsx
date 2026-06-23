import { Link } from "react-router";
import chatWhiteIcon from "../../../../assets/icons/chat-white-icon.svg";
import medalIconYellow from "../../../../assets/icons/medal-yellow.svg";
import medalIcon from "../../../../assets/icons/medal.svg";
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
              ? `/helper/${helper?.id}`
              : `/assisatant/contarct/${contractId}`
          }
          className={`helper-card  ${prevAssistant ? "yellow" : ""}`}
        >
          <figure className="image-wrapper">
            <img
              src={helper?.image}
              alt={helper?.name}
              className={`avatar ${prevAssistant ? "yellow" : ""}`}
              loading="lazy"
            />
            {helper?.is_online && (
              <span className="status-dot" aria-hidden="true"></span>
            )}
          </figure>

          <section className="info">
            <header className="info-header">
              <h3>{helper?.name}</h3>
              <div className="rating">
                <img
                  src={`${prevAssistant ? medalIconYellow : medalIcon}`}
                  alt="Medal icon"
                  className="rating-icon"
                  loading="lazy"
                />
                <span>{helper?.experience_level}</span>
              </div>
            </header>

            <footer className="meta">
              {helper?.country && (
                <span className="country">
                  <img
                    src={helper?.country?.image}
                    alt={`${helper?.country.title} flag`}
                    className="flag-icon"
                    loading="lazy"
                  />
                  <span>{helper?.country.title}</span>
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
              src={helper?.image}
              alt={helper?.name}
              className={`avatar ${prevAssistant ? "yellow" : ""}`}
              loading="lazy"
            />
            {helper?.is_online && (
              <span className="status-dot" aria-hidden="true"></span>
            )}
          </figure>

          <section className="info">
            <header className="info-header">
              <h3>{helper?.name}</h3>
              <div className="rating">
                <img
                  src={`${prevAssistant ? medalIconYellow : medalIcon}`}
                  alt="Medal icon"
                  className="rating-icon"
                  loading="lazy"
                />
                <span>{helper?.experience_level}</span>
              </div>
            </header>

            <footer className="meta">
              {helper?.country && (
                <span className="country">
                  <img
                    src={helper?.country?.image}
                    alt={`${helper?.country?.title} flag`}
                    className="flag-icon"
                    loading="lazy"
                  />
                  <span>{helper?.country.title}</span>
                </span>
              )}

              {chat && (
                <Link to={`/user-chat/${contractId}`} className="chat">
                  <img
                    src={chatWhiteIcon}
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
