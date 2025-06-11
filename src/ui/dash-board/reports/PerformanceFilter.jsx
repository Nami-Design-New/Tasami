import { useEffect, useState } from "react";
import SelectField from "../../forms/SelectField";
import InputField from "../../forms/InputField";
import MetricsList from "./MetricsList";
import SubmitButton from "../../forms/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { performanceFilterSchema } from "../../../validations/performanceFilterSchema";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../redux/slices/performanceFilter";

const metricsList = [
  { id: 1, name: "المشتركين الجدد" },
  { id: 2, name: "المشتركين النشطين" },
  { id: 3, name: "المشتركين الغير نشطين" },
  { id: 4, name: "المشتركين الملغيين" },
  { id: 5, name: "معدل النمو الشهري" },
  { id: 6, name: "معدل الاحتفاظ بالمشتركين" },
];
const PerformanceFilter = ({ metrics }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(performanceFilterSchema),
    defaultValues: {
      region: "",
      country: "",
      city: "",
      fromDate: "",
      toDate: "",
      metrics: [],
      showSubData: false,
    },
  });
  const region = watch("region");
  const country = watch("country");
  const city = watch("city");

  const showSubDataCheckbox = (region && !country) || (country && !city);

  // Update sub options (e.g., from database)
  useEffect(() => {
    // TODO: load countries based on region
    // TODO: load cities based on country
  }, [region, country]);

  const handleMetricToggle = (id) => {
    const selected = watch("metrics") || [];
    const isSelected = selected.includes(id);
    const newSelection = isSelected
      ? selected.filter((i) => i !== id)
      : [...selected, id];
    setValue("metrics", newSelection);
  };

  const onSubmit = async (formData) => {
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
                    { value: "آسيا", name: "آسيا" },
                  ]}
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
