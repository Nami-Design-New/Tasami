import { useOutletContext } from "react-router";
import { ReportCard } from "./ReportCard";
import { useTranslation } from "react-i18next";
import Loading from "../../../ui/loading/Loading";

const ContractsTab = () => {
  const { t, i18n } = useTranslation();
  const langDir = i18n.language;
  const { performanceReportData, isLoading } = useOutletContext();
  if (isLoading) {
    return <Loading />;
  }
  console.log("contract tabs", performanceReportData);

  return (
    <div className="performance-report">
      {/* ───────────────────────────── */}
      {/* SECTION 1 — All Contracts */}
      {/* ───────────────────────────── */}
      <h3 className="metrics-header mt-4 mb-3">
        {t("dashboard.reports.contractTab.allContracts")}
      </h3>

      <div className="metrics-container">
        <ReportCard
          langDir={langDir}
          title={t("dashboard.reports.contractTab.totalContracts")}
          value={performanceReportData?.all_contracts?.total_contracts}
          highlight
          cardNumber={2}
          shape={true}
        />
        {performanceReportData?.all_contracts?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={1}
              title={t("dashboard.reports.contractTab.basicAssistantContracts")}
              value={200}
              percentage={35}
              shape={true}
            />
          </>
        ))}
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          title={t("dashboard.reports.contractTab.basicAssistantContracts")}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.premiumAssistantContracts")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.leadAssistantContracts")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t("dashboard.reports.contractTab.avgContractsPerAssistant")}
          value={performanceReportData?.all_contracts?.total_contracts}
        />

        {/* row 2 */}
        <ReportCard
          langDir={langDir}
          title={t("dashboard.reports.contractTab.totalOngoingContracts")}
          value={548}
          highlight
          cardNumber={2}
          shape={true}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          title={t(
            "dashboard.reports.contractTab.ongoingBasicAssistantContracts"
          )}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.ongoingPremiumAssistantContracts"
          )}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.ongoingLeadAssistantContracts"
          )}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeOngoingContracts"
          )}
          percentage={35}
        />

        {/* row 3 */}
        <ReportCard
          langDir={langDir}
          title={t("dashboard.reports.contractTab.totalCompletedContracts")}
          value={548}
          highlight
          cardNumber={2}
          shape={true}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          title={t(
            "dashboard.reports.contractTab.completedBasicAssistantContracts"
          )}
          value={548}
          percentage={35}
          shape={true}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.completedPremiumAssistantContracts"
          )}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.completedLeadAssistantContracts"
          )}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeCompletedContracts"
          )}
          percentage={35}
        />
      </div>

      {/* ───────────────────────────── */}
      {/* SECTION 2 — Help Requests Contracts */}
      {/* ───────────────────────────── */}
      <h3 className="metrics-header mt-5 mb-3">
        {t("dashboard.reports.contractTab.helpRequestContracts")}
      </h3>

      <div className="metrics-container">
        <ReportCard
          langDir={langDir}
          cardNumber={2}
          shape={true}
          title={t("dashboard.reports.contractTab.totalOngoingHelpRequests")}
          value={"25%"}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingBasicHelpRequests")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingPremiumHelpRequests")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingLeadHelpRequests")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeHelpRequests")}
          value={548}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingToTotalRatio")}
          value={548}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeBasicHelpRequests"
          )}
          value={""}
          percentage={10}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.weeklyChangePremiumHelpRequests"
          )}
          value={""}
          percentage={10}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeLeadHelpRequests"
          )}
          value={""}
          percentage={10}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.stoppedHelpRequests")}
          value={""}
          percentage={1}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.completedHelpRequests")}
          value={""}
          percentage={1}
        />
      </div>

      {/* SECTION 3 — Help Offers Contracts */}
      <h3 className="metrics-header mt-5 mb-3">
        {t("dashboard.reports.contractTab.helpOffersContracts")}
      </h3>

      <div className="metrics-container">
        <ReportCard
          langDir={langDir}
          cardNumber={2}
          shape={true}
          title={t("dashboard.reports.contractTab.totalOngoingHelpOffers")}
          value={"25%"}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingBasicHelpOffers")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingPremiumHelpOffers")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingLeadHelpOffers")}
          value={548}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeHelpOffers")}
          value={548}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingOffersToTotalRatio")}
          value={548}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeBasicHelpOffers")}
          value={""}
          percentage={10}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.weeklyChangePremiumHelpOffers"
          )}
          value={""}
          percentage={10}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeLeadHelpOffers")}
          value={""}
          percentage={10}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.stoppedHelpOffers")}
          value={""}
          percentage={1}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.completedHelpOffers")}
          value={""}
          percentage={1}
        />
      </div>

      {/* SECTION 4 — Contracts Value */}
      <h3 className="metrics-header mt-5 mb-3">
        {t("dashboard.reports.contractTab.contractsValue")}
      </h3>

      <div className="metrics-container">
        <ReportCard
          langDir={langDir}
          cardNumber={2}
          shape={true}
          title={t("dashboard.reports.contractTab.totalValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
          highlight
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.basicAssistantValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.premiumAssistantValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.leadAssistantValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
          percentage={35}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.completedContractsValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeTotalValue")}
          value={""}
          percentage={8}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.helpRequestsValue")}
          value={""}
          percentage={-6}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.helpOffersValue")}
          value={""}
          percentage={-6}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeHelpRequestsValue"
          )}
          value={""}
          percentage={-6}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeHelpOffersValue")}
          value={""}
          percentage={-6}
        />

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgTotalValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgBasicAssistantValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgPremiumAssistantValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgLeadAssistantValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgHelpRequestsValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgHelpOffersValue")}
          value={`${t("dashboard.reports.contractTab.riyal")} 500`}
        />
      </div>
    </div>
  );
};

export default ContractsTab;
