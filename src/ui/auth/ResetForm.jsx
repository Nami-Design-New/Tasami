import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import SubmitButton from "../forms/SubmitButton";
import InputField from "../forms/InputField";

const ResetForm = ({ setResetPasswordStep }) => {
  const [formType, setFormType] = useState("email");

  // Create separate form instances for each tab to maintain independent state
  const emailForm = useForm({
    resolver: yupResolver(resetPasswordSchema.email),
    mode: "onChange",
  });
  console.log(emailForm);

  const phoneForm = useForm({
    resolver: yupResolver(resetPasswordSchema.phone),
    mode: "onChange",
  });

  // Get the active form based on current tab
  const activeForm = formType === "email" ? emailForm : phoneForm;

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Pass the form data back to parent component
    if (formType === "email" && data.email) {
      sessionStorage.setItem("resetEmail", data.email);
    } else if (formType === "phone" && data.phone) {
      sessionStorage.setItem("resetPhone", data.phone);
    }
    setResetPasswordStep("s2");
  };

  // Handle tab switching
  const handleTabChange = (type) => {
    setFormType(type);
  };

  return (
    <div className="reset-form">
      <div className="tabs">
        <button
          type="button"
          className={formType === "email" ? "active" : ""}
          onClick={() => handleTabChange("email")}
        >
          البريد الالكتروني
        </button>
        <button
          type="button"
          className={formType === "phone" ? "active" : ""}
          onClick={() => handleTabChange("phone")}
        >
          رقم الهاتف
        </button>
      </div>

      {formType === "email" && (
        <form className="form_ui" onSubmit={emailForm.handleSubmit(onSubmit)}>
          <InputField
            name="email"
            id="email"
            type="email"
            placeholder="EX: mail@mail.com"
            error={emailForm.formState.errors.email?.message}
            {...emailForm.register("email")}
          />
          <div className="buttons">
            <Link to="/login" className="back">
              <i className="fa-light fa-arrow-left" />
            </Link>
            <SubmitButton
              loading={emailForm.formState.isSubmitting}
              text="ارسل الكود"
            />
          </div>
        </form>
      )}

      {formType === "phone" && (
        <form className="form_ui" onSubmit={phoneForm.handleSubmit(onSubmit)}>
          <InputField
            name="phone"
            id="phone"
            type="text"
            placeholder="EX: +455 567888 555"
            error={phoneForm.formState.errors.phone?.message}
            {...phoneForm.register("phone")}
          />
          <div className="buttons">
            <Link to="/login" className="back">
              <i className="fa-light fa-arrow-left" />
            </Link>
            <SubmitButton
              loading={phoneForm.formState.isSubmitting}
              text="ارسل الكود"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetForm;
