import { useSelector } from "react-redux";

export default function ConsultationCommentsCard({
  comment,
  onDelete,
  isDeleting,
}) {
  const { user } = useSelector((state) => state.authRole);
  const isCommentOwner = user?.id === comment.user_id;

  return (
    <div className="consultation-comments-card">
      <h5 className="d-flex justify-content-between align-items-center">
        <span>{comment.user_name}</span>
        {isCommentOwner && (
          <button disabled={isDeleting} onClick={() => onDelete?.(comment.id)}>
            <i className="fa-regular fa-trash text-danger"></i>{" "}
          </button>
        )}
      </h5>
      <p>{comment.comment}</p>
      <span> {comment.created_at} </span>
    </div>
  );
}
