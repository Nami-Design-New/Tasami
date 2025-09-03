import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup.object().shape({
    field: yup.string().required(t("validation.required")),
    specialization: yup.string().required(t("validation.required")),
    groupName: yup.string().required(t("validation.required")),
    description: yup
      .string()
      .required(t("validation.required"))
      .max(255, t("validation.maxLength", { max: 255 })),
  });

export default function useAddGroupForm() {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {},
    mode: onblur,
    resolver: yupResolver(getSchema(t)),
  });
  return methods;
}
