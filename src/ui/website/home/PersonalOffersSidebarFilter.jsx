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
export default function PersonalOffersSidebarFilter() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, isLoading } = useGetcategories();
  const { helpMechanisms, isLoading: helpLoading } = useGetHelpMechanisms();
  const { cities, isCitiesLoading } = useGetCities({
    search: "",
    pagenation: "off",
  });
  const { nationalities, isLoading: isNationaliesLoading } =
    useGetNationalities("", "off");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = usePersonalFilterForm(helpMechanisms);

  // Range slider watched values
  const priceMin = Number(watch("priceMin"));
  const priceMax = Number(watch("priceMax"));
  const ageMin = Number(watch("ageMin"));
  const ageMax = Number(watch("ageMax"));

  const handlePriceChange = ([min, max]) => {
    setValue("priceMin", min, { shouldDirty: true });
    setValue("priceMax", max, { shouldDirty: true });
  };

  const handleAgeChange = ([min, max]) => {
    setValue("ageMin", min, { shouldDirty: true });
    setValue("ageMax", max, { shouldDirty: true });
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
    reset({
      ...paramsObj,
      helpMechanism,
    });
  }, [searchParams, reset]);

  // --- Handle submit (sync with URL search params)
  const onSubmit = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v && v !== "")
    );

    if (data.helpMechanism?.length) {
      if (!data.helpMechanism.includes("all")) {
        filteredData.helpMechanism = data.helpMechanism;
      } else {
        delete filteredData.helpMechanism;
      }
    }

    if (data.rate === "all") {
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
    reset({
      search: "",
      city: "",
      nationality: "",
      field: "",
      specialization: "",
      gender: "both",
      priceMin: 1,
      priceMax: 9000000,
      ageMin: 15,
      ageMax: 65,
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
          </div>{" "}
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
          {/* helpMechanism */}
          <div className="col-12 p-2">
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
                          style={{
                            padding: "8px",
                            fontSize: "12px",
                            height: "46px",
                            borderRadius: "8px",
                          }}
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
                  setValue("priceMin", 1);
                  setValue("priceMax", 9000000);
                }}
              >
                {t("website.assistants.clear")}
              </button>
            </div>
            <RangeSlider
              min={1}
              max={9000000}
              step={20}
              value={[priceMin, priceMax]}
              onInput={handlePriceChange}
              className="w-100"
            />
            <div className="d-flex justify-content-between mt-2  gap-2">
              <InputField
                type="number"
                label={t("website.assistants.priceMinLabel")}
                icon="/icons/ryal.svg"
                value={priceMin}
                min={priceMin}
                max={priceMax}
                step={20}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!isNaN(v)) {
                    setValue("priceMin", v, { shouldDirty: true });
                  }
                }}
              />

              <InputField
                type="number"
                label={t("website.assistants.priceMaxLabel")}
                icon="/icons/ryal.svg"
                value={priceMax}
                min={priceMin}
                max={priceMax}
                step={100}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!isNaN(v)) {
                    setValue("priceMax", v, { shouldDirty: true });
                  }
                }}
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
                  setValue("ageMin", 16);
                  setValue("ageMax", 65);
                }}
              >
                {t("website.assistants.clear")}
              </button>
            </div>

            <RangeSlider
              min={15}
              max={65}
              step={1}
              value={[ageMin, ageMax]}
              onInput={handleAgeChange}
              className="w-100"
            />
            <div className="d-flex justify-content-between mt-2 gap-2">
              <InputField
                type="number"
                label={t("website.assistants.ageMinLabel")}
                value={ageMin}
                min={16}
                max={ageMax}
                step={1}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!isNaN(v)) {
                    setValue("ageMin", v, { shouldDirty: true });
                  }
                }}
              />

              <InputField
                type="number"
                value={ageMax}
                label={t("website.assistants.ageMaxLabel")}
                min={ageMin}
                max={65}
                step={1}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!isNaN(v)) {
                    setValue("ageMax", v, { shouldDirty: true });
                  }
                }}
              />
            </div>
          </div>
          <div className="col-12  py-2 px-0">
            <div className="identity-selector">
              <h6 className="identity-title">
                {t("website.assistants.ratingTitle")}
              </h6>
              <div className="identity-container flex-wrap">
                {["all", "1", "2", "3", "4", "5"].map((g) => (
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
