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
            className="border-0 rounded-0"
          />
        )}
      />
    ),
    [control, errors]
  );

  return (
    <div className="performance-filter border border-2">
      <h3 className="performance-filter__header">خيارات التصفيه</h3>
      <FormProvider {...methods}>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="p-4 border border-1 rounded-3 py-4">
              <h4>المؤشرات الفوريه</h4>

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
                <FieldWrapper
                  name="city"
                  label="المدينة"
                  options={cityOptions}
                />
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

              <div className="d-flex p-2 justify-content-end  align-items-end mt-3 ">
                <CustomButton size="large">تحديث</CustomButton>
              </div>
            </div>

            {/*التقارير المخصصة*/}
            <div className="p-4 border border-1 rounded-3 py-4 mt-4">
              <h4>التقارير المخصصة</h4>
              <div className="col-12   col-md-6 col-lg-6 col-xl-12 ">
                <div className="performance-metrics">
                  <div className="d-flex align-items-center gap-1 my-2">
                    <input type="checkbox" id="sub_data" />
                    <label htmlFor="sub_data">عرض البيانات الفرعية</label>
                  </div>{" "}
                </div>
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
                  className=""
                />
                {/* <div className="d-flex flex-column align-items-center gap-2 mt-2">
                  <label htmlFor="week">إلى تاريخ</label>
                  <input type="date" id="week" className="bg-secondary w-100 p-2 text-center"/>
                </div>{" "} */}
              </div>

              <div className="performance-metrics ">
                <h3>نطاق البيانات</h3>
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input type="radio" id="week" />
                  <label htmlFor="week"> أسبوعي</label>
                </div>{" "}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input type="radio" id="month" />
                  <label htmlFor="month"> شهري</label>
                </div>{" "}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input type="radio" id="quatreYear" />
                  <label htmlFor="quatreYear">ربع سنوي</label>
                </div>{" "}
                <div className="d-flex align-items-center gap-1 mt-2">
                  <input type="radio" id="year" />
                  <label htmlFor="year"> سنوي</label>
                </div>{" "}
              </div>
              {/* <div className="performance-metrics">
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
              </div> */}
              <div className="performance-metrics">
                <h3>عرض التصنيفات</h3>
                <div className="mt-3 d-flex justify-content-between w-75">
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input type="checkbox" id="field" />
                    <label htmlFor="field"> المجالات</label>
                  </div>{" "}
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input type="checkbox" id="category" />
                    <label htmlFor="category"> التخصصات</label>
                  </div>{" "}
                </div>
              </div>
              <div className="performance-metrics">
                <h3> عناصر التقرير</h3>
                <div className="mt-3 d-flex justify-content-between w-75">
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input type="radio" id="table" />
                    <label htmlFor="table"> جدول</label>
                  </div>{" "}
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <input type="radio" id="chart" />
                    <label htmlFor="chart">رسم بياني</label>
                  </div>{" "}
                </div>
              </div>

              <div className="d-flex p-2 justify-content-end  align-items-end mt-3 ">
                <CustomButton size="large">معاينة التقرير</CustomButton>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PerformanceFilter;
