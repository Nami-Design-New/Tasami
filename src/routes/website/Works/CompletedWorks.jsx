import React, { useState } from "react";
import CompleteWorksCard from "../../../ui/cards/CompleteWorksCard";
import RateModal from "../../../ui/modals/RateModal";
import ViewRateModal from "../../../ui/modals/ViewRateModal";

export default function CompletedWorks() {
  const [showRateModal, setShowRateModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      title: "تنفيذ موقع إلكتروني لبيع الكتب",
      date: "1 أغسطس 2025",
      type: "مؤسسة",
      triangleImage: "/icons/triangle.svg",
      status: "completed",
      statusDate: "20 مارس 2025 | 09:30",
    },
    {
      id: 2,
      title: "تطبيق متابعة المهام للفرق الصغيرة",
      date: "5 أغسطس 2025",
      type: "مؤسسة",
      triangleImage: "/icons/bluetriangle.svg",
      isRated: true,
      ratingData: {
        knowledge: 4,
        punctuality: 5,
        quality: 4,
        respect: 5,
        comment: "ممتاز جدًا ومتعاون!",
      },
      helper: {
        id: 1,
        name: "رحاب سعيد",
        image: "/images/p1.png",
        rating: "4.9",
        country: "مصر",
        status: true,
      },
    },
    {
      id: 3,
      title: "تطبيق متابعة المهام للفرق الصغيرة",
      date: "5 أغسطس 2025",
      type: "مؤسسة",
      triangleImage: "/icons/graytriangle.svg",
      isRated: false,
      helper: {
        id: 2,
        name: "رحاب سعيد",
        image: "/images/p1.png",
        rating: "4.9",
        country: "مصر",
        status: true,
      },
    },
  ]);

  const handleOpenRateModal = (cardId) => {
    setSelectedCardId(cardId);
    setShowRateModal(true);
  };

  const handleOpenReviewsModal = (cardId) => {
    setSelectedCardId(cardId);
    setShowReviewsModal(true);
  };

  const handleSubmitRating = (ratingData) => {
    setCardsData((prev) =>
      prev.map((card) =>
        card.id === selectedCardId
          ? { ...card, isRated: true, ratingData }
          : card
      )
    );
    setShowRateModal(false);
  };

  const selectedRatingData =
    cardsData.find((card) => card.id === selectedCardId)?.ratingData || null;

  return (
    <div className="in-progress-works">
      <div className="container">
        <div className="row">
          {cardsData.map((card) => (
            <div key={card.id}>
              <CompleteWorksCard
                {...card}
                onRateClick={() =>
                  card.isRated
                    ? handleOpenReviewsModal(card.id)
                    : handleOpenRateModal(card.id)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <RateModal
        showModal={showRateModal}
        setShowModal={setShowRateModal}
        onSubmit={handleSubmitRating}
      />

      <ViewRateModal
        showModal={showReviewsModal}
        setShowModal={setShowReviewsModal}
        ratingData={selectedRatingData}
      />
    </div>
  );
}
