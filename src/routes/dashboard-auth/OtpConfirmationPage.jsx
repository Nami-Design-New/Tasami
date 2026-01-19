import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import * as yup from "yup";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import OtpContainer from "../../ui/forms/OtpContainer";
import ResendTimer from "../../ui/website-auth/ResendTimer";
import useOtpConfirmation from "../../hooks/auth/dashboard/useOtpConfirmation";
import { useSelector } from "react-redux";
import useSendOtpCode from "../../hooks/auth/dashboard/useSendOtpCode";
import { toast } from "sonner";

const otpSchema = (t) =>
  yup.object().shape({
    code: yup
      .string()
      .required(t("validation.otpRequired"))
      .length(4, t("validation.otpLength")),
  });

export default function OtpConfirmationPage({ setRegisterStep }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.phone);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema(t)),
    defaultValues: { code: "" },
  });
  const { confirmOtp, isPending } = useOtpConfirmation();
  const { sendCode, isPending: isSendingCode } = useSendOtpCode();

  const onSubmit = async ({ code }) => {
    confirmOtp(
      {
        email,
        otp: code,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setRegisterStep("s3");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  };

  const handleResend = () => {
    return new Promise((resolve, reject) => {
      sendCode(
        {
          email,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            resolve(true);
          },
          onError: (err) => {
            toast.error(err.message);
            reject(err);
          },
        },
      );
    });
  };
  return (
    <div className="reset-container">
      <div className="subTitle">
        <span>
          {t("auth.otpPromptEmail")}
          {"  "}
          <span className="text-dark fw-bolder">{email}</span>{" "}
        </span>
      </div>
      <div className="col-12 p-2">
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
            initialTime={60}
            onResend={handleResend}
            label={t("auth.resendCode")}
            disabledLabel={t("auth.waitBeforeResend")}
            loadingLabel={t("auth.sending")}
            loading={isSendingCode}
          />{" "}
          <div className="buttons">
            <BackButton onClick={() => navigate(-1)} />
            <CustomButton
              type="submit"
              fullWidth
              size="large"
              loading={isPending}
            >
              {t("auth.send")}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
