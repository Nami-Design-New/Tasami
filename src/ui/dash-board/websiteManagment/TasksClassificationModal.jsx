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


const schema = yup.object().shape({
  "title:ar": yup.string().required("عنوان التصنيف عربي مطلوب"),
  "title:en": yup.string().required("عنوان التصنيف إنجليزي مطلوب"),
});

export default function TasksClassificationModal({
  showModal,
  setShowModal,
  isEdit,
  taskCategories,
  updateTarget
}) {

  const queryClient = useQueryClient();
  const { postTaskCategory, isPending } = usePostTaskCategory()
  const { updateTaskCategory, updateTaskCategoryLoading } = useUpdateTaskCategory()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      "title:ar": '',
      "title:en": ''
    }
  })

  // Update form when modal opens or updateTarget changes
  useEffect(() => {
    if (showModal && isEdit && updateTarget) {
      const targetItem = taskCategories?.find((item) => item.id === updateTarget);
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
      updateTaskCategory({ id: updateTarget, payload }, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          toast.success("تم تنفيذ الإجراء بنجاح");
          queryClient.invalidateQueries({
            queryKey: ["task-category-data"],
          });

        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      postTaskCategory(payload, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          toast.success("تم تنفيذ الإجراء بنجاح");
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
        {isEdit ? "تعديل" : "اضافه"} التصنيف{" "}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <InputField
                {...register("title:ar")}
                label="عنوان التصنيف عربي"
                error={errors["title:ar"]?.message}
              />
            </div>

            <div className="col-12 p-2">
              <InputField
                {...register("title:en")}
                error={errors["title:en"]?.message}
                label="عنوان التصنيف انجليزي"
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
                  الغاء
                </CustomButton>
                <CustomButton type="submit" fullWidth size="large">
                  {isEdit ? "تعديل " : "  اضافة "}{" "}
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
