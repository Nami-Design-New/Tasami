import { ReportCard } from "./ReportCard";
import { useTranslation } from "react-i18next";

const CommunitiesTab = () => {
  const { t, i18n } = useTranslation();
  const langDir = i18n.language;

  return (
    <div className="performance-report">
      {/* ────────────── */}
      {/* Communities Section */}
      {/* ────────────── */}
      <h3 className="metrics-header mt-4 mb-3">
        {t("dashboard.reports.communitiesTab.communities")}
      </h3>
      <div className="metrics-container justify-content-center">
        <ReportCard
          cardNumber={2}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.totalCommunities")}
          value={548}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.basicAssistants")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.premiumAssistants")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.leadAssistants")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={3}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.avgLowActivity")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.avgMediumActivity")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.avgHighActivity")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.weeklyChangeCommunities")}
          value={""}
          percentage={1}
          shape={true}
        />
      </div>
      <div className="metrics-container mt-4">
        <ReportCard
          cardNumber={3}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.stoppedCommunitiesMainAssistants")}
          value={""}
          percentage={1}
          shape={true}
        />
        <ReportCard
          cardNumber={3}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.stoppedCommunitiesPremiumAssistants")}
          value={""}
          percentage={1}
          shape={true}
        />
        <ReportCard
          cardNumber={3}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.stoppedCommunitiesPioneerAssistants")}
          value={""}
          percentage={1}
          shape={true}
        />
        <ReportCard
          cardNumber={3}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.weeklyChangeCommunities")}
          value={""}
          percentage={1}
          shape={true}
        />
      </div>

      {/* ────────────── */}
      {/* Digital Content Section */}
      {/* ────────────── */}
      <h3 className="metrics-header mt-5 mb-3">
        {t("dashboard.reports.communitiesTab.digitalContent")}
      </h3>
      <div className="metrics-container">
        <ReportCard
          cardNumber={2}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.totalDigitalContent")}
          value={548}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.totalConsultations")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.totalPosts")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.totalChannels")}
        //   value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={3}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.weeklyAverageDigital")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={2}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.weeklyAverageDigitalContent")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t("dashboard.reports.communitiesTab.weeklyAverageConsultations")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t(
            "dashboard.reports.communitiesTab.weeklyAverageMeetings"
          )}
          value={""}
          percentage={1}
          shape={true}
        />
        <ReportCard
          cardNumber={1}
          langDir={langDir}
          title={t(
            "dashboard.reports.communitiesTab.weeklyAveragePosts"
          )}
          value={""}
          percentage={1}
          shape={true}
        />
      </div>
    </div>
  );
};

export default CommunitiesTab;
