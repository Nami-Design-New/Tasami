import { Placeholder } from "react-bootstrap";

export default function ExpDocItemLoader() {
  return (
    <ul className="cv__list">
      {[1, 2].map((item) => (
        <li key={item} className="cv__list-item">
          <Placeholder className="cv__item-text" xs={6} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>

          <Placeholder animation="glow">
            <Placeholder.Button
              variant="secondary"
              className="cv__item-action"
            />
          </Placeholder>
        </li>
      ))}
    </ul>
  );
}
