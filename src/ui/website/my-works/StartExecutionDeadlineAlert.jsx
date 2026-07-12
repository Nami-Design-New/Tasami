import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  formatDeadlineRemaining,
  formatDeadlineRemainingDays,
  formatDeadlineRemainingHours,
  getStartExecutionDeadlineDebugSnapshot,
  getStartExecutionDeadlineState,
} from "../../../utils/startExecutionDeadline";

export default function StartExecutionDeadlineAlert({
  item,
  scope = "work",
  className = "",
}) {
  const { t, i18n } = useTranslation();
  const [now, setNow] = useState(() => Date.now());
  const deadlineState = useMemo(
    () => getStartExecutionDeadlineState(item, { now }),
    [item, now],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(
      `[StartExecutionDeadline][Alert:${scope}]`,
      getStartExecutionDeadlineDebugSnapshot(item, { now }),
    );
  }, [item, now, scope]);

  if (!deadlineState?.shouldShow) return null;

  const remaining = formatDeadlineRemaining(
    deadlineState.remainingMs,
    i18n.language,
  );
  const remainingDays = formatDeadlineRemainingDays(
    deadlineState.remainingMs,
    i18n.language,
  );
  const remainingHours = formatDeadlineRemainingHours(
    deadlineState.remainingMs,
    i18n.language,
  );
  const isContract = scope === "contract";
  const warningKey = isContract
    ? "works.startExecutionDeadline.contractWarning"
    : "works.startExecutionDeadline.workWarning";
  const message = deadlineState.isAutoCanceled
    ? t(
        isContract
          ? "works.startExecutionDeadline.autoCanceledContract"
          : "works.startExecutionDeadline.autoCanceledWork",
      )
    : t(warningKey, { remaining });

  if (!deadlineState.isAutoCanceled) {
    return (
      <div
        className={`start-execution-deadline-alert start-execution-deadline-alert--warning ${className}`}
        aria-live="polite"
      >
        <p>{t(warningKey, { remaining: remainingDays })}</p>
        <p>{t(warningKey, { remaining: remainingHours })}</p>
      </div>
    );
  }

  return (
    <div
      className={`start-execution-deadline-alert ${
        deadlineState.isAutoCanceled
          ? "start-execution-deadline-alert--canceled"
          : ""
      } ${className}`}
      aria-live="polite"
    >
      <i className="fa-solid fa-triangle-exclamation"></i>
      <div className="start-execution-deadline-alert__content">
        <p>{message}</p>
        {!deadlineState.isAutoCanceled && (
          <>
            <div className="start-execution-deadline-alert__meta">
              <span>{t("works.startExecutionDeadline.remainingLabel")}</span>
              <strong>{remaining}</strong>
            </div>
            <div className="start-execution-deadline-alert__track">
              <span
                style={{ width: `${deadlineState.progressPercent}%` }}
              ></span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
