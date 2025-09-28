import { useTranslation } from "react-i18next";
import { useState } from "react";
import useGetConsultaionComments from "../../../../hooks/website/communities/useGetConsultaionComments";
import CustomButton from "../../../CustomButton";
import EmptySection from "../../../EmptySection";
import InfiniteScroll from "../../../loading/InfiniteScroll";
import ConsultationCommentsCard from "./ConsultationCommentsCard";
import AudienceCardLoader from "../../../loading/AudienceCardLoader";
import AddCommentModal from "../../../modals/AddCommentModal";
import useAddComment from "../../../../hooks/website/communities/useAddComment";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useDeleteComment from "../../../../hooks/website/communities/useDeleteComment";

export default function ConsultaionComments() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { addComment, isPending } = useAddComment();
  const queryClient = useQueryClient();
  const { deleteComment, isPending: isDeleting } = useDeleteComment();

  const {
    consultaionComments,
    commentsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetConsultaionComments();

  const allConsultaionComments =
    consultaionComments?.pages?.flatMap((page) => page?.data) ?? [];
  const handleAddComment = (commentText) => {
    return addComment(commentText, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["comments"] });
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
    deleteComment(commentId, {
      onSuccess: (res) => {
        toast.success(res.message || "Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
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
        <CustomButton size="meduim" onClick={() => setShowModal(true)}>
          {t("community.addComment")}
        </CustomButton>
      </div>

      <div className="row">
        {!commentsLoading && allConsultaionComments.length === 0 && (
          <EmptySection height="500px" message={t("community.noComments")} />
        )}

        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {allConsultaionComments.map((comment) => (
            <div className="col-12 col-lg-6 p-2" key={comment.id}>
              <ConsultationCommentsCard
                comment={comment}
                onDelete={handleDeleteComment}
                isDeleting={isDeleting}
              />
            </div>
          ))}
        </InfiniteScroll>

        {(commentsLoading || isFetchingNextPage) && (
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
