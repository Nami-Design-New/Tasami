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

export default function AssistantsSidebar({ isGoal = false }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { categories, isLoading } = useGetcategories();
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagination: "off",
  });
  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useAssistantsFilterForm();

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

    // ensure gender=both by default if not provided
    if (!paramsObj.gender) {
      paramsObj.gender = "both";
      setSearchParams(paramsObj);
    }
    if (!paramsObj.dateOptions) {
      paramsObj.dateOptions = "unspecified";
      setSearchParams(paramsObj);
    }

    // handle helpMechanism array
    const helpMechanism = searchParams.getAll("helpMechanism");
    reset({
      ...paramsObj,
      helpMechanism,
    });
  }, [searchParams, reset, setSearchParams]);

  // --- Handle submit (sync with URL search params)
  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v && v !== "")
    );

    // handle helpMechanism as array
    if (Array.isArray(data.helpMechanism) && data.helpMechanism.length > 0) {
      filteredData.helpMechanism = data.helpMechanism;
    } else {
      delete filteredData.helpMechanism;
    }

    // handle startDate
    if (data.dateOptions === "defined" && data.startDate) {
      filteredData.startDate = data.startDate;
    } else {
      delete filteredData.startDate;
    }

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
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
      dateOptions: "unspecified",
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
              icon="/icons/search.svg"
              {...register("search")}
            />
          </div>
          <div className="col-12 py-2 px-0">
            <SelectField
              loading={isCitiesLoading}
              label={t("profile.city")}
              id="city"
              {...register("city")}
              options={cities?.data?.map((city) => ({
                value: city.id,
                name: city.title,
              }))}
            />
          </div>
          <div className="col-12 py-2 px-0">
            <SelectField
              loading={isNationaliesLoading}
              label={t("profile.nationality")}
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
          </div>
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

          {/* gender */}
          <div className="col-12  py-2 px-0">
            <div className="identity-selector">
              <h6 className="identity-title">
                {t("benId")}
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
                      <img
                        src={`/icons/${g}-outlined.svg`}
                        alt={t(`auth.${g}`)}
                      />
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
                    {t("website.platform.myAssistance.startDate")}
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
                  <p className="error-text">{errors.gender?.message}</p>
                </div>
              </div>
              {selectedDateOptions === "specified" && (
                <div className="col-12 py-2 px-0">
                  <InputField
                    type="date"
                    lable={t("sartDate")}
                    {...register("startDate")}
                  />
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
