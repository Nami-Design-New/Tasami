import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useAddFaq from "../../../hooks/dashboard/website-managment/faq/useAddFaq";
import useEditFaq from "../../../hooks/dashboard/website-managment/faq/useEditFaq";
import { SUPPORTED_LANGS } from "../../../lib/multilang/config";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import TextField from "../../forms/TextField";
import GlobalModal from "../../GlobalModal";

export default function ContentModal({
  showModal,
  setShowModal,
  isEdit,
  faqData,
  setIsEdit,
  setFaqData,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Yup schema dynamically for all supported languages
  const schemaShape = SUPPORTED_LANGS.reduce((acc, lang) => {
    acc[`question_${lang}`] = yup
      .string()
      .required(t("dashboard.faq.modal.question") + " " + t("required"));
    acc[`answer_${lang}`] = yup
      .string()
      .required(t("dashboard.faq.modal.answer") + " " + t("required"));
    return acc;
  }, {});

  const schema = yup.object().shape(schemaShape);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { addNewFaq, isPending: adding } = useAddFaq();
  const { editNewFaq, isPending: editing } = useEditFaq();

  // Pre-fill form when editing
  useEffect(() => {
    if (isEdit && faqData) {
      reset({
        answer_ar: faqData.answer_ar,
        question_en: faqData.questions_en,
        answer_en: faqData.answer_en,
        question_ar: faqData.questions_ar,
      });
    } else {
      reset();
    }
  }, [isEdit, faqData, reset]);

  const onSubmit = (data) => {
    const payload = SUPPORTED_LANGS.reduce((acc, lang) => {
      acc[lang] = {
        question: data[`question_${lang}`],
        answer: data[`answer_${lang}`],
      };
      return acc;
    }, {});

    if (isEdit) {
      editNewFaq(
        {
          id: faqData.id,
          payload: {
            _method: "put",
            "title:ar": payload.ar.question,
            "title:en": payload.en.question,
            "desc:ar": payload.ar.answer,
            "desc:en": payload.en.answer,
          },
        },
        {
          onSuccess: (res) => {
            setShowModal(false);
            reset();
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["dh-faqs"] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      addNewFaq(
        {
          "title:ar": payload.ar.question,
          "title:en": payload.en.question,
          "desc:ar": payload.ar.answer,
          "desc:en": payload.en.answer,
        },
        {
          onSuccess: (res) => {
            setShowModal(false);
            toast.success(res.message);
            reset();
            queryClient.invalidateQueries({ queryKey: ["dh-faqs"] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
  };

  return (
    <GlobalModal
      show={showModal}
      size="lg"
      onHide={() => {
        setShowModal(false);
        reset();
        setIsEdit(false);
        setFaqData(null);
      }}
      centered
    >
      <GlobalModal.Header closeButton>
        <h6>
          {isEdit
            ? t("dashboard.faqs.modal.edit")
            : t("dashboard.faqs.modal.add")}{" "}
          {t("dashboard.faqs.modal.question")}
        </h6>
      </GlobalModal.Header>
      <GlobalModal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {SUPPORTED_LANGS.map((lang) => (
              <div className="col-12 col-md-6 p-2" key={`question-${lang}`}>
                <Controller
                  name={`question_${lang}`}
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label={`${t("dashboard.faqs.modal.question")} (${lang})`}
                      placeholder={`${t(
                        "dashboard.faqs.modal.question"
                      )} (${lang})`}
                      {...field}
                      error={errors[`question_${lang}`]?.message}
                    />
                  )}
                />
              </div>
            ))}

            {SUPPORTED_LANGS.map((lang) => (
              <div className="col-12 p-2" key={`answer-${lang}`}>
                <Controller
                  name={`answer_${lang}`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={`${t("dashboard.faqs.modal.answer")} (${lang})`}
                      placeholder={`${t(
                        "dashboard.faqs.modal.answer"
                      )} (${lang})`}
                      {...field}
                      error={errors[`answer_${lang}`]?.message}
                    />
                  )}
                />
              </div>
            ))}

            <div className="col-12 p-2">
              <div className="d-flex align-items-center gap-2 justify-content-end">
                <CustomButton
                  size="large"
                  type="submit"
                  disabled={adding || editing}
                  loading={adding || editing}
                >
                  {isEdit
                    ? t("dashboard.faqs.modal.edit")
                    : t("dashboard.faqs.modal.add")}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </GlobalModal.Body>
    </GlobalModal>
  );
}
