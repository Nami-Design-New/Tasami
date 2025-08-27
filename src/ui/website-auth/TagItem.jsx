export default function TagItem({ label, name, checked, onChange }) {
  return (
    <label className={`tag ${checked ? "selected" : ""}`}>
      <input
        type="checkbox"
        name={`${name}[]`}
        value={label}
        checked={checked}
        onChange={onChange}
      />
      <span className="icon">
        {checked ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
      </span>

      {label}
    </label>
  );
}
