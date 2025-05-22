import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import PasswordField from "../forms/PasswordField";
import SubmitButton from "../forms/SubmitButton";

// Password validation schema
const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const NewPassword = ({ code }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  // Get user data from sessionStorage
  const email = sessionStorage.getItem("resetEmail");
  const phone = sessionStorage.getItem("resetPhone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    navigate("/login");
  };

  if (resetSuccess) {
    return (
      <div className="success-message">
        <h3>تم إعادة تعيين كلمة المرور بنجاح!</h3>
        <p>لقد تم تحديث كلمة المرور الخاصة بك بنجاح.</p>
        <a href="/login" className="btn btn-primary mt-3">
          العودة إلى تسجيل الدخول
        </a>
      </div>
    );
  }

  console.log(errors);

  return (
    <div className="reset-form">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          name="password"
          id="new_password"
          type="password"
          placeholder="كلمة المرور الجديدة"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordField
          name="confirmPassword"
          id="confirm_password"
          type="password"
          placeholder="تأكيد كلمة المرور"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="buttons">
          <Link to="/login" className="back">
            <i className="fa-light fa-arrow-left" />
          </Link>
          <SubmitButton loading={isSubmitting} text="إعادة تعيين كلمة المرور" />
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
