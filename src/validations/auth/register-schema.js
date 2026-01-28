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
        return file.size <= 12 * 1024 * 1024;
      })
      .test("fileType", t("validation.fileType"), (file) => {
        if (!file) return true;
        if (typeof file === "string") return true;
        return file.type.startsWith("image/");
      }),
    firstName: yup
      .string()
      .required(t("validation.required"))
      .min(2, t("validation.firstNameMin", { min: 2 }))
      .max(50, t("validation.firstNameMax", { max: 50 })) // max limit
      .matches(
        /^[A-Za-z\s]+$/,
        t("validation.firstNameAlpha"), // only letters and spaces
      ),

    middleName: yup
      .string()
      .required(t("validation.required"))
      .min(1, t("validation.middleNameMin", { min: 1 }))
      .max(50, t("validation.middleNameMax", { max: 50 })) // max limit
      .matches(
        /^[A-Za-z\s]+$/,
        t("validation.middleNameAlpha"), // only letters and spaces
      ),
    dateOfBirth: yup
      .date()
      .typeError(t("validation.date"))
      .required(t("validation.required"))
      .test("minAge", t("validation.minAge", { age: 18 }), (value) => {
        if (!value) return false;
        const today = dayjs();
        const minDate = today.subtract(18, "year");
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
      .min(6, t("validation.passwordLength"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        t("validation.passwordStrength"),
      )
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
