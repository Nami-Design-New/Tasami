import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const getLoginSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid Email Format"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
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
