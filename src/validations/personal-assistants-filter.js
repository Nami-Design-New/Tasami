import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getDocSchema = (t) => {
  return yup.object().shape({
    search: yup.string().optional(),
    city: yup.string().optional(),
    nationality: yup.string().optional(),
    field: yup.string().optional(),
    specialization: yup.string().optional(),
    gender: yup.string().oneOf(["both", "male", "female"]).optional(),
  });
};

export default function useAssistantsFilterForm() {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getDocSchema(t)),
    mode: "onBlur",
    defaultValues: {
      search: "",
      city: "",
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
    },
  });
  return methods;
}
