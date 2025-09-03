import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import { QUALIFICATION_VALUES } from "../../../utils/constants";
import { useAddExperienceForm } from "../../../validations/cv/add-experience-form";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useAddExp from "../../../hooks/cv/exp/useAddExp";
import useEditExp from "../../../hooks/cv/exp/useEditExp";
import useDeleteExp from "../../../hooks/cv/exp/useDeleteExp";

export default function ExperienceModal({
  showExperienceModal,
  setShowExperienceModal,
  selectedExp,
  setSelectedExp,
}) {
  const { t } = useTranslation();
  const { categories, isLoading } = useGetcategories();
  const queryClient = useQueryClient();
  const { addExp, isPending: isAdding } = useAddExp();
  const { editExp, isPending: isUpdating } = useEditExp();
  const { deleteExp, isPending: isDeleting } = useDeleteExp();
  const QUALIFICATIONS = [
    {
      value: QUALIFICATION_VALUES.BACHELOR,
      name: t("website.platform.cv.bachelor"),
    },
    {
      value: QUALIFICATION_VALUES.MASTER,
      name: t("website.platform.cv.master"),
    },
    {
      value: QUALIFICATION_VALUES.DOCTORATE,
      name: t("website.platform.cv.doctorate"),
    },
    {
      value: QUALIFICATION_VALUES.OTHER,
      name: t("website.platform.cv.other"),
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useAddExperienceForm();

  const selectedFieldId = watch("field");

  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories || [];

  const onSubmit = async (data) => {
    const payload = {
      category_id: data.field,
      sub_category_id: data.specialization,
      desc: data.description,
      number_of_years: Number(data.yearsOfExperience),
      qualifications: data.qualification,
    };

    if (selectedExp) {
      // update flow
      editExp(
        { id: selectedExp.id, ...payload },
        {
          onSuccess: (res) => {
            setShowExperienceModal(false);
            setSelectedExp(null);
            console.log("i am in success Update");

            toast.success(
              res.data.message || t("website.platform.cv.updateSuccess")
            );
            queryClient.invalidateQueries({ queryKey: ["cv"] });
          },
          onError: (err) => {
            toast.error(err.message || t("website.platform.cv.updateError"));
          },
        }
      );
    } else {
      // add flow
      addExp(payload, {
        onSuccess: (res) => {
          setShowExperienceModal(false);
          console.log("i am in success Add");

          reset();
          toast.success(
            res.data.message || t("website.platform.cv.addSuccess")
          );
          queryClient.invalidateQueries({ queryKey: ["cv"] });
        },
        onError: (err) => {
          toast.error(err.message || t("website.platform.cv.addError"));
        },
      });
    }
  };

  const handleDeleteExp = async () => {
    deleteExp(selectedExp.id, {
      onSuccess: (res) => {
        setShowExperienceModal(false);
        setSelectedExp(null);
        toast.success(res.message || t("website.platform.cv.deleteSuccess"));
        queryClient.invalidateQueries({ queryKey: ["cv"] });
      },
      onError: (err) => {
        console.log(err);

        toast.error(err.message || t("website.platform.cv.deleteError"));
      },
    });
  };

  useEffect(() => {
    if (selectedExp !== null) {
      reset({
        field: selectedExp.category_id || "",
        specialization: selectedExp.sub_category_id || "",
        description: selectedExp.desc || "",
        yearsOfExperience: selectedExp.number_of_years || "",
        qualification: selectedExp.qualifications || "",
      });
    } else {
      reset({
        field: "",
        specialization: "",
        description: "",
        yearsOfExperience: "",
        qualification: "",
      });
    }
  }, [selectedExp, reset]);

  return (
    <Modal
      show={showExperienceModal}
      onHide={() => {
        setShowExperienceModal(false);
        setSelectedExp(null);
      }}
      centered
      size="lg"
      aria-labelledby="add-experience-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-experience-title">
          {selectedExp
            ? t("website.platform.cv.editExperience")
            : t("website.platform.cv.addExperience")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Field */}
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

            {/* Specialization */}
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

            {/* Description */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                placeholder={t("website.platform.cv.aboutPlaceholder")}
                label={t("website.platform.cv.description")}
                type="text"
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            {/* Years of Experience */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.yearsOfExperience")}
                type="number"
                min={0}
                {...register("yearsOfExperience")}
                error={errors.yearsOfExperience?.message}
              />
            </div>

            {/* Qualification */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("website.platform.cv.qualification")}
                options={QUALIFICATIONS}
                error={errors.qualification?.message}
                {...register("qualification")}
              />
            </div>

            {/* Save Button */}
            <div className="col-12 d-flex justify-content-end p-2">
              <div className="buttons">
                {selectedExp && (
                  <CustomButton
                    style={{ backgroundColor: "#ff7a59" }}
                    type="button"
                    size="large"
                    onClick={handleDeleteExp}
                    loading={isDeleting}
                    disabled={isDeleting}
                  >
                    {t("website.platform.cv.deleteExperience")}
                  </CustomButton>
                )}
                <CustomButton
                  type="submit"
                  size="large"
                  disabled={isAdding || isUpdating}
                  loading={isAdding || isUpdating}
                >
                  {selectedExp
                    ? t("website.platform.cv.update")
                    : t("website.platform.cv.save")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
