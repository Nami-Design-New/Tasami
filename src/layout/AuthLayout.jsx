import { useTranslation } from "react-i18next";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router";
import useAuth from "../hooks/auth/useAuth";

const getHeadingText = (route, step, t) => {
  if (route === "/login") {
    return t("auth.login");
  }
  if (route === "/register") {
    return t("auth.register");
  }
  if (route === "/confirm-otp") {
    return t("auth.confirmOtp");
  }
  if (route.startsWith("/register-info")) {
    if (step === "1") return t("auth.personalInfo");
    if (step === "2") return t("auth.accountInfo");
    return t("auth.personalInfo");
  }
  if (route === "/areas-of-interest") {
    return t("auth.areasOfInterest");
  }
  if (route === "/customize-platform-services") {
    return t("auth.customizePlatformServices");
  }
  return t("auth.login");
};

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const route = location.pathname;
  const [searchParmas, setSearchParams] = useSearchParams();
  const step = searchParmas.get("step");

  const { isAuthed } = useAuth();

  if (isAuthed) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="auth_section">
      <div className="form_container">
        <div className="form-header">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="logo" />
            </Link>
            <span />
            <h1>{getHeadingText(route, step, t)}</h1>
          </div>

          {location.pathname.includes("dashboard") && <></>}
        </div>
        <Outlet />
      </div>

      <div className="img  d-none d-md-block">
        <img src="/images/regiester-image.webp" alt={t("auth.authImageAlt")} />
      </div>
    </section>
  );
};

export default AuthLayout;
