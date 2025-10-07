import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function ReelCard({ reel }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authRole);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTogglike = () => {
    if (!user) {
      navigate("/login");
      return;
    }
  };

  const handleAddComment = () => {
    navigate(`${reel.id}`);
  };
  return (
    <div className="social-card">
      {/* Header */}
      <div className="social-card__header">
        {" "}
        <div className="social-card__user-info">
          <img
            src={reel?.helper?.image}
            alt={reel?.helper?.name}
            className="social-card__user-img"
          />
          <span className="social-card__username">{reel?.helper?.name}</span>
        </div>
        <button className="social-card__user-btn">
          <i className="fa-regular fa-user"></i>
        </button>
      </div>
      {/* Video */}{" "}
      {reel?.file && (
        <div className="social-card__video-container">
          {reel?.type === "image" && (
            <img
              src={reel?.file}
              style={{ aspectRatio: "0.5625 / 1" }}
              className="social-card__image"
            />
          )}
          {reel.type === "video" && (
            <>
              <video
                src={reel?.file}
                ref={videoRef}
                loop
                muted
                playsInline
                preload="metadata"
                onClick={togglePlay}
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                className="social-card__video"
                style={{ aspectRatio: "0.5625 / 1" }}
              ></video>

              {/* Custom play button overlay */}
              {!isPlaying && (
                <button className="play-button" onClick={togglePlay}>
                  <i className="fa-solid fa-play"></i>
                </button>
              )}
            </>
          )}
        </div>
      )}
      {/* Actions */}
      <div className="social-card__actions">
        <div className="social-card__action">
          <button onClick={handleTogglike} className="social-card__action-btn">
            <i className="fa-solid fa-heart"></i>
          </button>
          <span>{reel?.likes_count}</span>
        </div>

        <div className="social-card__action">
          <button
            onClick={handleAddComment}
            className="social-card__action-btn"
          >
            <i className="fa-regular fa-comment"></i>
          </button>
          <span>{reel?.comments_count}</span>
        </div>

        <div className="social-card__action">
          <span className="social-card__action-btn">
            <i className="fa-regular fa-eye"></i>
          </span>
          <span>{reel.views_count}</span>
        </div>

        <div className="social-card__action">
          <button className="social-card__action-btn">
            <i className="fa-solid fa-share"></i>
          </button>
          <span>{reel?.shares_count}</span>
        </div>
      </div>
      {/* Description */}
      <div className="social-card__description">
        <p>{reel?.title}</p>
      </div>
    </div>
  );
}
