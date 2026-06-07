import { useMemo, useState } from "react";
import ColumnChart from "../../../ui/dash-board/charts/ColumnChart";
import { Link } from "react-router";
import { Badge } from "react-bootstrap";
import { PAGE_SIZE } from "../../../utils/constants";
import useGetAssistantOffers from "../../../hooks/dashboard/subscription/assistantOffers/useGetAssistantOffers";
import { useTranslation } from "react-i18next";
import useGetMainCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetMainCategories";
import useGetSubCategories from "../../../hooks/dashboard/FiledsAndSpecialations/useGetSubCategories";
import useGetPackages from "../../../hooks/dashboard/website-managment/packages/useGetPackages";
import { columnHelper } from "../../../ui/datatable/adapters/tanstackAdapter";
import { usePersistedTableState } from "../../../ui/datatable/hooks/usePersistedTableState";
import DataTable from "../../../ui/datatable/ui/DataTable";

const getProgramArchiveStatus = (t) => [
  { id: 1, value: 1, label: t("dashboard.programs.archived") },
  { id: 2, value: 0, label: t("dashboard.programs.active") },
];

const Programs = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  usePersistedTableState({
    key: "programs-table",
    state: {
      search,
      page,
      sortConfig,
      filters,
    },
    setState: (saved) => {
      setSearch(saved.search ?? "");
      setPage(saved.page ?? 1);
      setSortConfig(saved.sortConfig ?? null);
      setFilters(saved.filters ?? {});
    },
  });

  const { assistantOffersData, currentPage, lastPage, isLoading } =
    useGetAssistantOffers(search, page, pageSize, sortConfig, filters);

  const { mainCategories } = useGetMainCategories();
  const { subCategories } = useGetSubCategories("", 1, 50, filters.category);
  const { packages } = useGetPackages("", 1, 50);

  const usersSeries = [
    {
      name: t("dashboard.programs.assistantOffers"),
      data: ["450", "211", "150"],
    },
    { name: t("dashboard.programs.pending"), data: ["100", "30", "30"] },
    { name: t("dashboard.programs.inProgress"), data: ["110", "20", "60"] },
    { name: t("dashboard.programs.completed"), data: ["200", "100", "40"] },
    { name: t("dashboard.programs.deleted"), data: ["40", "30", "20"] },
  ];

  const usersCategories = [
    t("dashboard.programs.basicHelper"),
    t("dashboard.programs.premiumHelper"),
    t("dashboard.programs.leadersHelper"),
  ];

  const usersOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "12%",
        barHeight: "100%",
        endingShape: "rounded",
        borderRadius: 5,
        borderRadiusApplication: "end",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: usersCategories,
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: ["#8c137e", "#007BFF", "#FFC107", "#28A745", "#DC3545"],
    tooltip: {
      y: {
        formatter: (val) =>
          `${val} ${t("dashboard.programs.assistantOffers")} `,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const data = useMemo(
    () =>
      assistantOffersData?.data?.map((program) => ({
        id: program?.id,
        user_id: program?.user?.id,
        code: program?.code,
        created_at: program?.created_at,
        is_archived: program?.is_archived,
        account_code: program?.user?.account_code,
        account_type: program?.user?.account_type,
        identify_code: program?.user?.identify_code,
        category: program?.category?.title,
        sub_category: program?.sub_category?.title,
        active_contracts: program?.active_contracts,
        completed_contracts: program?.completed_contracts,
        price: program?.price,
        benefits: program?.benefits,
        rate: program?.rate,
      })) || [],
    [assistantOffersData?.data],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", {
        header: t("dashboard.programs.service"),
        cell: (info) => (
          <Link
            to={`/dashboard/programs/${info?.row.original.id}`}
            className="link-styles"
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("created_at", {
        header: t("dashboard.programs.date"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("is_archived", {
        header: t("dashboard.programs.status"),
        cell: (info) => {
          let badgeColor;
          switch (info.getValue()) {
            case true:
              badgeColor = "#28a745";
              break;
            case false:
              badgeColor = "#ffc107  ";
              break;

            default:
              badgeColor = "#6c757d";
              break;
          }
          return (
            <Badge
              pill
              className="custom-badge"
              style={{
                "--badge-color": badgeColor,
                "--text-color": "#fff",
                fontWeight: "400",
              }}
            >
              {info.getValue() === true
                ? t("dashboard.programs.archived")
                : t("dashboard.programs.active")}
            </Badge>
          );
        },
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("account_code", {
        header: t("dashboard.programs.accountNumber"),
        cell: (info) => (
          <Link
            to={`/dashboard/user-details/${info?.row?.original.user_id}`}
            className={info.getValue() ? "link-styles" : ""}
          >
            {info.getValue() || "-"}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("account_type", {
        header: t("dashboard.programs.accountType"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),

      columnHelper.accessor("identify_code", {
        header: t("dashboard.programs.idNumber"),
        // cell: (info) => (
        //   <Link to={`/model/${info.getValue()}`} className="link-styles">
        //     {info.getValue()}
        //   </Link>
        // ),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("category", {
        header: t("dashboard.programs.field"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("sub_category", {
        header: t("dashboard.programs.specialization"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
        enableFiltering: true,
      }),
      columnHelper.accessor("active_contracts", {
        header: t("dashboard.programs.activeContracts"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("completed_contracts", {
        header: t("dashboard.programs.completedContracts"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("price", {
        header: t("dashboard.programs.price"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("benefits", {
        header: t("dashboard.programs.beneficiaries"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
      columnHelper.accessor("rate", {
        header: t("dashboard.programs.rate"),
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      }),
    ],
    [t],
  );

  const programsFilterConfig = {
    is_archived: {
      id: "is_archived",
      type: "select",
      label: { en: "Status" },
      options: getProgramArchiveStatus(t),
    },
    created_at: {
      type: "date",
      mode: "range",
    },
    account_type: {
      id: "account_type",
      type: "select",
      label: { en: "Package" },
      options: packages?.map((pack) => ({
        value: pack?.id,
        label: pack?.title,
      })),
    },
    category: {
      id: "category",
      type: "select",
      label: { en: "Field" },
      options: mainCategories?.data?.map((category) => ({
        value: category?.id,
        label: category?.title,
      })),
    },
    sub_category: {
      id: "sub_category",
      type: "select",
      label: { en: "Specialization" },
      options: subCategories?.map((subCategory) => ({
        value: subCategory?.id,
        label: subCategory?.title,
      })),
    },
  };

  const handleSortChange = (sortBy, sortOrder) => {
    setSortConfig(sortBy && sortOrder ? { sortBy, sortOrder } : null);
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-12">
          <ColumnChart
            series={usersSeries}
            options={usersOptions}
            title={t("dashboard.programs.assistantOffers")}
          />
        </div>
        <div className="col-12">
          <DataTable
            title={t("dashboard.programs.assistantOffers")}
            data={data}
            columns={columns}
            loading={isLoading}
            filterConfig={programsFilterConfig}
            pagination={{
              currentPage,
              lastPage,
              pageSize,
              onPageSizeChange: setPageSize,
              page,
              onPageChange: setPage,
            }}
            sorting={{
              enabled: true,
              server: true,
              sortBy: sortConfig?.sortBy,
              sortOrder: sortConfig?.sortOrder,
              onChange: handleSortChange,
            }}
            filtering={{
              enabled: false,
              server: true,
              onChange: setFilters,
            }}
            search={{
              enabled: true,
              value: search,
              onChange: setSearch,
              searchPlaceholder: t("dashboard.programs.searchInOffers"),
              debounceMs: 500,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Programs;
