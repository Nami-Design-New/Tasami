import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useAddCity from "../../../hooks/dashboard/cities/useAddCity";
import useAddCountry from "../../../hooks/dashboard/countries/useAddCountry";
import useAddRegion from "../../../hooks/dashboard/regions/useAddRegion";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import useGetSectorsStats from "../../../hooks/dashboard/regions/useGetSectorsStats";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import CustomButton from "../../../ui/CustomButton";
import ChartCard from "../../../ui/dash-board/cards/ChartCard";
import StatisticsCard from "../../../ui/dash-board/cards/StatisticsCard";
import OperatingSectorsList from "../../../ui/dash-board/operationSector/OperatingSectorsList";
import InputField from "../../../ui/forms/InputField";
import SelectFieldReactSelect from "../../../ui/forms/SelectFieldReactSelect";
import StatisticsCardSkeleton from "../../../ui/loading/StatisticsCardSkeleton";
import {
  citySchema,
  countrySchema,
  defaultCityValues,
  defaultCountryValues,
  defaultRegionValues,
  regionSchema,
} from "./shared-schema";
import FileUploader from "../../../ui/forms/FileUPloader";
import { useRef, useState } from "react";
import { set } from "lodash";

const OperatingSectors = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { sectorsStats, isLoading: loadingStats } = useGetSectorsStats();
  const [errorImage, setErrorImage] = useState(null);
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
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErrorImage(null)
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleClick = () => {
    fileRef.current.click();
    setErrorImage(null)
  };
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
        queryClient.invalidateQueries({ queryKey: ["dashboard-regions"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  const onSubmitCountry = (data) => {
    const payload = {
      region_id: data.countryRegion,
      code: data.countryNumber,
      "title:ar": data.country.ar,
      "title:en": data.country.en,
      phone_code: data.countryCode,
      image: fileRef.current?.files[0] || null,
    };
    addCountry(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        countryForm.reset();
        queryClient.invalidateQueries({ queryKey: ["dashboard-countries"] });
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
        queryClient.invalidateQueries({ queryKey: ["dashboard-cities"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  const statsData = [
    {
      label: t("dashboard.operatingRegions.regionsCount"),
      value: sectorsStats?.data?.regions_count,
      icon: "fa-map",
      color: "#fff",
      bgColor: "#6c757d",
    },
    {
      label: t("dashboard.operatingRegions.countriesCount"),
      value: sectorsStats?.data?.countries_count,
      icon: "fa-industry",
      color: "#fff",
      bgColor: "#17a2b8",
    },
    {
      label: t("dashboard.operatingRegions.citiesCount"),
      value: sectorsStats?.data?.citites_count,
      icon: "fa-city",
      color: "#fff",
      bgColor: "#007bff",
    },
    {
      label: t("dashboard.operatingRegions.usersCount"),
      value: sectorsStats?.data?.users_count,
      icon: "fa-user",
      color: "#fff",
      bgColor: "#28a745",
    },
    {
      label: t("dashboard.operatingRegions.employeesCount"),
      value: sectorsStats?.data?.employees_count,
      icon: "fa-users-cog",
      color: "#fff",
      bgColor: "#ffc107",
    },
  ];

  return (
    <section>
      <div className="row">
        {/* ----------- Statistics Cards ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.operatingRegions.statisticsTitle")}>
            <div className="row">
              {loadingStats
                ? Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                    >
                      <StatisticsCardSkeleton />{" "}
                    </div>
                  ))
                : statsData.map((item, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                    >
                      <StatisticsCard item={item} />
                    </div>
                  ))}
            </div>
          </ChartCard>
        </div>

        {/* ----------- Add Region ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.operatingRegions.addRegionTitle")}>
            <form
              className="form_ui"
              onSubmit={regionForm.handleSubmit(onSubmitRegion)}
            >
              <div className="d-lg-flex d-grid col-12 align-items-end gap-3 ">
                {SUPPORTED_LANGS.map((lang) => (
                  <InputField
                    key={`regions-${lang}`}
                    label={`${t(
                      "dashboard.operatingRegions.regionName"
                    )} (${lang})`}
                    placeholder={t("dashboard.operatingRegions.regionName")}
                    {...regionForm.register(`region.${lang}`)}
                    error={regionForm.formState.errors?.region?.[lang]?.message}
                  />
                ))}
                <InputField
                  label={t("dashboard.operatingRegions.regionNumber")}
                  placeholder={t("dashboard.operatingRegions.regionNumber")}
                  {...regionForm.register("regionNumber")}
                />
                <CustomButton
                  icon={<i className="fa-regular fa-plus"></i>}
                  loading={isAddingRegion}
                  size="large"
                  color="secondary"
                  style={{ height: "54px" }}
                >
                  {t("add")}
                </CustomButton>
              </div>
            </form>
          </ChartCard>
        </div>

        {/* ----------- Add Country ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.operatingRegions.addCountryTitle")}>
            <form
              className="form_ui"
              onSubmit={countryForm.handleSubmit(onSubmitCountry)}
            >
              <div className="d-lg-flex d-grid col-12 align-items-end gap-3 ">
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
                    label={`${t(
                      "dashboard.operatingRegions.countryName"
                    )} (${lang})`}
                    placeholder={t("dashboard.operatingRegions.countryName")}
                    {...countryForm.register(`country.${lang}`)}
                    error={
                      countryForm.formState.errors?.country?.[lang]?.message
                    }
                  />
                ))}
                <InputField
                  label={t("dashboard.operatingRegions.countryNumber")}
                  placeholder={t("dashboard.operatingRegions.countryNumber")}
                  {...countryForm.register("countryNumber")}
                  error={countryForm.formState.errors.countryNumber?.message}
                />
                <InputField
                  label={t("dashboard.operatingRegions.countryCode")}
                  placeholder={t("dashboard.operatingRegions.countryCode")}
                  {...countryForm.register("countryCode")}
                  error={countryForm.formState.errors.countryCode?.message}
                />
                <div style={{ gap: "10px" }}>
                  {/* Preview */}
                  <div
                    onClick={handleClick}
                    style={{
                      width: "60px",
                      height: "54px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f5f5f5",
                    }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="flag"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "10px", color: "#777" }}>
                        <img
                          src="/images/imageUpload.svg"
                          alt="Upload Icon"
                          width={"20px"}
                        />
                      </span>
                    )}
                  </div>

                  {/* Hidden input */}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    hidden
                  />
                  {countryForm.formState.errors.countryFlag && (
                    <p className="text-danger mt-2" style={{ fontSize: "13px" }}>
                      {countryForm.formState.errors.countryFlag.message}
                    </p>
                  )}
                </div>{" "}
                <CustomButton
                  icon={<i className="fa-regular fa-plus"></i>}
                  loading={isAddingCountry}
                  size="large"
                  color="secondary"
                  style={{ height: "54px" }}
                >
                  {t("add")}
                </CustomButton>
              </div>
            </form>
          </ChartCard>
        </div>

        {/* ----------- Add City ----------- */}
        <div className="col-12 p-2">
          <ChartCard title={t("dashboard.operatingRegions.addCityTitle")}>
            <form
              className="form_ui"
              onSubmit={cityForm.handleSubmit(onSubmitCity)}
            >
              <div className="d-lg-flex d-grid col-12 align-items-end gap-3 ">
                <Controller
                  name="cityCountry"
                  control={cityForm.control}
                  render={({ field }) => (
                    <SelectFieldReactSelect
                      label={t("dashboard.operatingRegions.chooseCountry")}
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
                    label={`${t(
                      "dashboard.operatingRegions.cityName"
                    )} (${lang})`}
                    placeholder={t("dashboard.operatingRegions.cityName")}
                    {...cityForm.register(`city.${lang}`)}
                    error={cityForm.formState.errors?.city?.[lang]?.message}
                  />
                ))}
                <InputField
                  label={t("dashboard.operatingRegions.cityNumber")}
                  placeholder={t("dashboard.operatingRegions.cityNumber")}
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
                  {t("add")}
                </CustomButton>
              </div>
            </form>
          </ChartCard>
        </div>

        {/* ----------- Data List ----------- */}
        <div className="col-12 p-2">
          <OperatingSectorsList />
        </div>
      </div>
    </section>
  );
};

export default OperatingSectors;
