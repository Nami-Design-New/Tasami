import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useChargeWallet from "../../hooks/website/wallet/useChargeWallet";
import { toast } from "sonner";
import { useSelector } from "react-redux";

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
  const { charge, isPending } = useChargeWallet();

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
    const price = data.charge;
    charge(price, {
      onSuccess: (res) => {
        setShowModal(false);
        toast.success("profile.chargeSuccess");
        if (res?.data?.redirect_url) {
          window.open(res.data.redirect_url, "_blank");
        }
        reset();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
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
                placeholder={t("profile.enterAmount")}
                {...register("charge")}
                error={errors.charge?.message}
              />
            </div>
          </div>

          <div className="col-12 p-2">
            <CustomButton
              type="submit"
              loading={isPending}
              fullWidth
              size="large"
            >
              {t("profile.confirm")}
            </CustomButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ChargeBalanceModal;
