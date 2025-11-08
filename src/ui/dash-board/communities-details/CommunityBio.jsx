import { useTranslation } from "react-i18next";

export default function CommunityBio({ userData }) {
  const { t } = useTranslation();
  return (
    <div className="community-data">
      <h1 className="community-title">
        {t("myCommunity")} {userData?.name}
      </h1>
    </div>
  );
}
