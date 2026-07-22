import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const TASK_TEXT_MAX_LENGTH = 500;
export const TASK_NOTE_MAX_LENGTH = 500;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const toUtcCalendarDay = (value) => {
  if (!value) return null;

  if (typeof value === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (match) {
      return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    }
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getAvailableTaskRepetitions = (startedAt, expectedEndDate) => {
  const startDay = toUtcCalendarDay(startedAt);
  const endDay = toUtcCalendarDay(expectedEndDate);

  if (startDay === null || endDay === null || endDay < startDay) return 0;

  return Math.floor((endDay - startDay) / MILLISECONDS_PER_DAY) + 1;
};

const WEEK_DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const getAddTasksSchema = (t) =>
  yup.object({
    taskDescription: yup
      .string()
      .required(t("validation.required"))
      .max(
        TASK_TEXT_MAX_LENGTH,
        t("validation.maxLength", { max: TASK_TEXT_MAX_LENGTH })
      ),

    taskCategory: yup.string().required(t("validation.required")),

    started_at: yup
      .date()
      .typeError(t("validation.invalid_date"))
      .required(t("validation.required")),

    expected_end_date: yup
      .date()
      .typeError(t("validation.invalid_date"))
      .required(t("validation.required"))
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        t("validation.after_or_equal_today"),
      )
      .test(
        "task-end-after-start",
        t("validation.taskEndAfterStart"),
        function validateTaskDates(value) {
          const startedAt = this.parent.started_at;

          if (!value || !startedAt) return true;
          return new Date(value) >= new Date(startedAt);
        },
      ),

    noteDraft: yup
      .string()
      .nullable()
      .max(
        TASK_NOTE_MAX_LENGTH,
        t("validation.maxLength", { max: TASK_NOTE_MAX_LENGTH }),
      ),

    notes: yup
      .array()
      .of(
        yup.object({
          id: yup.mixed().required(),
          text: yup
            .string()
            .trim()
            .required(t("validation.required"))
            .max(
              TASK_NOTE_MAX_LENGTH,
              t("validation.maxLength", { max: TASK_NOTE_MAX_LENGTH }),
            ),
          created_at: yup.string().nullable(),
        }),
      )
      .test(
        "notes-total-length",
        t("validation.maxLength", { max: TASK_NOTE_MAX_LENGTH }),
        (notes) =>
          !notes ||
          notes.map((note) => note?.text || "").join("\n").length <=
            TASK_NOTE_MAX_LENGTH,
      )
      .default([]),

    reminderNotifications: yup.boolean(),

    notification_repeat: yup.string().when("reminderNotifications", {
      is: true,
      then: (schema) =>
        schema
          .oneOf(["weekly", "monthly"], t("validation.invalid_option"))
          .required(t("validation.required")),
      otherwise: (schema) => schema.optional(),
    }),

    notification_day: yup
      .array()
      .when(
        ["reminderNotifications", "notification_repeat"],
        ([reminderNotifications, notificationRepeat], schema) => {
          if (!reminderNotifications) return yup.mixed().optional();

          if (notificationRepeat === "weekly") {
            return schema
              .of(
                yup
                  .string()
                  .oneOf(WEEK_DAYS, t("validation.invalid_option")),
              )
              .min(1, t("validation.required"))
              .required(t("validation.required"));
          }

          if (notificationRepeat === "monthly") {
            return schema
              .of(
                yup
                  .string()
                  .matches(
                    /^(?:[1-9]|[12]\d|3[01])$/,
                    t("validation.invalid_option"),
                  ),
              )
              .min(1, t("validation.required"))
              .required(t("validation.required"));
          }

          return yup.mixed().optional();
        },
      ),

    notification_time: yup.string().when(
      ["reminderNotifications", "notification_repeat"],
      {
        is: (reminderNotifications, notificationRepeat) =>
          reminderNotifications &&
          (notificationRepeat === "weekly" ||
            notificationRepeat === "monthly"),
        then: (schema) =>
          schema
            .matches(
              /^([0-1]\d|2[0-3]):([0-5]\d)$/,
              t("validation.invalid_time_format"),
            )
            .required(t("validation.required")),
        otherwise: (schema) => schema.optional(),
      },
    ),

    repeatTask: yup
      .boolean()
      .test(
        "notifications-and-repetitions-are-exclusive",
        t("works.repetitions_disabled_with_reminders"),
        function validateExclusiveSchedule(value) {
          return !(value && this.parent.reminderNotifications);
        },
      ),

    repeat_count: yup.mixed().when(
      ["repeatTask", "reminderNotifications"],
      ([repeatTask, reminderNotifications]) => {
        if (!repeatTask || reminderNotifications) {
          return yup.mixed().optional();
        }

        return yup
          .number()
          .transform((value, originalValue) =>
            originalValue === "" ? undefined : value,
          )
          .typeError(t("validation.mustBeInteger"))
          .integer(t("validation.mustBeInteger"))
          .min(
            1,
            t("validation.min", {
              field: t("works.required_repetitions_count"),
              min: 1,
            }),
          )
          .test(
            "within-task-date-range",
            t("works.repetitions_exceed_available"),
            function validateAvailableRepetitions(value) {
              if (value == null) return true;

              const availableRepetitions = getAvailableTaskRepetitions(
                this.parent.started_at,
                this.parent.expected_end_date,
              );

              return (
                value <= availableRepetitions ||
                this.createError({
                  message: t("works.repetitions_exceed_available", {
                    count: availableRepetitions,
                  }),
                })
              );
            },
          )
          .required(t("validation.required"));
      },
    ),

  });

export default function useAddTasksForm() {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getAddTasksSchema(t)),
    defaultValues: {
      started_at: "",
      expected_end_date: "",
      noteDraft: "",
      notes: [],
      reminderNotifications: false,
      notification_repeat: "weekly",
      notification_day: [],
      notification_time: "",
      repeatTask: false,
      repeat_count: "",
    },
    mode: "onChange",
  });
  return methods;
}
