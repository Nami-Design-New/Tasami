import { useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import SelectFieldReactSelect from "../../forms/SelectFieldReactSelect";

import { useTranslation } from "react-i18next";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import SelectField from "../../forms/SelectField";
import useGetDhNationalities from "../../../hooks/dashboard/website-managment/nationalities/useGetDhNationalities";
import useGetMainCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";
import useGetSubCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetSubCategories";

export default function PublicNotificationsSidebarFilter() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { region, country, categoryId } = watch();
  useEffect(() => {
    if (!region) {
      setValue("country", "");
      setValue("city", "");
    }
  }, [region, setValue]);

  useEffect(() => {
    if (!country) {
      setValue("city", "");
    }
  }, [country, setValue]);

  const {
    regions,
    isLoading: isRegionsLoading,
    fetchNextPage: fetchRegionsNextPage,
    hasNextPage: hasRegionsNextPage,
    isFetchingNextPage: isFetchingRegionsNextPage,
  } = useGetRegions();

  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries(region, !!region);

  const {
    cities,
    isCitiesLaoding,
    fetchCitiesNextPage,
    hasCitiesNextPage,
    isFetchingCitiesNextPage,
  } = useGetCities(country, !!country);

  const { packages, isLoading } = useGetPackages();
  const { nationalities, isLoading: loadingNationalities } =
    useGetDhNationalities();

  const { mainCategories, isLoading: loadingMainCategories } =
    useGetMainCategories();
  const { subCategories, isLoading: subCategoriesLoading } =
    useGetSubCategories("", null, null, categoryId);
  const FieldWrapper = useCallback(
    ({
      name,
      labelKey,
      options,
      loading,
      hasNextPage,
      fetchNextPage,
      isDisabled,
      isFetchingNextPage,
    }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          // <SelectField
          <SelectFieldReactSelect
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "#0d0d0d05",
                borderRadius: "0px",
                border: "none",
              }),
            }}
            {...field}
            label={t(labelKey)}
            error={errors[name]?.message}
            options={
              options?.map((opt) => ({
                value: opt?.id,
                name: opt?.title,
              })) || []
            }
            disableFiledValue={`${t("dashboard.reports.choose")} ${t(
              labelKey,
            )}`}
            className="select_react_custom"
            disabled={isDisabled}
            loading={loading || isFetchingNextPage}
            onMenuScrollToBottom={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
          />
        )}
      />
    ),
    [
      control,
      errors,
      t,
      // fetchRegionsNextPage,
      // fetchCountriesNextPage,
      // fetchCitiesNextPage,
    ],
  );
  return (
    <section className="row">
      <div className="col-12 p-2">
        <div className="p-4 border border-1 rounded-3 py-4">
          <h4 className="float-text ">
            {t("dashboard.public_notifications.operationsSections")}
          </h4>
          <div className="row g-3">
            <div className="col-12 col-xl-12">
              <FieldWrapper
                name="region"
                labelKey="dashboard.reports.region"
                options={regions}
                loading={isRegionsLoading}
                isFetchingNextPage={isFetchingRegionsNextPage}
                hasNextPage={hasRegionsNextPage}
                fetchNextPage={fetchRegionsNextPage}
                isDisabled={false}
              />
            </div>

            <div className="col-12 col-xl-12">
              <FieldWrapper
                name="country"
                labelKey="dashboard.reports.country"
                options={countries}
                loading={isCountriesLaoding}
                isFetchingNextPage={isFetchingCountriesNextPage}
                hasNextPage={hasCountriesNextPage}
                fetchNextPage={fetchCountriesNextPage}
                isDisabled={!region}
              />
            </div>

            <div className="col-12 col-xl-12">
              <FieldWrapper
                name="city"
                labelKey="dashboard.reports.city"
                options={cities}
                loading={isCitiesLaoding}
                isFetchingNextPage={isFetchingCitiesNextPage}
                hasNextPage={hasCitiesNextPage}
                fetchNextPage={fetchCitiesNextPage}
                isDisabled={!country}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 p-2">
        <div className="p-4 border border-1 rounded-3 py-4">
          <h4 className="float-text ">
            {t("dashboard.public_notifications.bene")}
          </h4>
          <div className="row g-3">
            <div className="col-12 col-xl-12">
              <SelectField
                label={t("dashboard.public_notifications.accountType")}
                disableFiledValue={t("dashboard.public_notifications.all")}
                loading={isLoading}
                error={errors.packageId?.message}
                {...register("packageId")}
                options={packages?.map((packageData) => ({
                  value: packageData?.id,
                  name: packageData?.title,
                }))}
              />
            </div>
            <div className="col-12 col-xl-12">
              <SelectField
                label={t("dashboard.public_notifications.gender")}
                disableFiledValue={t("dashboard.public_notifications.all")}
                loading={loadingNationalities}
                error={errors.gender?.message}
                {...register("gender")}
                options={[
                  { id: "male", title: `${t("male")}` },
                  { id: "female", title: `${t("female")}` },
                ]?.map((gender) => ({
                  value: gender?.id,
                  name: gender?.title,
                }))}
              />
            </div>
            <div className="col-12 col-xl-12">
              <SelectField
                label={t("dashboard.public_notifications.nationality")}
                disableFiledValue={t("dashboard.public_notifications.all")}
                loading={loadingNationalities}
                error={errors.nationality?.message}
                {...register("nationality")}
                options={nationalities?.map((nationality) => ({
                  value: nationality?.id,
                  name: nationality?.title,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 p-2">
        <div className="p-4 border border-1 rounded-3 py-4">
          <h4 className="float-text ">
            {t("dashboard.public_notifications.interests")}
          </h4>
          <div className="row g-3">
            <div className="col-12 col-xl-12">
              <SelectField
                label={t("dashboard.public_notifications.category")}
                disableFiledValue={t("dashboard.public_notifications.all")}
                loading={loadingMainCategories}
                error={errors.categoryId?.message}
                {...register("categoryId")}
                options={mainCategories?.data?.map((category) => ({
                  value: category?.id,
                  name: category?.title,
                }))}
              />
            </div>

            <div className="col-12 col-xl-12">
              <div className="col-12 col-xl-12">
                <SelectField
                  label={t("dashboard.public_notifications.subcategory")}
                  disableFiledValue={t("dashboard.public_notifications.all")}
                  loading={subCategoriesLoading}
                  error={errors.categoryId?.message}
                  {...register("subcategoryId")}
                  options={subCategories?.map((category) => ({
                    value: category?.id,
                    name: category?.title,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
