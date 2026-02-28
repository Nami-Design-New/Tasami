import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getSchema = (t) =>
  yup.object().shape({
    profilePicture: yup
      .mixed()
      .nullable()
      .test("fileSize", t("validation.communityFileSize"), (file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      })
      .test("fileType", t("validation.fileType"), (file) => {
        if (!file) return true;
        if (typeof file === "string") return true;
        return file.type.startsWith("image/");
      }),
    price: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required"))
      .test(
        "price-validation",
        t("validation.priceRange"), 
        (value) => value === 0 || value >= 5
      ),
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
