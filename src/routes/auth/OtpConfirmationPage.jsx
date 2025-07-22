import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import OtpContainer from "../../ui/forms/OtpContainer";

export default function OtpConfirmationPage() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    navigate("/register-info");
    e.preventDefault();
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
    <div className="reset-container">
      <p className="otp-page-des">
        <span>فضلاً أدخل رمز التحقق الذي تم ارساله إلى الرقم ...</span>
        <span> +96605123456789 </span>
      </p>
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
          <BackButton onClick={() => navigate(-1)} />
          <CustomButton fullWidth size="large">
            إرسال
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
