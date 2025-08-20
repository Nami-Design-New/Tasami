import { useState } from "react";
import OtpConfirmationPage from "./OtpConfirmationPage";
import RegisterPage from "./RegisterPage";
import RegisterInfo from "./RegisterInfo";

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
