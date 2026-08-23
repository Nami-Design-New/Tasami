import HelperCard from "../../cards/HelperCard";

export default function TopInfo({ offer }) {
  return <HelperCard helper={offer.user} canNavigate={false} />;
}
