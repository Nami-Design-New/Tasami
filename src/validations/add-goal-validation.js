import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const ADD_GOAL_DEFAULT_VALUES = {
  field: "",
  specialization: "",
  title: "",
  startDate: null,
  month: "",
  day: "",
  assistantOption: "notDefined",
  gender: "both",
  helpMechanism: [],
};

const getSchema = (t) =>
  yup
    .object({
      field: yup.string().required(t("validation.required")),
      specialization: yup.string().required(t("validation.required")),
      title: yup
        .string()
        .required(t("validation.required"))
        .min(15, t("validation.minCharacters", { count: 15 })),
      gender: yup.string().when("assistantOption", {
        is: "defined",
        then: (schema) => schema.required(t("validation.required")),
        otherwise: (schema) => schema.notRequired(),
      }),
      assistantOption: yup.string().required(t("validation.required")),
      startDate: yup
        .date()
        .typeError(t("validation.mustBeDate"))
        .required(t("validation.required"))
        .transform((value, originalValue) => {
          // If original value is a string, convert to Date
          return originalValue ? new Date(originalValue) : value;
        })
        .min(
          new Date().setHours(0, 0, 0, 0),
          t("validation.startDateMustBeFuture")
        ),
      month: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === "" || originalValue == null) return null;
          return isNaN(value) ? NaN : value;
        })
        .nullable()
        .typeError(t("validation.mustBeNumber"))
        .min(0, t("validation.mustBePositive"))
        .max(24, t("validation.maxMonths", { max: 24 })),

      day: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === "" || originalValue == null) return null;
          return isNaN(value) ? NaN : value;
        })
        .nullable()
        .typeError(t("validation.mustBeNumber"))
        .min(0, t("validation.mustBePositive"))
        .max(30, t("validation.maxDays", { max: 30 })),

      helpMechanism: yup.array().when("assistantOption", {
        is: "defined",
        then: (schema) =>
          schema.of(yup.string()).min(1, t("validation.helpMechanismRequired")),
        otherwise: (schema) => schema.notRequired(),
      }),
    })
    .test("at-least-one", t("validation.atLeastOne"), function (values) {
      if (!values) return false;
      const { month, day } = values;
      if ((month && month > 0) || (day && day > 0)) return true;

      return this.createError({
        path: "month",
        message: t("validation.atLeastOne"),
      });
    })

    .test(
      "max-total",
      t("validation.maxTotal", { max: 720 }),
      function (values) {
        if (!values) return true;
        const { month = 0, day = 0 } = values;
        const total = month * 30 + day;
        if (total <= 720) return true;

        return this.createError({
          path: "day",
          message: t("validation.maxTotal", { max: 720 }),
        });
      }
    );

export default function useAddGoalForm() {
  const { t } = useTranslation();
  return useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: ADD_GOAL_DEFAULT_VALUES,
    mode: "onChange",
  });
}
