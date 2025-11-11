import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import CustomButton from "../CustomButton";
import { Link, useNavigate } from "react-router";
import useAdminLogin from "../../hooks/auth/dashboard/profile/useAdminLogin";
import { setToken } from "../../utils/token";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAuthed, setRole, setUser } from "../../redux/slices/authAdmin";

export const getLoginSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    password: yup.string().required(t("validation.required")),
  });

export default function EmailLoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const { adminLogin, isPending } = useAdminLogin();
  const onSubmit = async (data) => {
    adminLogin(
      { email: data.email, password: data.password },
      {
        onSuccess: (res) => {
          console.log(res);

          setToken(res.data.token, "admin_token");
          dispatch(setAuthed(true));
          dispatch(setRole(res.data.role.title));
          dispatch(setUser({ user: res.data }));
          toast.success(res.message);
          navigate("/dashboard", { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label={t("auth.email")}
        id="email"
        placeholder={t("auth.emailPlaceholder")}
        {...register("email")}
        error={errors.email?.message}
      />
      <PasswordField
        label={t("auth.password")}
        name="password"
        placeholder={t("auth.passwordPlaceholder")}
        {...register("password")}
        error={errors.password?.message}
      />
      <Link to={"/dashboard/reset-password"}>{t("auth.forgotPassword")}</Link>
      <div className="buttons">
        <CustomButton fullWidth size="large" type="submit" loading={isPending}>
          {t("auth.loginButton")}
        </CustomButton>
      </div>
    </form>
  );
}
