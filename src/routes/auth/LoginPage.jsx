import { useState } from "react";
import UserTypeSelection from "../../ui/auth/UserTypeSelection";
import LoginForm from "../../ui/auth/LoginForm";
import OtpForm from "../../ui/auth/OtpForm";

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showOtpForm, SetShowOtpForm] = useState(false);
  return (
    <section>
      {!showLoginForm && !showOtpForm && (
        <UserTypeSelection setShowLoginForm={setShowLoginForm} />
      )}

      {showLoginForm && !showOtpForm && (
        <LoginForm
          SetShowOtpForm={SetShowOtpForm}
          setShowLoginForm={setShowLoginForm}
        />
      )}

      {showOtpForm && (
        <OtpForm
          SetShowOtpForm={SetShowOtpForm}
          setShowLoginForm={setShowLoginForm}
        />
      )}
    </section>
  );
};

export default LoginPage;
