import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginSchema } from "../../validations/loginschema";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";

const EmailForm = ({ setShowLoginForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const role = useSelector((state) => state.authRole.role);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };
  return (
    <form
      className="form_ui"
      onSubmit={handleSubmit((data) => {
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "user") {
          navigate("/");
        }
      })}
    >
      <InputField
        id="email"
        placeholder="مثال: mail@mail.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordField
        name="password"
        placeholder="كلمه المرور"
        {...register("password")}
        error={errors.password?.message}
      />
      <Link to={"/reset-password"}> نسيت كلمه المرور ؟ </Link>

      <div className="buttons">
        <CustomButton fullWidth size="large" type="submit">
          دخول
        </CustomButton>
      </div>
    </form>
  );
};

export default EmailForm;
