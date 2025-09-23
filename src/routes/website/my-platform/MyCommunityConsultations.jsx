import PrivateConsultations from "../../../ui/cards/PrivateConsultations";
import PublicConsultations from "../../../ui/cards/PublicConsultations";

export default function MyCommunityConsultations() {
  return (
    <div className="consultations-section">
      <PrivateConsultations />
      <PublicConsultations />
    </div>
  );
}
