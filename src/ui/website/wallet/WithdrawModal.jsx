import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useWithdrawWallet from "../../../hooks/website/wallet/useWithdrawWallet";
import useWithDrawForm from "../../../validations/wallet/withdraw-validation";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";

export default function WithdrawModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useWithDrawForm();
  const { withdrawWallet, isPending } = useWithdrawWallet();

  const onSubmit = (data) => {
    const payload = {
      iban: data.iban,
      bank_name: data.bankName,
      full_name: data.fullName,
      branch_code: data.branchCode,
      swift_code: data.swiftCode,
      price: data.price,
    };
    withdrawWallet(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "تمت العملية بنجاخ");
        queryClient.invalidateQueries({
          queryKey: ["wallet-balance"],
        });
        setShowModal(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => {
        setShowModal(false);
        reset();
      }}
      centered
    >
      <Modal.Header closeButton>
        <h6>{t("profile.bankAccount")}</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {" "}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label={t("profile.price")}
                id="charge"
                {...register("price")}
                error={errors.price?.message}
                icon={"/icons/ryal.svg"}
              />
            </div>
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
              <CustomButton
                type="submit"
                loading={isPending}
                fullWidth
                size="large"
              >
                {t("profile.confirm")}
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
