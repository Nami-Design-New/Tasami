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
import TabRadioGroup from "../../TabRadioGroup";
import MetricsAccordion from "./MetricsList";

const regionOptions = [
  { value: "الشرق الأوسط", name: "الشرق الأوسط" },
  { value: "11111آسيا", name: "آسيا" },
];

const countryOptions = [
  { value: "السعودية", name: "السعودية" },
  { value: "مصر", name: "مصر" },
];

const cityOptions = [
  { value: "الرياض", name: "الرياض" },
  { value: "الدمام", name: "الدمام" },
];

// const getInitialValues = (searchParams) => ();

const PerformanceFilter = ({ metrics }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialValue, setInitialValue] = useState({
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
  });
  const methods = useForm({
    resolver: yupResolver(performanceFilterSchema),
    defaultValues: initialValue,
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
    const params = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(","));
      } else if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
    dispatch(setFilters(formData));
  };

  const FieldWrapper = useCallback(
    ({ name, label, options }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectField
            {...field}
            label={label}
            error={errors[name]?.message}
            options={options}
            disableFiledValue={`اختر ${label}`}
          />
        )}
      />
    ),
    [control, errors]
  );

  return (
    <div className="performance-filter">
      <h3 className="performance-filter__header">خيارات التصفيه</h3>
      <FormProvider {...methods}>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-12  col-md-6 col-lg-4 col-xl-12">
              <FieldWrapper
                name="region"
                label="الإقليم"
                options={regionOptions}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-12">
              <FieldWrapper
                name="country"
                label="الدولة"
                options={countryOptions}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-12">
              <FieldWrapper name="city" label="المدينة" options={cityOptions} />
            </div>

            {showSubDataCheckbox && (
              <div className=" col-12  ">
                <div className="">
                  <Form.Check
                    type="switch"
                    id="showSubData"
                    label="عرض البيانات الفرعيه"
                    {...register("showSubData")}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            )}

            <div className="col-12   col-md-6 col-lg-6 col-xl-12 ">
              <InputField
                type="date"
                label="من تاريخ"
                error={errors.fromDate?.message}
                {...register("fromDate")}
              />
            </div>

            <div className="col-12  col-md-6 col-lg-6 col-xl-12">
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
            <MetricsAccordion
              list={metrics}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div className="performance-metrics">
            <h3> المجالات و التخصصات</h3>
            <div className="mt-3">
              <TabRadioGroup
                name="fields"
                register={register}
                options={[
                  { label: "التفصيل بالمجالات", value: "fileds" },
                  {
                    label: "التفصيل بالتخصصات",
                    value: "specializations",
                  },
                ]}
              />
            </div>
          </div>
          <div className="performance-metrics">
            <h3> عناصر التقرير</h3>
            <div className="mt-3">
              <Form.Check label="جدول" id="table" type="checkbox" />
              <Form.Check label="رسم بياني" id="chart" type="checkbox" />
            </div>
          </div>

          <div className="performance-filter__footer">
            <CustomButton size="large">معاينة التقرير</CustomButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PerformanceFilter;
