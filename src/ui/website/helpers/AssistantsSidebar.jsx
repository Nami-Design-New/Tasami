import { useTranslation } from "react-i18next";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import useGetCities from "../../../hooks/countries/useGetCities";
import useGetNationalities from "../../../hooks/countries/useGetNationalities";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useAssistantsFilterForm from "../../../validations/personal-assistants-filter";

export default function AssistantsSidebar() {
  const { t } = useTranslation();
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

  return (
    <aside className="filter-side-bar">
      <form className="form_ui">
        <div className="row">
          <div className="col-12 py-2 px-0">
            <InputField placeholder="search" icon="/icons/search.svg" />
          </div>
          <div className="col-12 py-2 px-0">
            <SelectField
              loading={isCitiesLoading}
              label={t("profile.city")}
              id="city"
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
              <div className="identity-container">
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
        </div>
      </form>
    </aside>
  );
}
