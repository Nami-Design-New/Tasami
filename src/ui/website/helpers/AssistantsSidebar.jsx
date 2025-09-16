import { useTranslation } from "react-i18next";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import useGetCities from "../../../hooks/countries/useGetCities";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useAssistantsFilterForm from "../../../validations/personal-assistants-filter";
import CustomButton from "../../CustomButton";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

export default function AssistantsSidebar() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { categories, isLoading } = useGetcategories();
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagenation: "off",
    // countryId,
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
  const selectedGender = watch("gender");
  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // --- Sync form with URL on mount
  useEffect(() => {
    const paramsObj = Object.fromEntries([...searchParams]);
    reset(paramsObj); // populate form fields from query params
  }, [searchParams, reset]);

  // --- Handle submit (sync with URL search params)
  const onSubmit = (data) => {
    // Remove empty values before setting params
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v && v !== "")
    );
    setSearchParams(filteredData);
  };

  // --- Reset (clear params + form)
  const handleReset = () => {
    reset({
      search: "",
      city: "",
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
    });
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
          <div className="col-12 py-2 px-0">
            <div className="buttons">
              <CustomButton
                type="button"
                variant="outlined"
                onClick={handleReset}
              >
                {t("website.assistants.reset")}
              </CustomButton>
              <CustomButton type="submit" fullWidth>
                {t("website.assistants.filter")}
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
}
