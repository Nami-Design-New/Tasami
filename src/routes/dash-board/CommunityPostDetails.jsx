import { Link, useNavigate } from "react-router";
import useGetPostDetails from "../../hooks/website/communities/posts/useGetPostDetails";
import Loading from "../../ui/loading/Loading";
import PostMedia from "../../ui/website/communities/posts/MyProductSlider";
import PostsComments from "../../ui/website/communities/posts/PostsComments";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import { useSelector } from "react-redux";
import PostsActions from "../../ui/website/communities/posts/PostsActions";
import { useTranslation } from "react-i18next";

export default function CommunityPostDetails() {
  const { t } = useTranslation();
  const { postDetails, isLoading } = useGetPostDetails();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  const handleBack = () => {
    navigate(-1);
  };
  const handleCopy = () => {};
  if (isLoading) return <Loading />;
  return (
    <section className="community-post-details page">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="my-2 d-flex align-items-center  gap-2">
          <RoundedBackButton onClick={handleBack}>
            {lang === "ar" ? (
              <i className="fa-solid fa-angle-right"></i>
            ) : (
              <i className="fa-solid fa-angle-left"></i>
            )}
          </RoundedBackButton>
          <h2 className="post-details-header">{t("postDetails")}</h2>
        </div>
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
            <PostsActions post={postDetails} />
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
