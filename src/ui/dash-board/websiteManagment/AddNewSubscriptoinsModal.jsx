import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../forms/InputField";
import CustomButton from "../../CustomButton";
import { toast } from "sonner";
import useCreatePackage from "../../../hooks/dashboard/website-managment/packages/useCreatePackage";
import useUpdatePackage from "../../../hooks/dashboard/website-managment/packages/useUpdatePackage";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

const subscriptionSchema = yup.object().shape({
  name_ar: yup.string().required(),
  name_en: yup.string().required(),
  yearlyPrice: yup.number().required(),
  halfYearlyPrice: yup.number().required(),
  maxOffers: yup.number().required(),
  maxGroups: yup.number().required(),
  maxSeats: yup.number().required(),
  commission: yup.number().required(),
  image: yup.mixed().nullable(),
});

export default function AddNewSubscriptionsModal({
  setShowModal,
  showModal,
  isEdit,
  existingData = null,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { createPackage, isPending: isCreating } = useCreatePackage();
  const { updatePackage, isPending: isUpdating } = useUpdatePackage();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: {
      name_ar: "",
      name_en: "",
      yearlyPrice: "",
      halfYearlyPrice: "",
      maxOffers: "",
      maxGroups: "",
      maxSeats: "",
      commission: "",
      image: null,
      preview: null,
    },
  });

  const preview = watch("preview");

  useEffect(() => {
    if (isEdit && existingData) {
      reset({
        name_ar: existingData.title_ar,
        name_en: existingData.title_en,
        yearlyPrice: existingData.yearly_price,
        halfYearlyPrice: existingData.half_yearly_price,
        maxOffers: existingData.offers_count,
        maxGroups: existingData.groups_count,
        maxSeats: existingData.seats_count,
        commission: existingData.app_commission,
        preview: existingData.image,
        image: null,
      });
    } else {
      reset();
    }
  }, [isEdit, existingData, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setValue("preview", URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title:ar", data.name_ar);
    formData.append("title:en", data.name_en);
    formData.append("yearly_price", data.yearlyPrice);
    formData.append("half_yearly_price", data.halfYearlyPrice);
    formData.append("offers_count", data.maxOffers);
    formData.append("groups_count", data.maxGroups);
    formData.append("seats_count", data.maxSeats);
    formData.append("app_commission", data.commission);
    if (data.image) formData.append("image", data.image);

    const payload = Object.fromEntries(formData);

    if (isEdit) {
      updatePackage(
        { id: existingData.id, _method: "put", ...payload },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            queryClient.refetchQueries({ queryKey: ["dh-packages"] });
            setShowModal(false);
          },
          onError: (err) => toast.error(err.message),
        }
      );
    } else {
      createPackage(payload, {
        onSuccess: (res) => {
          toast.success(res.message);
          queryClient.refetchQueries({ queryKey: ["dh-packages"] });
          setShowModal(false);
          reset();
        },
        onError: (err) => toast.error(err.message),
      });
    }
  };

  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <h6>
          {isEdit
            ? t("dashboard.subscriptions.edit")
            : t("dashboard.subscriptions.add_new")}
        </h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Upload Image */}
            <div className="col-12 d-flex justify-content-center p-2">
              <label className="image-upload-wrapper">
                <img
                  src={preview || "/images/imageUpload.svg"}
                  className="image-preview-circle"
                  alt="Preview"
                />
                <div className="edit-icon">
                  <i className="fa-solid fa-edit"></i>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>

            {/* Name (AR + EN) */}
            {SUPPORTED_LANGS.map((lang) => (
              <div key={lang} className="col-12 col-lg-6 p-2">
                <Controller
                  name={`name_${lang}`}
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label={`${t(
                        "dashboard.subscriptions.plan_name"
                      )} (${lang.toUpperCase()})`}
                      error={errors[`name_${lang}`]?.message}
                    />
                  )}
                />
              </div>
            ))}

            {existingData.type !== "free" && (
              <>
                {/* Yearly price */}
                <div className="col-12 col-lg-6 p-2">
                  <Controller
                    name="yearlyPrice"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        type="number"
                        label={t("dashboard.subscriptions.yearly_price")}
                        error={errors.yearlyPrice?.message}
                      />
                    )}
                  />
                </div>
                {/* Half-year price */}
                <div className="col-12 col-lg-6 p-2">
                  <Controller
                    name="halfYearlyPrice"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        type="number"
                        label={t("dashboard.subscriptions.half_yearly_price")}
                        error={errors.halfYearlyPrice?.message}
                      />
                    )}
                  />
                </div>{" "}
              </>
            )}

            {/* Offers, groups, seats, commission */}
            <div className="col-12 col-md-6 p-2">
              <Controller
                name="maxOffers"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label={t("dashboard.subscriptions.offers_count_add")}
                    error={errors.maxOffers?.message}
                  />
                )}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <Controller
                name="maxGroups"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label={t("dashboard.subscriptions.groups_count_add")}
                    error={errors.maxGroups?.message}
                  />
                )}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <Controller
                name="maxSeats"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label={t("dashboard.subscriptions.seats_count_add")}
                    error={errors.maxSeats?.message}
                  />
                )}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <Controller
                name="commission"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label={t("dashboard.subscriptions.commission")}
                    error={errors.commission?.message}
                  />
                )}
              />
            </div>

            {/* Submit button */}
            <div className="col-12 d-flex justify-content-end">
              <CustomButton type="submit" loading={isCreating || isUpdating}>
                {isEdit
                  ? t("dashboard.subscriptions.update")
                  : t("dashboard.subscriptions.save")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
