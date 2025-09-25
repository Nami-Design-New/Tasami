import { Link } from "react-router";

export default function PostCard({ post }) {
  return (
    <Link className="post-card" to={`/posts/${post.id}`}>
      {post.file && (
        <div className="image-wrapper">
          {post.type === "image" && (
            <img
              src={post.file}
              style={{ aspectRatio: `${1.5}` }}
              className="image"
            />
          )}
          {post.type === "video" && <video src={post.file} className="image" />}
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
