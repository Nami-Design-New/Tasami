import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import PlanDurationSelector from "../../../ui/website/platform/PlanDurationSelector";
import { useTranslation } from "react-i18next";
import ActiveOffersList from "../../../ui/website/platform/my-assistances/ActiveOffersList";
import ArchivedOffersList from "../../../ui/website/platform/my-assistances/ArchivedOffersList";
import AddAssistanceModal from "../../../ui/website/offers/AddAssistanceModal";

export default function MyAssistance() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  const initialTab = searchParams.get("tab") || "active";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    setSearchParams({ tab: selectedTab });
  }, [selectedTab, setSearchParams]);

  return (
    <>
      <section className="my-assistances">
        {/* <div className="platform-tabs"> */}
        <PlanDurationSelector
          options={[
            {
              label: t("website.platform.myAssistance.activeOffers"),
              value: "active",
            },
            {
              label: t("website.platform.myAssistance.archivedOffers"),
              value: "archived",
            },
          ]}
          value={selectedTab}
          onChange={setSelectedTab}
        />
        {/* </div> */}
        {selectedTab === "active" && <ActiveOffersList />}
        {selectedTab === "archived" && <ArchivedOffersList />}{" "}
      </section>
      <div className="float-button-wrapper px-2">
        <button className="float-button" onClick={() => setShowModal(true)}>
          {t("website.platform.myAssistance.addNewOffer")}
        </button>
      </div>
      <AddAssistanceModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
