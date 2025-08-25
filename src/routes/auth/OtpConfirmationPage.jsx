import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import useOtpConfirmation from "../../hooks/auth/useOtpConfirmation";
import usePhoneRegister from "../../hooks/auth/useSendOtpCode";
import ResendTimer from "../../ui/auth/ResendTimer";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import OtpContainer from "../../ui/forms/OtpContainer";

const otpSchema = (t) =>
  yup.object().shape({
    code: yup
      .string()
      .required(t("validation.otpRequired"))
      .length(4, t("validation.otpLength")),
  });
export default function OtpConfirmationPage({ setRegisterStep }) {
  const { phone, phoneCode } = useSelector((state) => state.phone);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmOtp, isPending } = useOtpConfirmation();
  const { sendCode, isPending: isPhoneRegisterPending } = usePhoneRegister();
  //  useForm with yupResolver
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema(t)),
    defaultValues: { code: "" },
  });

  const onSubmit = async ({ code }) => {
    confirmOtp(
      {
        phone: phone,
        phoneCode: phoneCode,
        otp: code,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          if (location.pathname === "/register") {
            setRegisterStep(3);
          } else if (location.pathname === "/reset-password") {
            setRegisterStep("s3");
          }
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };
  // const handleResend = async () => {
  //   sendCode(
  //     {
  //       phone,
  //       code: phoneCode,
  //       type: location.pathname === "/register" ? "register" : "reset_password",
  //     },
  //     {
  //       onSuccess: (data) => {
  //         toast.success(data.message);
  //       },
  //       onError: (err) => {
  //         toast.error(err.message);
  //       },
  //     }
  //   );
  // };
  const handleResend = () => {
    return new Promise((resolve, reject) => {
      sendCode(
        {
          phone,
          code: phoneCode,
          type:
            location.pathname === "/register" ? "register" : "reset_password",
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            resolve(true); // success
          },
          onError: (err) => {
            toast.error(err.message);
            reject(err); // fail
          },
        }
      );
    });
  };

  return (
    <div className="reset-container">
      <div className="subTitle">
        <p className="otp-page-des">
          <span>{t("auth.otpPrompt")}</span>
          <span className="phone-number"> {`${phoneCode}${phone}`} </span>
          {location.pathname === "/register" && (
            <Link to={"/register"}> {t("auth.editPhoneNumber")} </Link>
          )}
          {location.pathname === "/reset-password" && (
            <button onClick={() => setRegisterStep("s1")}>
              {t("auth.editPhoneNumber")}
            </button>
          )}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <OtpContainer
              length={4}
              value={field.value}
              setCode={field.onChange}
            />
          )}
        />
        {errors.code && <p className="error-text">{errors.code.message}</p>}
        <ResendTimer
          initialTime={10}
          onResend={handleResend}
          label={t("auth.resendCode")}
          disabledLabel={t("auth.waitBeforeResend")}
          loadingLabel={t("auth.sending")}
          loading={isPhoneRegisterPending}
        />

        <div className="buttons">
          <BackButton onClick={() => navigate(-1)} />
          <CustomButton
            loading={isPending}
            type="submit"
            fullWidth
            size="large"
          >
            {t("auth.send")}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
