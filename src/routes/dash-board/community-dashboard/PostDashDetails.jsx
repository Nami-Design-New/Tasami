import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import useGetPostDashDetails from "../../../hooks/dashboard/subscription/useGetPostDashDetails";
import Loading from "../../../ui/loading/Loading";
import { handleCopy } from "../../../utils/helper";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import PostMedia from "../../../ui/website/communities/posts/MyProductSlider";
import PostsActions from "../../../ui/website/communities/posts/PostsActions";
import PostDashComments from "./PostDashComments";
import OptionsMenu from "../../../ui/website/OptionsMenu";
import { useState } from "react";
import AlertModal from "../../../ui/website/platform/my-community/AlertModal";
import useDeleteDhPost from "../../../hooks/dashboard/subscription/community/useDeleteDhPost";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import fileIcon from "../../../assets/icons/file-icon.svg";
export default function PostDashDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { postDashDetails, isLoading } = useGetPostDashDetails(id);
  const { deleteDhPost, isDeletingDhPost } = useDeleteDhPost();
  const handleDeletePost = () => {
    deleteDhPost(id, {
      onSuccess: (res) => {
        toast.success(res.message);
        navigate(-1);
        setShowDeleteModal(false);
        queryClient.refetchQueries({ queryKey: ["dh-community-posts"] });
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
                label: t("delete"),
                onClick: () => setShowDeleteModal(true),
                className: "text-danger",
              },
            ]}
          />
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
            <PostsActions post={postDashDetails} />
          </div>
          <div className="col-12 p-2">
            <PostDashComments />
          </div>
        </div>
      </div>{" "}
      {showDeleteModal && (
        <AlertModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onConfirm={handleDeletePost}
          loading={isDeletingDhPost}
          confirmButtonText={t("confirm")}
        >
          {t("postDeleteAlert")}
        </AlertModal>
      )}
    </section>
  );
}
