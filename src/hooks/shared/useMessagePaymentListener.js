import { useEffect } from "react";

/**
 * Reusable hook for listening to postMessage events
 * @param {Object} config
 * @param {function} config.onSuccess - Called when status === 'success'
 * @param {function} config.onFail - Called when status === 'failed'
 * @param {string[]} [config.allowedOrigins] - Optional list of trusted origins
 */
const useMessagePaymentListener = ({
  onSuccess,
  onFail,
  allowedOrigins = [],
}) => {
  useEffect(() => {
    const handleMessage = (event) => {
      // Optional: Security check
      //   if (allowedOrigins.length && !allowedOrigins.includes(event.origin)) {
      //     return;
      //   }

      const status = event.data?.status;
      if (!status) return;

      if (status === "success" && typeof onSuccess === "function") {
        onSuccess(event.data);
      } else if (status === "failed" && typeof onFail === "function") {
        onFail(event.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onSuccess, onFail, allowedOrigins]);
};

export default useMessagePaymentListener;
