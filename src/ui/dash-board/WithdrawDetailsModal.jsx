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
        <h6 className="m-0">{t("withdraw.details")}</h6>
      </Modal.Header>

      <Modal.Body className="p-3">
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <label className="mb-0 text-secondary">
                  {t("withdraw.iban") || "IBAN"}:
                </label>
                <span className="ms-2 text-break">
                  {withdrawRequestDetails?.user_bank_info?.iban || "-"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-start">
                <label className="mb-0 text-secondary">
                  {t("withdraw.bankName")}:
                </label>
                <span className="ms-2 text-break">
                  {withdrawRequestDetails?.user_bank_info?.bank_name || "-"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-start">
                <label className="mb-0 text-secondary">
                  {t("withdraw.fullName")}:
                </label>
                <span className="ms-2 text-break">
                  {withdrawRequestDetails?.user_bank_info?.full_name || "-"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-start">
                <label className="mb-0 text-secondary">
                  {t("withdraw.branchCode")}:
                </label>
                <span className="ms-2 text-break">
                  {withdrawRequestDetails?.user_bank_info?.branch_code || "-"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-start">
                <label className="mb-0 text-secondary">
                  {t("withdraw.swift")}:
                </label>
                <span className="ms-2 text-break">
                  {withdrawRequestDetails?.user_bank_info?.swift_code || "-"}
                </span>
              </li>

              {withdrawRequestDetails?.reason && (
                <li className="list-group-item">
                  <label className="form-label mb-1 text-secondary">
                    {t("withdraw.notes")}:
                  </label>
                  <div className="ms-1">{withdrawRequestDetails.reason}</div>
                </li>
              )}
            </ul>

            {withdrawRequestDetails?.file && (
              <div className="mt-3 ">
                <label className="form-label fw-semibold d-block mb-2">
                  {t("withdraw.attachments") || "Attachment"}
                </label>

                {withdrawRequestDetails.file.endsWith(".pdf") ? (
                  <a
                    href={withdrawRequestDetails.file}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    {t("withdraw.openFile") || "Open File"}
                  </a>
                ) : (
                  <img
                    src={withdrawRequestDetails.file}
                    alt="attachment"
                    className="img-fluid rounded-2 shadow-sm"
                    style={{
                      height: 300,
                      objectFit: "contain",
                      border: "1px solid #e9ecef",
                    }}
                  />
                )}
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
