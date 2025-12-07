import { Modal } from "react-bootstrap";
import SelectField from "../../../forms/SelectField";
import useGetcategories from "../../../../hooks/area-of-interests/useGetcategories";
import useAddGroupForm from "../../../../validations/groups/add-group-vaildation";
import { useTranslation } from "react-i18next";
import InputField from "../../../forms/InputField";
import CustomButton from "../../../CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useAddGroup from "../../../../hooks/website/my-groups/useAddGroup";
import { useEffect } from "react";
import useEditGroup from "../../../../hooks/website/my-groups/useEditGroup";

export default function AddGroupModal({
  showModal,
  setShowModal,
  group = null,
}) {
  const { categories, isLoading } = useGetcategories();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { addGroup, isPending: isAdding } = useAddGroup();
  const { editGroup, isPending: isEditing } = useEditGroup();
  const isPending = isAdding || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useAddGroupForm();
  const selectedFieldId = watch("field");

  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  // const onSubmit = async (data) => {
  //   const payload = {
  //     category_id: data.field,
  //     sub_category_id: data.specialization,
  //     title: data.groupName,
  //     desc: data.description,
  //   };
  //   if (group) {
  //     editGroup(
  //       { id: group.id, payload },
  //       {
  //         onSuccess: (res) => {
  //           setShowModal(false);
  //           queryClient.invalidateQueries(["group-details"]);
  //           reset();
  //           toast.success(res.message);
  //         },
  //         onError: (err) => toast.error(err.message),
  //       }
  //     );
  //   } else {
  //     addGroup(payload, {
  //       onSuccess: (res) => {
  //         setShowModal(false);
  //         queryClient.invalidateQueries(["my-groups"]);
  //         reset();
  //         toast.success(res.message);
  //       },
  //       onError: (err) => {
  //         toast.error(err.message);
  //       },
  //     });
  //   }
  // };

  const onSubmit = async (data) => {
    if (group) {
      // Build payload with only changed fields
      const payload = {};

      if (String(data.field) !== String(group.category_id)) {
        payload.category_id = data.field;
      }

      if (String(data.specialization) !== String(group.sub_category_id)) {
        payload.sub_category_id = data.specialization;
      }

      if (data.groupName !== group.title) {
        payload.title = data.groupName;
      }

      if (data.description !== group.desc) {
        payload.desc = data.description;
      }

      // Check if there are any changes
      if (Object.keys(payload).length === 0) {
        toast.info(t("noChangesDetected") || "No changes detected");
        setShowModal(false);
        return;
      }

      editGroup(
        { id: group.id, payload },
        {
          onSuccess: (res) => {
            setShowModal(false);
            queryClient.invalidateQueries(["group-details"]);
            reset();
            toast.success(res.message);
          },
          onError: (err) => toast.error(err.message),
        }
      );
    } else {
      // For adding new group, include all fields
      const payload = {
        category_id: data.field,
        sub_category_id: data.specialization,
        title: data.groupName,
        desc: data.description,
      };

      addGroup(payload, {
        onSuccess: (res) => {
          setShowModal(false);
          queryClient.invalidateQueries(["my-groups"]);
          reset();
          toast.success(res.message);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
    }
  };
  useEffect(() => {
    if (group) {
      reset({
        field: group.category_id,
        specialization: group.sub_category_id,
        groupName: group.title,
        description: group.desc,
      });
    }
  }, [group, reset]);
  return (
    <Modal
      show={showModal}
      size="lg"
      centered
      onHide={() => {
        setShowModal(false);
        reset();
      }}
    >
      <Modal.Header closeButton>
        <h6>
          {group
            ? t("website.platform.groups.editGroup")
            : t("website.platform.groups.addNew")}
        </h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 col-md-6 p-2">
              <SelectField
                loading={isLoading}
                label={t("website.platform.cv.field")}
                {...register("field")}
                options={categories?.map((category) => ({
                  value: category?.id,
                  name: category?.title,
                }))}
                error={errors.field?.message}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("website.platform.cv.specialization")}
                {...register("specialization")}
                options={subCategories.map((sub) => ({
                  value: sub.id,
                  name: sub.title,
                }))}
                error={errors.specialization?.message}
                hint={t("website.platform.cv.specializationHint")}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.groups.groupName")}
                placeholder={t("website.platform.groups.groupName")}
                {...register("groupName")}
                error={errors.groupName?.message}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.groups.groupDescription")}
                placeholder={t("website.platform.cv.aboutPlaceholder")}
                {...register("description")}
                error={errors.description?.message}
              />
            </div>
            <div className="col-12 p-2 d-flex justify-content-end ">
              <CustomButton loading={isPending} type="submit" size="large">
                {group ? t("confirm") : t("create")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
