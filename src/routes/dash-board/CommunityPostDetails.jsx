import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
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
import AlertModal from "../../ui/website/platform/my-community/AlertModal";
import useDeletePost from "../../hooks/website/communities/posts/useDeletePost";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import fileIcon from "../../assets/icons/file-icon.svg";

export default function CommunityPostDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { user } = useSelector((state) => state.authRole);
  const { postDetails, isLoading } = useGetPostDetails();
  const { deletePost, isDeletingPost } = useDeletePost();
  const handleDeletePost = () => {
    deletePost(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        navigate("/my-community/posts");
        setShowDeleteModal(false);
        queryClient.refetchQueries({ queryKey: ["community-posts"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  if (isLoading) return <Loading />;
  const isMyPost = user.id === postDetails?.helper?.id;
  return (
    <section className="community-post-details page">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="my-2 d-flex align-items-center  gap-2">
          <div className="flex-grow-1 d-flex align-items-center gap-2">
            <RoundedBackButton onClick={handleBack}></RoundedBackButton>
            <h2 className="post-details-header">{t("postDetails")}</h2>
          </div>

          {isMyPost && (
            <OptionsMenu
              toggleButton={"fas fa-ellipsis-h"}
              options={[
                {
                  label: t("edit"),
                  onClick: () => setShowEditModal(true),
                },
                {
                  label: t("delete"),
                  onClick: () => setShowDeleteModal(true),
                  className: "text-danger",
                },
              ]}
            />
          )}
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
                      src={fileIcon}
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
      {showEditModal && (
        <AddPostModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          isEdit={true}
          postDetails={postDetails}
        />
      )}
      {showDeleteModal && (
        <AlertModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onConfirm={handleDeletePost}
          loading={isDeletingPost}
          confirmButtonText={t("confirm")}
        >
          {t("postDeleteAlert")}
        </AlertModal>
      )}
    </section>
  );
}
