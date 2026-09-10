import dayjs from "dayjs";

export const isDateBeforeToday = (date, today = new Date()) => {
  if (!date) return false;

  const targetDate = dayjs(date);
  const currentDate = dayjs(today);

  return (
    targetDate.isValid() &&
    currentDate.isValid() &&
    targetDate.isBefore(currentDate, "day")
  );
};
