import { useTranslation } from "react-i18next";

import {
  formatDeadlineRemainingDays,
  formatDeadlineRemainingHours,
  getDeadlineRemainingPhase,
} from "../../../utils/startExecutionDeadline";

export default function StartExecutionDeadlineAlert({
  deadlineState,
  scope = "work",
  className = "",
}) {
  const { t, i18n } = useTranslation();
  const remainingPhase = getDeadlineRemainingPhase(
    deadlineState?.remainingMs,
  );

  if (
    !deadlineState?.shouldShow ||
    deadlineState.isAutoCanceled ||
    remainingPhase === "expired"
  ) {
    return null;
  }

  const remaining =
    remainingPhase === "days"
      ? formatDeadlineRemainingDays(
          deadlineState.remainingMs,
          i18n.language,
        )
      : formatDeadlineRemainingHours(
          deadlineState.remainingMs,
          i18n.language,
        );
  const isContract = scope === "contract";
  const warningKey = isContract
    ? "works.startExecutionDeadline.contractWarning"
    : "works.startExecutionDeadline.workWarning";

  return (
    <div
      className={`start-execution-deadline-alert start-execution-deadline-alert--warning ${className}`}
      aria-live="polite"
    >
      <p>{t(warningKey, { remaining })}</p>
    </div>
  );
}
