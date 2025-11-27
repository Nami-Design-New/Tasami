import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import useGetPostDetails from "../../hooks/website/communities/posts/useGetPostDetails";
import Loading from "../../ui/loading/Loading";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import PostMedia from "../../ui/website/communities/posts/MyProductSlider";
import PostsActions from "../../ui/website/communities/posts/PostsActions";
import PostsComments from "../../ui/website/communities/posts/PostsComments";
import { useSelector } from "react-redux";
import { handleCopy } from "../../utils/helper";
import OptionsMenu from "../../ui/website/OptionsMenu";
import { useState } from "react";
import AddPostModal from "../../ui/website/communities/posts/AddPostModal";

export default function CommunityPostDetails() {
  const { t } = useTranslation();
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useSelector((state) => state.authRole);
  const { postDetails, isLoading } = useGetPostDetails();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  if (isLoading) return <Loading />;
  return (
    <section className="community-post-details page">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="my-2 d-flex align-items-center  gap-2">
          <div className="flex-grow-1 d-flex align-items-center gap-2">
            <RoundedBackButton onClick={handleBack}></RoundedBackButton>
            <h2 className="post-details-header">{t("postDetails")}</h2>
          </div>

          <OptionsMenu
            toggleButton={"fas fa-ellipsis-h"}
            options={[
              {
                label: t("edit"),
                onClick: () => setShowEditModal(true),
              },
            ]}
          />
        </div>
        <PostMedia post={postDetails} />
        <div className="post-image row">
          <div className="col-12 p-2">
            {/* Title */}
            <h1 className="post-title">{postDetails.title}</h1>
          </div>
          <div className="col-12 p-2">
            {/* Description */}
            <p className="post-description ">{postDetails.desc} </p>
          </div>
          {postDetails.links.length > 0 && (
            <div className="col-12 p-2">
              <div className="post-links">
                <h3 className="links-title">{t("links")}</h3>
                {postDetails?.links.map((link) => (
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
            <PostsActions post={postDetails} />
          </div>
          <div className="col-12 p-2">
            <PostsComments
              isSubscribed={postDetails?.is_subscribed}
              isMyCommunity={user?.id === postDetails?.helper?.id}
            />
          </div>
        </div>
      </div>
      <AddPostModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        isEdit={true}
        postDetails={postDetails}
      />
    </section>
  );
}
