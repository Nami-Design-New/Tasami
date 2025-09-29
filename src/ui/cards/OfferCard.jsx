import { Link } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAddOrRemoveBookmark from "../../hooks/website/personal-assistances/useAddOrRemoveBookmark";
import { useQueryClient } from "@tanstack/react-query";

const OfferCard = ({ offer }) => {
  const { user } = useSelector((state) => state.authRole);
  const { toggleBookmark, isPending } = useAddOrRemoveBookmark();
  const [bookmarked, setBookmarked] = useState(offer?.is_saved || false);
  const queryClient = useQueryClient();
  const isMyOffer = user.id === offer.user.id;

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const prevState = bookmarked;
    setBookmarked(!prevState);

    toggleBookmark(offer.id, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["bookmarked-offes"] });
      },
      onError: () => {
        setBookmarked(prevState);
      },
    });
  };

  return (
    <Link
      to={isMyOffer ? `/my-assistances/${offer.id}` : `/offers/${offer.id}`}
      className="offer-card text-decoration-none text-dark"
    >
      <div className="image-wrapper">
        <img
          src={offer?.help_service?.image}
          alt={offer.user.name}
          className="avatar"
        />
      </div>

      <div className="info">
        <div className="info-header">
          <h3>{offer.user.name}</h3>
          <span className="rating">
            <i className="fa-solid fa-star text-warning"></i>{" "}
            {offer.help_service.rate}
          </span>
        </div>
        <p className="title ellipsis " style={{ maxWidth: "240px" }}>
          {offer.title}
        </p>
      </div>

      <div className="data">
        <span className="item mx-2">
          <img src="/icons/title.svg" alt="title" /> {offer.category_title}
        </span>
        <div className="item price">
          <span>
            <img src="/icons/cash.svg" alt="icon" className="mx-2" />
            {offer.help_service.price} <img src="/icons/ryal.svg" alt="ريال" />
          </span>
          <button
            className="toggle-bookmark-button"
            onClick={handleToggleBookmark}
          >
            <i
              className={`fa-solid fa-bookmark ${bookmarked ? "active" : ""} ${
                isPending ? "opacity-50" : ""
              }`}
            ></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
