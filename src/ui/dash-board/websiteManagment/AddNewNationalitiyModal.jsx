import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputField from "../../forms/InputField";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import CustomButton from "../../CustomButton";
import useAddNationality from "../../../hooks/dashboard/website-managment/nationalities/useAddNationality";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useUpdateNationality from "../../../hooks/dashboard/website-managment/nationalities/useUpdateNationality";
import { useEffect } from "react";

export default function AddNewNationalitiyModal({
  setShowModal,
  showModal,
  isEdit,
  updateTarget,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const schema = yup.object().shape({
    title_ar: yup.string().required(t("dashboard.nationalitiesModal.titleAr")),
    title_en: yup.string().required(t("dashboard.nationalitiesModal.titleEn")),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title_ar: "",
      title_en: "",
    },
  });

  const { addNationality, isAddingNationality } = useAddNationality();
  const { updateNationality, isUpdatingNationality } = useUpdateNationality();

  useEffect(() => {
    if (isEdit && updateTarget) {
      reset({
        title_ar: updateTarget.title_ar,
        title_en: updateTarget.title_en,
      });
    } else {
      reset();
    }
  }, [isEdit, updateTarget, reset]);

  const onSubmit = (data) => {
    const payload = {
      "title:ar": data.title_ar,
      "title:en": data.title_en,
    };

    if (isEdit) {
      updateNationality(
        { id: updateTarget.id, _method: "put", ...payload },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            queryClient.refetchQueries({ queryKey: ["dh-nationalites"] });
            setShowModal(false);
            reset();
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    } else {
      addNationality(payload, {
        onSuccess: (res) => {
          toast.success(res.message);
          queryClient.refetchQueries({ queryKey: ["dh-nationalites"] });
          setShowModal(false);
          reset();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
    }
  };

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => {
        setShowModal(false);
        reset();
      }}
    >
      <Modal.Header closeButton>
        <h6>
          {isEdit
            ? t("dashboard.nationalitiesModal.editNationality")
            : t("dashboard.nationalitiesModal.addNationality")}
        </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {" "}
            {SUPPORTED_LANGS.map((lang) => (
              <div key={lang} className="col-12 col-lg-6 p-2">
                <Controller
                  name={`title_${lang}`}
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label={`${t(
                        "dashboard.nationalitiesModal.nationalityName"
                      )} (${lang.toUpperCase()})`}
                      error={errors[`title_${lang}`]?.message}
                    />
                  )}
                />
              </div>
            ))}
            <div className="col-12 p-2 ">
              <div className="buttons  justify-content-end">
                <CustomButton
                  size="large"
                  fullWidth
                  type="submit"
                  loading={isAddingNationality || isUpdatingNationality}
                >
                  {isEdit
                    ? t("dashboard.nationalitiesModal.update")
                    : t("dashboard.nationalitiesModal.add")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
