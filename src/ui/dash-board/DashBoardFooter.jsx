import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const DashBoardFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="dashboard_footer">
      <div className="inner_footer">
        <h6>
          {t("dashboard.footer.rights")} <Link to="/">{t("dashboard.footer.tasamy")}</Link>
          <span>&copy; {new Date().getFullYear()}.</span>
        </h6>
        <div className="links">
          <Link to="terms-conditions">{t("dashboard.footer.terms")}</Link>
          <Link to="/privacy-policy">{t("dashboard.footer.privacy")}</Link>
          <Link to="/contact-us">{t("dashboard.footer.contact")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default DashBoardFooter;
