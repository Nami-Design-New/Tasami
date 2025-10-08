import { useEffect, useState } from "react";
import useHandelToggleLikePosts from "../../../../hooks/website/communities/posts/useHandelToggleLikePosts";
import useSharePost from "../../../../hooks/website/communities/posts/useSharePost";
import { useQueryClient } from "@tanstack/react-query";

export default function PostsActions({ post }) {
  const { toggleLike, isPending: likePending } = useHandelToggleLikePosts();
  const { mutate: sharePost } = useSharePost();
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(post.i_liked_it);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [sharesCount, setSharesCount] = useState(post.shares_count);

  // Sync states with API data
  useEffect(() => {
    if (post) {
      setIsLiked(post.i_liked_it || false);
      setLikesCount(post.likes_count);
      setSharesCount(post.shares_count);
    }
  }, [post]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    toggleLike(post.id, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["community-posts"] });
        queryClient.refetchQueries({ queryKey: ["reels"] });
        queryClient.invalidateQueries({ queryKey: ["post-details"] });
      },
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
          title: post.title,
          text: post.desc,
          url: window.location.href,
        })
        .then(() => {
          // Optimistically update UI
          setSharesCount((prev) => prev + 1);
          sharePost(post.id, {
            onSuccess: () => {
              queryClient.refetchQueries({ queryKey: ["community-posts"] });
              queryClient.refetchQueries({ queryKey: ["reels"] });
              queryClient.invalidateQueries({ queryKey: ["post-details"] });
            },
            onError: () => setSharesCount((prev) => prev - 1),
          });
        })
        .catch((error) => console.error("Share failed:", error));
    } else {
      // fallback → copy link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");

      setSharesCount((prev) => prev + 1);
      sharePost(post.id, {
        onError: () => setSharesCount((prev) => prev - 1),
      });
    }
  };

  return (
    <div className="icons-row details">
      <div className="icons-wrapper">
        <div className="icon-circle">
          <img src="/icons/eye.svg" alt="views" />
        </div>
        <span>{post.views_count}</span>
      </div>
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
      <div className="icons-wrapper">
        <button className="icon-circle" onClick={handleShare}>
          <img src="/icons/share.svg" alt="shares" />
        </button>
        <span>{sharesCount}</span>
      </div>{" "}
      <div className="icons-wrapper">
        <div className="icon-circle">
          <img src="/icons/comments.svg" alt="comments" />
        </div>
        <span>{post.comments_count}</span>
      </div>
    </div>
  );
}
