import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const registerSchema = (t) => {
  return yup.object().shape({
    profilePicture: yup
      .mixed()
      .nullable()
      .test("fileSize", t("validation.fileSize"), (file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      })
      .test("fileType", t("validation.fileType"), (file) => {
        if (!file) return true;
        if (typeof file === "string") return true;
        return file.type.startsWith("image/");
      }),
    firstName: yup.string().required(t("validation.required")),
    middleName: yup.string().required(t("validation.required")),
    dateOfBirth: yup
      .date()
      .typeError(t("validation.date"))
      .required(t("validation.required"))
      .test("minAge", t("validation.minAge", { age: 15 }), (value) => {
        if (!value) return false;
        const today = dayjs();
        const minDate = today.subtract(15, "year");
        return (
          dayjs(value).isBefore(minDate) || dayjs(value).isSame(minDate, "day")
        );
      }),
    gender: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: yup
      .string()
      .min(6, t("validation.passwordMin"))
      .required(t("validation.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("validation.passwordMatch"))
      .required(t("validation.required")),
  });
};

export const useRegisterValidation = () => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(registerSchema(t)),
    defaultValues: {
      profilePicture: null,
      firstName: "",
      middleName: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onchange",
  });
  return methods;
};
