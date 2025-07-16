import { Link } from "react-router";

export default function SectionHeader({ title }) {
  return (
    <div className="section-header">
      <div className="page-header">
        {
          <Link to="/" className="back-btn">
            <i className="fa-solid fa-angle-right"></i>
          </Link>
        }
        <h1>{title}</h1>
      </div>
    </div>
  );
}
