import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetWithdrawRequestDetails from "../../hooks/dashboard/withdrawRequests/useGetWithdrawRequestDetails";
import SpinnerLoader from "../loading/SpinnerLoader";

export default function WithdrawDetailsModal({ show, setShow, request }) {
  const { t } = useTranslation();
  const { withdrawRequestDetails, isLoading } =
    useGetWithdrawRequestDetails(request);

  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <h6>{t("withdraw.details")}</h6>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <>
            {" "}
            <ul className="list-group">
              <li className="list-group-item">
                <strong>IBAN:</strong>{" "}
                {withdrawRequestDetails.user_bank_info.iban}
              </li>
              <li className="list-group-item">
                <strong>{t("withdraw.bankName")}:</strong>{" "}
                {withdrawRequestDetails.user_bank_info.bank_name}
              </li>
              <li className="list-group-item">
                <strong>{t("withdraw.fullName")}:</strong>{" "}
                {withdrawRequestDetails.user_bank_info.full_name}
              </li>
              <li className="list-group-item">
                <strong>{t("withdraw.branchCode")}:</strong>{" "}
                {withdrawRequestDetails.user_bank_info.branch_code}
              </li>
              <li className="list-group-item">
                <strong>{t("withdraw.swift")}:</strong>{" "}
                {withdrawRequestDetails.user_bank_info.swift_code}
              </li>
            </ul>
            <div className="mt-3 text-center">
              {withdrawRequestDetails.file?.endsWith(".pdf") ? (
                <a
                  href={withdrawRequestDetails.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("withdraw.openFile")}
                </a>
              ) : (
                <img
                  src={withdrawRequestDetails.attachment}
                  alt="attachment"
                  className="img-fluid"
                />
              )}
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
