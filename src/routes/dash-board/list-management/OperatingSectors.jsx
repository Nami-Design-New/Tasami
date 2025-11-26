// import { yupResolver } from "@hookform/resolvers/yup";
// import { createColumnHelper } from "@tanstack/react-table";
// import { useMemo, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import * as yup from "yup";
// import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
// import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
// import CustomButton from "../../../ui/CustomButton";
// import ChartCard from "../../../ui/dash-board/cards/ChartCard";
// import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
// import InputField from "../../../ui/forms/InputField";
// import SelectFieldReactSelect from "../../../ui/forms/SelectFieldReactSelect";
// import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
// import OperatingSectorsModal from "../../../ui/modals/OperatingSectorsModal";
// import ReusableDataTable from "../../../ui/table/ReusableDataTable";
// import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
// import useAddRegion from "../../../hooks/dashboard/regions/useAddRegion";
// import useAddCountry from "../../../hooks/dashboard/countries/useAddCountry";
// import useAddCity from "../../../hooks/dashboard/cities/useAddCity";
// import { toast } from "sonner";

// /* ---------------------- YUP SCHEMA ---------------------- */

// const multiLangRequired = yup
//   .object(
//     SUPPORTED_LANGS.reduce((acc, lang) => {
//       acc[lang] = yup.string().required(`هذا الحقل (${lang}) مطلوب`);
//       return acc;
//     }, {})
//   )
//   .required();

// const schema = yup.object().shape({
//   // Region
//   region: multiLangRequired,
//   regionNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, "رقم الإقليم يجب أن يكون رقمًا فقط")
//     .required("رقم الإقليم مطلوب"),

//   // Country / Sector
//   countryRegion: yup.string().required("يجب اختيار الإقليم"),
//   country: multiLangRequired,
//   countryNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, "رقم القطاع يجب أن يكون رقمًا")
//     .required("رقم القطاع مطلوب"),

//   // City
//   cityCountry: yup.string().required("يجب اختيار الدولة"),
//   city: multiLangRequired,
//   cityNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, "رقم المدينة يجب أن يكون رقمًا")
//     .required("رقم المدينة مطلوب"),
// });

// /* ---------------------- DEFAULT VALUES ---------------------- */

// const defaultValues = {
//   region: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
//   regionNumber: "",

//   countryRegion: "",
//   country: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
//   countryNumber: "",

//   cityCountry: "",
//   city: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
//   cityNumber: "",
// };

// /* ---------------------- MAIN COMPONENT ---------------------- */

// const columnHelper = createColumnHelper();

// const statsData = [
//   {
//     label: "الأقاليم",
//     value: 7,
//     icon: "fa-map",
//     color: "#fff",
//     bgColor: "#6c757d",
//   },
//   {
//     label: "القطاعات",
//     value: 9,
//     icon: "fa-industry",
//     color: "#fff",
//     bgColor: "#17a2b8",
//   },
//   {
//     label: "المدن",
//     value: 15,
//     icon: "fa-city",
//     color: "#fff",
//     bgColor: "#007bff",
//   },
//   {
//     label: "المستخدمون",
//     value: 120,
//     icon: "fa-user",
//     color: "#fff",
//     bgColor: "#28a745",
//   },
//   {
//     label: "الموظفون",
//     value: 85,
//     icon: "fa-users-cog",
//     color: "#fff",
//     bgColor: "#ffc107",
//   },
// ];

// const OperatingSectors = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const { t } = useTranslation();

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues,
//   });

//   const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useGetRegions();

//   /* ------------------------------ Add Hooks ------------------------------ */

//   const { addRegion, isAddingRegion } = useAddRegion();
//   const { addCountry, isAddingCountry } = useAddCountry();
//   const { addCity, isAddingCity } = useAddCity();

//   const {
//     countries,
//     isCountriesLaoding,
//     fetchCountriesNextPage,
//     hasCountriesNextPage,
//     isFetchingCountriesNextPage,
//   } = useGetCountries();

//   const data = useMemo(
//     () => [
//       {
//         region: "بدون",
//         regionNumber: "99",
//         location: "",
//         locationNumber: "",
//         city: "",
//         cityNumber: "",
//         actions: "",
//       },
//       {
//         region: "غير محدد",
//         regionNumber: "00",
//         location: "غير محدد",
//         locationNumber: "00",
//         city: "غير محدد",
//         cityNumber: "00",
//         actions: "",
//       },
//       {
//         region: "الشرق الاوسط",
//         regionNumber: "01",
//         location: "السعودية",
//         locationNumber: "014",
//         city: "الرياض",
//         cityNumber: "01",
//         actions: "",
//       },
//       {
//         region: "الشرق الاوسط",
//         regionNumber: "01",
//         location: "السعودية",
//         locationNumber: "014",
//         city: "جدة",
//         cityNumber: "02",
//         actions: "",
//       },
//     ],
//     []
//   );

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("region", {
//         header: "الإقليم",
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor("regionNumber", {
//         header: "رقم الإقليم",
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor("location", {
//         header: "القطاع",
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor("locationNumber", {
//         header: "رقم القطاع",
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor("city", {
//         header: "المدينة",
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor("cityNumber", {
//         header: "رقم المدينة",
//         cell: (info) => info.getValue(),
//       }),
//       columnHelper.accessor("actions", {
//         header: "الإجراءات",
//         cell: () => (
//           <div className="table__actions">
//             <i
//               className="fa-solid fa-edit table__actions--edit"
//               onClick={() => setShowModal(true)}
//             ></i>
//             <i
//               className="fa-solid fa-trash table__actions--delete"
//               onClick={() => setShowDeleteModal(true)}
//             ></i>
//           </div>
//         ),
//         enableSorting: false,
//       }),
//     ],
//     []
//   );

//   // --- Submit Handlers ---
//   const onSubmitRegion = (data) => {
//     console.log(data);

//     const payload = {
//       code: data.code,
//     };
//     addRegion(payload, {
//       onSuccess: (res) => {
//         toast.success(res.message);
//       },
//       onError: (error) => {
//         toast.error(error.message);
//       },
//     });
//     console.log("Region Submitted:", data.region, data.regionNumber);
//   };

//   const onSubmitCountry = (data) => {
//     console.log(
//       "Country Submitted:",
//       data.countryRegion,
//       data.country,
//       data.countryNumber
//     );
//     // TODO: call createCountry API
//   };

//   const onSubmitCity = (data) => {
//     console.log(
//       "City Submitted:",
//       data.cityCountry,
//       data.city,
//       data.cityNumber
//     );
//     // TODO: call createCity API
//   };

//   return (
//     <section>
//       <div className="row">
//         {/* ----------- Statistics Cards ----------- */}
//         <div className="col-12 p-2">
//           <ChartCard title="إحصائيات قطاعات التشغيل">
//             <div className="row">
//               {statsData.map((item, index) => (
//                 <div
//                   className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
//                   key={index}
//                 >
//                   <StatisticsCard item={item} />
//                 </div>
//               ))}
//             </div>
//           </ChartCard>
//         </div>

//         {/* ----------- Add Region ----------- */}
//         <div className="col-12 p-2">
//           <ChartCard title={"اضافة اقليم جديد"}>
//             <form className="form_ui" onSubmit={handleSubmit(onSubmitRegion)}>
//               <div className="d-flex align-items-end gap-3 ">
//                 {SUPPORTED_LANGS.map((lang) => (
//                   <InputField
//                     key={`regions-${lang}`}
//                     label={`${t("اسم الاقليم")} (${lang})`}
//                     placeholder="ادخل اسم الاقليم"
//                     {...register(`region.${lang}`)}
//                     error={errors?.region?.[lang]?.message}
//                   />
//                 ))}

//                 <InputField
//                   label="رقم الاقليم"
//                   placeholder="ادخل رقم الاقليم"
//                   {...register("regionNumber")}
//                   error={errors.regionNumber?.message}
//                 />

//                 <CustomButton
//                   icon={<i className="fa-regular fa-plus"></i>}
//                   loading={isAddingRegion}
//                   size="large"
//                   color="secondary"
//                   style={{ height: "54px" }}
//                 >
//                   إضافة
//                 </CustomButton>
//               </div>
//             </form>
//           </ChartCard>
//         </div>

//         {/* ----------- Add Country ----------- */}
//         <div className="col-12 p-2">
//           <ChartCard title={"اضافة قطاع جديد"}>
//             <form className="form_ui" onSubmit={handleSubmit(onSubmitCountry)}>
//               <div className="d-flex align-items-end gap-3 ">
//                 <Controller
//                   name="countryRegion"
//                   control={control}
//                   render={({ field }) => {
//                     console.log(field);
//                     return (
//                       <SelectFieldReactSelect
//                         label={t("dashboard.workGroup.region")}
//                         options={regions?.map((region) => ({
//                           value: region.id,
//                           name: region.title,
//                         }))}
//                         loading={isLoading || isFetchingNextPage}
//                         value={field.value}
//                         onChange={field.onChange}
//                         onMenuScrollToBottom={() => {
//                           if (hasNextPage) fetchNextPage();
//                         }}
//                         error={errors.countryRegion?.message}
//                       />
//                     );
//                   }}
//                 />

//                 {SUPPORTED_LANGS.map((lang) => (
//                   <InputField
//                     key={`country-${lang}`}
//                     label={`${t("اسم القطاع")} (${lang})`}
//                     placeholder="ادخل اسم القطاع"
//                     {...register(`country.${lang}`)}
//                     error={errors?.country?.[lang]?.message}
//                   />
//                 ))}

//                 <InputField
//                   label="رقم القطاع"
//                   placeholder="ادخل رقم القطاع"
//                   {...register("countryNumber")}
//                   error={errors.countryNumber?.message}
//                 />

//                 <CustomButton
//                   icon={<i className="fa-regular fa-plus"></i>}
//                   size="large"
//                   color="secondary"
//                   style={{ height: "54px" }}
//                 >
//                   إضافة{" "}
//                 </CustomButton>
//               </div>
//             </form>
//           </ChartCard>
//         </div>

//         {/* ----------- Add City ----------- */}
//         <div className="col-12 p-2">
//           <ChartCard
//             title={"اضافة مدينة جديد"}
//             onSubmit={handleSubmit(onSubmitCity)}
//           >
//             <form className="form_ui">
//               <div className="d-flex align-items-end gap-3 ">
//                 <Controller
//                   name="cityRegion"
//                   control={control}
//                   render={({ field }) => (
//                     <SelectFieldReactSelect
//                       label="اختر الدولة"
//                       options={countries?.map((country) => ({
//                         value: country.id,
//                         name: country.title,
//                       }))}
//                       loading={
//                         isCountriesLaoding || isFetchingCountriesNextPage
//                       }
//                       value={field.value}
//                       onChange={field.onChange}
//                       onMenuScrollToBottom={() => {
//                         if (hasCountriesNextPage) fetchCountriesNextPage();
//                       }}
//                       error={errors.countryRegion?.message}
//                     />
//                   )}
//                 />

//                 {SUPPORTED_LANGS.map((lang) => (
//                   <InputField
//                     key={`city-${lang}`}
//                     label={`${t("اسم المدينة")} (${lang})`}
//                     placeholder="ادخل اسم المدينة"
//                     {...register(`city.${lang}`)}
//                     error={errors?.city?.[lang]?.message}
//                   />
//                 ))}

//                 <InputField
//                   label="رقم المدينة"
//                   placeholder="ادخل رقم المدينة"
//                   {...register("cityNumber")}
//                   error={errors.cityNumber?.message}
//                 />

//                 <CustomButton
//                   icon={<i className="fa-regular fa-plus"></i>}
//                   size="large"
//                   color="secondary"
//                   style={{ height: "54px" }}
//                 >
//                   إضافة
//                 </CustomButton>
//               </div>
//             </form>
//           </ChartCard>
//         </div>

//         {/* ----------- Data Table ----------- */}
//         <div className="col-12 p-2">
//           <ReusableDataTable
//             title="قطاعات التشغيل"
//             data={data}
//             columns={columns}
//             filter={false}
//             lang="ar"
//             initialPageSize={10}
//             searchPlaceholder=""
//           />
//         </div>
//       </div>

//       {/* <OperatingSectorsModal
//         setShowModal={setShowModal}
//         showModal={showModal}
//       /> */}
//       <ConfirmDeleteModal
//         setShowDeleteModal={setShowDeleteModal}
//         showDeleteModal={showDeleteModal}
//       />
//     </section>
//   );
// };

// export default OperatingSectors;
import { yupResolver } from "@hookform/resolvers/yup";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import CustomButton from "../../../ui/CustomButton";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import InputField from "../../../ui/forms/InputField";
import SelectFieldReactSelect from "../../../ui/forms/SelectFieldReactSelect";
import ConfirmDeleteModal from "../../../ui/modals/ConfirmationDeleteModal";
import ReusableDataTable from "../../../ui/table/ReusableDataTable";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useAddRegion from "../../../hooks/dashboard/regions/useAddRegion";
import useAddCountry from "../../../hooks/dashboard/countries/useAddCountry";
import useAddCity from "../../../hooks/dashboard/cities/useAddCity";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import OperatingSectrsList from "../../../ui/dash-board/operationSector/OperatingSectrsList";

/* ---------------------- YUP SCHEMAS ---------------------- */
const multiLangRequired = yup
  .object(
    SUPPORTED_LANGS.reduce((acc, lang) => {
      acc[lang] = yup.string().required(`هذا الحقل (${lang}) مطلوب`);
      return acc;
    }, {})
  )
  .required();

const regionSchema = yup.object({
  region: multiLangRequired,
  regionNumber: yup
    .string()
    .matches(/^[0-9]+$/, "رقم الإقليم يجب أن يكون رقمًا فقط")
    .required("رقم الإقليم مطلوب"),
});

const countrySchema = yup.object({
  countryRegion: yup.string().required("يجب اختيار الإقليم"),
  country: multiLangRequired,
  countryNumber: yup
    .string()
    .matches(/^[0-9]+$/, "رقم القطاع يجب أن يكون رقمًا")
    .required("رقم القطاع مطلوب"),
  countryCode: yup.string().required("كود الدولة مطلوب"),
});

const citySchema = yup.object({
  cityCountry: yup.string().required("يجب اختيار الدولة"),
  city: multiLangRequired,
  cityNumber: yup
    .string()
    .matches(/^[0-9]+$/, "رقم المدينة يجب أن يكون رقمًا")
    .required("رقم المدينة مطلوب"),
});

/* ---------------------- DEFAULT VALUES ---------------------- */
const defaultRegionValues = {
  region: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  regionNumber: "",
};

const defaultCountryValues = {
  countryRegion: "",
  country: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  countryNumber: "",
  countryCode: "",
};

const defaultCityValues = {
  cityCountry: "",
  city: SUPPORTED_LANGS.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  cityNumber: "",
};

/* ---------------------- MAIN COMPONENT ---------------------- */
const columnHelper = createColumnHelper();

const statsData = [
  {
    label: "الأقاليم",
    value: 7,
    icon: "fa-map",
    color: "#fff",
    bgColor: "#6c757d",
  },
  {
    label: "القطاعات",
    value: 9,
    icon: "fa-industry",
    color: "#fff",
    bgColor: "#17a2b8",
  },
  {
    label: "المدن",
    value: 15,
    icon: "fa-city",
    color: "#fff",
    bgColor: "#007bff",
  },
  {
    label: "المستخدمون",
    value: 120,
    icon: "fa-user",
    color: "#fff",
    bgColor: "#28a745",
  },
  {
    label: "الموظفون",
    value: 85,
    icon: "fa-users-cog",
    color: "#fff",
    bgColor: "#ffc107",
  },
];

const OperatingSectors = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions();
  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries();

  // --- Separate useForm instances ---
  const regionForm = useForm({
    resolver: yupResolver(regionSchema),
    defaultValues: defaultRegionValues,
  });

  const countryForm = useForm({
    resolver: yupResolver(countrySchema),
    defaultValues: defaultCountryValues,
  });

  const cityForm = useForm({
    resolver: yupResolver(citySchema),
    defaultValues: defaultCityValues,
  });

  const { addRegion, isAddingRegion } = useAddRegion();
  const { addCountry, isAddingCountry } = useAddCountry();
  const { addCity, isAddingCity } = useAddCity();

  const data = useMemo(
    () => [
      {
        region: "بدون",
        regionNumber: "99",
        location: "",
        locationNumber: "",
        city: "",
        cityNumber: "",
        actions: "",
      },
      {
        region: "غير محدد",
        regionNumber: "00",
        location: "غير محدد",
        locationNumber: "00",
        city: "غير محدد",
        cityNumber: "00",
        actions: "",
      },
      {
        region: "الشرق الاوسط",
        regionNumber: "01",
        location: "السعودية",
        locationNumber: "014",
        city: "الرياض",
        cityNumber: "01",
        actions: "",
      },
      {
        region: "الشرق الاوسط",
        regionNumber: "01",
        location: "السعودية",
        locationNumber: "014",
        city: "جدة",
        cityNumber: "02",
        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("region", {
        header: "الإقليم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("regionNumber", {
        header: "رقم الإقليم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: "القطاع",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("locationNumber", {
        header: "رقم القطاع",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: "المدينة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("cityNumber", {
        header: "رقم المدينة",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("actions", {
        header: "الإجراءات",
        cell: () => (
          <div className="table__actions">
            <i className="fa-solid fa-edit table__actions--edit"></i>
            <i
              className="fa-solid fa-trash table__actions--delete"
              onClick={() => setShowDeleteModal(true)}
            ></i>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

  /* ---------------------- SUBMIT HANDLERS ---------------------- */
  const onSubmitRegion = (data) => {
    const payload = {
      code: data.regionNumber,
      "title:ar": data.region.ar,
      "title:en": data.region.en,
    };
    addRegion(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        regionForm.reset();
        queryClient.invalidateQueries("regions");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  const onSubmitCountry = (data) => {
    console.log(data);

    const payload = {
      region_id: data.countryRegion,
      code: data.countryNumber,
      "title:ar": data.country.ar,
      "title:en": data.country.en,
      phone_code: data.countryCode,
    };
    addCountry(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        countryForm.reset();
        queryClient.invalidateQueries("countries");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  const onSubmitCity = (data) => {
    const payload = {
      country_id: data.cityCountry,
      code: data.cityNumber,
      "title:ar": data.city.ar,
      "title:en": data.city.en,
    };
    addCity(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        cityForm.reset();
        queryClient.invalidateQueries("cities");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <section>
      <div className="row">
        {/* ----------- Statistics Cards ----------- */}
        <div className="col-12 p-2">
          <ChartCard title="إحصائيات قطاعات التشغيل">
            <div className="row">
              {statsData.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                  key={index}
                >
                  <StatisticsCard item={item} />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* ----------- Add Region ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={"اضافة اقليم جديد"}>
            <form
              className="form_ui"
              onSubmit={regionForm.handleSubmit(onSubmitRegion)}
            >
              <div className="d-flex align-items-end gap-3 ">
                {SUPPORTED_LANGS.map((lang) => (
                  <InputField
                    key={`regions-${lang}`}
                    label={`${t("اسم الاقليم")} (${lang})`}
                    placeholder="ادخل اسم الاقليم"
                    {...regionForm.register(`region.${lang}`)}
                    error={regionForm.formState.errors?.region?.[lang]?.message}
                  />
                ))}
                <InputField
                  label="رقم الاقليم"
                  placeholder="ادخل رقم الاقليم"
                  {...regionForm.register("regionNumber")}
                  error={regionForm.formState.errors.regionNumber?.message}
                />
                <CustomButton
                  icon={<i className="fa-regular fa-plus"></i>}
                  loading={isAddingRegion}
                  size="large"
                  color="secondary"
                  style={{ height: "54px" }}
                >
                  إضافة
                </CustomButton>
              </div>
            </form>
          </ChartCard>
        </div>

        {/* ----------- Add Country ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={"اضافة قطاع جديد"}>
            <form
              className="form_ui"
              onSubmit={countryForm.handleSubmit(onSubmitCountry)}
            >
              <div className="d-flex align-items-end gap-3 ">
                <Controller
                  name="countryRegion"
                  control={countryForm.control}
                  render={({ field }) => (
                    <SelectFieldReactSelect
                      label={t("dashboard.workGroup.region")}
                      options={regions?.map((region) => ({
                        value: region.id,
                        name: region.title,
                      }))}
                      loading={isLoading || isFetchingNextPage}
                      value={field.value}
                      onChange={field.onChange}
                      onMenuScrollToBottom={() => {
                        if (hasNextPage) fetchNextPage();
                      }}
                      error={
                        countryForm.formState.errors.countryRegion?.message
                      }
                    />
                  )}
                />
                {SUPPORTED_LANGS.map((lang) => (
                  <InputField
                    key={`country-${lang}`}
                    label={`${t("اسم القطاع")} (${lang})`}
                    placeholder="ادخل اسم القطاع"
                    {...countryForm.register(`country.${lang}`)}
                    error={
                      countryForm.formState.errors?.country?.[lang]?.message
                    }
                  />
                ))}
                <InputField
                  label="رقم القطاع"
                  placeholder="ادخل رقم القطاع"
                  {...countryForm.register("countryNumber")}
                  error={countryForm.formState.errors.countryNumber?.message}
                />
                <InputField
                  label="كود الدولة"
                  placeholder="ادخل كود الدولة "
                  {...countryForm.register("countryCode")}
                  error={countryForm.formState.errors.countryCode?.message}
                />
                <CustomButton
                  icon={<i className="fa-regular fa-plus"></i>}
                  loading={isAddingCountry}
                  size="large"
                  color="secondary"
                  style={{ height: "54px" }}
                >
                  إضافة
                </CustomButton>
              </div>
            </form>
          </ChartCard>
        </div>

        {/* ----------- Add City ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={"اضافة مدينة جديد"}>
            <form
              className="form_ui"
              onSubmit={cityForm.handleSubmit(onSubmitCity)}
            >
              <div className="d-flex align-items-end gap-3 ">
                <Controller
                  name="cityCountry"
                  control={cityForm.control}
                  render={({ field }) => (
                    <SelectFieldReactSelect
                      label="اختر الدولة"
                      options={countries?.map((country) => ({
                        value: country.id,
                        name: country.title,
                      }))}
                      loading={
                        isCountriesLaoding || isFetchingCountriesNextPage
                      }
                      value={field.value}
                      onChange={field.onChange}
                      onMenuScrollToBottom={() => {
                        if (hasCountriesNextPage) fetchCountriesNextPage();
                      }}
                      error={cityForm.formState.errors.cityCountry?.message}
                    />
                  )}
                />
                {SUPPORTED_LANGS.map((lang) => (
                  <InputField
                    key={`city-${lang}`}
                    label={`${t("اسم المدينة")} (${lang})`}
                    placeholder="ادخل اسم المدينة"
                    {...cityForm.register(`city.${lang}`)}
                    error={cityForm.formState.errors?.city?.[lang]?.message}
                  />
                ))}
                <InputField
                  label="رقم المدينة"
                  placeholder="ادخل رقم المدينة"
                  {...cityForm.register("cityNumber")}
                  error={cityForm.formState.errors.cityNumber?.message}
                />
                <CustomButton
                  icon={<i className="fa-regular fa-plus"></i>}
                  loading={isAddingCity}
                  size="large"
                  color="secondary"
                  style={{ height: "54px" }}
                >
                  إضافة
                </CustomButton>
              </div>
            </form>
          </ChartCard>
        </div>

        {/* ----------- Data Table ----------- */}
        <div className="col-12 p-2">
          <OperatingSectrsList />
        </div>
      </div>
    </section>
  );
};

export default OperatingSectors;
