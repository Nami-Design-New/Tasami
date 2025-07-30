import React from "react";
import { useState } from "react";
import HelperCard from "../../../ui/cards/HelperCard";
import OfferInfoGrid from "../../../ui/website/offers/OfferInfoGrid";
import CustomButton from "../../../ui/CustomButton";
import PaymentModal from "../../../ui/modals/PaymentModal";

export default function Details() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);


    const helper = 
  {
    id: 1,
    name: "انس تركي",
    country: "السعودية",
    rating: 6,
    image: "/images/p2.png",
    status: true,
  }
  const offer = {
    id: 1,
    rating: 4.8,
    title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
    country: "البحرين",
    type: "مؤسس ",
    section: "تجارة إلكترونية",
    ageCategory: "15 - 24",
    identity: "رجال فقط",
    extraTerms:
      "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
    price: 2500,
    image: "/images/p2.png",
    status: true,
    assistMethods: [
      "الالتقاء الشخصي",
      "الاتصال المرئي والمسموع ",
      "التراسل النصي والصوتي",
    ],
     };

  return (
    <div className="goal-details-card">
      <HelperCard helper={helper} />
      <div className="col-lg-9 col-12">
        
        <div className="hed">
          <img src="/icons/triangle.svg" alt="icon" />
          <h6>المساعدة</h6>
        </div>
        <p className="desc">{offer.title}</p>

        <OfferInfoGrid
          offer={offer}
        />

        <CustomButton onClick={() => setShowPaymentModal(true)}>
          اتمام الدفع
        </CustomButton>
        
      </div>
      <PaymentModal showModal={showPaymentModal} setShowModal={setShowPaymentModal} />

    </div>
  );
}
