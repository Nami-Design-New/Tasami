import { useOutletContext } from "react-router";
import { ReportCard } from "./ReportCard";
import { useTranslation } from "react-i18next";
import Loading from "./../../../ui/loading/Loading";
import { useRef } from "react";
import ReportIndicator from "./ReportIndicator";

const CommunitiesTab = () => {
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
            value={performanceReportData?.communities_counters?.total}
          />
          {performanceReportData?.communities_counters?.packages.map((item) => (
            <>
              <ReportCard
                cardNumber={1}
                langDir={langDir}
                title={`${t(
                  "dashboard.reports.communitiesTab.basicAssistants"
                )} ${item.package_name}`}
                value={item.communities_count}
                percentage={item.percentage_from_total}
              />
            </>
          ))}
          <ReportCard
            cardNumber={3}
            langDir={langDir}
            title={t(
              "dashboard.reports.communitiesTab.weeklyChangeCommunities"
            )}
            percentage={
              performanceReportData?.communities_counters?.total_growth_percent
            }
          />{" "}
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.avgHighActivity")}
            value={
              performanceReportData?.communities_counters?.total_active_high
            }
            percentage={performanceReportData?.communities_counters?.percent_active_high}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.avgMediumActivity")}
            value={
              performanceReportData?.communities_counters?.total_active_medium
            }
            percentage={performanceReportData?.communities_counters?.percent_active_medium}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.avgLowActivity")}
            value={
              performanceReportData?.communities_counters?.total_active_low
            }
            percentage={performanceReportData?.communities_counters?.percent_active_low}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.avgNewActivity")}
            value={
              performanceReportData?.communities_counters?.total_active_new
            }
            percentage={performanceReportData?.communities_counters?.percent_active_new}
          />
        </div>
        <div className="metrics-container mt-4">
          {performanceReportData?.communities_counters?.packages.map((item) => (
            <>
              <ReportCard
                cardNumber={3}
                langDir={langDir}
                title={`${t(
                  "dashboard.reports.communitiesTab.stoppedCommunitiesMainAssistants"
                )} ${item.package_name}`}
                value={item.stopped_count}
              />
            </>
          ))}
          <ReportCard
            cardNumber={3}
            langDir={langDir}
            title={t(
              "dashboard.reports.communitiesTab.weeklyChangeCommunities"
            )}
            percentage={
              performanceReportData?.communities_counters?.total_growth_percent
            }
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
            value={
              performanceReportData?.digital_content?.total_digital_content
            }
            shape={true}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.totalConsultations")}
            value={performanceReportData?.digital_content?.total_consultations}
            percentage={
              performanceReportData?.digital_content?.consultations_percent
            }
            shape={true}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.totalPosts")}
            value={performanceReportData?.digital_content?.total_meetings}
            percentage={
              performanceReportData?.digital_content?.meetings_percent
            }
            shape={true}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.totalChannels")}
            value={performanceReportData?.digital_content?.total_posts}
            percentage={performanceReportData?.digital_content?.posts_percent}
            shape={true}
          />
          <ReportCard
            cardNumber={3}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.weeklyAverageDigital")}
            percentage={
              performanceReportData?.digital_content?.growth_digital_content
            }
          />
          <ReportCard
            cardNumber={2}
            langDir={langDir}
            title={t(
              "dashboard.reports.communitiesTab.weeklyAverageDigitalContent"
            )}
            value={
              performanceReportData?.digital_content?.avg_period_digital_content
            }
            shape={true}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t(
              "dashboard.reports.communitiesTab.weeklyAverageConsultations"
            )}
            value={
              performanceReportData?.digital_content?.avg_weekly_consultations
            }
            percentage={performanceReportData?.digital_content?.avg_period_consultations}
            shape={true}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.weeklyAverageMeetings")}
            value={performanceReportData?.digital_content?.avg_weekly_meetings}
            percentage={performanceReportData?.digital_content?.avg_period_meetings}
            shape={true}
          />
          <ReportCard
            cardNumber={1}
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.weeklyAveragePosts")}
            value={performanceReportData?.digital_content?.avg_weekly_posts}
            percentage={performanceReportData?.digital_content?.avg_period_posts}
            shape={true}
          />
        </div>

        {/* ────────────── */}
        {/* عضوية المجتمعات */}
        {/* ────────────── */}

        <h3 className="metrics-header mt-4 mb-3">
          {t("dashboard.reports.communitiesTab.communitiesMembership")}
        </h3>

        <div className="metrics-container">
          <ReportCard
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.totalCommunityMembers")}
            value={performanceReportData?.communities_membership?.total_members}
            highlight
            cardNumber={2}
          />
          {performanceReportData?.communities_membership?.packages.map(
            (item) => (
              <>
                <ReportCard
                  langDir={langDir}
                  cardNumber={1}
                  title={` ${t(
                    "dashboard.reports.communitiesTab.assistantCommunityMembers"
                  )} ${item.package_name}`}
                  value={item.members_count}
                  percentage={item.members_percent}
                />
              </>
            )
          )}

          <ReportCard
            langDir={langDir}
            cardNumber={3}
            title={t(
              "dashboard.reports.communitiesTab.weeklyMembersChangeRate"
            )}
            percentage={999}
          />
        </div>
        <div className="metrics-container mt-4">
          {/* row 2 */}
          <ReportCard
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.totalCommunitiesValue")}
            value={performanceReportData?.communities_membership?.total_value}
            highlight
            cardNumber={2}
          />
          {performanceReportData?.communities_membership?.packages.map(
            (item) => (
              <>
                <ReportCard
                  langDir={langDir}
                  cardNumber={1}
                  title={`${t(
                    "dashboard.reports.communitiesTab.totalAssistantCommunitiesValue"
                  )} ${item.package_name}`}
                  value={item.total_value}
                  percentage={item.total_value_growth_percent}
                />
              </>
            )
          )}
          <ReportCard
            langDir={langDir}
            cardNumber={3}
            title={t(
              "dashboard.reports.communitiesTab.weeklyCommunitiesValueChangeRate"
            )}
            percentage={
              performanceReportData?.communities_membership
                ?.total_value_growth_percent
            }
          />
        </div>
        <div className="metrics-container mt-4">
          {/* row 3 */}
          <ReportCard
            langDir={langDir}
            title={t("dashboard.reports.communitiesTab.averageMembershipValue")}
            value={performanceReportData?.communities_membership?.average_value}
            highlight
            cardNumber={2}
          />
          {performanceReportData?.communities_membership?.packages.map(
            (item) => (
              <>
                <ReportCard
                  langDir={langDir}
                  cardNumber={1}
                  title={` ${t(
                    "dashboard.reports.communitiesTab.averageAssistantMonthlyMembershipValue"
                  )} ${item.package_name}`}
                  value={item.average_value}
                  percentage={item.average_value_growth_percent}
                />
              </>
            )
          )}
          <ReportCard
            langDir={langDir}
            cardNumber={3}
            title={t(
              "dashboard.reports.communitiesTab.weeklyAverageMembershipValueChangeRate"
            )}
            percentage={
              performanceReportData?.communities_membership
                ?.average_value_growth_percent
            }
          />
        </div>
      </div>

      <ReportIndicator pdfRef={pdfRef} />
    </>
  );
};

export default CommunitiesTab;
