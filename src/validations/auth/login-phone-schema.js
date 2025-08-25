import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getPhoneSchema = (t) =>
  yup.object().shape({
    phone: yup
      .string()
      .required(t("validation.required"))
      .matches(/^\+?[0-9\s]+$/, t("validation.invalidPhoneNumber")),
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordMin")),
  });

export const useLoginPhone = () => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getPhoneSchema(t)),
    defaultValues: {
      phone: "",
      password: "",
    },
    mode: "onblur",
  });
  return methods;
};
