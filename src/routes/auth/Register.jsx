import { useState } from "react";
import OtpConfirmationPage from "./OtpConfirmationPage";
import RegisterPage from "./RegisterPage";
import RegisterInfo from "./RegisterInfo";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function Register() {
  const [registerStep, setRegisterStep] = useState(1);
  const { isAuthed } = useSelector((state) => state.authRole);

  if (isAuthed) {
    return <Navigate to="/" replace />;
  }
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
