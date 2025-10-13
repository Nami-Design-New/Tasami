import { useTranslation } from "react-i18next";
import NoGroup from "../../../ui/website/my-works/noGroup";
import Loading from "../../../ui/loading/Loading";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";

export default function WorksAssistants() {
  const { t } = useTranslation();
  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;
  const withHelper = workDetails.rectangle === "personal_goal" ? true : false;
  return (
    <section className="works-group-section">
      <NoGroup withHelper={withHelper} />
    </section>
  );
}
