import { useTranslation } from "react-i18next";
import LangDropdown from "../ui/website/LangDropdown";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router";
import useAdminAuth from "../hooks/auth/dashboard/useAdminAuth";

const getHeadingText = (route, step, t) => {
  if (route === "/login") {
    return t("auth.login");
  }
  return t("auth.login");
};

const DashboardAuthlayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const route = location.pathname;
  const [searchParmas] = useSearchParams();
  const step = searchParmas.get("step");

  const { isAuthed } = useAdminAuth();

  if (isAuthed) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <section className="auth_section">
      <div className="form_container">
        <div className="form-header d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
            <span />
            <h1>{getHeadingText(route, step, t)}</h1>
          </div>{" "}
          <LangDropdown isAuthPage={true} />
        </div>
        <Outlet />
      </div>

      <div className="img  d-none d-md-block">
        <img src="/images/regiester-image.png" alt={t("auth.authImageAlt")} />
      </div>
    </section>
  );
};

export default DashboardAuthlayout;
