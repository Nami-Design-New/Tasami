import { Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { SUPPORTED_LANGS } from "../../lib/multilang/config";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAddNewSubject from "../../hooks/dashboard/administrativeSystems/useAddNewSubject";
import useEditSubject from "../../hooks/dashboard/administrativeSystems/useEditSubject";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const SubjectModal = ({
  showModal,
  setShowModal,
  isEdit = false,
  selectedSubject,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // ---------------------- VALIDATION SCHEMA ------------------------
  const schema = yup.object().shape({
    system: yup
      .string()
      .required(t("dashboard.subjectModal.errors.systemRequired")),
    code: yup
      .string()
      .required(t("dashboard.subjectModal.errors.codeRequired")),
    translations: yup.object(
      SUPPORTED_LANGS.reduce((acc, lang) => {
        acc[lang] = yup
          .string()
          .required(
            t("dashboard.subjectModal.errors.subjectRequired", { lang })
          );
        return acc;
      }, {})
    ),
  });

  // ---------------------- FORM SETUP ------------------------
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      system: "",
      code: "",
      translations: SUPPORTED_LANGS.reduce((acc, lang) => {
        acc[lang] = "";
        return acc;
      }, {}),
    },
  });

  // ---------------------- FILL FORM ON EDIT ------------------------

  useEffect(() => {
    if (showModal) {
      if (isEdit && selectedSubject) {
        reset({
          system: selectedSubject.administrativeSystem || "",
          code: selectedSubject.code || "",
          translations: SUPPORTED_LANGS.reduce((acc, lang) => {
            acc[lang] = selectedSubject[`subjects_${lang}`] || "";
            return acc;
          }, {}),
        });
      } else {
        reset({
          system: "",
          code: "",
          translations: SUPPORTED_LANGS.reduce((acc, lang) => {
            acc[lang] = "";
            return acc;
          }, {}),
        });
      }
    }
  }, [isEdit, selectedSubject, setValue, showModal, reset]);

  // ---------------------- MUTATIONS ------------------------
  const { addNewSubject, isAddingNewSubject } = useAddNewSubject();
  const { editSubject, isEditingSubject } = useEditSubject();

  // ---------------------- SUBMIT HANDLER ------------------------
  const onSubmit = (formData) => {

    const payload = {
      type: formData.system,
      code: formData.code,
      "title:ar": formData.translations.ar,
      "title:en": formData.translations.en,
    };

    if (isEdit) {
      editSubject(
        { id: selectedSubject.id, subjectData: { _method: "put", ...payload } },
        {
          onSuccess: (res) => {
            toast.success(res?.message);
            reset();
            setShowModal(false);
            queryClient.invalidateQueries({
              queryKey: ["subjects"],
            });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      addNewSubject(payload, {
        onSuccess: (res) => {
          toast.success(res?.message);
          reset();
          setShowModal(false);
          queryClient.invalidateQueries({
            queryKey: ["subjects"],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  // ---------------------- CLOSE MODAL ------------------------
  const handleClose = () => {
    reset();
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={handleClose}
      aria-labelledby="subject add / edit Modal"
      centered
    >
      <Modal.Header closeButton>
        <h6>
          {isEdit
            ? t("dashboard.subjectModal.editTitle")
            : t("dashboard.subjectModal.newTitle")}
        </h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* System Selection */}
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label={t("dashboard.subjectModal.system")}
                error={errors.system?.message}
                {...register("system")}
                options={[
                  {
                    value: "internal",
                    name: t("dashboard.subjectModal.internal"),
                  },
                  {
                    value: "outside",
                    name: t("dashboard.subjectModal.external"),
                  },
                ]}
              />
            </div>

            {/* Code */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("dashboard.subjectModal.code")}
                {...register("code")}
                error={errors.code?.message}
              />
            </div>

            {/* Translations */}
            {SUPPORTED_LANGS.map((lang) => (
              <div className="col-12 col-md-6 p-2" key={lang}>
                <InputField
                  label={`${t("dashboard.subjectModal.subject")} (${lang})`}
                  {...register(`translations.${lang}`)}
                  error={errors.translations?.[lang]?.message}
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="d-flex justify-content-end mt-3">
              <CustomButton
                loading={isAddingNewSubject || isEditingSubject}
                disabled={isAddingNewSubject || isEditingSubject}
              >
                {isEdit
                  ? t("dashboard.subjectModal.edit")
                  : t("dashboard.subjectModal.add")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SubjectModal;
