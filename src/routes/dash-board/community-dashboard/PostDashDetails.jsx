import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import useGetPostDashDetails from "../../../hooks/dashboard/subscription/useGetPostDashDetails";
import Loading from "../../../ui/loading/Loading";
import { handleCopy } from "../../../utils/helper";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import PostMedia from "../../../ui/website/communities/posts/MyProductSlider";
import PostsActions from "../../../ui/website/communities/posts/PostsActions";
import PostDashComments from "./PostDashComments";

export default function PostDashDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { postDashDetails, isLoading } = useGetPostDashDetails(id);
  console.log("postDashDetails", postDashDetails);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  if (isLoading) return <Loading />;
  return (
    <section className="community-post-details page">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="my-2 d-flex align-items-center  gap-2">
          <RoundedBackButton onClick={handleBack}></RoundedBackButton>
          <h2 className="post-details-header">{t("post Dash Details")}</h2>
        </div>
        <PostMedia post={postDashDetails} />
        <div className="post-image row">
          <div className="col-12 p-2">
            {/* Title */}
            <h1 className="post-title">{postDashDetails.title}</h1>
          </div>
          <div className="col-12 p-2">
            {/* Description */}
            <p className="post-description ">{postDashDetails.desc} </p>
          </div>
          {postDashDetails.links.length > 0 && (
            <div className="col-12 p-2">
              <div className="post-links">
                <h3 className="links-title">{t("links")}</h3>
                {postDashDetails?.links.map((link) => (
                  <Link className="post-link" key={link.id}>
                    <img
                      onClick={() => handleCopy(link.link)}
                      src="/icons/file-icon.svg"
                      alt="file"
                    />
                    <span>{link.link}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="col-12 p-2">
            <PostsActions post={postDashDetails} />
          </div>
          <div className="col-12 p-2">
            <PostDashComments />
          </div>
        </div>
      </div>
    </section>
  );
}
