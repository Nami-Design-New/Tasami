import { useTranslation } from "react-i18next";
import useGetWorkDetails from "../../../hooks/website/MyWorks/useGetWorkDetails";
import NoGroup from "../../../ui/website/my-works/noGroup";
import Loading from "../../../ui/loading/Loading";

export default function WorksGroup() {
  const { t } = useTranslation();
  const { workDetails, isLoading } = useGetWorkDetails();
  if (isLoading) return <Loading />;
  const withHelper = workDetails.rectangle === "personal_goal" ? true : false;

  return (
    <section>
      <NoGroup withHelper={withHelper} />
    </section>
  );
}
