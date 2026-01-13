import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useEditRegion from "../../../hooks/dashboard/regions/useEditRegion";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  defaultRegionValues,
  regionSchema,
} from "../../../routes/dash-board/list-management/shared-schema";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";

export default function EditRegionModal({
  showModal,
  setShowModal,
  selectedRegion,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const regionForm = useForm({
    resolver: yupResolver(regionSchema),
    defaultValues: defaultRegionValues,
  });
  const { editRegion, isEditingRegion } = useEditRegion();

  useEffect(() => {
    regionForm.reset({
      region: {
        ar: selectedRegion?.title_ar,
        en: selectedRegion?.title_en,
      },
      regionNumber: selectedRegion?.code,
    });
  }, [selectedRegion, regionForm]);

  const onSubmit = (data) => {

    const payload = {
      _method: "put",
      code: data?.regionNumber,
      "title:ar": data?.region?.ar,
      "title:en": data?.region?.en,
    };
    editRegion(
      { regionId: selectedRegion?.id, regionData: payload },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          setShowModal(false);
          queryClient.refetchQueries({ queryKey: ["dashboard-regions"] });
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
      size="md"
      centered
      onHide={() => {
        setShowModal(false);
      }}
    >
      <Modal.Header closeButton>
        {" "}
        <h6> {t("dashboard.operatingRegions.editRegion")} </h6>{" "}
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={regionForm.handleSubmit(onSubmit)}>
          <div className="row">
            {SUPPORTED_LANGS.map((lang) => (
              <div className="col-12 p-2" key={`regions-${lang}`}>
                <InputField
                  label={`${t(
                    "dashboard.operatingRegions.regionName"
                  )} (${lang})`}
                  placeholder={t("dashboard.operatingRegions.regionName")}
                  {...regionForm.register(`region.${lang}`)}
                  error={regionForm.formState.errors?.region?.[lang]?.message}
                />
              </div>
            ))}
            <div className="col-12 p-2">
              <InputField
                label={t("dashboard.operatingRegions.regionNumber")}
                placeholder={t("dashboard.operatingRegions.regionNumber")}
                {...regionForm.register("regionNumber")}
                error={regionForm.formState.errors.regionNumber?.message}
              />
            </div>
            <div className="col-12 p-2">
              <div className="d-flex justify-content-end">
                <CustomButton size="large" loading={isEditingRegion}>
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
