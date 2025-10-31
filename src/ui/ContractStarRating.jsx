import { useState } from "react";

export default function ContractStarRating({
  value = 0,
  onChange,
  size = 18,
  readOnly = false,
}) {
  const [hover, setHover] = useState(null);

  return (
    <div className="d-flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className="btn p-0 border-0 bg-transparent"
          onClick={() => !readOnly && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(null)}
        >
          <i
            className={`fa-star fa ${
              star <= (hover || value) ? "fas text-warning" : "far text-muted"
            }`}
            style={{
              fontSize: `${size}px`,
              transition: "transform 0.2s ease",
            }}
          ></i>
        </button>
      ))}
    </div>
  );
}
