import { useState } from "react";
import OtpConfirmationPage from "./OtpConfirmationPage";
import RegisterInfo from "./RegisterInfo";
import RegisterPage from "./RegisterPage";

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
