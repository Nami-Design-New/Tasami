import { useState } from "react";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const LoginForm = ({ setShowLoginForm }) => {
  const [formType, setFormType] = useState("email");

  return (
    <div className="form">
      <h2 className="head">أهلاً !</h2>

      <div className="tabs">
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          بريد الكتروني
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          رقم هاتف
        </button>
      </div>

      {formType === "email" && (
        <EmailForm setShowLoginForm={setShowLoginForm} />
      )}

      {formType === "phone" && (
        <PhoneForm setShowLoginForm={setShowLoginForm} />
      )}
    </div>
  );
};

export default LoginForm;
