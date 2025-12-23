import { useOutletContext } from "react-router";
import { ReportCard } from "./ReportCard";
import { useTranslation } from "react-i18next";
import Loading from "../../../ui/loading/Loading";
import ReportIndicator from "./ReportIndicator";
import { useRef } from "react";

const SalesTab = () => {
  const { t, i18n } = useTranslation();
  const langDir = i18n.language;
  const pdfRef = useRef();

  const { performanceReportData, isLoading } = useOutletContext();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div ref={pdfRef} className="performance-report">
        {/* ───────── اشتراكات المساعدين الشخصيين ───────── */}
        <h3 className="metrics-header mt-4 mb-3">
          {t("dashboard.reports.salesTab.personalAssistantSubscriptions")}
        </h3>

        <div className="metrics-container">
          <ReportCard
            langDir={langDir}
            title={t("dashboard.reports.salesTab.totalSubscriptionsSales")}
            value={performanceReportData?.subscriptions?.total_subscriptions}
            highlight
            cardNumber={2}
            shape={true}
          />

          {performanceReportData?.subscriptions?.packages?.map((item) => (
            <ReportCard
              key={item.package_id}
              langDir={langDir}
              cardNumber={1}
              title={`${t(
                "dashboard.reports.salesTab.assistantSubscriptionsSales"
              )} ${item.package_name}`}
              value={item.subscriptions_count}
              percentage={item.percentage_of_total_sales}
              shape={true}
            />
          ))}

          <ReportCard
            langDir={langDir}
            cardNumber={3}
            title={t(
              "dashboard.reports.salesTab.weeklyChangeTotalSubscriptions"
            )}
            percentage={
              performanceReportData?.subscriptions?.total_amount_growth_percent
            }
          />
        </div>

        {/* ───────── مبيعات المساعدين المميزين ───────── */}
        <div className="metrics-container mt-4">
          {/* <ReportCard
            langDir={langDir}
            title={t(
              "dashboard.reports.salesTab.premiumAssistantSubscriptions"
            )}
            value={999}
            highlight
            cardNumber={2}
            shape={true}
          /> */}

          {performanceReportData?.subscriptions?.packages?.map((item) => (
            <ReportCard
              key={item.package_id + "_premium"}
              langDir={langDir}
              cardNumber={1}
              title={`${t(
                "dashboard.reports.salesTab.premiumAssistantPackageSales"
              )} ${item.package_name} ${item.type}`}
              value={item.total_amount}
              percentage={item.total_amount_growth_percent}
              shape={true}
            />
          ))}
        </div>

        {/* ───────── مبيعات المساعدين الرواد ───────── */}
        <div className="metrics-container mt-4 ">
          {/* <ReportCard
            langDir={langDir}
            title={t(
              "dashboard.reports.salesTab.pioneerAssistantSubscriptions"
            )}
            value={performanceReportData?.subscriptions?.total_completed}
            highlight
            cardNumber={2}
            shape={true}
          /> */}

          {performanceReportData?.subscriptions?.packages?.map((item) => (
            <ReportCard
              key={item.package_id + "_premium"}
              langDir={langDir}
              cardNumber={1}
              title={`${t(
                "dashboard.reports.salesTab.premiumAssistantPackageSales"
              )} ${item.package_name} ${item.type}`}
              value={item.average_amount}
              percentage={999}
              shape={true}
            />
          ))}
        </div>

        {/* ───────── عمولات العقود ───────── */}
        <h3 className="metrics-header mt-5 mb-3">
          {t("dashboard.reports.salesTab.contractCommissions")}
        </h3>

        <div className="metrics-container">
          <ReportCard
            langDir={langDir}
            cardNumber={2}
            shape={true}
            title={t("dashboard.reports.salesTab.totalContractCommissions")}
            value={
              performanceReportData?.contract_commission
                ?.total_commission_all_contracts
            }
            riyal={t("dashboard.reports.contractTab.riyal")}
            highlight
          />
          <ReportCard
            langDir={langDir}
            cardNumber={3}
            shape={true}
            title={t(
              "dashboard.reports.salesTab.totalRequestContractCommissions"
            )}
            value={
              performanceReportData?.contract_commission
                ?.total_commission_requests
            }
            riyal={t("dashboard.reports.contractTab.riyal")}
            percentage={
              performanceReportData?.contract_commission
                ?.percent_total_commission_requests
            }
            highlight
          />
          <ReportCard
            langDir={langDir}
            cardNumber={3}
            shape={true}
            title={t(
              "dashboard.reports.salesTab.totalRequestContractCommissions"
            )}
            value={
              performanceReportData?.contract_commission
                ?.total_commission_offers
            }
            riyal={t("dashboard.reports.contractTab.riyal")}
            percentage={
              performanceReportData?.contract_commission
                ?.percent_total_commission_offers
            }
            highlight
          />

          <ReportCard
            langDir={langDir}
            cardNumber={1}
            shape={true}
            title={t("dashboard.reports.salesTab.averageCommissionPerContract")}
            value={
              performanceReportData?.contract_commission
                ?.average_commission_all_contracts
            }
            riyal={t("dashboard.reports.contractTab.riyal")}
            highlight
          />

          <ReportCard
            langDir={langDir}
            cardNumber={1}
            title={t(
              "dashboard.reports.salesTab.weeklyChangeTotalContractCommissions"
            )}
            highlight
            percentage={
              performanceReportData?.contract_commission?.growth_commission
            }
          />
        </div>
      </div>

      <ReportIndicator pdfRef={pdfRef} />
    </>
  );
};

export default SalesTab;
