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
              title={` ${t("dashboard.reports.contractTab.helpersContractsCount")} ${item.package_name}`}
              value={item.contracts_count}
              percentage={item.percent_of_contracts}
              shape={true}
            />
          </>
        ))}

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t("dashboard.reports.contractTab.avgContractsPerAssistant")}
          value={
            performanceReportData?.all_contracts?.average_contracts_per_helper
          }
        />

        {/* row 2 */}
        <ReportCard
          langDir={langDir}
          title={t("dashboard.reports.contractTab.totalOngoingContracts")}
          value={performanceReportData?.all_contracts?.total_working}
          highlight
          cardNumber={2}
          shape={true}
        />
        {performanceReportData?.all_contracts?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={1}
              title={`${t("dashboard.reports.contractTab.helpersWorkingContractsCount")} ${item.package_name}`}
              value={item.contracts_working_count}
              percentage={item.percent_working}
              shape={true}
            />
          </>
        ))}
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeOngoingContracts"
          )}
          percentage={performanceReportData?.all_contracts?.growth_rate_working}
        />

        {/* row 3 */}
        <ReportCard
          langDir={langDir}
          title={t("dashboard.reports.contractTab.totalCompletedContracts")}
          value={performanceReportData?.all_contracts?.total_completed}
          highlight
          cardNumber={2}
          shape={true}
        />
        {performanceReportData?.all_contracts?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={1}
              title={` ${t("dashboard.reports.contractTab.helpersCompletedContractsCount")} ${item.package_name}`}
              value={item.contracts_completed_count}
              percentage={item.percent_completed}
              shape={true}
            />
          </>
        ))}
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeCompletedContracts"
          )}
          percentage={
            performanceReportData?.all_contracts?.growth_rate_completed
          }
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
          value={
            performanceReportData?.contracts_from_requests?.total_contracts
          }
        />
        {performanceReportData?.contracts_from_requests?.packages.map(
          (item) => (
            <>
              <ReportCard
                langDir={langDir}
                cardNumber={1}
                title={`${t("dashboard.reports.contractTab.requestsWorkingContractsCount")} ${item.package_name}`}
                value={item.contracts_working_count}
                percentage={item.percent_working}
                shape={true}
              />
            </>
          )
        )}
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeHelpRequests")}
          value={
            performanceReportData?.contracts_from_requests
              ?.percent_total_working
          }
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingToTotalRatio")}
          value={
            performanceReportData?.contracts_from_requests
              ?.percent_contracts_from_requests
          }
        />
        {performanceReportData?.contracts_from_requests?.packages.map(
          (item) => (
            <>
              <ReportCard
                langDir={langDir}
                cardNumber={3}
                title={`${t("dashboard.reports.contractTab.requestsWeeklyChange")} ${item.package_name}`}
                percentage={item.percent_of_contracts}
                shape={true}
              />
            </>
          )
        )}

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.stoppedHelpRequests")}
          value={
            performanceReportData?.contracts_from_requests?.total_completed
          }
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.completedHelpRequests")}
          value={performanceReportData?.contracts_from_requests?.total_stopped}
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
          value={performanceReportData?.contracts_from_offers?.total_contracts}
        />
        {performanceReportData?.contracts_from_offers?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={1}
              title={`${t("dashboard.reports.contractTab.offersWorkingContractsCount")} ${item.package_name}`}
              value={item.contracts_working_count}
              percentage={item.percent_working}
              shape={true}
            />
          </>
        ))}
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.weeklyChangeHelpOffers")}
          value={
            performanceReportData?.contracts_from_offers?.percent_total_working
          }
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.ongoingOffersToTotalRatio")}
          value={
            performanceReportData?.contracts_from_offers
              ?.percent_contracts_from_requests
          }
        />
        {performanceReportData?.contracts_from_offers?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={3}
              title={`${t("dashboard.reports.contractTab.offersWeeklyChange")} ${item.package_name}`}
              percentage={item.percent_of_contracts}
              shape={true}
            />
          </>
        ))}

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.stoppedHelpOffers")}
          value={performanceReportData?.contracts_from_offers?.total_completed}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.completedHelpOffers")}
          value={performanceReportData?.contracts_from_offers?.total_stopped}
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
          value={` ${performanceReportData?.total_contracts_money?.total_value_all_contracts}`}
          riyal={t("dashboard.reports.contractTab.riyal")}
          highlight
        />
        {performanceReportData?.total_contracts_money?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={1}
              title={` ${t("dashboard.reports.contractTab.helpersTotalValue")} ${item.package_name}`}
              value={item.total_value}
              riyal={t("dashboard.reports.contractTab.riyal")}
              percentage={item.percent_of_total}
              shape={true}
            />
          </>
        ))}

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.completedContractsValue")}
          value={
            performanceReportData?.total_contracts_money?.completed_total_value
          }
          riyal={t("dashboard.reports.contractTab.riyal")}
        />

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t("dashboard.reports.contractTab.weeklyChangeTotalValue")}
          percentage={
            performanceReportData?.total_contracts_money
              ?.weekly_growth_completed_value
          }
        />

        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.helpRequestsValue")}
          value={
            performanceReportData?.total_contracts_money?.total_value_requests
          }
          riyal={t("dashboard.reports.contractTab.riyal")}
          highlight
          percentage={
            performanceReportData?.total_contracts_money?.average_value_requests
          }
        />
        <ReportCard
          langDir={langDir}
          cardNumber={1}
          shape={true}
          title={t("dashboard.reports.contractTab.helpOffersValue")}
          value={
            performanceReportData?.total_contracts_money?.total_value_offers
          }
          riyal={t("dashboard.reports.contractTab.riyal")}
          highlight
          percentage={
            performanceReportData?.total_contracts_money?.average_value_offers
          }
        />

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t(
            "dashboard.reports.contractTab.weeklyChangeHelpRequestsValue"
          )}
          percentage={
            performanceReportData?.total_contracts_money?.average_value_requests
          }
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          title={t("dashboard.reports.contractTab.weeklyChangeHelpOffersValue")}
          percentage={
            performanceReportData?.total_contracts_money?.average_value_offers
          }
        />
      </div>
      <div className="metrics-container mt-4">
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgTotalValue")}
          value={` ${performanceReportData?.total_contracts_money?.average_value_all_contracts}`}
          riyal={t("dashboard.reports.contractTab.riyal")}
        />
        {performanceReportData?.total_contracts_money?.packages.map((item) => (
          <>
            <ReportCard
              langDir={langDir}
              cardNumber={3}
              title={`${t("dashboard.reports.contractTab.helpersAverageValue")} ${item.package_name}`}
              value={item.total_value}
              riyal={t("dashboard.reports.contractTab.riyal")}
              percentage={item.average_value}
              shape={true}
            />
          </>
        ))}

        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgHelpRequestsValue")}
          value={
            performanceReportData?.total_contracts_money?.average_value_requests
          }
          riyal={t("dashboard.reports.contractTab.riyal")}
        />
        <ReportCard
          langDir={langDir}
          cardNumber={3}
          shape={true}
          title={t("dashboard.reports.contractTab.avgHelpOffersValue")}
          value={
            performanceReportData?.total_contracts_money?.average_value_offers
          }
          riyal={t("dashboard.reports.contractTab.riyal")}
        />
      </div>
    </div>
  );
};

export default ContractsTab;
