import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetPackages from "../../../hooks/subscribe/useGetPackages";
import PackageCardLoader from "../../../ui/loading/PackageCardLoader";
import CurrentPlan from "../../../ui/website/platform/CurrentPlan";
import PlanCard from "../../../ui/website/platform/PlanCard";
import PlanDurationSelector from "../../../ui/website/platform/PlanDurationSelector";
import PaymentModal from "../../../ui/website/platform/PaymentModal";

export default function SupscriptionManagment() {
  const { t } = useTranslation();
  const { packages, isLoading } = useGetPackages();
  const [showModal, setShowModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("half_yearly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="subscription-section">
      <CurrentPlan />
      <h2 className="subscription-title">
        {t("website.platformModal.subscription.upgradeYourPlan")}
      </h2>
      <PlanDurationSelector
        options={[
          { label: "نصف سنوية", value: "half_yearly" },
          { label: "سنوية", value: "yearly" },
        ]}
        value={selectedDuration}
        onChange={setSelectedDuration}
      />
      <div className="mt-2">
        <Swiper spaceBetween={16} slidesPerView={2} loop={true}>
          {isLoading ? (
            <>
              {[1, 2].map((index) => (
                <SwiperSlide key={index}>
                  <PackageCardLoader />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {packages[selectedDuration].map((plan) => (
                <SwiperSlide key={plan.id}>
                  <PlanCard
                    plan={plan}
                    setShowModal={setShowModal}
                    setSelectedPlan={setSelectedPlan}
                  />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
      <PaymentModal
        showModal={showModal}
        setShowModal={setShowModal}
        plan={selectedPlan}
      />
    </section>
  );
}
