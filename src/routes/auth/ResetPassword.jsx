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
    title = "ادخل كود التحقق";
    subTitle = "الرجاء إدخال رمز التحقق المرسل إليك";
  } else {
    title = " كلمة المرور الجديدة";
    subTitle = "أدخل كلمة المرور الجديدة المكونة من 8 خانات ...";
  }
  return (
    <section className="auth_section ">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 p-2 d-flex flex-column">
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

                {resetPasswordStep === "s3" && (
                  <NewPassword
                    code={code}
                    setResetPasswordStep={setResetPasswordStep}
                  />
                )}
              </div>
          </div>
          <div className="col-lg-6 col-12 p-2 d-lg-block d-none">
            <div className="img">
              <img src="/images/regiester-image.webp" alt="auth" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
