import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { setFilters } from "../../../redux/slices/performanceFilter";
import { performanceFilterSchema } from "../../../validations/performanceFilterSchema";

import { Form } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { useTranslation } from "react-i18next";

// Import translation files (you'll need to set up i18n)
// import arTranslations from '../../../locales/ar.json';
// import enTranslations from '../../../locales/en.json';

const regionOptions = [
  { value: "middleEast", name: "middleEast" },
  { value: "asia", name: "asia" },
];

const countryOptions = [
  { value: "saudiArabia", name: "saudiArabia" },
  { value: "egypt", name: "egypt" },
];

const cityOptions = [
  { value: "riyadh", name: "riyadh" },
  { value: "dammam", name: "dammam" },
];

const PerformanceFilter = ({ metrics }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    region: searchParams.get("region") || "",
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    fromDate: searchParams.get("fromDate") || "",
    toDate: searchParams.get("toDate") || "",
    metrics: searchParams.get("metrics")
      ? searchParams.get("metrics").split(",").map(Number)
      : [],
    showSubData: searchParams.get("showSubData") === "true",
    actionType: searchParams.get("actionType") || "",
    showSubDataCustom: searchParams.get("showSubDataCustom") === "true",
    timeRange: searchParams.get("timeRange") || "month",
    showFields: searchParams.get("showFields") === "true",
    showSpecializations: searchParams.get("showSpecializations") === "true",
    reportType: searchParams.get("reportType") || "table",
  });

  const methods = useForm({
    resolver: yupResolver(performanceFilterSchema),
    defaultValues: formData,
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

  const { region, country, city } = watch();
  const showSubDataCheckbox = (region && !country) || (country && !city);

  const onSubmit = (formData) => {
    const allFormData = {
      region: formData.region,
      country: formData.country,
      city: formData.city,
      showSubData: formData.showSubData,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      timeRange: formData.timeRange,
      showFields: formData.showFields,
      showSpecializations: formData.showSpecializations,
      reportType: formData.reportType,
      showSubDataCustom: formData.showSubDataCustom,
      metrics: formData.metrics,
      actionType: formData.actionType,
    };

    console.log("All Form Data:", allFormData);

    const params = new URLSearchParams();
    Object.entries(allFormData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(","));
      } else if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
    dispatch(setFilters(allFormData));
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);
  };

  const FieldWrapper = useCallback(
    ({ name, labelKey, options }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label={t(labelKey)}
            error={errors[name]?.message}
            options={options.map((opt) => ({
              ...opt,
              name: t(opt.name),
            }))}
            disableFiledValue={`${t("dashboard.reports.choose")} ${t(labelKey)}`}
            className="border-0 rounded-0 "
            style={{
              background: "#f8f8f8"
            }}
          />
        )}
      />
    ),
    [control, errors, t]
  );

  return (
    <div className="performance-filter border border-2">
      <h3 className="performance-filter__header">
        {t("dashboard.reports.filterOptions")}
      </h3>
      <FormProvider {...methods}>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            {/* Immediate Indicators */}
            <div className="p-4 border border-1 rounded-3 py-4">
              <h4>{t("dashboard.reports.immediateIndicators")}</h4>

              <div className="col-12  col-md-6 col-lg-4 col-xl-12">
                <FieldWrapper
                  name="region"
                  labelKey={t("dashboard.reports.region")}
                  options={regionOptions}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-12">
                <FieldWrapper
                  name="country"
                  labelKey={t("dashboard.reports.country")}
                  options={countryOptions}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-12">
                <FieldWrapper
                  name="city"
                  labelKey={t("dashboard.reports.city")}
                  options={cityOptions}
                />
              </div>

              {showSubDataCheckbox && (
                <div className=" col-12  ">
                  <div className="">
                    <Form.Check
                      type="switch"
                      id="showSubData"
                      label={t("dashboard.reports.showSubData")}
                      {...register("showSubData")}
                      style={{ width: "100%" }}
                      onChange={(e) =>
                        handleInputChange("showSubData", e.target.checked)
                      }
                    />
                  </div>
                </div>
              )}

              <div className="d-flex p-2 justify-content-end  align-items-end mt-3 ">
                <CustomButton
                  size="large"
                  type="button"
                  onClick={() => {
                    const basicData = {
                      region: methods.getValues("region"),
                      country: methods.getValues("country"),
                      city: methods.getValues("city"),
                      showSubData: methods.getValues("showSubData"),
                    };
                    console.log("Basic Filters Update:", basicData);
                    dispatch(setFilters({ ...basicData, type: "basic" }));
                  }}
                >
                  {t("dashboard.reports.update")}
                </CustomButton>
              </div>
            </div>

            {/* Custom Reports */}
            <div className="p-4 border border-1 rounded-3 py-4 mt-4">
              <h4>{t("dashboard.reports.customReports")}</h4>

              <div className="col-12 col-md-6 col-lg-6 col-xl-12 ">
                <div className="performance-metrics">
                  <div className="d-flex align-items-center gap-1 my-2">
                    <input
                      type="checkbox"
                      id="sub_data"
                      {...register("showSubDataCustom")}
                      onChange={(e) =>
                        handleInputChange("showSubDataCustom", e.target.checked)
                      }
                    />
                    <label htmlFor="sub_data">
                      {t("dashboard.reports.showSubData")}
                    </label>
                  </div>{" "}
                </div>
                <InputField
                  type="date"
                  label={t("dashboard.reports.fromDate")}
                  error={errors.fromDate?.message}
                  {...register("fromDate")}
                  onChange={(e) =>
                    handleInputChange("fromDate", e.target.value)
                  }
                />
              </div>

              <div className="col-12  col-md-6 col-lg-6 col-xl-12">
                <InputField
                  type="date"
                  label={t("dashboard.reports.toDate")}
                  error={errors.toDate?.message}
                  {...register("toDate")}
                  onChange={(e) => handleInputChange("toDate", e.target.value)}
                />
              </div>

              {/* Data Range */}
              <div className="performance-metrics ">
                <h3>{t("dashboard.reports.dataRange")}</h3>
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input
                    type="radio"
                    id="week"
                    value="weekly"
                    {...register("timeRange")}
                    onChange={(e) =>
                      handleInputChange("timeRange", e.target.value)
                    }
                  />
                  <label htmlFor="week">{t("dashboard.reports.weekly")}</label>
                </div>{" "}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input
                    type="radio"
                    id="month"
                    value="monthly"
                    {...register("timeRange")}
                    onChange={(e) =>
                      handleInputChange("timeRange", e.target.value)
                    }
                  />
                  <label htmlFor="month">
                    {t("dashboard.reports.monthly")}
                  </label>
                </div>{" "}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input
                    type="radio"
                    id="quatreYear"
                    value="quarterly"
                    {...register("timeRange")}
                    onChange={(e) =>
                      handleInputChange("timeRange", e.target.value)
                    }
                  />
                  <label htmlFor="quatreYear">
                    {t("dashboard.reports.quarterly")}
                  </label>
                </div>{" "}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input
                    type="radio"
                    id="year"
                    value="yearly"
                    {...register("timeRange")}
                    onChange={(e) =>
                      handleInputChange("timeRange", e.target.value)
                    }
                  />
                  <label htmlFor="year">{t("dashboard.reports.yearly")}</label>
                </div>{" "}
              </div>

              {/* Show Classifications */}
              <div className="performance-metrics">
                <h3>{t("dashboard.reports.showClassifications")}</h3>
                <div className="mt-3 d-flex justify-content-between w-75">
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input
                      type="checkbox"
                      id="field"
                      {...register("showFields")}
                      onChange={(e) =>
                        handleInputChange("showFields", e.target.checked)
                      }
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
                      onChange={(e) =>
                        handleInputChange(
                          "showSpecializations",
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor="category">
                      {t("dashboard.reports.specializations")}
                    </label>
                  </div>{" "}
                </div>
              </div>

              {/* Report Elements */}
              <div className="performance-metrics">
                <h3>{t("dashboard.reports.reportElements")}</h3>
                <div className="mt-3 d-flex justify-content-between w-75">
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input
                      type="radio"
                      id="table"
                      value="table"
                      {...register("reportType")}
                      onChange={(e) =>
                        handleInputChange("reportType", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("reportType", e.target.value)
                      }
                    />
                    <label htmlFor="chart">
                      {t("dashboard.reports.chart")}
                    </label>
                  </div>{" "}
                </div>
              </div>

              <div className="d-flex p-2 justify-content-end  align-items-end mt-3 ">
                <CustomButton
                  size="large"
                  type="button"
                  onClick={() => {
                    const previewData = {
                      showSubDataCustom: methods.getValues("showSubDataCustom"),
                      fromDate: methods.getValues("fromDate"),
                      toDate: methods.getValues("toDate"),
                      timeRange: methods.getValues("timeRange"),
                      showFields: methods.getValues("showFields"),
                      showSpecializations: methods.getValues(
                        "showSpecializations"
                      ),
                      reportType: methods.getValues("reportType"),
                    };
                    console.log("Preview Report Data:", previewData);
                    alert(
                      `${t("dashboard.reports.previewReport")}:\n${t(
                        "dashboard.reports.dataRange"
                      )}: ${t(previewData.timeRange)}\n${t(
                        "dashboard.reports.showClassifications"
                      )}: ${
                        previewData.showFields
                          ? t("dashboard.reports.fields")
                          : ""
                      } ${
                        previewData.showSpecializations
                          ? t("dashboard.reports.specializations")
                          : ""
                      }\n${t("dashboard.reports.reportElements")}: ${t(
                        previewData.reportType
                      )}`
                    );
                  }}
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
