import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useGetCities from "../../../hooks/dashboard/regions/useGetCities";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import { setFilters } from "../../../redux/slices/performanceFilter";
import { performanceFilterSchema } from "../../../validations/performanceFilterSchema";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectFieldReactSelect from "../../forms/SelectFieldReactSelect";

const TIME_RANGES = [
  { value: "weekly", labelKey: "dashboard.reports.weekly" },
  { value: "monthly", labelKey: "dashboard.reports.monthly" },
  { value: "quarterly", labelKey: "dashboard.reports.quarterly" },
  { value: "yearly", labelKey: "dashboard.reports.yearly" },
];

const PerformanceFilter = ({ searchType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFormData = {
    region: searchParams.get("region") || "",
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    fromDate: searchParams.get("fromDate") || "",
    toDate: searchParams.get("toDate") || "",
    showSubData: searchParams.get("showSubData") === "true",
    actionType: searchParams.get("actionType") || "",
    showSubDataCustom: searchParams.get("showSubDataCustom") === "true",
    timeRange: searchParams.get("timeRange") || "",
    showFields: searchParams.get("showFields") === "true",
    showSpecializations: searchParams.get("showSpecializations") === "true",
    reportType: searchParams.get("reportType") || "table",
  };

  const methods = useForm({
    resolver: yupResolver(performanceFilterSchema),
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const { region, country, city, timeRange } = watch();
  const showSubDataCheckbox = (region && !country) || (country && !city);

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
  } = useGetRegions(true);

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

  const handlePreviewReport = () => {
    const previewData = {
      showSubDataCustom: methods.getValues("showSubDataCustom"),
      fromDate: methods.getValues("fromDate"),
      toDate: methods.getValues("toDate"),
      period: methods.getValues("timeRange"),
      showFields: methods.getValues("showFields"),
      showSpecializations: methods.getValues("showSpecializations"),
      reportType: methods.getValues("reportType"),
    };

    dispatch(setFilters(previewData));
  };

  const handleUpdateBasicFilters = () => {
    const basicData = {
      region: methods.getValues("region"),
      country: methods.getValues("country"),
      city: methods.getValues("city"),
      showSubData: methods.getValues("showSubData"),
      searchType: searchType,
    };

    dispatch(setFilters(basicData));

    // const params = new URLSearchParams(searchParams);

    // if (basicData.region) params.set("region", basicData.region);
    // else params.delete("region");
    // if (basicData.country) params.set("country", basicData.country);
    // else params.delete("country");
    // if (basicData.city) params.set("city", basicData.city);
    // else params.delete("city");

    // params.set("showSubData", basicData.showSubData.toString());

    // setSearchParams(params);
  };

  //send all
  const onSubmitCustomReport = (formData) => {
    const allFormData = {
      region: methods.getValues("region"),
      country: methods.getValues("country"),
      city: methods.getValues("city"),
      showSubData: methods.getValues("showSubData"),

      fromDate: formData.fromDate,
      toDate: formData.toDate,
      timeRange: formData.timeRange,
      showFields: formData.showFields,
      showSpecializations: formData.showSpecializations,
      reportType: formData.reportType,
      showSubDataCustom: formData.showSubDataCustom,
      metrics: formData.metrics,
      actionType: formData.actionType,
      searchType: searchType,
    };

    dispatch(setFilters(allFormData));

    // تحديث URL Search Params
    const params = new URLSearchParams(searchParams);
    Object.entries(allFormData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(","));
      } else if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

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
    <div className="performance-filter border border-2">
      <h3 className="performance-filter__header">
        {t("dashboard.reports.filterOptions")}
      </h3>
      <FormProvider {...methods}>
        <form className="form_ui" onSubmit={handleSubmit(onSubmitCustomReport)}>
          <div className="row g-3">
            <div className="p-4 border border-1 rounded-3 py-4">
              <h4>{t("dashboard.reports.immediateIndicators")}</h4>
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

                {/* {showSubDataCheckbox && (
                  <div className="col-12">
                    <Form.Check
                      type="switch"
                      id="showSubData"
                      label={t("dashboard.reports.showSubData")}
                      {...register("showSubData")}
                      style={{ width: "100%" }}
                    />
                  </div>
                )} */}
              </div>

              <div className="d-flex p-2 justify-content-end align-items-end mt-3 ">
                <CustomButton
                  size="large"
                  type="button"
                  onClick={handleUpdateBasicFilters}
                >
                  {t("dashboard.reports.update")}
                </CustomButton>
              </div>
            </div>

            <div className="p-4 border border-1 rounded-3 py-4 mt-4">
              <h4>{t("dashboard.reports.customReports")}</h4>
              <div className="row g-3">
                <div className="col-12">
                  <div className="performance-metrics">
                    {/* <div className="d-flex align-items-center gap-1 my-2">
                      <input
                        type="checkbox"
                        id="sub_data_custom"
                        {...register("showSubDataCustom")}
                      />
                      <label htmlFor="sub_data_custom">
                        {t("dashboard.reports.showSubData")}
                      </label>
                    </div>{" "} */}
                  </div>
                </div>

                <div className="col-12">
                  <InputField
                    type="date"
                    label={t("dashboard.reports.fromDate")}
                    error={errors.fromDate?.message}
                    {...register("fromDate")}
                  />
                </div>

                <div className="col-12">
                  <InputField
                    type="date"
                    label={t("dashboard.reports.toDate")}
                    error={errors.toDate?.message}
                    {...register("toDate")}
                  />
                </div>
              </div>

              <div className="performance-metrics mt-4">
                <h3>{t("dashboard.reports.dataRange")}</h3>
                {TIME_RANGES.map((range) => (
                  <div
                    className="d-flex align-items-center gap-1 mt-2"
                    key={range.value}
                  >
                    <input
                      type="radio"
                      id={range.value}
                      value={range.value}
                      {...register("timeRange")}
                      checked={timeRange === range.value}
                      onChange={() => setValue("timeRange", range.value)}
                    />
                    <label htmlFor={range.value}>{t(range.labelKey)}</label>
                  </div>
                ))}
              </div>

              {/* <div className="performance-metrics mt-4">
                <h3>{t("dashboard.reports.showClassifications")}</h3>
                <div className="mt-3 d-flex justify-content-between w-75">
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input
                      type="checkbox"
                      id="field"
                      {...register("showFields")}
                    />
                    <label htmlFor="field">
                      {t("dashboard.reports.fields")}
                    </label>
                  </div>{" "}
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input
                      type="checkbox"
                      id="category"
                      {...register("showSpecializations")}
                    />
                    <label htmlFor="category">
                      {t("dashboard.reports.specializations")}
                    </label>
                  </div>{" "}
                </div>
              </div> */}

              {/* <div className="performance-metrics mt-4">
                <h3>{t("dashboard.reports.reportElements")}</h3>
                <div className="mt-3 d-flex justify-content-between w-75">
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input
                      type="radio"
                      id="table"
                      value="table"
                      {...register("reportType")}
                    />
                    <label htmlFor="table">
                      {t("dashboard.reports.table")}
                    </label>
                  </div>{" "}
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input
                      type="radio"
                      id="chart"
                      value="chart"
                      {...register("reportType")}
                    />
                    <label htmlFor="chart">
                      {t("dashboard.reports.chart")}
                    </label>
                  </div>{" "}
                </div>
              </div> */}

              <div className="d-flex p-2 justify-content-end align-items-end mt-3 ">
                <CustomButton
                  size="large"
                  type="button"
                  onClick={handlePreviewReport}
                >
                  {t("dashboard.reports.previewReport")}
                </CustomButton>
              </div>
            </div>
          </div>

          <button type="submit" style={{ display: "none" }} />
        </form>
      </FormProvider>
    </div>
  );
};

export default PerformanceFilter;
