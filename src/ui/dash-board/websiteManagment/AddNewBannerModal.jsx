import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import CustomButton from "../../CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import usePostImageBanner from "./../../../hooks/dashboard/websiteManagment/imageBanners/usePostImageBanner";
import useUpdateImageBanner from "./../../../hooks/dashboard/websiteManagment/imageBanners/useUpdateImageBanner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  image: yup.mixed().required("الشعار مطلوب"),
});

export default function AddNewBannerModal({
  setShowModal,
  showModal,
  isEdit,
  updateTarget,
  imageBanner,
}) {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingLogo, setExistingLogo] = useState(null);
  const [fileName, setFileName] = useState(null);
  const queryClient = useQueryClient();
  const { postImageBanner, isPending } = usePostImageBanner();
  const { updateImageBanner, updateBannerLoading } = useUpdateImageBanner();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: null,
    },
  });

  // Update form when modal opens or updateTarget changes
  useEffect(() => {
    if (showModal && isEdit && updateTarget) {
      const targetItem = imageBanner?.find((item) => item.id === updateTarget);
      if (targetItem) {
        reset({
          image: targetItem?.image || null,
        });
        setExistingLogo(targetItem?.image || null);
        setPreview(targetItem?.image || null);
        setImageFile(null);
        setFileName(null);
      }
    } else if (showModal && !isEdit) {
      reset({
        image: null,
      });
      setExistingLogo(null);
      setPreview(null);
    }
  }, [showModal, isEdit, updateTarget, imageBanner, reset]);

  // Handle image drop/select
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith("image/")) {
        setImageFile(file);
        setFileName(file.name);
        setValue("image", file);
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
    setValue("image", null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (isEdit && existingLogo && !preview) {
      formData.append("image", existingLogo);
    }

    if (isEdit) {
      formData.append("_method", "put");
    }
    if (isEdit) {
      updateImageBanner(
        { id: updateTarget, payload: formData },
        {
          onSuccess: () => {
            setShowModal(false);
            reset();
            handleRemoveLogo();
            toast.success("تم تعديل الرابط بنجاح");
            queryClient.invalidateQueries({
              queryKey: ["image-banners"],
            });
          },
          onError: (error) => {
            toast.error(error.message || "حدث خطأ في التعديل");
          },
        }
      );
    } else {
      postImageBanner(formData, {
        onSuccess: () => {
          setShowModal(false);
          reset();
          handleRemoveLogo();
          toast.success("تم إضافة الرابط بنجاح");
          queryClient.invalidateQueries({
            queryKey: ["image-banners"],
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
      centered
      size="md"
      show={showModal}
      onHide={() => {
        setShowModal(false);
        handleRemoveLogo();
      }}
    >
      <Modal.Header closeButton>
        {isEdit ? "تعديل الافتة" : "اضف لافتة"}
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 p-2">
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? "active" : ""}`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <img src={preview} alt="preview" className="banner-preview" />
              ) : (
                <p>اسحب الصورة هنا أو انقر لاختيارها</p>
              )}
            </div>{" "}
          </div>
          <div className="col-12 p-2 ">
            <div className="buttons  justify-content-end">
              <CustomButton onClick={handleSubmit(onSubmit)} fullWidth>
                {isPending || updateBannerLoading
                  ? "جاري..."
                  : isEdit
                  ? "تحديث"
                  : "اضف"}
              </CustomButton>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
