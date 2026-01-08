import { Modal } from "react-bootstrap";
import Currency from "../../Currency";
import useGetPackage from "../../../hooks/dashboard/website-managment/packages/useGetPackage";
import SpinnerLoader from "../../loading/SpinnerLoader";
import { useTranslation } from "react-i18next";

export default function DetailsSubscriptionsModal({
  showModal,
  setShowModal,
  selectedPack,
}) {
  const { t } = useTranslation();
  const { packageData, isLoading } = useGetPackage(selectedPack);

  const handleClose = () => setShowModal(false);

  return (
    <Modal centered size="lg" show={showModal} onHide={handleClose}>
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <Modal.Header closeButton>
            <h6>
              {packageData?.title || t("dashboard.subscriptions.no_data")}
            </h6>
          </Modal.Header>

          <Modal.Body>
            <div className="subscriptions-details">
              <div className="row">
                {/* Header */}
                <div className="col-12 p-2">
                  <div className="subscriptions-header">
                    <img
                      src={
                        packageData?.image ||
                        "/images/dashboard/silver-package.svg"
                      }
                      alt={packageData?.title_ar || packageData?.title_en || ""}
                      className="image-preview-circle"
                    />
                    <h3>
                      {packageData?.title ||
                        t("dashboard.subscription.no_data")}
                    </h3>
                    {/* <p>
                      {packageData?.yearly_price === 0 ? (
                        t("dashboard.subscription.free_forever")
                      ) : (
                        <>
                          {packageData?.yearly_price} <Currency />{" "}
                        </>
                      )}
                    </p> */}
                  </div>
                </div>

                {/* Features */}
                <div className="col-12 p-2">
                  <ul>
                    <li>
                      <span>{t("dashboard.subscriptions.offers_count")}</span>
                      <span>{packageData?.offers_count || 0}</span>
                    </li>
                    <li>
                      <span>{t("dashboard.subscriptions.groups_count")}</span>
                      <span>{packageData?.groups_count || 0}</span>
                    </li>
                    <li>
                      <span>{t("dashboard.subscriptions.seats_count")}</span>
                      <span>{packageData?.seats_count || 0}</span>
                    </li>
                    <li>
                      <span>{t("dashboard.subscriptions.app_commission")}</span>
                      <span>{packageData?.app_commission || 0}%</span>
                    </li>
                  </ul>
                </div>

                {/* Prices */}
                {packageData?.type !== "free" && (
                  <>
                    {" "}
                    <div className="col-6 p-2">
                      <div className="subscription-price">
                        <span>
                          {t("dashboard.subscriptions.yearly_price")} :
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          {packageData?.yearly_price} <Currency />
                        </span>
                      </div>
                    </div>
                    <div className="col-6 p-2">
                      <div className="subscription-price">
                        <span>
                          {t("dashboard.subscriptions.half_yearly_price")} :
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          {packageData?.half_yearly_price} <Currency />
                        </span>
                      </div>
                    </div>{" "}
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}
