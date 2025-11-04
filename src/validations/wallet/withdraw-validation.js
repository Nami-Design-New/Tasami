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
      .min(15, t("validation.min", { field: t("profile.iban"), min: 15 }))
      .matches(
        /^[A-Z]{2}[0-9A-Z]+$/,
        t("validation.pattern", { field: t("profile.iban") })
      ),
    bankName: yup
      .string()
      .required(t("validation.required", { field: t("profile.bankName") })),
    branchCode: yup
      .string()
      .required(t("validation.required", { field: t("profile.branchCode") }))
      .matches(
        /^[A-Za-z0-9]{3,11}$/,
        t("validation.pattern", { field: t("profile.branchCode") })
      ),
    price: yup
      .number()
      .typeError(t("validation.number", { field: t("profile.price") }))
      .required(t("validation.required", { field: t("profile.price") }))
      .moreThan(1, t("validation.min", { field: t("profile.price"), min: 1 })),
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
