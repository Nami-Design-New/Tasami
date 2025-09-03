import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const getChargeBalanceSchema = (t) =>
  yup.object().shape({
    charge: yup
      .number()
      .typeError(t("validation.number"))
      .required(t("validation.required", { field: t("profile.balance") }))
      .min(
        1,
        t("validation.min", {
          field: t("profile.balance"),
          min: 1,
        })
      ),
  });

const ChargeBalanceModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(getChargeBalanceSchema(t)),
  });

  const onSubmit = (data) => {
    console.log(data);

    setShowModal(false);
    reset();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <h6>{t("profile.chargeBalance")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 p-2">
              <InputField
                label={t("profile.chargeBalance")}
                type="number"
                icon="/icons/ryal.svg"
                id="charge"
                placeholder="أدخل المبلغ"
                {...register("charge")}
                error={errors.charge?.message}
              />
            </div>
          </div>

          <div className="col-12 p-2">
            <CustomButton type="submit" fullWidth size="large">
              {t("profile.confirm")}
            </CustomButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ChargeBalanceModal;
