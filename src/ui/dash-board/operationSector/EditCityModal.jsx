import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useEditCity from "../../../hooks/dashboard/cities/useEditCity";
import useGetCountries from "../../../hooks/dashboard/regions/useGetCountries";
import {
  citySchema,
  defaultCityValues,
} from "../../../routes/dash-board/list-management/shared-schema";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectFieldReactSelect from "../../forms/SelectFieldReactSelect";

export default function EditCityModal({
  showModal,
  setShowModal,
  selectedCity,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    countries,
    isCountriesLaoding,
    fetchCountriesNextPage,
    hasCountriesNextPage,
    isFetchingCountriesNextPage,
  } = useGetCountries();

  const cityForm = useForm({
    resolver: yupResolver(citySchema),
    defaultValues: defaultCityValues,
  });
  const { editCity, isEditingCity } = useEditCity();
  console.log(selectedCity);

  useEffect(() => {
    cityForm.reset({
      cityCountry: selectedCity?.country_id,
      city: {
        ar: selectedCity?.title_ar,
        en: selectedCity?.title_en,
      },
      cityNumber: selectedCity?.code,
    });
  }, [selectedCity, cityForm]);
  console.log(cityForm.formState.errors);

  const onSubmit = (data) => {
    const payload = {
      _method: "put",
      code: data?.cityNumber,
      "title:ar": data?.city?.ar,
      "title:en": data?.city?.en,
      country_id: data?.cityCountry,
    };
    editCity(
      { cityId: selectedCity?.id, cityData: payload },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setShowModal(false);
          queryClient.refetchQueries({ queryKey: ["dashboard-cities"] });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => {
        setShowModal(false);
      }}
    >
      <Modal.Header closeButton>
        <h6> {t("dashboard.operatingRegions.editCity")} </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={cityForm.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 col-md-6 p-2">
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
                    loading={isCountriesLaoding || isFetchingCountriesNextPage}
                    value={field.value}
                    onChange={field.onChange}
                    onMenuScrollToBottom={() => {
                      if (hasCountriesNextPage) fetchCountriesNextPage();
                    }}
                    error={cityForm.formState.errors.cityCountry?.message}
                  />
                )}
              />
            </div>
            {SUPPORTED_LANGS.map((lang) => (
              <div key={`city-${lang}`} className="col-12 col-md-6 p-2">
                <InputField
                  label={`${t(
                    "dashboard.operatingRegions.cityName"
                  )} (${lang})`}
                  placeholder={t("dashboard.operatingRegions.cityName")}
                  {...cityForm.register(`city.${lang}`)}
                  error={cityForm.formState.errors?.city?.[lang]?.message}
                />{" "}
              </div>
            ))}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("dashboard.operatingRegions.cityNumber")}
                placeholder={t("dashboard.operatingRegions.cityNumber")}
                {...cityForm.register("cityNumber")}
                error={cityForm.formState.errors.cityNumber?.message}
              />
            </div>

            <div className="col-12  p-2">
              {" "}
              <div className="d-flex justify-content-end">
                <CustomButton size="large" loading={isEditingCity}>
                  {t("edit")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
