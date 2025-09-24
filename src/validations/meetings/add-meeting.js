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
    date: yup.string().required(t("validation.required")),
    time: yup.string().required(t("validation.required")),
    duration: yup.string().required(t("validation.required")),
    link: yup.string().required(t("validation.required")),
    meetingType: yup.string().required(t("validation.typeRequired")),
  });

export default function useAddMeetingForm() {
  const { t } = useTranslation();
  return useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: {
      field: "",
      specialization: "",
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      link: "",
      meetingType: "1",
    },
    mode: "onBlur",
  });
}
