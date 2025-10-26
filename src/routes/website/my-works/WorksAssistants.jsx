import { useTranslation } from "react-i18next";
import NoGroup from "../../../ui/website/my-works/noGroup";
import Loading from "../../../ui/loading/Loading";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import useGetWorkAssistants from "../../../hooks/website/MyWorks/assistants/useGetWorkAssistants";
import HelperCard from "../../../ui/cards/HelperCard";
import { useParams } from "react-router";
import { useState } from "react";
import CustomButton from "../../../ui/CustomButton";
import AssignAssistantModal from "../../../ui/website/my-works/assistants/AssignAssistantModal";
import NoOffers from "../../../ui/website/my-works/NoOffers";
import AssistantWorkCard from "../../../ui/website/my-works/work-offers/AssistantWorkCard";

export default function WorksAssistants() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [showModal, setShowModal] = useState();
  const { workDetails, isLoading } = useGetWorkDetails();
  const { workAssistants, isLoading: loadingWorkAssistants } =
    useGetWorkAssistants(id);

  // Show loading until both queries finish
  if (isLoading || loadingWorkAssistants) return <Loading />;

  const withHelper = workDetails?.rectangle === "personal_goal_with_helper";

  const noHelpers =
    !workAssistants?.current_helper &&
    (!workAssistants?.previous_helpers ||
      workAssistants.previous_helpers.length === 0);

  // Show "NoGroup" if there are no helpers
  if (noHelpers) {
    return (
      <section className="works-assistants-section">
        {withHelper ? (
          <>
            <NoOffers />
          </>
        ) : (
          <>
            <NoGroup withHelper={withHelper} />
            <div className="button-wrapper">
              <CustomButton
                fullWidth
                size="large"
                style={{ backgroundColor: "#4ECDC4" }}
                onClick={() => setShowModal(true)}
              >
                تعين مساعد شخصي
              </CustomButton>
            </div>
          </>
        )}{" "}
        <AssignAssistantModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </section>
    );
  }

  return (
    <section className="works-assistants-section">
      {workAssistants?.current_helper && (
        <div className="recent-assistants">
          <h1>{t("الاحدث")}</h1>
          <AssistantWorkCard
            helper={workAssistants.current_helper.helper}
            contractId={workAssistants.current_helper.id}
          />
        </div>
      )}

      {workAssistants?.previous_helpers?.length > 0 && (
        <div className="previous-assistants">
          <h1>{t("المساعدون السابقون")}</h1>
          <div className="row">
            {workAssistants.previous_helpers.map((helper) => (
              <div className="col-12 py-2 px-0" key={helper.id}>
                <AssistantWorkCard
                  helper={helper?.helper}
                  contractId={helper?.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
