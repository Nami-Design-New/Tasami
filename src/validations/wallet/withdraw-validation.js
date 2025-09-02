import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getRefundRequestSchema = (t) =>
  yup.object().shape({
    fullName: yup
      .string()
      .required(t("validation.required", { field: t("profile.fullName") })),
    iban: yup
      .string()
      .required(t("validation.required", { field: t("profile.iban") }))
      .min(15, t("validation.min", { field: t("profile.iban"), min: 15 })),
    bankName: yup
      .string()
      .required(t("validation.required", { field: t("profile.bankName") })),
    branchCode: yup
      .string()
      .required(t("validation.required", { field: t("profile.branchCode") })),
    swiftCode: yup
      .string()
      .required(t("validation.required", { field: t("profile.swiftCode") })),
  });

export default function useWithDrawForm() {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getRefundRequestSchema(t)),
    mode: "onBlur",
  });
  return methods;
}
