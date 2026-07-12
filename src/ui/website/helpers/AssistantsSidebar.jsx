import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useGetCities from "../../../hooks/countries/useGetCities";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useGetHelpMechanisms from "../../../hooks/useGetHelpMechanisms";
import useAssistantsFilterForm from "../../../validations/personal-assistants-filter";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import useGetCountries from "../../../hooks/countries/useGetCountries";
import { Controller } from "react-hook-form";
import searchIcon from "../../../assets/icons/search.svg";
import maleIcon from "../../../assets/icons/male-outlined.svg";
import femaleIcon from "../../../assets/icons/female-outlined.svg";
const genderIcons = {
  male: maleIcon,
  female: femaleIcon,
};
export default function AssistantsSidebar({ isGoal = false }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { categories, isLoading } = useGetcategories();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useAssistantsFilterForm();
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

  const selectedFieldId = watch("field");
  const selectedHelpMechanism = watch("helpMechanism") || [];
  const selectedGender = watch("gender");
  const selectedDateOptions = watch("dateOptions");
  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // --- Sync form with URL on mount
  useEffect(() => {
    const paramsObj = Object.fromEntries([...searchParams]);
    const nextSearchParams = new URLSearchParams(searchParams);
    let shouldUpdateSearchParams = false;

    // ensure gender=both by default if not provided
    if (!paramsObj.gender) {
      paramsObj.gender = "both";
      nextSearchParams.set("gender", "both");
      shouldUpdateSearchParams = true;
    }
    if (!paramsObj.dateOptions) {
      paramsObj.dateOptions =
        paramsObj.startDate || paramsObj.startDateFrom || paramsObj.startDateTo
          ? "specified"
          : "unspecified";
      nextSearchParams.set("dateOptions", paramsObj.dateOptions);
      shouldUpdateSearchParams = true;
    }

    if (paramsObj.startDateFrom) {
      paramsObj.startDate = paramsObj.startDate || paramsObj.startDateFrom;
      delete paramsObj.startDateFrom;
      nextSearchParams.delete("startDateFrom");
      nextSearchParams.set("startDate", paramsObj.startDate);
      nextSearchParams.set("dateOptions", "specified");
      shouldUpdateSearchParams = true;
    }

    // handle helpMechanism array
    const helpMechanism = searchParams.getAll("helpMechanism");
    reset({
      ...paramsObj,
      helpMechanism,
    });

    if (shouldUpdateSearchParams) {
      setSearchParams(nextSearchParams);
    }
  }, [searchParams, reset, setSearchParams]);

  // --- Handle submit (sync with URL search params)
  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v && v !== ""),
    );

    // handle helpMechanism as array
    if (Array.isArray(data.helpMechanism) && data.helpMechanism.length > 0) {
      filteredData.helpMechanism = data.helpMechanism;
    } else {
      delete filteredData.helpMechanism;
    }

    // handle start date range
    if (data.dateOptions === "specified") {
      if (data.startDate) {
        filteredData.startDate = data.startDate;
      }
      if (data.startDateTo) {
        filteredData.startDateTo = data.startDateTo;
      }
    } else {
      delete filteredData.startDate;
      delete filteredData.startDateTo;
    }
    delete filteredData.startDateFrom;

    setSearchParams(filteredData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --- Reset (clear params + form)
  const handleReset = () => {
    const resetValues = {
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
    };
    reset(resetValues);
    setSearchParams(resetValues);
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
          </div>
          <div className="col-12 py-2 px-0">
            {" "}
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
            {/* <SelectField
              loading={isCitiesLoading}
              label={t("profile.country2")}
              id="city"
              {...register("country")}
              options={data?.map((country) => ({
                value: country.id,
                name: country.title,
              }))}
            /> */}
          </div>
          <div className="col-12 py-2 px-0">
            {" "}
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
            {/* <SelectField
              loading={isCitiesLoading}
              label={t("profile.city")}
              id="city"
              {...register("city")}
              options={cities?.data?.map((city) => ({
                value: city.id,
                name: city.title,
              }))}
            /> */}
          </div>
          <div className="col-12 py-2 px-0">
            <SelectField
              loading={isNationaliesLoading}
              label={
                isGoal ? t("profile.benNationality") : t("profile.nationality")
              }
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
              label={
                isGoal
                  ? t("website.platform.cv.field")
                  : t("website.platform.cv.field2")
              }
              {...register("field")}
              options={categories?.map((category) => ({
                value: category?.id,
                name: category?.title,
              }))}
              error={errors.field?.message}
            />
          </div>
          {isGoal && (
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
            </div>
          )}

          {/* gender */}
          <div className="col-12  py-2 px-0">
            <div className="identity-selector">
              <h6 className="identity-title">
                {isGoal
                  ? t("benId")
                  : t("website.platform.myAssistance.helperIdentity")}
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

          {isGoal && (
            <>
              {/* startDate */}
              <div className="col-12 py-2 px-0">
                <div className="identity-selector">
                  <h6 className="identity-title">
                    {t("website.platform.myAssistance.startDate2")}
                  </h6>
                  <div className="identity-container  flex-wrap">
                    {["specified", "unspecified"].map((g) => (
                      <label
                        key={g}
                        className={`identity-option ${
                          selectedDateOptions === g ? "active" : ""
                        }`}
                      >
                        <span>{t(`${g}`)}</span>
                        <input
                          type="radio"
                          value={g}
                          {...register("dateOptions")}
                        />
                      </label>
                    ))}
                  </div>
                  <p className="error-text">{errors.dateOptions?.message}</p>
                </div>
              </div>
              {selectedDateOptions === "specified" && (
                <div className="col-12 py-2 px-0">
                  <div className="row g-2">
                    <div className="col-12 col-sm-6">
                      <InputField
                        type="date"
                        label={t("from")}
                        {...register("startDate")}
                        error={errors.startDate?.message}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <InputField
                        type="date"
                        label={t("to")}
                        {...register("startDateTo")}
                        error={errors.startDateTo?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* helpMechanism */}
              <div className="col-12 py-2 px-0">
                <div className="identity-selector">
                  <h6 className="identity-title">
                    {t("website.platform.myAssistance.helpMechanism")}
                  </h6>
                  <div className="identity-container flex-wrap">
                    {!helpLoading && (
                      <>
                        {helpMechanisms.map((option) => (
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
                        ))}
                      </>
                    )}
                  </div>
                  <p className="error-text">{errors.helpMechanism?.message}</p>
                </div>
              </div>
            </>
          )}

          {/* buttons */}
          <div className="col-12 py-2 px-0">
            <div className="buttons">
              <CustomButton
                type="button"
                size="large"
                variant="outlined"
                onClick={handleReset}
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
