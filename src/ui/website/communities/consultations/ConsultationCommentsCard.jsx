import { useSelector } from "react-redux";

export default function ConsultationCommentsCard({
  comment,
  onDelete,
  isDeleting,
}) {
  const { user } = useSelector((state) => state.authRole);
  const isCommentOwner = user?.id === comment.user_id;
  const isMyCommunity = user?.id === comment.helper_id;

  return (
    <div className="consultation-comments-card">
      {" "}
      <h5 className="d-flex gap-2 justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          {comment?.user_image && (
            <img className="comment-user-image" src={comment?.user_image} />
          )}
          <span>{comment.user_name}</span>
        </div>

        {(isCommentOwner || isMyCommunity) && (
          <button
            // className="flex-grow-1"
            disabled={isDeleting}
            onClick={() => onDelete?.(comment.id)}
          >
            <i className="fa-regular fa-trash text-danger"></i>{" "}
          </button>
        )}
      </h5>
      <p>{comment.comment}</p>
      <span> {comment.created_at} </span>
    </div>
  );
}
