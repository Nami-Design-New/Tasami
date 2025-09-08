import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup.object().shape({
    profilePicture: yup
      .mixed()
      .nullable()
      .test("fileSize", t("validation.fileSize"), (file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      })
      .test("fileType", t("validation.fileType"), (file) => {
        console.log(file.type);
        if (!file) return true;
        return [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/svg+xml",
          "image/svg",
          "image/webp",
        ].includes(file.type);
      }),

    price: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required"))
      .min(1, t("validation.min", { min: 1 })),

    about: yup
      .string()
      .required(t("validation.required"))
      .max(500, t("validation.maxLength", { max: 500 })),
  });

export default function useEditMyCommunityForm() {
  const { t } = useTranslation();
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(getSchema(t)),
  });
  return methods;
}
