import { useTranslation } from "react-i18next";

export default function EmptySection({ message, height = "120px", children }) {
  const { t } = useTranslation();
  return (
    <div className="empty-section" style={{ minHeight: height }}>
      <div className="empty-section__content">
        <p className="empty-section__message">
          {message ? message : t("noDataAvilable")}
        </p>
        {children && <div className="empty-section__actions">{children}</div>}
      </div>
    </div>
  );
}
