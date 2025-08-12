import LoginForm from "../../ui/auth/LoginForm";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <section>
      <LoginForm />
      <div className="account-link">
        {location.pathname === "/login" && (
          <h6>
            <span>{t("auth.noAccount")}</span>
            <Link to={"/register"}>{t("auth.createAccount")}</Link>
          </h6>
        )}
      </div>
      <div className="seperator">{t("auth.or")}</div>
      <div className="social-login-buttons">
        <button>
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
