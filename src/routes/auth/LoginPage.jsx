import { useState } from "react";
import LoginForm from "../../ui/auth/LoginForm";
import UserTypeSelection from "../../ui/auth/UserTypeSelection";

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  return (
    <section>
      {!showLoginForm && (
        <UserTypeSelection setShowLoginForm={setShowLoginForm} />
      )}

      {showLoginForm && <LoginForm setShowLoginForm={setShowLoginForm} />}
    </section>
  );
};

export default LoginPage;
