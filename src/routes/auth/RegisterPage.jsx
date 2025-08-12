import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [phone, setPhone] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirm-otp");
  };

  return (
    <div className="form_wrapper  register">
      <p className="text-header">{t("auth.registerHeader")}</p>

      <form className="form_ui register-form " onSubmit={handleSubmit}>
        <label>{t("auth.phoneLabel")}</label>
        <PhoneInput
          country={"sa"}
          value={phone}
          onChange={setPhone}
          enableSearch={true}
          preferredCountries={["us", "gb", "fr", "de"]}
          placeholder={t("auth.phoneInputPlaceholder")}
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
        />
        <p className="terms-text">
          <span>{t("auth.termsPrefix")}</span>
          <span>
            <Link to={"/privacy-policy"}>{t("auth.privacyPolicy")}</Link> {t("auth.and")} <Link to={"/terms-conditions"}>{t("auth.termsConditions")}</Link>
          </span>
        </p>
        <div className="buttons">
          <BackButton onClick={() => navigate(-1)} />
          <CustomButton fullWidth size="large">
            {t("auth.sendButton")}
          </CustomButton>
        </div>
        <div className="account-link mt-4">
          {location.pathname === "/register" && (
            <h6>
              <span>{t("auth.alreadyHaveAccount")}</span>
              <Link to={"/login"}>{t("auth.login")}</Link>
            </h6>
          )}
        </div>
      </form>
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
    </div>
  );
};

export default RegisterPage;
