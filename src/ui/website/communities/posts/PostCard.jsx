import { Link } from "react-router";
import useCheckDashboard from "../../../../hooks/dashboard/checkDashboard/useCheckDashboard";

export default function PostCard({ post }) {
  const isDashboard = useCheckDashboard();

  return (
    <Link
      className="post-card"
      to={`${
        isDashboard
          ? `/dashboard/post-dash-details/${post.id}`
          : `/post-details/${post.id}`
      }`}
    >
      {post.file && (
        <div className="image-wrapper">
          {post.type === "image" && (
            <img
              src={post.file}
              style={{ aspectRatio: post?.aspect_ratio }}
              className="image"
            />
          )}
          {post.type === "video" && (
            <video
              src={post.file}
              style={{ aspectRatio: post?.aspect_ratio }}
              className="image"
            />
          )}
        </div>
      )}
      <div className="date">
        <i className="fa-regular fa-calendar"></i>
        <span>{post.created_at}</span>
      </div>
      <div className="info">
        <h2>{post.title}</h2>
        <p>{post.desc}</p>
      </div>
      <div className="icons-row">
        {" "}
        <div className="icons-wrapper">
          <div className="icon-circle">
            <i className="fa-solid fa-eye"></i>
          </div>
          <span>{post.views_count}</span>
        </div>
        <div className="icons-wrapper">
          <div className="icon-circle">
            <i className="fa-solid fa-heart"></i>
          </div>
          <span>{post.likes_count}</span>
        </div>{" "}
        <div className="icons-wrapper">
          <div className="icon-circle">
            <i className="fa-solid fa-comment"></i>
          </div>
          <span>{post.comments_count}</span>
        </div>
        <div className="icons-wrapper">
          <div className="icon-circle">
            <i className="fa-solid fa-share"></i>
          </div>
          <span>{post.shares_count}</span>
        </div>
      </div>
    </Link>
  );
}
