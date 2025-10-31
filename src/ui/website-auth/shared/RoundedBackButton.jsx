import { useSelector } from "react-redux";

export default function RoundedBackButton({ children, ...props }) {
  const { lang } = useSelector((state) => state.language);
  return (
    <button className="rouded-back-button" {...props}>
      {lang === "ar" ? (
        <i className="fa-solid fa-angle-right"></i>
      ) : (
        <i className="fa-solid fa-angle-left"></i>
      )}
      {children}
    </button>
  );
}
