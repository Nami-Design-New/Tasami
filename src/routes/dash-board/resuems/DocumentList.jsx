export default function DocumentList({ documents }) {
  return (
    <div className="documents">
      <h3>الوثائق</h3>
      <ul className="documents-list">
        {documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>
    </div>
  );
}
