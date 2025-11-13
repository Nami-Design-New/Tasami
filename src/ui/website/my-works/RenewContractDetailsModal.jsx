import { Modal } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import { useTranslation } from "react-i18next";
import Currency from "../../Currency";
import useWithdrawRenewRequest from "../../../hooks/website/MyWorks/useWithdrawRenewRequest";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function RenewContractDetailsModal({
  showModal,
  setShowModal,
  contract,
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { withdrawRenewRequest, isPending } = useWithdrawRenewRequest();
  const handleWithdrawRenewContract = (id) => {
    withdrawRenewRequest(id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({ queryKey: ["contract-details"] });
        setShowModal(false);
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="md"
      className="withdraw-modal"
    >
      <Modal.Header closeButton>
        <h6>{t("renew_title")}</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 p-1">
            <h6>{t("renew_message")}</h6>
          </div>
          <div className="col-12 p-1">
            <p className="renew-date">
              <span>{t("renew_date")} </span>
              <span>{contract?.renew_to_date}</span>
            </p>
          </div>
          <div className="col-12 p-1">
            <p className="renew-date">
              <span>{t("renew_price")}</span>
              <span>{contract?.renew_price}</span> <Currency />
            </p>
          </div>
          <div className="col-12 p-1">
            <CustomButton
              onClick={() => handleWithdrawRenewContract(contract?.id)}
              color="fire"
              size="large"
              fullWidth
              loading={isPending}
            >
              {t("cancel")}
            </CustomButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
