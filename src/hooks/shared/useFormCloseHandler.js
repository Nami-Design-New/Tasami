// Create a new file: hooks/useFormCloseHandler.js

import { useState } from "react";

/**
 * Generic hook to handle form closing with unsaved changes detection
 * @param {Object} options
 * @param {Function} options.watch - React Hook Form watch function
 * @param {Function} options.reset - React Hook Form reset function
 * @param {Object} options.defaultValues - Default values to compare against
 * @param {Function} options.onClose - Callback when modal should close
 * @returns {Object} Handler functions and state
 */
export default function useFormCloseHandler({
  watch,
  reset,
  defaultValues = {},
  onClose,
}) {
  const [showAlertModal, setShowAlertModal] = useState(false);

  /**
   * Check if form has any values different from defaults
   */
  const hasFormValues = () => {
    const currentValues = watch();
    console.log(currentValues);

    return Object.keys(defaultValues).some((key) => {
      console.log(key);

      const currentValue = currentValues[key];
      const defaultValue = defaultValues[key];

      console.log("currentValue:", currentValue);

      // Handle different types of values
      if (Array.isArray(defaultValue)) {
        return Array.isArray(currentValue) && currentValue.length > 0;
      }

      if (typeof defaultValue === "string") {
        return currentValue && currentValue.trim() !== defaultValue.trim();
      }

      if (defaultValue === null || defaultValue === undefined) {
        return (
          currentValue !== null &&
          currentValue !== undefined &&
          currentValue !== ""
        );
      }

      return currentValue !== defaultValue;
    });
  };

  /**
   * Request to close - shows alert if form has values
   */
  const requestClose = () => {
    if (!hasFormValues()) {
      onClose();
      reset();
      return;
    }
    setShowAlertModal(true);
  };

  /**
   * Confirm close - actually closes and resets
   */
  const confirmClose = () => {
    setShowAlertModal(false);
    onClose();
    reset(undefined, { keepDefaultValues: true });
  };

  /**
   * Cancel close - just hides alert
   */
  const cancelClose = () => {
    setShowAlertModal(false);
  };

  return {
    showAlertModal,
    requestClose,
    confirmClose,
    cancelClose,
    hasFormValues,
  };
}
