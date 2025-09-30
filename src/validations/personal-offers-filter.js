import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const getDocSchema = () => {
  return yup.object().shape({
    search: yup.string().optional(),
    city: yup.string().optional(),
    nationality: yup.string().optional(),
    field: yup.string().optional(),
    specialization: yup.string().optional(),
    gender: yup.string().oneOf(["both", "male", "female"]).optional(),
    rate: yup.string().oneOf(["all", "1", "2", "3", "4", "5"]).optional(),
    priceMin: yup.number().optional(),
    priceMax: yup.number().optional(),
    ageMin: yup.number().optional(),
    ageMax: yup.number().optional(),
    helpMechanism: yup.array().of(yup.string()).optional(),
  });
};

export default function usePersonalFilterForm(helpMechanisms = []) {
  const methods = useForm({
    resolver: yupResolver(getDocSchema(helpMechanisms)),
    mode: "onBlur",
    defaultValues: {
      search: "",
      city: "",
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
      priceMin: 100,
      priceMax: 30000,
      rate: "all",
      ageMin: 16,
      ageMax: 65,
      helpMechanism: [],
    },
    context: { helpMechanisms },
  });
  return methods;
}
