import { useEffect, useState } from "react";
import OtpContainer from "../../forms/OtpContainer";
import SubmitButton from "../../forms/SubmitButton";
import BackButton from "../../forms/BackButton";
import CustomButton from "../../CustomButton";

export default function OtpForm({ setResetPasswordStep, setCode }) {
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setResetPasswordStep("s1");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setResetPasswordStep("s3");
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <form onSubmit={handleSubmit} className="reset-form">
      <OtpContainer setCode={setCode} length={4} />
      <div className="resend">
        <h6
          style={{
            cursor: "pointer",
            pointerEvents: resendDisabled ? "none" : "auto",
          }}
        >
          اعادة ارسال الرمز
        </h6>
        <p>
          <span>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
          </span>{" "}
          : <span>{(timer % 60).toString().padStart(2, "0")}</span>
        </p>
      </div>

      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <CustomButton fullWidth size="large">
          تاكيد
        </CustomButton>
      </div>
    </form>
  );
}
