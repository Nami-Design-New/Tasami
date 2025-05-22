import { useEffect, useState, useRef } from "react";

const OtpContainer = ({ setCode, length = 6 }) => {
  const [otpValue, setOtpValue] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (index, event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 1);
    if (!value) return;

    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);
    setCode(newOtpValue.join(""));

    if (index < length - 1 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case "Backspace":
        if (!otpValue[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else if (otpValue[index]) {
          const newOtpValue = [...otpValue];
          newOtpValue[index] = "";
          setOtpValue(newOtpValue);
          setCode(newOtpValue.join(""));
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowRight":
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasteData) return;

    const newOtpValue = pasteData
      .split("")
      .concat(Array(length - pasteData.length).fill(""));
    setOtpValue(newOtpValue);
    setCode(newOtpValue.join(""));

    const lastFilledIndex = Math.min(pasteData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div
      className="otp-container"
      onPaste={handlePaste}
      role="group"
      aria-label="OTP input"
    >
      {otpValue.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className="otp-input"
          type="text"
          maxLength="1"
          inputMode="numeric"
          pattern="[0-9]"
          required
          value={value}
          onChange={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpContainer;
