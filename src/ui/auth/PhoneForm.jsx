import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { phoneSchema } from "../../validations/phoneSchema";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
import SubmitButton from "../forms/SubmitButton";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";

const PhoneForm = ({ setShowLoginForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(phoneSchema),
  });
  const navigate = useNavigate();
  const role = useSelector((state) => state.authRole.role);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "user") {
      navigate("/");
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="text"
        placeholder="مثال: +455 567888 555"
        {...register("phone")}
        error={errors.phone?.message}
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

export default PhoneForm;
