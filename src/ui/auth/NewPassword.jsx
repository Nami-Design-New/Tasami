import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useResetPassword from "../../hooks/auth/useResetPassword";
import { persistor } from "../../redux/store";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import PasswordField from "../forms/PasswordField";

// Password validation schema
const newPasswordSchema = (t) =>
  yup.object().shape({
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordMin")),
    confirmPassword: yup
      .string()
      .required(t("validation.required"))
      .oneOf([yup.ref("password")], t("validation.passwordMatch")),
  });

const NewPassword = ({ setResetPasswordStep }) => {
  const { phone, phoneCode } = useSelector((state) => state.phone);
  const { t } = useTranslation();
  const [resetSuccess, setResetSuccess] = useState(false);
  const { resetPassword, isPending } = useResetPassword();
  const navigate = useNavigate();

  // Get user data from sessionStorage
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema(t)),
    mode: "onChange",
  });

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setResetPasswordStep("s1");
  };

  const onSubmit = async (data) => {
    const payload = {
      password: data.password,
      password_confirmation: data.confirmPassword,
      phone,
      phone_code: phoneCode,
    };

    resetPassword(payload, {
      onSuccess: (data) => {
        setResetSuccess(true);
        toast.success(data.message);
        persistor.purge();
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="reset-form">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          label={t("auth.password")}
          name="password"
          id="new_password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordField
          label={t("auth.newPassword")}
          name="confirmPassword"
          id="confirm_password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="buttons">
          <BackButton onClick={handleBackButtonClick} />
          <CustomButton loading={isPending} fullWidth size="large">
            {t("auth.confirm")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
