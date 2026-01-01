import { Modal } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import usePostTaskCategory from "../../../hooks/dashboard/websiteManagment/tasksManagment/usePostTaskCategory";
import useUpdateTaskCategory from "../../../hooks/dashboard/websiteManagment/tasksManagment/useUpdateTaskCategory";
import { useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function TasksClassificationModal({
  showModal,
  setShowModal,
  isEdit,
  taskCategories,
  updateTarget,
}) {
  const queryClient = useQueryClient();
  const { postTaskCategory, isPending } = usePostTaskCategory();
  const { updateTaskCategory, updateTaskCategoryLoading } =
    useUpdateTaskCategory();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    "title:ar": yup.string().required(t("dashboard.taskCategories.titleAr")),
    "title:en": yup.string().required(t("dashboard.taskCategories.titleEn")),
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
      const targetItem = taskCategories?.find(
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
  }, [showModal, isEdit, updateTarget, taskCategories, reset]);

  const onSubmit = (data) => {
    const payload = {
      "title:ar": data["title:ar"],
      "title:en": data["title:en"],
    };

    if (isEdit) {
      updateTaskCategory(
        { id: updateTarget, payload },
        {
          onSuccess: () => {
            setShowModal(false);
            reset();
            toast.success(t("dashboard.taskCategories.actionSuccess"));
            queryClient.invalidateQueries({
              queryKey: ["task-category-data"],
            });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      postTaskCategory(payload, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          toast.success(t("dashboard.taskCategories.actionSuccess"));
          queryClient.invalidateQueries({
            queryKey: ["task-category-data"],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <Modal
      show={showModal}
      size="md"
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        {isEdit
          ? t("dashboard.taskCategories.edit")
          : t("dashboard.taskCategories.add")}{" "}
        {t("dashboard.taskCategories.category")}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            <div className="col-6 p-2">
              <InputField
                {...register("title:ar")}
                label={t("dashboard.taskCategories.titleAr")}
                error={errors["title:ar"]?.message}
              />
            </div>

            <div className="col-6 p-2">
              <InputField
                {...register("title:en")}
                error={errors["title:en"]?.message}
                label={t("dashboard.taskCategories.titleEn")}
              />
            </div>

            <div className="col-12 p-2">
              <div className="d-flex align-items-center gap-2    justify-content-end  ">
                <CustomButton
                  onClick={() => setShowModal(false)}
                  size="large"
                  color="secondary"
                  type="button"
                >
                  {t("dashboard.taskCategories.cancel")}
                </CustomButton>
                <CustomButton type="submit" fullWidth size="large">
                  {isEdit
                    ? t("dashboard.taskCategories.edit")
                    : t("dashboard.taskCategories.add")}{" "}
                  {(isPending || updateTaskCategoryLoading) && "..."}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
