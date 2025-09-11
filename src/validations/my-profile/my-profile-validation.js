import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const getSchema = (t) =>
  yup.object().shape({
    profilePicture: yup
      .mixed()
      .test("fileType", t("validation.imageType"), (file) => {
        if (!file) return true; // allow empty if optional
        if (typeof file === "string") return true; // already uploaded (URL from backend)
        return file && file.type.startsWith("image/");
      }),
    firstName: yup.string().required(t("validation.required")),
    lastName: yup.string().required(t("validation.required")),
    date: yup.string().required(t("validation.required")),
    gender: yup.string().required(t("validation.required")),
    nationality: yup.string().required(t("validation.required")),
    country: yup.string().required(t("validation.required")),
    city: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .required(t("validation.required"))
      .email(t("validation.email")),

    wantChangePassword: yup.boolean(),
    oldPassword: yup.string().when("wantChangePassword", {
      is: true,
      then: (schema) =>
        schema
          .required(t("validation.required"))
          .min(6, t("validation.passwordMin")),
    }),

    newPassword: yup.string().when("wantChangePassword", {
      is: true,
      then: (schema) =>
        schema
          .required(t("validation.required"))
          .min(6, t("validation.passwordMin")),
    }),

    confirmPassword: yup.string().when("wantChangePassword", {
      is: true,
      then: (schema) =>
        schema
          .required(t("validation.required"))
          .min(6, t("validation.passwordMin"))
          .oneOf([yup.ref("newPassword")], t("validation.passwordMatch")),
    }),
  });

export default function useProfileValidation() {
  const { t } = useTranslation();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      date: "",
      gender: "",
      nationality: "",
      country: "",
      city: "",
      phone: "",
      email: "",
      wantChangePassword: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return methods;
}
