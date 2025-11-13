import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import TextField from "../../forms/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import useAnswerInquriy from "../../../hooks/website/inquiries/useAnswerInquriy";

export default function AnswerModal({ shwModal, setShowModal, item }) {
  const { t } = useTranslation();
  const { answer, isPending } = useAnswerInquriy();
  const querClient = useQueryClient();

  const schema = yup.object().shape({
    answer: yup
      .string()
      .required(t("validation.required"))
      .min(15, t("validation.descriptionMin"))
      .max(500, t("validation.descriptionMax")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    answer(
      { work_id: item?.id, answer: data.answer },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          querClient.invalidateQueries([{ queryKey: "inquries" }]);
          reset();
          setShowModal(false);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };
  return (
    <Modal
      className="answer-modal"
      show={shwModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
    >
      <Modal.Header closeButton className="m-2">
        <h6 className="fw-bold">{t("website.inquiry.answer.title")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <h3 className="message-title">
                <img src="/icons/triangle-with-helper.svg" />
                <span> الهدف </span>
              </h3>
              <p className="message-desc">{item.message}</p>
            </div>
            <div className="col-12 p-2">
              <TextField
                placeholder={t("website.inquiry.placeholder")}
                id="commentText"
                {...register("answer")}
                error={errors.answer?.message}
              />
            </div>

            <div className="col-12 p-2">
              <CustomButton
                fullWidth
                size="large"
                type="submit"
                disabled={isPending}
                loading={isPending}
              >
                {t("send")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
