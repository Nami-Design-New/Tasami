import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RoundedBackButton from "../website-auth/shared/RoundedBackButton";

export default function SectionHeader({ title }) {
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
  return (
    <div className="section-header">
      <div className="page-header">
        <RoundedBackButton onClick={() => navigate(-1)}>
          {lang === "ar" ? (
            <i className="fa-solid fa-angle-right"></i>
          ) : (
            <i className="fa-solid fa-angle-left"></i>
          )}
        </RoundedBackButton>
        <h1>{title}</h1>
      </div>
    </div>
  );
}
