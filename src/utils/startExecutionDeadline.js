const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export const START_EXECUTION_WARNING_DELAY_MS = DAY_IN_MS;
export const START_EXECUTION_CANCEL_WINDOW_MS = 3 * DAY_IN_MS;
export const START_EXECUTION_TOTAL_DEADLINE_MS =
  START_EXECUTION_WARNING_DELAY_MS + START_EXECUTION_CANCEL_WINDOW_MS;

const START_DATE_TIMESTAMP_KEY = "start_date_timestamp";

const isPersonalGoal = (item) =>
  item?.rectangle === "personal_goal" ||
  item?.rectangle === "personal_goal_with_helper";

const hasStartedExecution = (item) =>
  item?.status === "execution" || item?.status === "completed";

const isDisabledBySystem = (item) => item?.disabled_by_system === true;

const getNowTimestamp = (value) =>
  value instanceof Date ? value.getTime() : (value ?? Date.now());

const getStartTimestamp = (item) => {
  const timestamp = Number(item?.[START_DATE_TIMESTAMP_KEY]);

  if (!Number.isFinite(timestamp) || timestamp <= 0) return null;

  // Backend sends Unix seconds, while JavaScript Date expects milliseconds.
  return timestamp < 1000000000000 ? timestamp * 1000 : timestamp;
};

const isEligibleItem = (item) => {
  if (!item) return false;

  return (
    isPersonalGoal(item) &&
    (isDisabledBySystem(item) || !hasStartedExecution(item))
  );
};

export function parseDateValue(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const rawValue = String(value).trim();
  if (!rawValue || rawValue === "---") return null;

  const normalizedValue = rawValue.replace(/\//g, "-");
  const dateOnly = normalizedValue.split(/[T\s]/)[0];

  const isoDateMatch = dateOnly.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch.map(Number);
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const displayDateMatch = dateOnly.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (displayDateMatch) {
    const [, day, month, year] = displayDateMatch.map(Number);
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const fallbackDate = new Date(rawValue);
  return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate;
}

export function formatStartDateTimestamp(value, language = "ar") {
  const timestamp = getStartTimestamp({ [START_DATE_TIMESTAMP_KEY]: value });

  if (!timestamp) return "";

  return new Intl.DateTimeFormat(language, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(timestamp));
}

export function getStartExecutionDeadlineState(item, options = {}) {
  if (!isEligibleItem(item)) return null;

  const now = getNowTimestamp(options.now);
  const startAt = getStartTimestamp(item);
  const isAutoCanceled = isDisabledBySystem(item);

  if (!startAt) {
    return isAutoCanceled
      ? {
          cancelAt: null,
          isAutoCanceled,
          isServerAutoCanceled: isAutoCanceled,
          remainingMs: 0,
          shouldShow: true,
          warningAt: null,
          progressPercent: 100,
        }
      : null;
  }

  const warningAt = startAt + START_EXECUTION_WARNING_DELAY_MS;
  const cancelAt = startAt + START_EXECUTION_TOTAL_DEADLINE_MS;
  const shouldShow = isAutoCanceled || now >= warningAt;

  if (!shouldShow) return null;

  const remainingMs = Math.max(cancelAt - now, 0);
  const elapsedWindowMs = Math.min(
    START_EXECUTION_CANCEL_WINDOW_MS,
    Math.max(now - warningAt, 0),
  );

  return {
    cancelAt,
    isAutoCanceled,
    isServerAutoCanceled: isAutoCanceled,
    remainingMs,
    shouldShow,
    warningAt,
    progressPercent: Math.round(
      (elapsedWindowMs / START_EXECUTION_CANCEL_WINDOW_MS) * 100,
    ),
  };
}

export function getStartExecutionDeadlineDebugSnapshot(item, options = {}) {
  const now = getNowTimestamp(options.now);
  const state = getStartExecutionDeadlineState(item, { now });
  const startAt = getStartTimestamp(item);
  const warningAt =
    state?.warningAt ??
    (startAt ? startAt + START_EXECUTION_WARNING_DELAY_MS : null);
  const cancelAt =
    state?.cancelAt ??
    (startAt ? startAt + START_EXECUTION_TOTAL_DEADLINE_MS : null);

  return {
    id: item?.id,
    code: item?.code,
    rectangle: item?.rectangle,
    status: item?.status,
    statusDate: item?.status_date,
    isPersonalGoal: isPersonalGoal(item),
    hasStartedExecution: hasStartedExecution(item),
    disabledBySystem: item?.disabled_by_system,
    startDateTimestamp: item?.[START_DATE_TIMESTAMP_KEY],
    selectedStartAt: startAt ? new Date(startAt).toISOString() : null,
    calculatedWarningAt: warningAt ? new Date(warningAt).toISOString() : null,
    calculatedCancelAt: cancelAt ? new Date(cancelAt).toISOString() : null,
    now: new Date(now).toISOString(),
    shouldShow: Boolean(state?.shouldShow),
    isAutoCanceled: Boolean(state?.isAutoCanceled),
    isServerAutoCanceled: Boolean(state?.isServerAutoCanceled),
    remainingMs: state?.remainingMs ?? null,
    progressPercent: state?.progressPercent ?? null,
  };
}

export function formatDeadlineRemaining(remainingMs, language = "ar") {
  const isArabic = String(language).startsWith("ar");
  const safeRemainingMs = Math.max(Number(remainingMs) || 0, 0);
  const totalMinutes = Math.ceil(safeRemainingMs / (60 * 1000));
  const days = Math.floor(totalMinutes / (24 * 60));
  const hoursAfterDays = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutesAfterHours = totalMinutes % 60;

  if (days > 0) {
    if (hoursAfterDays === 0) {
      return isArabic ? `${days} أيام` : `${days} days`;
    }

    return isArabic
      ? `${days} يوم و ${hoursAfterDays} ساعة`
      : `${days} days and ${hoursAfterDays} hours`;
  }

  const hours = String(hoursAfterDays).padStart(2, "0");
  const minutes = String(minutesAfterHours).padStart(2, "0");

  return isArabic ? `${hours}:${minutes} ساعة` : `${hours}:${minutes} hours`;
}

export function formatDeadlineRemainingDays(remainingMs, language = "ar") {
  const isArabic = String(language).startsWith("ar");
  const safeRemainingMs = Math.max(Number(remainingMs) || 0, 0);
  const days = Math.max(Math.ceil(safeRemainingMs / DAY_IN_MS), 1);

  return isArabic ? `${days} أيام` : `${days} days`;
}

export function formatDeadlineRemainingHours(remainingMs, language = "ar") {
  const isArabic = String(language).startsWith("ar");
  const safeRemainingMs = Math.max(Number(remainingMs) || 0, 0);
  const totalMinutes = Math.ceil(safeRemainingMs / (60 * 1000));
  const hoursAfterDays = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutesAfterHours = totalMinutes % 60;
  const hours = String(hoursAfterDays).padStart(2, "0");
  const minutes = String(minutesAfterHours).padStart(2, "0");

  return isArabic ? `${hours}:${minutes} ساعة` : `${hours}:${minutes} hours`;
}
