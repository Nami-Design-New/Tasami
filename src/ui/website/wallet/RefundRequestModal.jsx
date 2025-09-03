import { Modal } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useWithDrawForm from "../../../validations/wallet/withdraw-validation";

export default function RefundRequestModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useWithDrawForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <h6>{t("profile.bankAccount")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("profile.fullName")}
                id="charge"
                placeholder={t("profile.fullNamePlaceholder")}
                {...register("fullName")}
                error={errors.fullName?.message}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("profile.iban")}
                id="charge"
                placeholder={t("profile.ibanPlaceholder")}
                {...register("iban")}
                error={errors.iban?.message}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("profile.bankName")}
                id="charge"
                placeholder={t("profile.bankNamePlaceholder")}
                {...register("bankName")}
                error={errors.bankName?.message}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("profile.branchCode")}
                id="charge"
                placeholder={t("profile.branchCodePlaceholder")}
                {...register("branchCode")}
                error={errors.branchCode?.message}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("profile.swiftCode")}
                id="charge"
                placeholder={t("profile.swiftCodePlaceholder")}
                {...register("swiftCode")}
                error={errors.swiftCode?.message}
              />
            </div>

            <div className="col-12 p-2">
              <CustomButton type="submit" fullWidth size="large">
                {t("profile.confirm")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
