import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useEditCountry from "../../../hooks/dashboard/countries/useEditCountry";
import useGetRegions from "../../../hooks/dashboard/regions/useGetRegions";
import {
  countrySchema,
  defaultCountryValues,
} from "../../../routes/dash-board/list-management/shared-schema";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectFieldReactSelect from "../../forms/SelectFieldReactSelect";
import FileUploader from "../../forms/FileUPloader";

export default function EditCountryModal({
  showModal,
  setShowModal,
  selectedCountry,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { regions, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetRegions();
  const countryForm = useForm({
    resolver: yupResolver(countrySchema),
    defaultValues: defaultCountryValues,
  });
  const { editCountry, isEditingCountry } = useEditCountry();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    countryForm.reset({
      countryRegion: selectedCountry?.region_id,
      country: {
        ar: selectedCountry?.title_ar,
        en: selectedCountry?.title_en,
      },
      countryNumber: selectedCountry?.code,
      countryCode: selectedCountry?.phone_code,
      countryFlag: selectedCountry?.image ? [] : null,
    });
    setFiles(selectedCountry?.image ? [selectedCountry?.image] : []);
  }, [selectedCountry, countryForm]);

  const onSubmit = (data) => {
    const formData = new FormData();

    // const payload = {
    //   _method: "put",
    //   code: data?.countryNumber,
    //   "title:ar": data?.country?.ar,
    //   "title:en": data?.country?.en,
    //   phone_code: data?.countryCode,
    //   region_id: data?.countryRegion,
    //   image: files[0] || null,
    // };
    formData.append("_method", "put");
    formData.append("code", data?.countryNumber);
    formData.append("title:ar", data?.country?.ar);
    formData.append("title:en", data?.country?.en);
    formData.append("phone_code", data?.countryCode);
    formData.append("region_id", data?.countryRegion);
    // Handle file upload in edit mode
    if (data.files && data.files.length > 0) {
      const file = data.files[0];

      // Only append if it's a new File object
      if (file instanceof File) {
        formData.append("image", file);
      }
    }
    editCountry(
      { countryId: selectedCountry?.id, countryData: formData },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setShowModal(false);
          queryClient.refetchQueries({ queryKey: ["dashboard-countries"] });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };
  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
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
        <h6> {t("dashboard.operatingRegions.editCountry")} </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={countryForm.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 col-md-6 p-2">
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
                    error={countryForm.formState.errors.countryRegion?.message}
                  />
                )}
              />
            </div>
            {SUPPORTED_LANGS.map((lang) => (
              <div className="col-12 col-md-6 p-2" key={`country-${lang}`}>
                <InputField
                  label={`${t(
                    "dashboard.operatingRegions.countryName"
                  )} (${lang})`}
                  placeholder={t("dashboard.operatingRegions.countryName")}
                  {...countryForm.register(`country.${lang}`)}
                  error={countryForm.formState.errors?.country?.[lang]?.message}
                />
              </div>
            ))}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("dashboard.operatingRegions.countryNumber")}
                placeholder={t("dashboard.operatingRegions.countryNumber")}
                {...countryForm.register("countryNumber")}
                error={countryForm.formState.errors.countryNumber?.message}
              />
            </div>
            <div className="col-12  p-2">
              {" "}
              <InputField
                label={t("dashboard.operatingRegions.countryCode")}
                placeholder={t("dashboard.operatingRegions.countryCode")}
                {...countryForm.register("countryCode")}
                error={countryForm.formState.errors.countryCode?.message}
              />
            </div>
            <div className="col-12  p-2">
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label={t("dashboard.operatingRegions.countryFlag")}
                multiple={false}
                style={{ height: "200px" }}
              />
              {files.length === 0 && (
                <p className="text-danger mt-1">country flag is required</p>
              )}
            </div>
            <div className="col-12  p-2">
              <div className="d-flex justify-content-end">
                <CustomButton size="large" loading={isEditingCountry}>
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
