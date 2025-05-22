import { useState } from "react";
import { useSelector } from "react-redux";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const LoginForm = ({ setShowLoginForm, SetShowOtpForm }) => {
  const [formType, setFormType] = useState("email");
  const role = useSelector((state) => state.authRole.role);
  const lang = useSelector((state) => state.language.lang);

  // Get the appropriate role text based on current language
  const getRoleText = () => {
    if (typeof role === "string") {
      return role; // For backward compatibility
    } else if (role && typeof role === "object") {
      return lang === "en" ? role.en : role.ar;
    }
    return "";
  };

  return (
    <div className="form">
      <h2 className="head">
        ! مرحبا بعودتك <img src="/sys-icons/waving-hand.svg" alt="hand-wave" />
      </h2>
      <p className="sub-head">
        الرجاء إدخال عنوان البريد الإلكتروني أو رقم الهاتف المسجل لدينا كـ{" "}
        <span>{getRoleText()}</span>.
      </p>

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
        <EmailForm
          setShowLoginForm={setShowLoginForm}
          SetShowOtpForm={SetShowOtpForm}
        />
      )}

      {formType === "phone" && (
        <PhoneForm
          setShowLoginForm={setShowLoginForm}
          SetShowOtpForm={SetShowOtpForm}
        />
      )}
    </div>
  );
};

export default LoginForm;
