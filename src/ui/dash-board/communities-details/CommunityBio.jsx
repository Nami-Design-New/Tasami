import { useTranslation } from "react-i18next";

export default function CommunityBio({ userCommunities }) {
  const { t } = useTranslation();
  return (
    <div className="community-data">
      <h1 className="community-title">
        {t("myCommunity")} {`${userCommunities?.Communitiy?.user.first_name}`} {`${userCommunities?.Communitiy?.user.last_name}`}
      </h1>
    </div>
  );
}
