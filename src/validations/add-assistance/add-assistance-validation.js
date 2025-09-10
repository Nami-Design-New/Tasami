import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup.object().shape({
    profilePicture: yup
      .mixed()
      .nullable()
      .test("fileSize", t("validation.fileSize"), (file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      })
      .test("fileType", t("validation.fileType"), (file) => {
        if (!file) return true;
        return [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/svg+xml",
          "image/svg",
          "image/wepb",
        ].includes(file.type);
      }),

    field: yup.string().required(t("validation.required")),
    specialization: yup.string().required(t("validation.required")),
    title: yup.string().required(t("validation.required")),
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

    duration: yup
      .number()
      .typeError(t("validation.number"))
      .positive(t("validation.mustBePositive"))
      .required(t("validation.required")),
    durationType: yup
      .string()
      .oneOf(["day", "month"])
      .required(t("validation.required")),
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
  });

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

      duration: "",
      price: "",
      extraTerms: "",
      helpMechanism: [],
    },
    mode: "onBlur",
  });
}
