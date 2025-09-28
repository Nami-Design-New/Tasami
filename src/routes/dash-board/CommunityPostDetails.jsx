import { Link } from "react-router";
import useGetPostDetails from "../../hooks/website/communities/posts/useGetPostDetails";
import Loading from "../../ui/loading/Loading";
import PostMedia from "../../ui/website/communities/posts/MyProductSlider";
import PostsComments from "../../ui/website/communities/posts/PostsComments";

export default function CommunityPostDetails() {
  const { postDetails, isLoading } = useGetPostDetails();
  const handleCopy = () => {};
  if (isLoading) return <Loading />;
  return (
    <section className="community-post-details page">
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Post image */}
        <PostMedia post={postDetails} />
        <div className="post-image row">
          <div className="col-12 p-2">
            {" "}
            {/* Title */}
            <h1 className="post-title">{postDetails.title}</h1>
          </div>
          <div className="col-12 p-2">
            {/* Description */}
            <p className="post-description ">{postDetails.desc} </p>
          </div>
          <div className="col-12 p-2">
            {" "}
            <div className="post-links">
              <h3 className="links-title">الروابط</h3>
              {postDetails.links.map((link) => (
                <Link className="post-link" key={link.id}>
                  <img
                    onClick={handleCopy}
                    src="/icons/file-icon.svg"
                    alt="file"
                  />
                  <span>{link.link}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-12 p-2">
            {/* Post stats */}
            <div className="post-stats">
              <div className="stat-item">
                <img src="/icons/eye.svg" alt="views" />
                <span>{postDetails.views_count}</span>
              </div>
              <div className="stat-item">
                <img src="/icons/heart-fill.svg" alt="likes" />
                <span>{postDetails.likes_count}</span>
              </div>
              <div className="stat-item">
                <img src="/icons/share.svg" alt="shares" />
                <span>{postDetails.shares_count}</span>
              </div>{" "}
              <div className="stat-item">
                <img src="/icons/comments.svg" alt="comments" />
                <span>{postDetails.comments_count}</span>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            {" "}
            <PostsComments />
          </div>
        </div>
      </div>
    </section>
  );
}
