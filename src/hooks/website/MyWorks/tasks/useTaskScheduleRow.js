import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  canEnableTaskScheduleReminder,
  normalizeTaskScheduleDate,
  validateTaskScheduleDate,
} from "../../../../validations/works/task-schedule";

const getFieldError = (error, field) => {
  const fieldError = error?.fieldErrors?.[field];
  if (Array.isArray(fieldError)) return fieldError[0];
  return typeof fieldError === "string" ? fieldError : null;
};

export default function useTaskScheduleRow({
  schedule,
  index,
  task,
  schedules,
  canManage,
  busy,
  onUpdate,
  onRequestDelete,
  onDateValidityChange,
}) {
  const { t } = useTranslation();
  const [date, setDate] = useState(() =>
    normalizeTaskScheduleDate(schedule?.date),
  );
  const [dateError, setDateError] = useState(null);
  const [hasDateConflict, setHasDateConflict] = useState(false);
  const [completedLocally, setCompletedLocally] = useState(false);
  const [completionError, setCompletionError] = useState(null);
  const [reminderError, setReminderError] = useState(null);
  const status = schedule?.status || "pending";
  const completedFromApi =
    status === "completed" || status === "confirmed";
  const completed = completedFromApi || completedLocally;
  const reminderEnabled = Boolean(schedule?.is_notify);
  const today = normalizeTaskScheduleDate(new Date());
  const taskStartDate = normalizeTaskScheduleDate(task?.started_at);
  const taskEndDate = normalizeTaskScheduleDate(task?.expected_end_date);
  const minimumDate = taskStartDate > today ? taskStartDate : today;
  const completionAvailable =
    Boolean(date) &&
    (!taskStartDate || taskStartDate <= today) &&
    date <= today;

  const dateValidityRef = useRef(onDateValidityChange);
  dateValidityRef.current = onDateValidityChange;

  // Clicking a blocked control still blurs the date field, and the revert
  // that follows would unblock the row before the click is dispatched. The
  // guard swallows that one click so the interaction only ever reverts.
  const revertGuardRef = useRef(false);

  const consumeRevertGuard = () => {
    if (!revertGuardRef.current) return false;

    revertGuardRef.current = false;
    return true;
  };

  useEffect(() => {
    setDate(normalizeTaskScheduleDate(schedule?.date));
  }, [schedule?.date]);

  useEffect(() => {
    dateValidityRef.current?.(schedule?.id, !hasDateConflict);
  }, [schedule?.id, hasDateConflict]);

  const handleDateChange = async (event) => {
    const nextDate = event.target.value;
    setDate(nextDate);

    const validationError = validateTaskScheduleDate({
      date: nextDate,
      startedAt: task?.started_at,
      expectedEndDate: task?.expected_end_date,
      schedules,
      scheduleId: schedule?.id,
    });

    if (validationError) {
      setDateError(t(validationError));
      setHasDateConflict(true);
      return;
    }

    setDateError(null);
    setHasDateConflict(false);

    try {
      await onUpdate(schedule.id, { date: nextDate });
    } catch (error) {
      setDateError(
        getFieldError(error, "date") ||
          error?.message ||
          t("works.schedule_update_error"),
      );
      setDate(normalizeTaskScheduleDate(schedule?.date));
    }
  };

  const handleDateBlur = () => {
    if (!hasDateConflict) return;

    // The field snaps back, so the reason has to survive somewhere the row
    // does not keep showing once the value is valid again.
    toast.error(
      t("works.schedule_errors.date_reverted", { reason: dateError }),
    );
    revertGuardRef.current = true;
    setDate(normalizeTaskScheduleDate(schedule?.date));
    setHasDateConflict(false);
    setDateError(null);
  };

  const handleDateFocus = () => {
    revertGuardRef.current = false;
  };

  const handleReminderChange = async (event) => {
    if (consumeRevertGuard()) return;

    const enabled = event.target.checked;
    setReminderError(null);

    if (
      enabled &&
      !canEnableTaskScheduleReminder({
        date,
        status,
      })
    ) {
      setReminderError(t("works.schedule_errors.reminder_not_available"));
      return;
    }

    try {
      await onUpdate(schedule.id, { is_notify: enabled });
    } catch (error) {
      setReminderError(
        getFieldError(error, "is_notify") ||
          error?.message ||
          t("works.schedule_update_error"),
      );
    }
  };

  const handleComplete = async () => {
    if (consumeRevertGuard()) return;
    if (!completionAvailable || completed || busy || !canManage) return;
    if (hasDateConflict) return;
    setCompletionError(null);

    try {
      await onUpdate(schedule.id, { status: "completed" });
      setCompletedLocally(true);
    } catch (error) {
      setCompletionError(
        getFieldError(error, "status") ||
          error?.message ||
          t("works.schedule_completion_error"),
      );
    }
  };

  return {
    viewModel: {
      rowClassName: `task-repetition-row ${busy ? "is-busy" : ""}`,
      number: index + 1,
      date: {
        value: date,
        minimum: minimumDate,
        maximum: taskEndDate,
        label: t("works.schedule_date"),
        disabled:
          !canManage || busy || completed || status !== "pending",
        error: dateError,
      },
      completion: {
        completed,
        disabled:
          !canManage || busy || !completionAvailable || hasDateConflict,
        title: completionAvailable
          ? undefined
          : t("works.repetition_not_available"),
        label: t(
          completed
            ? "works.repetition_completed"
            : completionAvailable
              ? "works.complete_repetition"
              : "works.repetition_not_available",
        ),
        iconClassName: `fa-solid ${
          completionAvailable ? "fa-check" : "fa-lock"
        }`,
        error: completionError,
      },
      reminder: {
        enabled: reminderEnabled,
        disabled: !canManage || busy || completed || hasDateConflict,
        label: t("works.reminders"),
        shortLabel: t("works.reminder_short"),
        error: reminderError,
      },
      deletion: {
        disabled: !canManage || busy || completed,
        label: t("works.delete_repetition"),
      },
    },
    actions: {
      changeDate: handleDateChange,
      blurDate: handleDateBlur,
      focusDate: handleDateFocus,
      complete: handleComplete,
      changeReminder: handleReminderChange,
      requestDelete: () => onRequestDelete(schedule),
    },
  };
}
