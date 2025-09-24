import { useEffect, useState } from "react";
import useToggleLikeConsultion from "../../../hooks/website/communities/useToggleLikeConsultion";

export default function ConsultionActions({ consultaionDetails }) {
  const { toggleLike, isPending } = useToggleLikeConsultion();

  // ✅ Local optimistic state
  const [isLiked, setIsLiked] = useState(
    consultaionDetails.i_liked_it || false
  );
  const [likesCount, setLikesCount] = useState(consultaionDetails.likes_count);

  useEffect(() => {
    if (consultaionDetails) {
      setIsLiked(consultaionDetails.i_liked_it || false);
      setLikesCount(consultaionDetails.likes_count);
    }
  }, [consultaionDetails]);

  const handleLike = () => {
    // Optimistic update
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    toggleLike(consultaionDetails.id, {
      onError: (err) => {
        console.log(err);

        // Revert if API fails
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
      },
    });
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
          disabled={isPending}
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
        <div className="icon-circle">
          <i className="fa-solid fa-share"></i>
        </div>
        <span>{consultaionDetails.shares_count}</span>
      </div>
    </div>
  );
}
