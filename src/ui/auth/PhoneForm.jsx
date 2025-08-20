import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import useLogin from "../../hooks/auth/useLogin";
import { setUser } from "../../redux/slices/authRole";
import { setToken } from "../../utils/token";
import { useLoginPhone } from "../../validations/auth/login-phone-schema";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";

const PhoneForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginPhone();
  const { login, isPending } = useLogin();

  const onSubmit = async (data) => {
    console.log(data);
    login(
      { email_or_phone: data.phone, password: data.password },
      {
        onSuccess: (res) => {
          setToken(res.data.token);
          dispatch(setUser(res.data));
          toast.success(res.message);
          navigate("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
    navigate("/");
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="text"
        placeholder={t("auth.phonePlaceholder")}
        {...register("phone")}
        error={errors.phone?.message}
      />
      <PasswordField
        name="password"
        placeholder={t("auth.passwordPlaceholder")}
        {...register("password")}
        error={errors.password?.message}
      />
      <Link to={"/reset-password"}>{t("auth.forgotPassword")}</Link>

      <div className="buttons">
        <CustomButton fullWidth size="large" loading={isPending} type="submit">
          {t("auth.loginButton")}
        </CustomButton>
      </div>
    </form>
  );
};

export default PhoneForm;
