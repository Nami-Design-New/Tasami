import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import SelectField from "../../forms/SelectField";
import InputField from "../../forms/InputField";
import MetricsList from "./MetricsList";
import SubmitButton from "../../forms/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { performanceFilterSchema } from "../../../validations/performanceFilterSchema";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../redux/slices/performanceFilter";

const PerformanceFilter = ({ metrics }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL params
  const getInitialValues = () => {
    return {
      region: searchParams.get("region") || "",
      country: searchParams.get("country") || "",
      city: searchParams.get("city") || "",
      fromDate: searchParams.get("fromDate") || "",
      toDate: searchParams.get("toDate") || "",
      metrics: searchParams.get("metrics")
        ? searchParams.get("metrics").split(",").map(Number)
        : [],
      showSubData: searchParams.get("showSubData") === "true",
    };
  };
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(performanceFilterSchema),
    defaultValues: getInitialValues(),
    mode: "onChange",
  });

  const updateSearchParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams);
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        params.set(
          key,
          Array.isArray(value) ? value.join(",") : value.toString()
        );
      } else {
        params.delete(key);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );
  const region = watch("region");
  const country = watch("country");
  const city = watch("city");

  const showSubDataCheckbox = (region && !country) || (country && !city);

  // Update sub options (e.g., from database)  // Watch for form field changes
  const fromDate = watch("fromDate");
  const toDate = watch("toDate");
  const showSubData = watch("showSubData");

  useEffect(() => {
    updateSearchParams("region", region);
  }, [region, updateSearchParams]);

  useEffect(() => {
    updateSearchParams("country", country);
  }, [country, updateSearchParams]);

  useEffect(() => {
    updateSearchParams("city", city);
  }, [city, updateSearchParams]);

  useEffect(() => {
    updateSearchParams("fromDate", fromDate);
  }, [fromDate, updateSearchParams]);

  useEffect(() => {
    updateSearchParams("toDate", toDate);
  }, [toDate, updateSearchParams]);
  useEffect(() => {
    updateSearchParams("showSubData", showSubData);
  }, [showSubData, updateSearchParams]);

  const handleMetricToggle = (id) => {
    const selected = watch("metrics") || [];
    const isSelected = selected.includes(id);
    const newSelection = isSelected
      ? selected.filter((i) => i !== id)
      : [...selected, id];
    setValue("metrics", newSelection);
    updateSearchParams("metrics", newSelection);
  };
  const onSubmit = async (formData) => {
    // Update URL with form data
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, value.toString());
        }
      }
    });
    setSearchParams(params);

    // Update Redux state
    dispatch(setFilters(formData));

    // const response = await fetchFilteredReportData(formData);
    // dispatch(setFilteredData(response));
  };

  return (
    <div className="performance-filter">
      <h3 className="performance-filter__header "> خيارات التصفيه </h3>
      <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label="الإقليم"
                  error={errors.region?.message}
                  options={[
                    { value: "الشرق الأوسط", name: "الشرق الأوسط" },
                    { value: "11111آسيا", name: "آسيا" },
                  ]}
                  disableFiledValue={"اختر اقليم"}
                />
              )}
            />
          </div>
          <div className="col-12 col-md-4">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label="الدولة"
                  error={errors.country?.message}
                  options={[
                    { value: "السعودية", name: "السعودية" },
                    { value: "مصر", name: "مصر" },
                  ]}
                  disableFiledValue={"اختر دوله"}
                />
              )}
            />
          </div>
          <div className="col-12 col-md-4">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label="المدينة"
                  error={errors.city?.message}
                  disableFiledValue={"اختر مدينه"}
                  options={[
                    { value: "الرياض", name: "الرياض" },
                    { value: "الدمام", name: "الدمام" },
                  ]}
                />
              )}
            />
          </div>
          {showSubDataCheckbox && (
            <div className="metrics-item">
              <input
                type="checkbox"
                className="metrics-input"
                id="showSubData"
                {...register("showSubData")}
              />
              <label htmlFor="showSubData">عرض البيانات الفرعية</label>
            </div>
          )}
          <div className="col-12 col-md-6">
            <InputField
              type="date"
              label="من تاريخ"
              error={errors.fromDate?.message}
              {...register("fromDate")}
            />
          </div>
          <div className="col-12 col-md-6">
            <InputField
              type="date"
              label="إلى تاريخ"
              error={errors.toDate?.message}
              {...register("toDate")}
            />
          </div>
        </div>
        <div className="performance-metrics">
          <h3>مؤشرات التقرير</h3>
          <MetricsList
            list={metrics}
            handleMetricToggle={handleMetricToggle}
            watch={watch}
            errors={errors}
            setValue={setValue}
          />
        </div>

        <div className="performance-filter__footer">
          <SubmitButton
            className="performance-filter__button"
            text="معاينه التقرير"
          />
        </div>
      </form>
    </div>
  );
};

export default PerformanceFilter;
