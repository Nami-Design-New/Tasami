import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import NewPassword from "../../ui/website-auth/NewPassword";
import ResetForm from "../../ui/website-auth/ResetForm";
import OtpConfirmationPage from "../../ui/website-auth/OtpConfirmationPage";
import LangDropdown from "../../ui/website/LangDropdown";
import logo from "../../assets/images/logo.svg";

export default function ResetPassword() {
  const [resetPasswordStep, setResetPasswordStep] = useState("s1");
  const { t } = useTranslation();
  let title, subTitle;

  if (resetPasswordStep === "s1") {
    title = t("auth.forgetPass");
    subTitle = t("auth.forgetPassHeader");
  } else if (resetPasswordStep === "s2") {
    title = t("auth.confirmOtp");
  } else {
    title = t("auth.newPassword");
    subTitle = t("auth.newPassPrompt");
  }
  return (
    <section className="reset_section">
      <div className="header d-flex align-items-center justify-content-between gap-3">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <LangDropdown isAuthPage={true} />
      </div>

      <div className="reset-container">
        <h1 className="title">{title}</h1>
        <p className="subTitle">{subTitle}</p>
        {resetPasswordStep === "s1" && (
          <ResetForm setResetPasswordStep={setResetPasswordStep} />
        )}

        {resetPasswordStep === "s2" && (
          <OtpConfirmationPage setRegisterStep={setResetPasswordStep} />
        )}

        {resetPasswordStep === "s3" && (
          <NewPassword setResetPasswordStep={setResetPasswordStep} />
        )}
      </div>
    </section>
  );
}
