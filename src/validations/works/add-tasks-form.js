import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup.object({
    taskDescription: yup.string().required(t("validation.required")),

    taskCategory: yup.string().required(t("validation.required")),

    expected_end_date: yup
      .date()
      .typeError(t("validation.invalid_date"))
      .required(t("validation.required"))
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        t("validation.after_or_equal_today")
      ),

    notes: yup.string().nullable(),

    reminderNotifications: yup.boolean(),

    notification_repeat: yup.string().when("reminderNotifications", {
      is: true,
      then: (schema) =>
        schema
          .oneOf(["daily", "weekly"], t("validation.invalid_option"))
          .required(t("validation.required")),
      otherwise: (schema) => schema.optional(),
    }),

    notification_day: yup.string().when("notification_repeat", {
      is: "weekly",
      then: (schema) =>
        schema
          .oneOf(
            [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
            t("validation.invalid_option")
          )
          .required(t("validation.required")),
      otherwise: (schema) => schema.optional(),
    }),

    notification_time: yup.string().when("notification_repeat", {
      is: (val) => val === "daily" || val === "weekly",
      then: (schema) =>
        schema
          .matches(
            /^([0-1]\d|2[0-3]):([0-5]\d)$/,
            t("validation.invalid_time_format")
          )
          .required(t("validation.required")),
      otherwise: (schema) => schema.optional(),
    }),
  });

export default function useAddTasksForm() {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      reminderNotifications: false,
      notification_repeat: "",
      notification_day: "",
      notification_time: "",
    },
    mode: "onChange",
  });
  return methods;
}
