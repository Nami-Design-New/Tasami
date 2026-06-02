import { useSearchParams } from "react-router";
import InputField from "../../forms/InputField";
import { useTranslation } from "react-i18next";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useGetCities from "../../../hooks/countries/useGetCities";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import usePersonalFilterForm from "../../../validations/personal-offers-filter";
import { useEffect } from "react";
import SelectField from "../../forms/SelectField";
import CustomButton from "../../CustomButton";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import useGetHelpMechanisms from "../../../hooks/useGetHelpMechanisms";
import useGetCountries from "../../../hooks/countries/useGetCountries";
import { Controller } from "react-hook-form";
import ryalIcon from "../../../assets/icons/ryal.svg";
import searchIcon from "../../../assets/icons/search.svg";
import maleIcon from "../../../assets/icons/male-outlined.svg";
import femaleIcon from "../../../assets/icons/female-outlined.svg";
const genderIcons = {
  male: maleIcon,
  female: femaleIcon,
};

const PRICE_RANGE = {
  min: 1,
  max: 10000,
};

const AGE_RANGE = {
  min: 15,
  max: 65,
};

const DEFAULT_FILTER_VALUES = {
  search: "",
  city: "",
  country: "",
  nationality: "",
  field: "",
  specialization: "",
  gender: "both",
  rate: "all",
  priceMin: PRICE_RANGE.min,
  priceMax: PRICE_RANGE.max,
  ageMin: AGE_RANGE.min,
  ageMax: AGE_RANGE.max,
  helpMechanism: [],
};

const clampNumber = (value, min, max) => Math.min(Math.max(value, min), max);

const getNumberValue = (value) => {
  if (value === "" || value == null) return null;

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
};

const getSliderRange = (minValue, maxValue, range) => {
  const min = clampNumber(
    getNumberValue(minValue) ?? range.min,
    range.min,
    range.max,
  );
  const max = clampNumber(
    getNumberValue(maxValue) ?? range.max,
    range.min,
    range.max,
  );

  return [min, Math.max(min, max)];
};

const normalizeRangeField = (value, pairValue, range, direction) => {
  const fallback = direction === "min" ? range.min : range.max;
  const pairFallback = direction === "min" ? range.max : range.min;
  const normalizedValue = clampNumber(
    getNumberValue(value) ?? fallback,
    range.min,
    range.max,
  );
  const normalizedPairValue = clampNumber(
    getNumberValue(pairValue) ?? pairFallback,
    range.min,
    range.max,
  );

  if (direction === "min") {
    return Math.min(normalizedValue, normalizedPairValue);
  }

  return Math.max(normalizedValue, normalizedPairValue);
};

const normalizeRangeData = (data, minField, maxField, range) => {
  const min = clampNumber(
    getNumberValue(data[minField]) ?? range.min,
    range.min,
    range.max,
  );
  const max = clampNumber(
    getNumberValue(data[maxField]) ?? range.max,
    range.min,
    range.max,
  );

  return {
    ...data,
    [minField]: min,
    [maxField]: Math.max(min, max),
  };
};

export default function PersonalOffersSidebarFilter() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, isLoading } = useGetcategories();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = usePersonalFilterForm(helpMechanisms);
  const countryId = watch("country");
  const { data, isLoading: isCountriesLoading } = useGetCountries({
    search: "",
    pagination: "off",
  });
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagination: "off",
    countryId,
  });
  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");

  // Range slider watched values
  const priceMin = watch("priceMin");
  const priceMax = watch("priceMax");
  const ageMin = watch("ageMin");
  const ageMax = watch("ageMax");
  const [sliderPriceMin, sliderPriceMax] = getSliderRange(
    priceMin,
    priceMax,
    PRICE_RANGE,
  );
  const [sliderAgeMin, sliderAgeMax] = getSliderRange(
    ageMin,
    ageMax,
    AGE_RANGE,
  );

  const handlePriceChange = ([min, max]) => {
    setValue("priceMin", min, { shouldDirty: true });
    setValue("priceMax", max, { shouldDirty: true });
  };

  const handleAgeChange = ([min, max]) => {
    setValue("ageMin", min, { shouldDirty: true });
    setValue("ageMax", max, { shouldDirty: true });
  };

  const handleRangeInputChange = (field) => (e) => {
    setValue(field, e.target.value, {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleRangeInputBlur = (field, pairField, range, direction) => (e) => {
    setValue(
      field,
      normalizeRangeField(e.target.value, watch(pairField), range, direction),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  const selectedHelpMechanism = watch("helpMechanism") || [];
  const selectedFieldId = watch("field");
  const selectedGender = watch("gender");
  const selectedRate = watch("rate");
  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // --- Sync form with URL on mount
  useEffect(() => {
    const paramsObj = Object.fromEntries([...searchParams]);

    const helpMechanism = searchParams.getAll("helpMechanism");
    const formValues = {
      ...DEFAULT_FILTER_VALUES,
      ...paramsObj,
      helpMechanism,
    };

    reset(
      normalizeRangeData(
        normalizeRangeData(formValues, "priceMin", "priceMax", PRICE_RANGE),
        "ageMin",
        "ageMax",
        AGE_RANGE,
      ),
    );
  }, [searchParams, reset]);

  // --- Handle submit (sync with URL search params)
  const onSubmit = (data) => {
    const normalizedData = normalizeRangeData(
      normalizeRangeData(data, "priceMin", "priceMax", PRICE_RANGE),
      "ageMin",
      "ageMax",
      AGE_RANGE,
    );
    const filteredData = Object.fromEntries(
      Object.entries(normalizedData).filter(([, v]) => v && v !== ""),
    );

    if (normalizedData.helpMechanism?.length) {
      if (!normalizedData.helpMechanism.includes("all")) {
        filteredData.helpMechanism = normalizedData.helpMechanism;
      } else {
        delete filteredData.helpMechanism;
      }
    }

    if (normalizedData.rate === "all") {
      delete filteredData.rate;
    }

    setSearchParams(filteredData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --- Reset (clear params + form)
  const handleReset = () => {
    reset(DEFAULT_FILTER_VALUES);
    setSearchParams({});
  };
  return (
    <aside className="filter-side-bar">
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="filter-title">{t("website.assistants.filterTitle")}</h6>
        <div className="row">
          <div className="col-12 py-2 px-0">
            <InputField
              placeholder={t("search")}
              icon={searchIcon}
              {...register("search")}
            />
          </div>{" "}
          <div className="col-12 py-2 px-0">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectField
                  label={t("profile.country2")}
                  loading={isCountriesLoading}
                  id="country"
                  options={data?.map((country) => ({
                    value: country.id,
                    name: country.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.country?.message}
                />
              )}
            />
          </div>
          <div className="col-12 py-2 px-0">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <SelectField
                  loading={isCitiesLoading}
                  label={t("profile.city")}
                  id="city"
                  options={cities?.data?.map((city) => ({
                    value: city.id,
                    name: city.title,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.city?.message}
                />
              )}
            />
          </div>
          <div className="col-12 py-2 px-0">
            <SelectField
              loading={isNationaliesLoading}
              label={t("profile.helperNationality")}
              id="nationality"
              {...register("nationality")}
              options={nationalities?.data?.map((nationality) => ({
                value: nationality.id,
                name: nationality.title,
              }))}
            />
          </div>
          <div className="col-12 py-2 px-0">
            <SelectField
              loading={isLoading}
              label={t("website.platform.cv.field")}
              {...register("field")}
              options={categories?.map((category) => ({
                value: category?.id,
                name: category?.title,
              }))}
              error={errors.field?.message}
            />
          </div>{" "}
          <div className="col-12 py-2 px-0">
            <SelectField
              label={t("website.platform.cv.specialization")}
              {...register("specialization")}
              options={subCategories.map((sub) => ({
                value: sub.id,
                name: sub.title,
              }))}
              error={errors.specialization?.message}
            />
          </div>{" "}
          {/* Gender  */}
          <div className="col-12  py-2 px-0">
            <div className="identity-selector">
              <h6 className="identity-title">
                {t("website.platform.myAssistance.identity")}
              </h6>
              <div className="identity-container  flex-wrap">
                {["both", "male", "female"].map((g) => (
                  <label
                    key={g}
                    className={`identity-option ${
                      selectedGender === g ? "active" : ""
                    }`}
                  >
                    {g !== "both" && (
                      <img src={genderIcons[g]} alt={t(`auth.${g}`)} />
                    )}
                    <span>{t(`auth.${g}`)}</span>
                    <input type="radio" value={g} {...register("gender")} />
                  </label>
                ))}
              </div>
              <p className="error-text">{errors.gender?.message}</p>
            </div>
          </div>
          {/* helpMechanism */}
          <div className="col-12 py-2 px-0">
            <div className="identity-selector">
              <h6 className="identity-title">
                {t("website.platform.myAssistance.helpMechanism")}
              </h6>
              <div className="identity-container flex-wrap">
                {!helpLoading && (
                  <>
                    {helpMechanisms.map((option) => {
                      return (
                        <label
                          key={option.id}
                          className={`identity-option d-flex align-items-center justify-contnet-center gap-0 ${
                            selectedHelpMechanism.includes(String(option.id))
                              ? "active"
                              : ""
                          }`}
                        >
                          <span>{option.title}</span>
                          <input
                            type="checkbox"
                            value={option.id}
                            {...register("helpMechanism")}
                          />
                        </label>
                      );
                    })}
                  </>
                )}
              </div>
              <p className="error-text">{errors.helpMechanism?.message}</p>
            </div>
          </div>
          {/* Price Range Slider */}
          <div className="col-12 py-2 px-0">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="slider-title">
                {t("website.assistants.priceTitle")}
              </h6>
              <button
                className="text-danger"
                type="button"
                onClick={() => {
                  setValue("priceMin", PRICE_RANGE.min);
                  setValue("priceMax", PRICE_RANGE.max);
                }}
              >
                {t("website.assistants.clear")}
              </button>
            </div>
            <RangeSlider
              min={1}
              max={10000}
              step={1}
              value={[sliderPriceMin, sliderPriceMax]}
              onInput={handlePriceChange}
              className="w-100"
            />
            <div className="d-flex justify-content-between mt-2  gap-2">
              <InputField
                type="number"
                label={t("website.assistants.priceMinLabel")}
                icon={ryalIcon}
                value={priceMin ?? ""}
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                step={1}
                onChange={handleRangeInputChange("priceMin")}
                onBlur={handleRangeInputBlur(
                  "priceMin",
                  "priceMax",
                  PRICE_RANGE,
                  "min",
                )}
                error={errors.priceMin?.message}
              />

              <InputField
                type="number"
                label={t("website.assistants.priceMaxLabel")}
                icon={ryalIcon}
                value={priceMax ?? ""}
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                step={1}
                onChange={handleRangeInputChange("priceMax")}
                onBlur={handleRangeInputBlur(
                  "priceMax",
                  "priceMin",
                  PRICE_RANGE,
                  "max",
                )}
                error={errors.priceMax?.message}
              />
            </div>
          </div>{" "}
          {/* Age Range Slider */}
          <div className="col-12 py-2 px-0">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="slider-title">
                {t("website.assistants.ageTitle")}
              </h6>
              <button
                type="button"
                className="text-danger"
                onClick={() => {
                  setValue("ageMin", AGE_RANGE.min);
                  setValue("ageMax", AGE_RANGE.max);
                }}
              >
                {t("website.assistants.clear")}
              </button>
            </div>

            <RangeSlider
              min={15}
              max={65}
              step={1}
              value={[sliderAgeMin, sliderAgeMax]}
              onInput={handleAgeChange}
              className="w-100"
            />
            <div className="d-flex justify-content-between mt-2 gap-2">
              <InputField
                type="number"
                label={t("website.assistants.ageMinLabel")}
                value={ageMin ?? ""}
                min={AGE_RANGE.min}
                max={AGE_RANGE.max}
                step={1}
                onChange={handleRangeInputChange("ageMin")}
                onBlur={handleRangeInputBlur(
                  "ageMin",
                  "ageMax",
                  AGE_RANGE,
                  "min",
                )}
                error={errors.ageMin?.message}
              />

              <InputField
                type="number"
                value={ageMax ?? ""}
                label={t("website.assistants.ageMaxLabel")}
                min={AGE_RANGE.min}
                max={AGE_RANGE.max}
                step={1}
                onChange={handleRangeInputChange("ageMax")}
                onBlur={handleRangeInputBlur(
                  "ageMax",
                  "ageMin",
                  AGE_RANGE,
                  "max",
                )}
                error={errors.ageMax?.message}
              />
            </div>
          </div>
          <div className="col-12  py-2 px-0">
            <div className="identity-selector">
              <h6 className="identity-title">
                {t("website.assistants.ratingTitle")}
              </h6>
              <div className="identity-container flex-wrap">
                {["all", "1", "2", "3", "4"].map((g) => (
                  <label
                    key={g}
                    className={`identity-option text-dark d-flex gap-1 align-items-center   ${
                      selectedRate === g ? "active" : ""
                    }`}
                  >
                    {g === "all" && <span>{t("auth.all")}</span>}
                    {g !== "all" && (
                      <>
                        <i
                          style={{ color: "#FFBE4C" }}
                          className="fa-solid fa-star"
                        ></i>
                        <span> {t("website.assistants.moreThan")} </span>
                        <span>{t(` ${g}`)}</span>
                      </>
                    )}

                    <input type="radio" value={g} {...register("rate")} />
                  </label>
                ))}
              </div>
              <p className="error-text">{errors.rate?.message}</p>
            </div>
          </div>
          <div className="col-12 py-2 px-0">
            <div className="buttons">
              <CustomButton
                type="button"
                variant="outlined"
                onClick={handleReset}
                size="large"
              >
                {t("website.assistants.reset")}
              </CustomButton>
              <CustomButton type="submit" fullWidth size="large">
                {t("website.assistants.filter")}
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
}
