export default function DescriptionSection({ title, text }) {
  return (
    <div className="description">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
