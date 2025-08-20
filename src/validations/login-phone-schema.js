import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const getPhoneSchema = (t) =>
  yup.object().shape({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\+?[0-9\s]+$/, "Phone number must contain only numbers"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

export const useLoginPhone = (t) => {
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
