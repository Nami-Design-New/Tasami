import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import LoginForm from "../../ui/website-auth/LoginForm";
import useGoogleAuth from "../../hooks/auth/useGoogleAuth";

const LoginPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { handleGoogleLogin, isPending } = useGoogleAuth();

  return (
    <section className="login-wrapper">
      <LoginForm />
      <div className="account-link">
        {location.pathname === "/login" && (
          <h6>
            <span>{t("auth.noAccount")}</span>
            <Link to={"/register"}>{t("auth.createAccount")}</Link>
          </h6>
        )}

        <h6 className="mt-2">
          <span>{t("auth.explore")}</span>
          <Link to={"/"}>{t("auth.tasami")}</Link>
          <span>{t("auth.withoutLogin")}</span>
        </h6>
      </div>
      <div className="seperator">{t("auth.or")}</div>
      <div className="social-login-buttons">
        <button onClick={handleGoogleLogin} disabled={isPending}>
          <img src="/icons/google-icon.svg" alt="Google" />
          <span>{t("auth.continueWithGoogle")}</span>
        </button>
        <button>
          <img src="/icons/apple-icon.svg" alt="Apple" />
          <span>{t("auth.continueWithApple")}</span>
        </button>
      </div>
    </section>
  );
};

export default LoginPage;
