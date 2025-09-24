import PrivateConsultations from "../../../ui/website/communities/consultations/PrivateConsultations";
import PublicConsultations from "../../../ui/website/communities/consultations/PublicConsultations";

export default function MyCommunityConsultations() {
  return (
    <div className="consultations-section">
      <PrivateConsultations />
      <PublicConsultations />
    </div>
  );
}
