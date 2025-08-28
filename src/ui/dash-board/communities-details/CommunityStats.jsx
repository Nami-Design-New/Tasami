import Currency from "../../Currency";
import { CommunityStat } from "./CommunityStat";

export default function CommunityStats() {
  return (
    <div className="community-stats">
      <CommunityStat
        title="الاعضاء"
        icon="/icons/group-second.svg"
        value="144"
        label="عضو"
      />
      <CommunityStat
        title="الإعجابات"
        icon="/icons/heart-fill.svg"
        value="144"
        label="إعجاب"
      />
      <CommunityStat
        title="قيمة العضوية"
        icon="/icons/wallet-second.svg"
        value={
          <>
            144 <Currency />
          </>
        }
        label="شهريا"
      />
      <CommunityStat
        title="قيمة العضوية"
        icon="/icons/active-index.svg"
        label="متوسط"
      />
    </div>
  );
}
