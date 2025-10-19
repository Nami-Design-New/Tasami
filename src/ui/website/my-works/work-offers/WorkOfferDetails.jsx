import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useAcceptOrRemoveWorkOffer from "../../../../hooks/website/MyWorks/offers/useAcceptOrRemoveWorkOffer";
import useGetWorkOffersDetails from "../../../../hooks/website/MyWorks/offers/useGetWorkOffersDetails";
import HelperCard from "../../../cards/HelperCard";
import Currency from "../../../Currency";
import CustomButton from "../../../CustomButton";
import OfferPaymentModal from "./OfferPaymentModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function WorkOfferDetails({ showModal, setShowModal, offerId }) {
  const { t } = useTranslation();
  const [showPaymentModal, setShowPaymentModal] = useState();
  const queryClient = useQueryClient();
  const { acceptOrRemoveWorkOffer, isPending } = useAcceptOrRemoveWorkOffer();
  const { workOfferDetails, isLoading } = useGetWorkOffersDetails(offerId);

  const handleRemoveOffers = (id) => {
    const payload = {
      status: "canceled_by_user",
      offer_id: id,
    };
    acceptOrRemoveWorkOffer(payload, {
      onSuccess: (res) => {
        toast.success(res?.message);
        setShowModal(false);
        queryClient.refetchQueries({ queryKey: ["work-offers"] });
        queryClient.refetchQueries({ queryKey: ["goal-details"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <h5>تفاصيل العرض </h5>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div
              className="d-flex align-items-center justify-content-center w-100 "
              style={{ minHeight: "200px" }}
            >
              <Spinner animation="border" role="status" color="#214b92">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="row">
              <div className="col-12 p-2">
                <HelperCard helper={workOfferDetails?.helper} />
              </div>
              <div className="info-grid">
                <div className="info-box flex-grow-1 w-100">
                  <div className="label">قيمة المساعدة</div>
                  <div className="value">
                    {workOfferDetails?.price} <Currency />
                  </div>
                </div>
                {workOfferDetails?.notes && (
                  <div className="info-box   flex-grow-1 w-100 ">
                    <div className="label"> بنود إضافية </div>{" "}
                    <div className="value">{workOfferDetails?.notes}</div>
                  </div>
                )}
              </div>
              <div className="col-12 p-2">
                <div className="buttons">
                  <CustomButton
                    color="fire"
                    size="large"
                    loading={isPending}
                    onClick={() => handleRemoveOffers(workOfferDetails?.id)}
                  >
                    استبعاد
                  </CustomButton>
                  <CustomButton
                    fullWidth
                    size="large"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    قبول
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <OfferPaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
        setShowOfferModal={setShowModal}
        plan={workOfferDetails}
      />
    </>
  );
}
