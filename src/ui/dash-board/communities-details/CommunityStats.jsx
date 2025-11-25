import Currency from "../../Currency";
import { CommunityStat } from "./CommunityStat";
import { useTranslation } from "react-i18next";

export default function CommunityStats({ community }) {
  const { t } = useTranslation();
  console.log("community stats:::" , community);

  return (
    <div className="community-stats">
      <CommunityStat
        title={t("members")}
        icon="/icons/group-second.svg"
        value={community?.members_count}
        label={t("member")}
      />
      <CommunityStat
        title={t("likes")}
        icon="/icons/heart-fill.svg"
        value={community?.likes_count}
        label={t("like")}
      />
      <CommunityStat
        title={t("membershipValue")}
        icon="/icons/wallet-second.svg"
        value={
          community?.price === 0 ? (
            t("free")
          ) : (
            <>
              {community?.price} <Currency />
            </>
          )
        }
        label={community?.price === 0 ? "" : t("perMonth")}
      />
      <CommunityStat
        title={t("activityLevel")}
        icon="/icons/active-index.svg"
        label={community?.activity_level}
      />
    </div>
  );
}
