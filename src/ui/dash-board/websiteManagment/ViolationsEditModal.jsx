import InputField from "../../forms/InputField";
import CustomButton from "../../CustomButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import usePostViolationReason from "../../../hooks/dashboard/websiteManagment/violationsManagment/usePostViolationReason";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateViolationReason from "../../../hooks/dashboard/websiteManagment/violationsManagment/useUpdateViolationReason";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import GlobalModal from "../../GlobalModal";

export default function ViolationsEditModal({
  showModal,
  setShowModal,
  isEdit,
  updateTarget,
  violationReasons,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { postViolationReason, isPending } = usePostViolationReason();
  const { updateViolationReason, updateViolateLoading } =
    useUpdateViolationReason();
  const schema = yup.object().shape({
    "title:ar": yup.string().required(t("dashboard.violation.validation.ar")),
    "title:en": yup.string().required(t("dashboard.violation.validation.en")),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      "title:ar": "",
      "title:en": "",
    },
  });

  // Update form when modal opens or updateTarget changes
  useEffect(() => {
    if (showModal && isEdit && updateTarget) {
      const targetItem = violationReasons?.find(
        (item) => item.id === updateTarget
      );
      reset({
        "title:ar": targetItem?.title_ar || "",
        "title:en": targetItem?.title_en || "",
      });
    } else if (showModal && !isEdit) {
      reset({
        "title:ar": "",
        "title:en": "",
      });
    }
  }, [showModal, isEdit, updateTarget, violationReasons, reset]);

  const onSubmit = (data) => {
    const payload = {
      "title:ar": data["title:ar"],
      "title:en": data["title:en"],
    };

    if (isEdit) {
      updateViolationReason(
        { id: updateTarget, payload },
        {
          onSuccess: () => {
            setShowModal(false);
            reset();
            toast.success(t("dashboard.violation.success"));
            queryClient.invalidateQueries({
              queryKey: ["violation-reason-data"],
            });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      postViolationReason(payload, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          toast.success(t("dashboard.violation.success"));
          queryClient.invalidateQueries({
            queryKey: ["violation-reason-data"],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <GlobalModal
      show={showModal}
      size="md"
      onHide={() => setShowModal(false)}
      centered
    >
      <GlobalModal.Header closeButton>
        <h6>
          {" "}
          {isEdit
            ? t("dashboard.violation.edit")
            : t("dashboard.violation.add")}
        </h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 p-2">
              <InputField
                {...register("title:ar")}
                label={t("dashboard.violation.labels.ar")}
                error={errors["title:ar"]?.message}
              />
            </div>

            <div className="col-6 p-2">
              <InputField
                {...register("title:en")}
                error={errors["title:en"]?.message}
                label={t("dashboard.violation.labels.en")}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton type="submit" fullWidth size="large">
                {isEdit
                  ? t("dashboard.violation.edit")
                  : t("dashboard.violation.add")}{" "}
                {(isPending || updateViolateLoading) && "..."}
              </CustomButton>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
