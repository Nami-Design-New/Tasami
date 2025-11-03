import { useParams } from "react-router";
import useGetRates from "../../hooks/website/personal-assistances/useGetRates";
import Loading from "../../ui/loading/Loading";

export default function PersonalOffersRates() {
  const { id } = useParams();
  const { rates, isLoading } = useGetRates(id);
  if (isLoading) return <Loading />;
  return <section className="personal-assistant-rates page"></section>;
}
