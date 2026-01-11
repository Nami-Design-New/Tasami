import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ResetForm from "../../ui/dashboard-auth/ResetForm";
import OtpConfirmationPage from "./OtpConfirmationPage";
import NewPassword from "./NewPassword";
import LangDropdown from "../../ui/website/LangDropdown";

export default function DashBoardResetPassword() {
  const [resetPasswordStep, setResetPasswordStep] = useState("s1");

  const { t } = useTranslation();
  let title, subTitle;

  if (resetPasswordStep === "s1") {
    title = t("auth.forgetPass");
    subTitle = t("auth.forgetPassHeaderEmail");
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
          <img src="images/logo.svg" alt="logo" />
        </Link>{" "}
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
