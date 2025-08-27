import { useState } from "react";
import OtpConfirmationPage from "../../ui/website-auth/OtpConfirmationPage";
import RegisterPage from "../../ui/website-auth/RegisterPage";
import RegisterInfo from "../../ui/website-auth/RegisterInfo";

export default function Register() {
  const [registerStep, setRegisterStep] = useState(1);

  return (
    <>
      {registerStep === 1 && <RegisterPage setRegisterStep={setRegisterStep} />}
      {registerStep === 2 && (
        <OtpConfirmationPage setRegisterStep={setRegisterStep} />
      )}
      {registerStep === 3 && <RegisterInfo setRegisterStep={setRegisterStep} />}
    </>
  );
}
