export default function CommentCard({ comment }) {
  return (
    <div className="comment-card card">
      <div className="comment-name fw-bold">{comment.name}</div>
      <div className="comment-text">{comment.text}</div>
      <div className="comment-date">{comment.date}</div>
    </div>
  );
}
