import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { SUPPORTED_LANGS } from "../../lib/multilang/config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SelectField from "../forms/SelectField";
import useGetMainCategories from "../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";
import InputField from "../forms/InputField";
import CustomButton from "../CustomButton";
import { useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useEditSpecialization from "../../hooks/dashboard/FiledsAndSpecialations/useEditSpecialization";
import GlobalModal from "../GlobalModal";

export default function EditFiledAndSpecializationModal({
  showModal,
  setShowModal,
  selectedTarget,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  // ----------------- Yup Schema -----------------
  const schema = yup.object().shape({
    existingField: yup.string().when("isNewField", {
      is: "exist",
      then: () =>
        yup
          .string()
          .required(
            t("dashboard.fieldsAndSpecialization.errors.existingFieldRequired")
          ),
      otherwise: () => yup.string().nullable(),
    }),
    // Dynamic validation for specialization (ar + en)
    specialization: yup.object(
      SUPPORTED_LANGS.reduce((acc, lang) => {
        acc[lang] = yup
          .string()
          .required(
            t(
              "dashboard.fieldsAndSpecialization.errors.specializationRequired"
            ) + ` (${lang})`
          )
          .min(
            2,
            t("dashboard.fieldsAndSpecialization.errors.specializationShort") +
              ` (${lang})`
          );
        return acc;
      }, {})
    ),
  });

  // ----------------- Hooks -----------------
  const { mainCategories, isLoading: categoriesLoading } =
    useGetMainCategories();

  const { editSpecialization, isPending } = useEditSpecialization();
  // ----------------- Form Setup -----------------
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      existingField: "",
      specialization: SUPPORTED_LANGS.reduce(
        (acc, lang) => ({ ...acc, [lang]: "" }),
        {}
      ),
    },
  });
  // ----------------- fill the form ------------
  useEffect(() => {
    reset({
      existingField: selectedTarget?.categoryId || "",
      specialization: {
        ar: selectedTarget?.specializations_ar || "",
        en: selectedTarget?.specializations_en || "",
      },
    });
  }, [selectedTarget, reset]);

  // ----------------- Submit Handler -----------------
  const onSubmit = (formData) => {
    const payload = {
      _method: "put",
      category_id: formData.existingField,
      "title:ar": formData.specialization.ar,
      "title:en": formData.specialization.en,
    };
    editSpecialization(
      { id: selectedTarget?.id, payload },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          setShowModal(false);
          queryClient.invalidateQueries({
            queryKey: ["dashboard-sub-categories"],
          });
          reset();
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      }
    );
  };

  return (
    <GlobalModal
      show={showModal}
      size="lg"
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      aria-labelledby="working group add / edit Modal"
      centered
    >
      {" "}
      <GlobalModal.Header closeButton>
        <h6>{t("dashboard.fieldsAndSpecialization.editModalTitle")}</h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 col-md-12 p-2">
              <SelectField
                label={t(
                  "dashboard.fieldsAndSpecialization.existingFieldLabel"
                )}
                options={
                  mainCategories?.data?.map((c) => ({
                    value: c.id,
                    name: c.title ?? "No Title",
                  })) || []
                }
                loading={categoriesLoading}
                {...register("existingField")}
                error={errors.existingField?.message}
              />
            </div>
            {/* Specialization Input */}
            {SUPPORTED_LANGS.map((lang) => (
              <div key={`specialization-${lang}`} className={"col-md-6 p-2"}>
                <InputField
                  label={`${t(
                    "dashboard.fieldsAndSpecialization.specializationLabel"
                  )} (${lang})`}
                  placeholder={t(
                    "dashboard.fieldsAndSpecialization.specializationPlaceholder"
                  )}
                  {...register(`specialization.${lang}`)}
                  error={errors.specialization?.[lang]?.message}
                />
              </div>
            ))}
          </div>
          <div className="col-12 p-2">
            <CustomButton type="submit" loading={isPending}>
              {t("dashboard.fieldsAndSpecialization.editButton")}
            </CustomButton>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
