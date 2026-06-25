import Currency from "../../Currency";
import { CommunityStat } from "./CommunityStat";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import groupSecond from "../../../assets/icons/group-second.svg";
import heartFill from "../../../assets/icons/heart-fill.svg";
import walletSecond from "../../../assets/icons/wallet-second.svg";
import activeIndex from "../../../assets/icons/active-index.svg";
export default function CommunityStats({ community }) {
  const { t } = useTranslation();
  const communityOwnerId =
    community?.helper?.id ||
    community?.user?.id ||
    community?.user_id ||
    community?.helper_id;

  return (
    <div className="community-stats">
      <CommunityStat
        title={t("members")}
        icon={groupSecond}
        value={community?.members_count || community?.user_count || 0}
        label={t("member")}
        action={
          community?.is_subscribed === true &&
          communityOwnerId && (
            <Link
              to={`/community/${community?.id}/members?user_id=${communityOwnerId}`}
              className="community-stat-action"
            >
              {t("community.membersList")}
            </Link>
          )
        }
      />
      <CommunityStat
        title={t("likes")}
        icon={heartFill}
        value={community?.likes_count}
        label={t("like")}
      />
      <CommunityStat
        title={t("membershipValue")}
        icon={walletSecond}
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
        icon={activeIndex}
        label={community?.activity_level}
      />
    </div>
  );
}
