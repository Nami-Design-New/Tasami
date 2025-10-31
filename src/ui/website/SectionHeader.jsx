import { useNavigate } from "react-router";
import RoundedBackButton from "../website-auth/shared/RoundedBackButton";

export default function SectionHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="section-header">
      <div className="page-header">
        <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
