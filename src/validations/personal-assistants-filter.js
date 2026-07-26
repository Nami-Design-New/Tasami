import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const getDocSchema = () => {
  return yup.object().shape({
    search: yup.string().optional(),
    country: yup.string().optional(),
    city: yup.string().optional(),
    nationality: yup.string().optional(),
    field: yup.string().optional(),
    specialization: yup.string().optional(),
    gender: yup.string().oneOf(["both", "male", "female"]).optional(),
    dateOptions: yup.string().oneOf(["specified", "unspecified"]).optional(),
    startDate: yup.string().optional(),
    startDateTo: yup.string().optional(),
    helpMechanism: yup.array().of(yup.string()).optional(),
  });
};

export default function useAssistantsFilterForm() {
  const methods = useForm({
    resolver: yupResolver(getDocSchema()),
    mode: "onBlur",
    defaultValues: {
      search: "",
      city: "",
      country: "",
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
      dateOptions: "unspecified",
      startDate: "",
      startDateTo: "",
    },
  });
  return methods;
}
