import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const DashBoardFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="dashboard_footer">
      <div className="inner_footer">
        <h6>
          {t("dashboard.footer.rights")}{" "}
          <Link to="/">{t("dashboard.footer.tasamy")}</Link>
          <span>&copy; {new Date().getFullYear()}.</span>
        </h6>
      </div>
    </footer>
  );
};

export default DashBoardFooter;
