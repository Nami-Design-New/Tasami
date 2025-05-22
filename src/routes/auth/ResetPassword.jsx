import { useState } from "react";
import { Link } from "react-router";
import NewPassword from "../../ui/auth/NewPassword";
import ResetForm from "../../ui/auth/ResetForm";
import OtpForm from "../../ui/auth/reset-password/OtpForm";

export default function ResetPassword() {
  const [resetPasswordStep, setResetPasswordStep] = useState("s1");
  const [code, setCode] = useState("");

  let title, subTitle;

  if (resetPasswordStep === "s1") {
    title = " نسيت كلمه المرور ...!";
    subTitle =
      "يرجى إدخال البريد الإلكتروني أو رقم الهاتف المسجل لدينا لتلقي رمز التحقق.";
  } else if (resetPasswordStep === "s2") {
    title = "ادحل كود التحقق";
    subTitle = "الرجاء إدخال رمز التحقق المرسل إليك";
  } else {
    title = "تحديث كلمة المرور الخاصة بك..!";
    subTitle = "إنشاء كلمة مرور جديدة قوية وسهلة التذكر.";
  }
  return (
    <section className="reset_section">
      <div className="header">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="reset-container">
        <h1>{title}</h1>
        <p>{subTitle}</p>
        {resetPasswordStep === "s1" && (
          <ResetForm setResetPasswordStep={setResetPasswordStep} />
        )}

        {resetPasswordStep === "s2" && (
          <OtpForm
            setResetPasswordStep={setResetPasswordStep}
            setCode={setCode}
          />
        )}

        {resetPasswordStep === "s3" && <NewPassword code={code} />}
      </div>
    </section>
  );
}
