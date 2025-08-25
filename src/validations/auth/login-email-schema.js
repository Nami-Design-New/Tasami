import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const getLoginSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordMin")),
  });

export const useLoginEmail = () => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  return methods;
};
