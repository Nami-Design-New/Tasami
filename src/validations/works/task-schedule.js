const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const TASK_SCHEDULE_STATUSES = [
  "pending",
  "progress",
  "completed",
];

const parseCalendarDate = (value) => {
  if (!value) return null;

  const source = String(value).trim();
  const date = ISO_DATE_PATTERN.test(source)
    ? new Date(`${source}T00:00:00`)
    : new Date(source);

  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
};

export const normalizeTaskScheduleDate = (value) => {
  const date = parseCalendarDate(value);
  if (!date) return "";

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

export const hasTaskStartDatePassed = (value, today = new Date()) => {
  const startDate = normalizeTaskScheduleDate(value);
  const currentDate = normalizeTaskScheduleDate(today);

  return Boolean(startDate && currentDate && startDate < currentDate);
};

export const getAllowedTaskScheduleStatuses = (status) => {
  if (status === "pending") return TASK_SCHEDULE_STATUSES;
  if (status === "progress") return ["progress", "completed"];
  return ["completed"];
};

export const validateTaskScheduleDate = ({
  date,
  startedAt,
  expectedEndDate,
  schedules,
  scheduleId,
  today = new Date(),
}) => {
  const normalizedDate = normalizeTaskScheduleDate(date);
  const candidateDate = parseCalendarDate(normalizedDate);
  const startDate = parseCalendarDate(startedAt);
  const endDate = parseCalendarDate(expectedEndDate);
  const currentDay = parseCalendarDate(today);

  if (!candidateDate) return "works.schedule_errors.invalid_date";
  if (candidateDate < currentDay) return "works.schedule_errors.past_date";
  if (
    (startDate && candidateDate < startDate) ||
    (endDate && candidateDate > endDate)
  ) {
    return "works.schedule_errors.outside_task_range";
  }

  const hasDuplicate = schedules.some(
    (schedule) =>
      String(schedule?.id) !== String(scheduleId) &&
      normalizeTaskScheduleDate(schedule?.date) === normalizedDate,
  );

  return hasDuplicate ? "works.schedule_errors.duplicate_date" : null;
};

export const canEnableTaskScheduleReminder = ({
  date,
  status,
  now = new Date(),
}) => {
  if (status === "completed") return false;

  const normalizedDate = normalizeTaskScheduleDate(date);
  if (!normalizedDate) return false;

  const scheduleDate = new Date(`${normalizedDate}T23:59:59`);
  return scheduleDate >= now;
};
