import { useState } from "react";
import Currency from "../../../Currency";
import WorkOfferDetails from "./WorkOfferDetails";
import flagIcon from "../../../../assets/icons/flag.svg";
import medalIcon from "../../../../assets/icons/medal.svg";
import cashIcon from "../../../../assets/icons/cash.svg";

export default function WorkOffersCard({ helper, price, offerId }) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowDetailsModal(true)}
        className="helper-card"
        style={{ cursor: "pointer" }}
      >
        <figure className="image-wrapper">
          <img
            src={helper.image}
            alt={helper.name}
            className="avatar"
            loading="lazy"
          />
          {helper?.is_online && (
            <span className="status-dot" aria-hidden="true"></span>
          )}
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
            {price && (
              <span>
                <img
                  src={cashIcon}
                  alt={`${helper.country.title} flag`}
                  className="flag-icon"
                  loading="lazy"
                />
                <span>{price}</span>
                <Currency />
              </span>
            )}
          </footer>
        </section>
      </div>
      <WorkOfferDetails
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
        offerId={offerId}
      />
    </>
  );
}
