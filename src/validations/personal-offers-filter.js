import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const PRICE_RANGE = {
  min: 1,
  max: 10000,
};

const AGE_RANGE = {
  min: 15,
  max: 65,
};

const optionalNumber = (t) =>
  yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === "" || originalValue == null) return undefined;
      return Number.isNaN(value) ? NaN : value;
    })
    .typeError(t("validation.number"))
    .optional();

const getDocSchema = (t) => {
  return yup.object().shape({
    search: yup.string().optional(),
    city: yup.string().optional(),
    country: yup.string().optional(),
    nationality: yup.string().optional(),
    field: yup.string().optional(),
    specialization: yup.string().optional(),
    gender: yup.string().oneOf(["both", "male", "female"]).optional(),
    rate: yup.string().oneOf(["all", "1", "2", "3", "4", "5"]).optional(),
    priceMin: optionalNumber(t)
      .min(PRICE_RANGE.min, t("validation.minPrice", { min: PRICE_RANGE.min }))
      .max(PRICE_RANGE.max, t("validation.maxPrice", { max: PRICE_RANGE.max })),
    priceMax: optionalNumber(t)
      .min(PRICE_RANGE.min, t("validation.minPrice", { min: PRICE_RANGE.min }))
      .max(PRICE_RANGE.max, t("validation.maxPrice", { max: PRICE_RANGE.max }))
      .test(
        "price-max-gte-min",
        t("validation.maxPriceGteMin"),
        function (value) {
          const { priceMin } = this.parent;
          if (value == null || priceMin == null) return true;
          return value >= priceMin;
        }
      ),
    ageMin: optionalNumber(t)
      .min(AGE_RANGE.min, t("validation.offerMinAge", { min: AGE_RANGE.min }))
      .max(AGE_RANGE.max, t("validation.maxAge", { max: AGE_RANGE.max })),
    ageMax: optionalNumber(t)
      .min(AGE_RANGE.min, t("validation.offerMinAge", { min: AGE_RANGE.min }))
      .max(AGE_RANGE.max, t("validation.maxAge", { max: AGE_RANGE.max }))
      .test(
        "age-max-gte-min",
        t("validation.toAgeGteFromAge"),
        function (value) {
          const { ageMin } = this.parent;
          if (value == null || ageMin == null) return true;
          return value >= ageMin;
        }
      ),
    helpMechanism: yup.array().of(yup.string()).optional(),
  });
};

export default function usePersonalFilterForm(helpMechanisms = []) {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(getDocSchema(t, helpMechanisms)),
    mode: "onBlur",
    defaultValues: {
      search: "",
      city: "",
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
      priceMin: PRICE_RANGE.min,
      priceMax: PRICE_RANGE.max,
      rate: "all",
      ageMin: AGE_RANGE.min,
      ageMax: AGE_RANGE.max,
      helpMechanism: [],
    },
    context: { helpMechanisms },
  });
  return methods;
}
