import { useState } from "react";
import { Link } from "react-router";
import NewPassword from "../../ui/auth/NewPassword";
import ResetForm from "../../ui/auth/ResetForm";
import OtpConfirmationPage from "./OtpConfirmationPage";
import { useTranslation } from "react-i18next";

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
      <div className="header">
        <Link to="/" className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
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
