import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import InputField from "../forms/InputField";
import { Link } from "react-router";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import useSendOtpCode from "../../hooks/auth/dashboard/useSendOtpCode";
import { toast } from "sonner";
import { setEmail } from "../../redux/slices/phoneSlice";

const resetPasswordSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),
  });

export default function ResetForm({ setResetPasswordStep }) {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema(t)),
    defaultValues: { email: "" },
  });
  const { sendCode, isPending } = useSendOtpCode();
  // Submit
  const onSubmit = ({ email }) => {
    sendCode(
      { email },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          dispatch(setEmail({ email }));
          setResetPasswordStep("s2");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <div className="reset-form">
      <form className="form_ui " onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 p-2">
            <InputField
              label={t("auth.email")}
              id="email"
              placeholder={t("auth.emailPlaceholder")}
              {...register("email")}
              error={errors.email?.message}
            />
          </div>{" "}
          <div className="col-12 p-2">
            <div className="buttons">
              <Link to="/dashboard/login" className="back">
                {lang === "ar" ? (
                  <i className="fa-light fa-arrow-right" />
                ) : (
                  <i className="fa-light fa-arrow-left" />
                )}
              </Link>
              <CustomButton fullWidth size="large" loading={isPending}>
                {t("auth.confirm")}
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
