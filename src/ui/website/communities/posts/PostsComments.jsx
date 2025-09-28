import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetPostComments from "../../../../hooks/website/communities/posts/useGetPostComments";
import CustomButton from "../../../CustomButton";
import EmptySection from "../../../EmptySection";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import AddCommentModal from "../../../modals/AddCommentModal";
import ConsultationCommentsCard from "../consultations/ConsultationCommentsCard";
import useAddPostComments from "../../../../hooks/website/communities/posts/useAddPostComments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDeletePostComment from "../../../../hooks/website/communities/posts/useDeletePostComment";

export default function PostsComments() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    postComments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostComments();

  const allPostComments =
    postComments?.pages?.flatMap((page) => page?.data) ?? [];

  const { addPostComment, isPending } = useAddPostComments();
  const { deletePostComment, isPending: isDeleting } = useDeletePostComment();
  const handleAddComment = (commentText) => {
    return addPostComment(commentText, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["post-comments"] });
        setShowModal(false);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      },
    });
  };

  const handleDeleteComment = (commentId) => {
    deletePostComment(commentId, {
      onSuccess: (res) => {
        toast.success(res.message || "Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      },
    });
  };
  return (
    <div className="comments">
      <div className="comments-header">
        <h2>{t("community.comments")}</h2>
        <CustomButton size="large" onClick={() => setShowModal(true)}>
          {t("community.addComment")}
        </CustomButton>
      </div>

      <div className="row">
        {!isLoading && allPostComments.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allPostComments.map((comment) => (
            <div className="col-12 col-lg-6 p-2" key={comment.id}>
              <ConsultationCommentsCard
                comment={comment}
                onDelete={handleDeleteComment}
                isDeleting={isDeleting}
              />
            </div>
          ))}
        </InfiniteScroll>

        {(isLoading || isFetchingNextPage) && (
          <div className="row">
            {[1, 2, 3].map((i) => (
              <div className="col-12 col-lg-6 p-2" key={i}>
                <AudienceCardLoader />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddCommentModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={handleAddComment}
        isLoading={isPending}
      />
    </div>
  );
}
