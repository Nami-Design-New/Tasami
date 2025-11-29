import { Modal } from "react-bootstrap";
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

const schema = yup.object().shape({
  link: yup.string().url("رابط غير صحيح").required("رابط مطلوب"),
  logo: yup.mixed().required("الشعار مطلوب"),
});

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
        toast.error("الرجاء اختيار صورة صحيحة");
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
            toast.success("تم تعديل الرابط بنجاح");
            queryClient.invalidateQueries({
              queryKey: ["social-links-data"],
            });
          },
          onError: (error) => {
            toast.error(error.message || "حدث خطأ في التعديل");
          },
        }
      );
    } else {
      postSocialLink(formData, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          handleRemoveLogo();
          toast.success("تم إضافة الرابط بنجاح");
          queryClient.invalidateQueries({
            queryKey: ["social-links-data"],
          });
        },
        onError: (error) => {
          toast.error(error.message || "حدث خطأ في الإضافة");
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
        handleRemoveLogo();
      }}
      centered
    >
      <Modal.Header closeButton>{isEdit ? "تعديل" : "إضافة"} رابط</Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12">
              <label className="form-label fw-semibold mb-2">
                تحميل الشعار
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
                    <p>اسحب الصورة هنا أو انقر لاختيارها</p>
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
                label="الرابط"
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
                  إلغاء
                </CustomButton>

                <CustomButton
                  size="large"
                  type="submit"
                  disabled={isPending || updateSocialLoading}
                >
                  {isPending || updateSocialLoading
                    ? "جاري..."
                    : isEdit
                    ? "تعديل"
                    : "إضافة"}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
