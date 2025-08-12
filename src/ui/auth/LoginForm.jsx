import { useState } from "react";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";
import { useTranslation } from "react-i18next";

const LoginForm = ({ setShowLoginForm }) => {
  const [formType, setFormType] = useState("email");
  const { t } = useTranslation();

  return (
    <div className="form">
      <h2 className="head">{t("auth.greeting")}</h2>

      <div className="tabs">
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          {t("auth.emailTab")}
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          {t("auth.phoneTab")}
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
