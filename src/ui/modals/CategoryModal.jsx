import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useAddCategory from "../../hooks/dashboard/FiledsAndSpecialations/useAddCategory";
import useEditCategory from "../../hooks/dashboard/FiledsAndSpecialations/useEditCategory";
import { SUPPORTED_LANGS } from "../../lib/multilang/config";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import GlobalModal from "../GlobalModal";

const getCategoryTitle = (category, lang) => {
  const source = category?.rawCategory || category;
  const translations = source?.translations;
  const translation = Array.isArray(translations)
    ? translations.find(
        (item) =>
          item?.locale === lang || item?.lang === lang || item?.language === lang,
      )
    : translations?.[lang];

  return (
    category?.[`title_${lang}`] ||
    source?.[`title_${lang}`] ||
    source?.[`title:${lang}`] ||
    source?.title?.[lang] ||
    translation?.title ||
    translation?.value ||
    translation ||
    source?.[lang]?.title ||
    ""
  );
};

export default function CategoryModal({
  showModal,
  setShowModal,
  selectedCategory,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const isEdit = Boolean(selectedCategory?.id);

  const schema = yup.object().shape({
    title: yup.object(
      SUPPORTED_LANGS.reduce((acc, lang) => {
        acc[lang] = yup
          .string()
          .required(
            t("dashboard.fieldsAndSpecialization.errors.fieldRequired") +
              ` (${lang})`,
          )
          .min(
            2,
            t("dashboard.fieldsAndSpecialization.errors.fieldShort") +
              ` (${lang})`,
          );
        return acc;
      }, {}),
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: SUPPORTED_LANGS.reduce(
        (acc, lang) => ({ ...acc, [lang]: "" }),
        {},
      ),
    },
  });

  const { addCategory, isPending: isAdding } = useAddCategory();
  const { editCategory, isPending: isEditing } = useEditCategory();

  useEffect(() => {
    if (!showModal) return;

    reset({
      title: {
        ar: isEdit ? getCategoryTitle(selectedCategory, "ar") : "",
        en: isEdit ? getCategoryTitle(selectedCategory, "en") : "",
      },
    });
  }, [isEdit, reset, selectedCategory, showModal]);

  const handleClose = () => {
    setShowModal(false);
    reset();
  };

  const handleSuccess = (res) => {
    toast.success(res?.message);
    queryClient.invalidateQueries({ queryKey: ["dashboard-main-categories"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-sub-categories"] });
    handleClose();
  };

  const onSubmit = (data) => {
    const payload = {
      "title:ar": data.title.ar,
      "title:en": data.title.en,
    };

    const mutation = isEdit ? editCategory : addCategory;
    const args = isEdit ? { id: selectedCategory.id, payload } : payload;

    mutation(args, {
      onSuccess: handleSuccess,
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  return (
    <GlobalModal show={showModal} size="lg" onHide={handleClose} centered>
      <GlobalModal.Header closeButton>
        <h6>
          {isEdit
            ? t("dashboard.fieldsAndSpecialization.editFieldTitle")
            : t("dashboard.fieldsAndSpecialization.addFieldTitle")}
        </h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {SUPPORTED_LANGS.map((lang) => (
              <div className="col-12 col-md-6 p-2" key={`category-${lang}`}>
                <InputField
                  label={`${t(
                    "dashboard.fieldsAndSpecialization.fieldLabel",
                  )} (${lang})`}
                  placeholder={t(
                    "dashboard.fieldsAndSpecialization.fieldPlaceholder",
                  )}
                  {...register(`title.${lang}`)}
                  error={errors.title?.[lang]?.message}
                />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <CustomButton type="submit" loading={isAdding || isEditing}>
              {isEdit
                ? t("dashboard.fieldsAndSpecialization.editButton")
                : t("dashboard.fieldsAndSpecialization.addButton")}
            </CustomButton>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
