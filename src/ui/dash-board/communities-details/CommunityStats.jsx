import Currency from "../../Currency";
import { CommunityStat } from "./CommunityStat";

export default function CommunityStats({ community }) {
  return (
    <div className="community-stats">
      <CommunityStat
        title="الاعضاء"
        icon="/icons/group-second.svg"
        value={community?.members_count}
        label="عضو"
      />
      <CommunityStat
        title="الإعجابات"
        icon="/icons/heart-fill.svg"
        value={community?.likes_count}
        label="إعجاب"
      />
      <CommunityStat
        title="قيمة العضوية"
        icon="/icons/wallet-second.svg"
        value={
          community?.price === 0 ? (
            "مجاني"
          ) : (
            <>
              {community?.price} {<Currency />}
            </>
          )
        }
        label={community?.price === 0 ? "" : "شهريا"}
      />
      <CommunityStat
        title="قيمة العضوية"
        icon="/icons/active-index.svg"
        label={community?.activity_level}
      />
    </div>
  );
}
