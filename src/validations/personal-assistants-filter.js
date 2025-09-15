import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getDocSchema = (t) => {
  return yup.object().shape({
    field: yup.string().required(t("validation.required")),
    specialization: yup.string().required(t("validation.required")),
    documentType: yup.string().required(t("validation.required")),
    gender: yup.string().required(t("validation.required")),
    issuingAuthority: yup.string().required(t("validation.required")),
    documentNumber: yup.string().required(t("validation.required")),
    expiryDate: yup
      .date()
      .typeError(t("validation.date"))
      .required(t("validation.required")),
  });
};

export default function useAssistantsFilterForm() {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getDocSchema(t)),
    mode: "onBlur",
  });
  return methods;
}
