import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetcategories from "../../../hooks/area-of-interests/useGetcategories";
import useAddDoc from "../../../hooks/cv/docs/useAddDoc";
import useDeleteDoc from "../../../hooks/cv/docs/useDeleteDoc";
import useEditDoc from "../../../hooks/cv/docs/useEditDoc";
import useGetDocsAuth from "../../../hooks/cv/docs/useGetDocsAuth";
import useGetDocsTypes from "../../../hooks/cv/docs/useGetDocsTypes";
import { formatYMD } from "../../../utils/helper";
import useAddDocumentForm from "../../../validations/cv/add-document-form";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function DocumentModal({
  showDocumentModal,
  setShowDocumentModal,
  selectedDoc,
  setSelectedDoc,
}) {
  console.log(selectedDoc);

  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { categories, isLoading } = useGetcategories();
  const { docsTypes, isLoading: docsLoaging } = useGetDocsTypes();
  const { docsAuthorities, isLoading: docsAuthLoading } = useGetDocsAuth();
  const { addDoc, isPending: isAdding } = useAddDoc();
  const { editDoc, isPending: isUpdating } = useEditDoc();
  const { deleteDoc, isPending: isDeleting } = useDeleteDoc();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useAddDocumentForm();

  const selectedFieldId = watch("field");
  const subCategories =
    categories?.find((cat) => String(cat.id) === String(selectedFieldId))
      ?.sub_categories ||
    categories
      ?.flatMap((cat) => cat.sub_categories)
      ?.filter(
        (sub) => String(sub.id) === String(selectedDoc?.sub_category_id)
      ) ||
    [];
  const onSubmit = async (data) => {
    const payload = {
      category_id: data.field,
      sub_category_id: data.specialization,
      document_type_id: data.documentType,
      document_auth: data.issuingAuthority,
      end_date: formatYMD(data.expiryDate),
      document_number: data.documentNumber,
    };
    if (selectedDoc) {
      editDoc(
        { id: selectedDoc.id, ...payload },
        {
          onSuccess: (res) => {
            setShowDocumentModal(false);
            setSelectedDoc(null);
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
      addDoc(payload, {
        onSuccess: (res) => {
          setShowDocumentModal(false);
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

  const handleDeleteDoc = async () => {
    deleteDoc(selectedDoc.id, {
      onSuccess: (res) => {
        setShowDocumentModal(false);
        setSelectedDoc(null);
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
    if (!categories || isLoading) return;
    if (selectedDoc) {
      reset({
        field: selectedDoc.category_id || "",
        specialization: selectedDoc.sub_category_id || "",
        documentType: selectedDoc.document_type_id || "",
        issuingAuthority: selectedDoc.document_auth || "",
        documentNumber: selectedDoc.document_number || "",
        expiryDate: selectedDoc.end_date || "",
      });
    } else {
      reset({
        field: "",
        specialization: "",
        documentType: "",
        issuingAuthority: "",
        documentNumber: "",
        expiryDate: "",
      });
    }
  }, [selectedDoc, reset, categories, isLoading]);

  return (
    <Modal
      show={showDocumentModal}
      onHide={() => {
        setShowDocumentModal(false);
        setSelectedDoc(null);
      }}
      centered
      size="lg"
      aria-labelledby="add-document-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-document-title">
          <h6>
            {selectedDoc
              ? t("website.platform.cv.editDocument")
              : t("website.platform.cv.addDocument")}
          </h6>
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

            {/* Document Type */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("website.platform.cv.documentType")}
                options={docsTypes?.map((sub) => ({
                  value: sub.id,
                  name: sub.title,
                }))}
                loading={docsLoaging}
                {...register("documentType")}
                error={errors.documentType?.message}
              />
            </div>

            {/* Issuing Authority */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.issuingAuthority")}
                loading={docsAuthLoading}
                {...register("issuingAuthority")}
                error={errors.issuingAuthority?.message}
              />
            </div>

            {/* Document Number */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.documentNumber")}
                type="text"
                {...register("documentNumber")}
                error={errors.documentNumber?.message}
              />
            </div>

            {/* Expiry Date */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("website.platform.cv.expiryDate")}
                type="date"
                {...register("expiryDate")}
                error={errors.expiryDate?.message}
              />
            </div>

            {/* Save Button */}
            <div className="col-12 d-flex justify-content-end p-2">
              <div className="buttons">
                {selectedDoc && (
                  <CustomButton
                    style={{ backgroundColor: "#ff7a59" }}
                    type="button"
                    size="large"
                    onClick={handleDeleteDoc}
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
                  {selectedDoc
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
