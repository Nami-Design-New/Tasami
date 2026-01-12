import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import useMessagePaymentListener from "../../hooks/shared/useMessagePaymentListener";
import useChargeWallet from "../../hooks/website/wallet/useChargeWallet";
import CustomButton from "../CustomButton";
import InputField from "../forms/InputField";

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
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(getChargeBalanceSchema(t)),
  });

  useMessagePaymentListener({
    onSuccess: () => {
      toast.success(t("payment.success"));
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["authedUser"] });
    },
    onFail: () => {
      toast.error(t("payment.failed"));
    },
  });

  const onSubmit = (data) => {
    const price = data.charge;
    charge(price, {
      onSuccess: (res) => {
        setShowModal(false);
        if (res?.data?.redirect_url) {
          const width = 800;
          const height = 600;
          const left = window.screenX + (window.outerWidth - width) / 2;
          const top = window.screenY + (window.outerHeight - height) / 2;
          window.open(
            res.data.redirect_url,
            "ChargeWalletPopup",
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no`
          );
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
