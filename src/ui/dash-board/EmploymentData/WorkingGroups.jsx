import { useEffect, useMemo, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useGetWorkingGroupdetails from "../../../hooks/dashboard/workingGroups/useGetWorkingGroupDetails";
import { columnHelper } from "../../datatable/adapters/tanstackAdapter";
import DataTable from "../../datatable/ui/DataTable";
import EmptySection from "../../EmptySection";
import { PAGE_SIZE } from "../../../utils/constants";

const getEmployeeName = (employee) =>
  [employee?.first_name, employee?.family_name].filter(Boolean).join(" ") ||
  "-";

const SharedGroupMembersTable = ({ group, enabled }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = PAGE_SIZE;

  const { workingMembers, currentPage, lastPage, isLoading } =
    useGetWorkingGroupdetails(group?.id, "", page, pageSize, enabled);

  useEffect(() => {
    setPage(1);
  }, [group?.id]);

  const tableData = useMemo(
    () =>
      workingMembers.map((employee) => ({
        id: employee?.id,
        name: getEmployeeName(employee),
        jobTitle: employee?.job_title || "-",
        code: employee?.code || "-",
      })),
    [workingMembers],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: t("dashboard.workGroupDetails.columns.code"),
        cell: (info) => {
          const employeeId = info?.row?.original?.id;

          if (!employeeId) return info.getValue();

          return (
            <Link
              to={`/dashboard/employee-summary/${employeeId}`}
              className="link-styles"
            >
              {info.getValue()}
            </Link>
          );
        },
      }),
      columnHelper.accessor("name", {
        header: t("dashboard.userAccounts.name"),
      }),
      columnHelper.accessor("jobTitle", {
        header: t("dashboard.workGroupDetails.columns.jobTitle"),
      }),
    ],
    [t],
  );

  return (
    <DataTable
      title={group?.name || t("dashboard.employeeProfile.tabs.sharedGroups")}
      data={tableData}
      columns={columns}
      loading={isLoading}
      filterConfig={{}}
      pagination={{
        currentPage,
        lastPage,
        pageSize,
        onPageSizeChange: () => {},
        page,
        onPageChange: setPage,
      }}
      sorting={{
        enabled: false,
        server: false,
      }}
      filtering={{
        enabled: false,
        server: false,
      }}
      search={{
        enabled: false,
        value: "",
        onChange: () => {},
      }}
    />
  );
};

const WorkingGroups = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.adminAuth);
  const sharedGroups = user?.shared_groups || [];
  const [activeKey, setActiveKey] = useState(null);

  return (
    <>
      {sharedGroups.length > 0 ? (
        <Accordion
          activeKey={activeKey}
          className="shared-groups-accordion"
          onSelect={setActiveKey}
        >
          {sharedGroups.map((group, index) => {
            const eventKey = String(group?.id || index);
            const isActive = activeKey === eventKey;

            return (
              <Accordion.Item eventKey={eventKey} key={group?.id || index}>
                <Accordion.Header>
                  <div className="shared-groups-accordion__header">
                    <span className="shared-groups-accordion__title">
                      <i className="fa-solid fa-badge-check permission-list__icon"></i>
                      {group?.name}
                    </span>
                    <span className="shared-groups-accordion__count">
                      {group?.employees_count || 0}
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <SharedGroupMembersTable group={group} enabled={isActive} />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      ) : (
        <EmptySection message={t("dashboard.noSharedGroups")} />
      )}
    </>
  );
};

export default WorkingGroups;
