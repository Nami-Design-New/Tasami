import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useOtpConfirmation from "../../../hooks/auth/useOtpConfirmation";
import usePhoneRegister from "../../../hooks/auth/useSendOtpCode";
import CustomButton from "../../CustomButton";
import OtpContainer from "../../forms/OtpContainer";
import ResendTimer from "../../website-auth/ResendTimer";
import GlobalModal from "../../GlobalModal";

const otpSchema = (t) =>
  yup.object().shape({
    code: yup
      .string()
      .required(t("validation.otpRequired"))
      .length(4, t("validation.otpLength")),
  });
export default function OtpModal({ show, setShowModal, phone, phoneCode }) {
  const { t } = useTranslation();
  const { confirmOtp, isPending } = useOtpConfirmation();
  const { sendCode, isPending: isPhoneRegisterPending } = usePhoneRegister();
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
          setShowModal(false);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  const handleResend = () => {
    return new Promise((resolve, reject) => {
      sendCode(
        {
          phone,
          code: phoneCode,
          type: "update_profile",
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
    <GlobalModal
      show={show}
      onHide={() => setShowModal(false)}
      size="md"
      centered
    >
      <GlobalModal.Header closeButton>
        <h6>{t("otpTitle")}</h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
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
            loading={isPhoneRegisterPending}
          />

          <div className="buttons">
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
      </GlobalModal.Body>
    </GlobalModal>
  );
}
