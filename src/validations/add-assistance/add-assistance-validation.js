import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup
    .object({
      profilePicture: yup
        .mixed()
        .test("requiredOrExisting", t("validation.required"), (value) => {
          //  CASE 1: User uploaded new file → valid
          if (value instanceof File) return true;

          //  CASE 2: Existing image URL from backend → valid
          if (typeof value === "string" && value.trim() !== "") return true;

          // CASE 3: No image at all → invalid
          return false;
        })
        .test("fileSize", t("validation.fileSize"), (file) => {
          if (!file) return true; // allow existing image string
          if (typeof file === "string") return true;
          return file.size <= 2 * 1024 * 1024;
        })
        .test("fileType", t("validation.fileType"), (file) => {
          if (!file) return true;
          if (typeof file === "string") return true;
          return file.type.startsWith("image/");
        }),

      field: yup.string().required(t("validation.required")),
      specialization: yup.string().required(t("validation.required")),
      title: yup
        .string()
        .required(t("validation.required"))
        .min(15, t("validation.minCharacters", { count: 15 })),
      gender: yup.string().required(t("validation.required")),
      ageOption: yup.string().required(t("validation.required")),

      fromAge: yup.mixed().when("ageOption", {
        is: "defined",
        then: () =>
          yup
            .number()
            .typeError(t("validation.mustBeNumber"))
            .min(16, t("validation.offerMinAge", { min: 16 }))
            .max(65, t("validation.maxAge", { max: 65 }))
            .required(t("validation.required")),
        otherwise: () =>
          yup
            .mixed()
            .nullable()
            .transform(() => undefined),
      }),

      toAge: yup.mixed().when("ageOption", {
        is: "defined",
        then: () =>
          yup
            .number()
            .typeError(t("validation.mustBeNumber"))
            .min(yup.ref("fromAge"), t("validation.toAgeGteFromAge"))
            .max(65, t("validation.maxAge", { max: 65 }))
            .required(t("validation.required")),
        otherwise: () =>
          yup
            .mixed()
            .nullable()
            .transform(() => undefined),
      }),

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

      price: yup
        .number()
        .typeError(t("validation.mustBeNumber"))
        .min(1, t("validation.minPrice", { min: 1 }))
        .required(t("validation.required")),

      extraTerms: yup.string().nullable(),
      helpMechanism: yup
        .array()
        .of(yup.string())
        .min(1, t("validation.helpMechanismRequired")),
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

export default function useAddAssistanceForm() {
  const { t } = useTranslation();
  return useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      field: "",
      specialization: "",
      title: "",
      gender: "",
      ageOption: "notDefined",
      fromAge: null,
      toAge: null,
      durationInDays: "",
      price: "",
      extraTerms: "",
      helpMechanism: [],
    },
    mode: "onBlur",
  });
}
