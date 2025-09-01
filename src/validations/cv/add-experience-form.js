import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const getSchema = (t) =>
  yup.object().shape({
    field: yup
      .string()
      .required(
        t("validation.required", { field: t("website.platform.cv.field") })
      ),
    specialization: yup.string().required(
      t("validation.required", {
        field: t("website.platform.cv.specialization"),
      })
    ),
    description: yup.string().required(
      t("validation.required", {
        field: t("website.platform.cv.description"),
      })
    ),
    yearsOfExperience: yup
      .number()
      .typeError(t("validation.number"))
      .min(
        0,
        t("validation.min", {
          field: t("website.platform.cv.yearsOfExperience"),
          min: 0,
        })
      )
      .required(
        t("validation.required", {
          field: t("website.platform.cv.yearsOfExperience"),
        })
      ),
    qualification: yup.string().required(
      t("validation.required", {
        field: t("website.platform.cv.qualification"),
      })
    ),
  });

export const useAddExperienceForm = () => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getSchema(t)),
    mode: "onBlur",
  });

  return methods;
};
