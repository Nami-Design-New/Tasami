import { createColumnHelper } from "@tanstack/react-table";
import TeamCard from "../../../ui/dash-board/cards/TeamCard";
import ReusableDataTable from "../../../ui/ReusableDataTable";
import { useMemo } from "react";
import { Link } from "react-router";
// const gradientClasses = ["blue", "indigo", "green"];
const columnHelper = createColumnHelper();

const TeamsSection = () => {
  const teams = [
    {
      id: "GIN-0000002",
      region: "01 - الشرق الاوسط",
      location: "الرياض 001 - 014 المملكه العربيه السعوديه",
      employees: [
        { title: "عدد الموظفين", data: 50 },
        { title: "عدد المشرفين", data: 12 },
        { title: "عدد التنفيذين", data: 4 },
        { title: " تاريخ الانشاء ", data: "12/7/2024" },
      ],
      progress: {
        completed: 15,
        pending: 5,
        percent: 75,
      },
    },
    {
      id: "GIN-0000001",
      region: "01 - الشرق الاوسط",
      location: "الرياض 001 - 014 المملكه العربيه السعوديه",
      employees: [
        { title: "عدد الموظفين", data: 50 },
        { title: "عدد المشرفين", data: 12 },
        { title: "عدد التنفيذين", data: 4 },
        { title: " تاريخ الانشاء ", data: "12/7/2024" },
      ],
      progress: {
        completed: 15,
        pending: 5,
        percent: 75,
      },
    },
    {
      id: "GIN-0000003",
      region: "01 - الشرق الاوسط",
      location: "الرياض 001 - 014 المملكه العربيه السعوديه",
      employees: [
        { title: "عدد الموظفين", data: 50 },
        { title: "عدد المشرفين", data: 12 },
        { title: "عدد التنفيذين", data: 4 },
        { title: " تاريخ الانشاء ", data: "12/7/2024" },
      ],
      progress: {
        completed: 15,
        pending: 5,
        percent: 75,
      },
    },
  ];
  const data = useMemo(
    () => [
      {
        groupNumber: "GN-000001",
        groupClassifications: "تشغيليه",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "تشغيليه",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        excutives: "3",
        leaders: "4",
        managers: "20",
        supervisorsCount: "7",
        employeeCount: "50",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "إدارية",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "تشغيليه",
        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",
        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "إدارية",

        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",

        actions: "",
      },
      {
        groupNumber: "GN-000001",
        groupClassifications: "إدارية",

        region: "014-المنطقة الوسطى",
        location: "المملكة العربية السعودية",
        city: "الرياض-001",
        createDate: "25-Apr-2020",
        employeeCount: "50",
        supervisorsCount: "7",
        excutives: "3",
        leaders: "4",
        managers: "20",

        actions: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("groupNumber", {
        header: "رقم المجموعه",
        cell: (info) => (
          <Link
            to={`/dashboard/working-group/${info.getValue()}`}
            className="link-styles"
            style={{ textDecoration: "underline" }}
          >
            {info.getValue()}
          </Link>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("groupClassifications", {
        header: " تصنيف المجموعه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("region", {
        header: " الاقليم ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: " القطاع ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("city", {
        header: " المدينه ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createDate", {
        header: "تاريخ الانشاء",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("excutives", {
        header: "عدد التنفيذين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("leaders", {
        header: "عدد القادة",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("managers", {
        header: "عدد المدراء",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("supervisorsCount", {
        header: "عدد المشرفين",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("employeeCount", {
        header: "عدد الموظفين",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: " الاجراءات",

        cell: () => (
          <div className="table__actions">
            <button>
              <i className="fa-solid fa-add  table__actions--main"></i>
            </button>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );
  return (
    <section className="teams">
      <div className="teams__header">
        <h3 className="teams__title"> المجموعات المشتركة </h3>
        <input type="text" placeholder="البحث عن مجموعه  ..." />
      </div>
      <div className="teams__list">
        {teams.map((team, index) => (
          <TeamCard
            key={index}
            team={team}
            // gradientClass={gradientClasses[index % gradientClasses.length]}
          />
        ))}
      </div>
      <ReusableDataTable
        title="   المجموعات المتاحه للاضافه  "
        data={data}
        columns={columns}
        lang="ar"
        initialPageSize={10}
        filter={false}
        searchPlaceholder="البحث في مجموعات العمل ..."
      />
    </section>
  );
};

export default TeamsSection;
