import { useSelector } from "react-redux";

export default function BackButton({ onClick }) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <button className="back" type="button" onClick={onClick}>
      {lang === "ar" ? (
        <i className="fa-light fa-arrow-right" />
      ) : (
        <i className="fa-light fa-arrow-left" />
      )}
    </button>
  );
}
