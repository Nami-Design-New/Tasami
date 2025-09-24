import { useSelector } from "react-redux";
import useDeleteComment from "../../../../hooks/website/communities/useDeleteComment";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ConsultationCommentsCard({ comment }) {
  const queryClient = useQueryClient();
  const { deleteComment, isPending } = useDeleteComment();
  const { user } = useSelector((state) => state.authRole);
  const isCommentOwner = user?.id === comment.user_id;
  const handleDeleteComment = () => {
    deleteComment(comment.id, {
      onSuccess: (res) => {
        toast.success(res.message || "Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
    });
  };
  return (
    <div className="consultation-comments-card">
      <h5 className="d-flex justify-content-between align-items-center">
        <span>{comment.user_name}</span>
        {isCommentOwner && (
          <button disabled={isPending} onClick={handleDeleteComment}>
            <i className="fa-regular fa-trash text-danger"></i>{" "}
          </button>
        )}
      </h5>
      <p>{comment.comment}</p>
      <span> {comment.created_at} </span>
    </div>
  );
}
