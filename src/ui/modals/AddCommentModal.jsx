import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import CustomButton from "../CustomButton";
import TextField from "../forms/TextField";

const AddCommentModal = ({ showModal, setShowModal, onSubmit, isLoading }) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    commentText: yup
      .string()
      .required(
        t("validation.requiredField", { field: t("community.commentLabel") })
      )
      .min(
        15,
        t("validation.min", { field: t("community.commentLabel"), min: 15 })
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    await onSubmit?.(data.commentText);
    reset();
  };

  return (
    <Modal
      show={showModal}
      size="md"
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
    >
      <Modal.Header closeButton>
        <h6 className="fw-bold">{t("community.addCommentTitle")}</h6>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <TextField
                label={t("community.commentLabel")}
                placeholder={t("community.commentPlaceholder")}
                id="commentText"
                {...register("commentText")}
                error={errors.commentText?.message}
              />
            </div>
            <div className="col-12 p-2">
              <CustomButton
                loading={isLoading}
                fullWidth
                size="large"
                type="submit"
              >
                {t("community.sendComment")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCommentModal;
