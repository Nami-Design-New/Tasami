import { useNavigate } from "react-router";

export default function SectionHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="section-header">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
