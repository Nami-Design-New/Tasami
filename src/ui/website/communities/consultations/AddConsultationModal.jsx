import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";
import TextField from "../../../forms/TextField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useAddConsultation from "../../../../hooks/website/communities/useAddConsultation";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function AddConsultationModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const { id } = useParams();
  // Schema with radio validation
  const schema = yup.object().shape({
    title: yup
      .string()
      .required(t("validation.titleRequired"))
      .min(5, t("validation.titleMin")),
    description: yup
      .string()
      .required(t("validation.descriptionRequired"))
      .min(15, t("validation.descriptionMin"))
      .max(500, t("validation.descriptionMax")),
    consultationType: yup.string().required(t("validation.typeRequired")),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      consultationType: "1",
    },
  });

  const { addConsultaion, isPending } = useAddConsultation();
  const selectedConsultationType = watch("consultationType");
  const onSubmit = (data) => {
    const payload = {
      community_id: id,
      title: data.title,
      desc: data.description,
      is_private: data.consultationType,
    };
    addConsultaion(payload, {
      onSuccess: (res) => {
        setShowModal(false);
        toast.success(res.message);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      centered
      size="md"
      onHide={() => {
        setShowModal(false);
        reset();
      }}
    >
      <Modal.Header closeButton>
        <h6>{t("community.addConsultation")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Title */}
            <div className="col-12 p-2">
              <InputField
                label={t("community.addConsultaionTitle")}
                placeholder={t("community.addConsultaionTitle")}
                {...register("title")}
              />
              {errors.title && (
                <p className="error-text">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="col-12 p-2">
              <TextField
                label={t("community.addConsultaionDec")}
                placeholder={t("community.descPlaceholder")}
                {...register("description")}
              />
              {errors.description && (
                <p className="error-text">{errors.description.message}</p>
              )}
            </div>

            {/* Consultation Type */}
            <div className="col-12 p-2">
              <div className="identity-container">
                <label
                  className={`identity-option ${
                    selectedConsultationType === "0" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="0" //  add value
                    {...register("consultationType")}
                  />
                  <span>{t("public")}</span>
                </label>

                <label
                  className={`identity-option ${
                    selectedConsultationType === "1" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="1" // add value
                    {...register("consultationType")}
                  />
                  <span>{t("private")}</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-12 p-2">
              <CustomButton
                loading={isPending}
                fullWidth
                size="large"
                type="submit"
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
