import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import useAcceptOrRemoveWorkOffer from "../../../../hooks/website/MyWorks/offers/useAcceptOrRemoveWorkOffer";
import useGetWorkOffersDetails from "../../../../hooks/website/MyWorks/offers/useGetWorkOffersDetails";

import HelperCard from "../../../cards/HelperCard";
import Currency from "../../../Currency";
import CustomButton from "../../../CustomButton";
import OfferPaymentModal from "./OfferPaymentModal";

export default function WorkOfferDetails({ showModal, setShowModal, offerId }) {
  const { t } = useTranslation();
  const { id: workId } = useParams();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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
        navigate(`/my-works/${workId}/group`);
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["work-offers"] });
        queryClient.refetchQueries({ queryKey: ["work-details"] });
        queryClient.refetchQueries({ queryKey: ["assistants"] });
        queryClient.refetchQueries({ queryKey: ["work-group"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <GlobalModal show={showModal} onHide={() => setShowModal(false)} centered>
        <GlobalModal.Header closeButton>
          <h6>{t("works.myOffers.details.title")}</h6>
        </GlobalModal.Header>
        <GlobalModal.Body>
          {isLoading ? (
            <div
              className="d-flex align-items-center justify-content-center w-100"
              style={{ minHeight: "200px" }}
            >
              <Spinner animation="border" role="status" color="#214b92">
                <span className="visually-hidden">{t("loading")}</span>
              </Spinner>
            </div>
          ) : (
            <div className="row">
              <div className="col-12 p-2">
                <HelperCard
                  helper={workOfferDetails?.helper}
                  canNavigate={false}
                  toResume={true}
                />
              </div>

              <div className="info-grid">
                <div className="info-box flex-grow-1 w-100">
                  <div className="label">
                    {t("works.myOffers.details.amount")}
                  </div>
                  <div className="value">
                    {workOfferDetails?.price} <Currency />
                  </div>
                </div>

                {workOfferDetails?.notes && (
                  <div className="info-box flex-grow-1 w-100">
                    <div className="label">
                      {t("works.myOffers.details.extraTerms")}
                    </div>
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
                    {t("works.myOffers.details.reject")}
                  </CustomButton>

                  <CustomButton
                    fullWidth
                    size="large"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    {t("works.myOffers.details.accept")}
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
        </GlobalModal.Body>
      </GlobalModal>

      <OfferPaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
        setShowOfferModal={setShowModal}
        plan={workOfferDetails}
      />
    </>
  );
}
