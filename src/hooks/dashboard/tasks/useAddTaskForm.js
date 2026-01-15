import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const ADD_NEW_TASK_MODAL = {
  employee_id: "",
  task_system_id: "",
  title: "",
  description: "",
  files: [],
};

const getSchema = (t) =>
  yup.object({
    employee_id: yup.string().required(t("validation.required")),
    task_system_id: yup.string().required(t("validation.required")),
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
        if (!file) return true;
        const typeCategory = file.type.split("/")[0];
        return typeCategory === "image" || typeCategory === "video";
      })
    ),
  });

export default function useAddTaskForm() {
  const { t } = useTranslation();
  return useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: ADD_NEW_TASK_MODAL,
    mode: "onBlur",
  });
}
