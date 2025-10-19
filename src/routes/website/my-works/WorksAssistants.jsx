import { useTranslation } from "react-i18next";
import NoGroup from "../../../ui/website/my-works/noGroup";
import Loading from "../../../ui/loading/Loading";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import useGetWorkAssistants from "../../../hooks/website/MyWorks/assistants/useGetWorkAssistants";
import HelperCard from "../../../ui/cards/HelperCard";
import { useParams } from "react-router";

export default function WorksAssistants() {
  const { t } = useTranslation();
  const { id } = useParams();

  const { workDetails, isLoading } = useGetWorkDetails();
  const { workAssistants, isLoading: loadingWorkAssistants } =
    useGetWorkAssistants(id);

  console.log(workAssistants);

  if (isLoading || loadingWorkAssistants) return <Loading />;

  const withHelper = workDetails.rectangle === "personal_goal";

  const noHelpers =
    !workAssistants?.current_helper &&
    (!workAssistants?.previous_helpers ||
      workAssistants.previous_helpers.length === 0);

  if (noHelpers) {
    return <NoGroup withHelper={withHelper} />;
  }

  return (
    <section className="works-assistants-section">
      {workAssistants?.current_helper && (
        <div className="recent-assistants">
          <h1>{t("الاحدث")}</h1>
          <HelperCard
            helper={workAssistants?.current_helper?.helper}
            withChat={true}
          />
        </div>
      )}

      {workAssistants?.previous_helpers?.length > 0 && (
        <div className="previous-assistants">
          <h1>{t("المساعدون السابقون")}</h1>
          {workAssistants.previous_helpers.map((helper) => (
            <HelperCard key={helper.id} helper={helper} withChat={true} />
          ))}
        </div>
      )}
    </section>
  );
}
