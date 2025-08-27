import { useEffect, useState } from "react";

export default function ResendTimer({
  initialTime = 10,
  onResend,
  label,
  disabledLabel,
  loadingLabel,
  loading = false,
}) {
  const [timer, setTimer] = useState(initialTime);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResendClick = async () => {
    if (!resendDisabled && !loading) {
      try {
        setResendDisabled(true);
        const success = await onResend?.();
        if (success) {
          setTimer(initialTime);
        } else {
          setResendDisabled(false);
        }
      } catch (err) {
        setResendDisabled(false);
      }
    }
  };

  return (
    <div className="resend">
      <h6
        style={{
          cursor: resendDisabled ? "default" : "pointer",
          pointerEvents: resendDisabled ? "none" : "auto",
        }}
        onClick={handleResendClick}
      >
        {loading ? loadingLabel : resendDisabled ? disabledLabel : label}
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
  );
}
