import { useState, useEffect } from "react";
import useToggleLikeConsultion from "../../../hooks/website/communities/useToggleLikeConsultion";
import useShareConsultation from "../../../hooks/website/communities/useShareConsultation";

export default function ConsultionActions({ consultaionDetails }) {
  const { toggleLike, isPending: likePending } = useToggleLikeConsultion();
  const { mutate: toggleShare } = useShareConsultation();

  const [isLiked, setIsLiked] = useState(consultaionDetails.i_liked_it);
  const [likesCount, setLikesCount] = useState(consultaionDetails.likes_count);
  const [sharesCount, setSharesCount] = useState(
    consultaionDetails.shares_count
  );

  // Sync states with API data
  useEffect(() => {
    if (consultaionDetails) {
      setIsLiked(consultaionDetails.i_liked_it || false);
      setLikesCount(consultaionDetails.likes_count);
      setSharesCount(consultaionDetails.shares_count);
    }
  }, [consultaionDetails]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    toggleLike(consultaionDetails.id, {
      onError: () => {
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
      },
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: consultaionDetails.title,
          text: consultaionDetails.desc,
          url: window.location.href,
        })
        .then(() => {
          // Optimistically update UI
          setSharesCount((prev) => prev + 1);
          toggleShare(consultaionDetails.id, {
            onError: () => setSharesCount((prev) => prev - 1),
          });
        })
        .catch((error) => console.error("Share failed:", error));
    } else {
      // fallback → copy link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");

      setSharesCount((prev) => prev + 1);
      toggleShare(consultaionDetails.id, {
        onError: () => setSharesCount((prev) => prev - 1),
      });
    }
  };

  return (
    <div className="icons-row details">
      {/* Views */}
      <div className="icons-wrapper">
        <div className="icon-circle">
          <i className="fa-solid fa-eye"></i>
        </div>
        <span>{consultaionDetails.views_count}</span>
      </div>

      {/* Likes */}
      <div className="icons-wrapper">
        <button
          disabled={likePending}
          onClick={handleLike}
          className={`icon-circle ${isLiked ? "active" : ""}`}
        >
          <i className={`fa-solid fa-heart ${isLiked ? "heart" : ""}`}></i>
        </button>
        <span>{likesCount}</span>
      </div>

      {/* Comments */}
      <div className="icons-wrapper">
        <div className="icon-circle">
          <i className="fa-solid fa-comment"></i>
        </div>
        <span>{consultaionDetails.comments_count}</span>
      </div>

      {/* Shares */}
      <div className="icons-wrapper">
        <button className="icon-circle" onClick={handleShare}>
          <i className="fa-solid fa-share"></i>
        </button>
        <span>{sharesCount}</span>
      </div>
    </div>
  );
}
