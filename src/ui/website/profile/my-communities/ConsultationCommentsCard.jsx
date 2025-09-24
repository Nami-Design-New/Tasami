export default function ConsultationCommentsCard({ comment }) {
  return (
    <div className="consultation-comments-card">
      <h5> {comment.user_name} </h5>
      <p>{comment.comment}</p>
      <span> {comment.created_at} </span>
    </div>
  );
}
