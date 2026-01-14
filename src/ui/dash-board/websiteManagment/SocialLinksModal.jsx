import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import usePostSocialLink from "../../../hooks/dashboard/websiteManagment/socialLinksManage/usePostSocialLink";
import useUpdateSocialLink from "../../../hooks/dashboard/websiteManagment/socialLinksManage/useUpdateSocialLink";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import GlobalModal from "../../GlobalModal";

export default function SocialLinksModal({
  showModal,
  setShowModal,
  isEdit,
  updateTarget,
  socialLinks,
}) {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);
  const [fileName, setFileName] = useState(null);
  const queryClient = useQueryClient();
  const { postSocialLink, isPending } = usePostSocialLink();
  const { updateSocialLink, updateSocialLoading } = useUpdateSocialLink();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    link: yup
      .string()
      .url(t("dashboard.socialLinks.invalidLink"))
      .required(t("dashboard.socialLinks.requiredLink")),
    logo: yup.mixed().required(t("dashboard.socialLinks.requiredLogo")),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      link: "",
      logo: null,
    },
  });

  // Update form when modal opens or updateTarget changes
  useEffect(() => {
    if (showModal && isEdit && updateTarget) {
      const targetItem = socialLinks?.find((item) => item.id === updateTarget);
      if (targetItem) {
        reset({
          link: targetItem?.link || "",
          logo: targetItem?.logo || null,
        });
        setExistingLogo(targetItem?.logo || null);
        setPreview(targetItem?.logo || null);
        setImageFile(null);
        setFileName(null);
      }
    } else if (showModal && !isEdit) {
      reset({
        link: "",
        logo: null,
      });
      setExistingLogo(null);
      setPreview(null);
      setImageFile(null);
      setFileName(null);
    }
  }, [showModal, isEdit, updateTarget, socialLinks, reset]);

  // Handle image drop/select
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("image/")) {
        setImageFile(file);
        setFileName(file.name);
        setValue("logo", file);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setExistingLogo(null);
      } else {
        toast.error(t("dashboard.socialLinks.invalidImage"));
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const handleRemoveLogo = () => {
    setPreview(null);
    setImageFile(null);
    setFileName(null);
    setExistingLogo(null);
    setValue("logo", null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("link", data.link);

    if (imageFile) {
      formData.append("logo", imageFile);
    } else if (isEdit && existingLogo && !preview) {
      formData.append("logo", existingLogo);
    }

    if (isEdit) {
      formData.append("_method", "put");
    }
    if (isEdit) {
      updateSocialLink(
        { id: updateTarget, payload: formData },
        {
          onSuccess: () => {
            setShowModal(false);
            reset();
            handleRemoveLogo();
            toast.success(t("dashboard.socialLinks.successEdit"));
            queryClient.invalidateQueries({
              queryKey: ["social-links-data"],
            });
          },
          onError: (error) => {
            toast.error(error.message || t("dashboard.socialLinks.errorEdit"));
          },
        }
      );
    } else {
      postSocialLink(formData, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          handleRemoveLogo();
          toast.success(t("dashboard.socialLinks.successAdd"));
          queryClient.invalidateQueries({
            queryKey: ["social-links-data"],
          });
        },
        onError: (error) => {
          toast.error(error.message || t("dashboard.socialLinks.errorAdd"));
        },
      });
    }
  };

  return (
    <GlobalModal
      show={showModal}
      size="md"
      onHide={() => {
        setShowModal(false);
        handleRemoveLogo();
      }}
      centered
    >
      <GlobalModal.Header closeButton>
        {isEdit
          ? t("dashboard.socialLinks.edit")
          : t("dashboard.socialLinks.add")}{" "}
        {t("dashboard.socialLinks.link")}
      </GlobalModal.Header>
      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12">
              <label className="form-label fw-semibold mb-2">
                {t("dashboard.socialLinks.uploadLogo")}
              </label>

              <div className="col-12 p-2">
                <div
                  {...getRootProps()}
                  className={`dropzone ${isDragActive ? "active" : ""}`}
                >
                  <input {...getInputProps()} />
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="banner-preview"
                    />
                  ) : (
                    <p>{t("dashboard.socialLinks.dropImageHere")}</p>
                  )}
                </div>{" "}
              </div>
              {errors.logo && (
                <small className="text-danger d-block mt-2">
                  {errors.logo.message}
                </small>
              )}
            </div>

            <div className="col-12 p-2">
              <InputField
                label={t("dashboard.socialLinks.link")}
                placeholder="https://example.com"
                {...register("link")}
                error={errors.link?.message}
              />
            </div>

            <div className="col-12 p-2">
              <div className="d-flex align-items-center gap-2 justify-content-end">
                <CustomButton
                  onClick={() => setShowModal(false)}
                  size="large"
                  color="secondary"
                  type="button"
                >
                  {t("dashboard.socialLinks.cancel")}
                </CustomButton>

                <CustomButton
                  size="large"
                  type="submit"
                  disabled={isPending || updateSocialLoading}
                >
                  {isPending || updateSocialLoading
                    ? t("dashboard.socialLinks.processing")
                    : isEdit
                    ? t("dashboard.socialLinks.edit")
                    : t("dashboard.socialLinks.add")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
