import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import OtpContainer from "../forms/OtpContainer";
import BackButton from "../forms/BackButton";
import SubmitButton from "../forms/SubmitButton";

export default function OtpForm({ email, setShowOtpForm, showOtpForm }) {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(20);
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();
  // Handle resend OTP
  const handleResendOtp = () => {
    if (!resendDisabled) {
      setTimer(20);
      setResendDisabled(true);
      // Simulate API call to resend OTP
      console.log("Resending OTP...");
    }
  };

  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (showOtpForm && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [showOtpForm, timer]);

  // handel back
  const handleBackButtonClick = (e) => {
    setShowOtpForm(false);
    e.preventDefault();
  };

  const handleSubmit = () => {
    navigate("/");
    toast.success("مرحبا بك في تسامي");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p className="sub-head">
          من فضلك ادخل الكود المرسل البريد الالكتروني <span>{email}</span>.
        </p>
        <OtpContainer setCode={setCode} length={4} />

        <div className="resend">
          <h6
            onClick={handleResendOtp}
            style={{
              cursor: "pointer",
              pointerEvents: resendDisabled ? "none" : "auto",
            }}
          >
            إعادة إرسال الرمز
          </h6>
          <p>
            <span>
              {Math.floor(timer / 20)
                .toString()
                .padStart(2, "0")}
            </span>{" "}
            : <span>{(timer % 20).toString().padStart(2, "0")}</span>
          </p>
        </div>

        <div className="buttons">
          <BackButton onClick={handleBackButtonClick} />
          <SubmitButton text="تاكيد" />
        </div>
      </form>
    </div>
  );
}
