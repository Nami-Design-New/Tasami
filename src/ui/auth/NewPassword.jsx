import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import PasswordField from "../forms/PasswordField";

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

const NewPassword = ({ code, setResetPasswordStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  // Get user data from sessionStorage
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(newPasswordSchema),
    mode: "onChange",
  });

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setResetPasswordStep("s1");
  };

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
          label="كلمة المرور"
          name="password"
          id="new_password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordField
          label="تأكيد كلمة المرور"
          name="confirmPassword"
          id="confirm_password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="buttons">
          <BackButton onClick={handleBackButtonClick} />
          <CustomButton fullWidth size="large">
            تأكيد
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
