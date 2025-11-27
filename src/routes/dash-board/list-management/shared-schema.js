import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import * as yup from "yup";

/* ---------------------- DEFAULT VALUES ---------------------- */
export const defaultRegionValues = {
  region: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  regionNumber: "",
};

export const defaultCountryValues = {
  countryRegion: "",
  country: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  countryNumber: "",
  countryCode: "",
};

export const defaultCityValues = {
  cityCountry: "",
  city: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  cityNumber: "",
};

/* ---------------------- YUP SCHEMAS ---------------------- */
export const multiLangRequired = yup
  .object(
    SUPPORTED_LANGS.reduce((acc, lang) => {
      acc[lang] = yup.string().required(`هذا الحقل (${lang}) مطلوب`);
      return acc;
    }, {})
  )
  .required();

export const regionSchema = yup.object({
  region: multiLangRequired,
  regionNumber: yup
    .string()
    .matches(/^[0-9]+$/, "رقم الإقليم يجب أن يكون رقمًا فقط")
    .required("رقم الإقليم مطلوب"),
});

export const countrySchema = yup.object({
  countryRegion: yup.string().required("يجب اختيار الإقليم"),
  country: multiLangRequired,
  countryNumber: yup
    .string()
    .matches(/^[0-9]+$/, "رقم القطاع يجب أن يكون رقمًا")
    .required("رقم القطاع مطلوب"),
  countryCode: yup.string().required("كود الدولة مطلوب"),
});

export const citySchema = yup.object({
  cityCountry: yup.string().required("يجب اختيار الدولة"),
  city: multiLangRequired,
  cityNumber: yup
    .string()
    .matches(/^[0-9]+$/, "رقم المدينة يجب أن يكون رقمًا")
    .required("رقم المدينة مطلوب"),
});
