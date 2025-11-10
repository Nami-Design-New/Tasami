import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import useHandelToggleLikePosts from "../../../hooks/website/communities/posts/useHandelToggleLikePosts";
import useSharePost from "../../../hooks/website/communities/posts/useSharePost";
import useFollow from "../../../hooks/website/personal-assistants/useFollow";

export default function ReelCard({ reel }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authRole);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const queryClient = useQueryClient();
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

  const { toggleLike, isPending: likePending } = useHandelToggleLikePosts();
  const { mutate: sharePost } = useSharePost();

  const [isLiked, setIsLiked] = useState(reel?.i_liked_it);
  const [likesCount, setLikesCount] = useState(reel.likes_count);
  const [sharesCount, setSharesCount] = useState(reel.shares_count);

  // Like Post
  useEffect(() => {
    if (reel) {
      setIsLiked(reel.i_liked_it || false);
      setLikesCount(reel.likes_count);
      setSharesCount(reel.shares_count);
    }
  }, [reel]);

  const handleLike = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    toggleLike(reel.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reels"] });
        queryClient.refetchQueries({ queryKey: ["community-posts"] });
        queryClient.refetchQueries({ queryKey: ["post-details", reel.id] });
      },
      onError: () => {
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
      },
    });
  };

  // Follow Pose Owner
  const [optimisticFollow, setOptimisticFollow] = useState(
    reel?.helper?.i_follow_him
  );
  const { toggleFollow, isPending } = useFollow();

  useEffect(() => {
    if (reel) {
      setOptimisticFollow(reel?.helper?.i_follow_him);
    }
  }, [reel]);

  const handleFollow = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const previousValue = optimisticFollow;

    // Optimistic update
    setOptimisticFollow(!optimisticFollow);

    toggleFollow(id, {
      onSuccess: (res) => {
        console.log(res);

        if (res?.data?.i_follow_him !== undefined) {
          setOptimisticFollow(res.data.i_follow_him);
        }
        queryClient.invalidateQueries({ queryKey: ["reels"] });

        queryClient.refetchQueries({
          queryKey: ["my-following"],
        });
      },
      onError: () => {
        // Rollback if API fails
        setOptimisticFollow(previousValue);
      },
      onSettled: () => {
        // Optionally refetch assistant details too
        queryClient.invalidateQueries({
          queryKey: ["assistant-details", id],
        });
      },
    });
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
        <button
          className="social-card__user-btn"
          onClick={() => handleFollow(reel.helper.id)}
          disabled={isPending}
        >
          {optimisticFollow ? (
            <i className="fa-regular fa-user-check"></i>
          ) : (
            <i className="fa-regular fa-user-plus"></i>
          )}
        </button>
      </div>
      {/* Video */}{" "}
      {reel?.file && (
        <div className="social-card__video-container">
          {reel?.type === "image" && (
            <img
              src={reel?.file}
              style={{ aspectRatio: reel?.aspect_ratio }}
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
                style={{ aspectRatio: reel?.aspect_ratio }}
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
          <button
            disabled={likePending}
            onClick={handleLike}
            className={`social-card__action-btn  ${isLiked ? "liked" : ""} `}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
          <span>{likesCount}</span>
        </div>

        <div className="social-card__action">
          <Link
            to={user ? `/posts/${reel.id}` : "/login"}
            className="social-card__action-btn"
          >
            <i className="fa-regular fa-comment"></i>
          </Link>
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
