import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "../../lib/multilang/config";
import useAddNewSpecialization from "../../hooks/dashboard/FiledsAndSpecialations/useAddNewSpecialization";
import { toast } from "sonner";
import GlobalModal from "../GlobalModal";
import CategorySelect from "./CategorySelect";

const FiledsAndSpecialzationsModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // ----------------- Yup Schema -----------------
  const schema = yup.object().shape({
    existingField: yup
      .string()
      .required(
        t("dashboard.fieldsAndSpecialization.errors.existingFieldRequired"),
      ),
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

  // ----------------- Form Setup -----------------
  const {
    register,
    handleSubmit,
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

  // ----------------- Add Hook -------------------
  const { addNewSpecialization, isPending } = useAddNewSpecialization();

  // ----------------- Form Submission -----------------
  const onSubmit = (data) => {
    const payload = {
      "title:ar": data.specialization.ar,
      "title:en": data.specialization.en,
      category_id: data.existingField,
    };

    addNewSpecialization(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["dashboard-sub-categories"],
        });
        setShowModal(false);
        reset();
      },
      onError: (err) => {
        console.error(err);
        toast.error(err?.message);
      },
    });
  };

  // ----------------- Render -----------------
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
      <GlobalModal.Header closeButton>
        <h6>{t("dashboard.fieldsAndSpecialization.addSpecializationTitle")}</h6>
      </GlobalModal.Header>

      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <CategorySelect
                register={register}
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

            {/* Submit Button */}
            <div className="d-flex justify-content-end mt-3">
              <CustomButton type="submit" loading={isPending}>
                {t("dashboard.fieldsAndSpecialization.addButton")}
              </CustomButton>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
};

export default FiledsAndSpecialzationsModal;
