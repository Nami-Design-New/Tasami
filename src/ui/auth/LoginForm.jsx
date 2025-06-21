import { useState } from "react";
import { useSelector } from "react-redux";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const LoginForm = ({ setShowLoginForm }) => {
  const [formType, setFormType] = useState("email");
  const role = useSelector((state) => state.authRole.role);

  return (
    <div className="form">
      <h2 className="head">
        ! مرحبا بعودتك <img src="/sys-icons/waving-hand.svg" alt="hand-wave" />
      </h2>
      <p className="sub-head">
        الرجاء إدخال عنوان البريد الإلكتروني أو رقم الهاتف المسجل لدينا{" "}
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
        <EmailForm setShowLoginForm={setShowLoginForm} />
      )}

      {formType === "phone" && (
        <PhoneForm setShowLoginForm={setShowLoginForm} />
      )}
    </div>
  );
};

export default LoginForm;
