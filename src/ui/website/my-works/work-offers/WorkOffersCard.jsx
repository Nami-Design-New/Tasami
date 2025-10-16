import { useState } from "react";
import Currency from "../../../Currency";
import WorkOfferDetails from "./WorkOfferDetails";

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
            {price && (
              <sapn>
                <img
                  src="/icons/cash.svg"
                  alt={`${helper.country.title} flag`}
                  className="flag-icon"
                  loading="lazy"
                />
                <span>{price}</span>
                <Currency />
              </sapn>
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
