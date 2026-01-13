import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup.object({
    field: yup.string().required(t("validation.required")),
    specialization: yup.string().required(t("validation.required")),
    title: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.minCharacters", { count: 5 })),
    description: yup
      .string()
      .required(t("validation.required"))
      .min(15, t("validation.minCharacters", { count: 15 })),
    files: yup.array().of(
      yup.mixed().test("fileType", t("validation.invalidFileType"), (file) => {
        if (!file) return true; // empty value is okay
        // if file is a URL string, skip type check

        if (typeof file === "string") return true;

        const typeCategory = file.type?.split("/")[0];
        return typeCategory === "image" || typeCategory === "video";
      })
    ),
    links: yup
      .array()
      .of(yup.string().url(t("validation.invalidUrl")))
      .optional(),
    postType: yup.string().required(t("validation.typeRequired")),
  });

export default function useAddPostForm() {
  const { t } = useTranslation();
  return useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      field: "",
      specialization: "",
      title: "",
      description: "",
      files: [],
      links: [""],
      postType: "1",
    },
    mode: "onBlur",
  });
}
