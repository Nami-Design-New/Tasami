import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import CommunityBio from "../../ui/dash-board/communities-details/CommunityBio";
import CommunityStats from "../../ui/dash-board/communities-details/CommunityStats";
import ReusableDataTable from "../../ui/table/ReusableDataTable";
import { Link, Outlet } from "react-router";
import CommunityTabs from "../../ui/dash-board/communities-details/CommunityTabs";
import { useTranslation } from "react-i18next";

const columnHelper = createColumnHelper();

export default function CommunitiesDetails() {
  const { t } = useTranslation();
  const editData = useMemo(
    () => [
      {
        date: "22-01-2025",
        status: "تشغيل",
      },
      {
        date: "22-02-2025",
        status: "ايقاف",
      },
      {
        date: "24-05-2025",
        status: "تشغيل",
      },
      {
        date: "26-06-2025",
        status: "ايقاف",
      },
    ],
    []
  );

  const editColumns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: " الحالة ",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );
  const subData = useMemo(
    () => [
      {
        username: "الكومي",
        accountNumber: "U-020522-000001",
        date: "23-01-2025",
        subValue: "1000",
      },
      {
        username: "محمود",
        accountNumber: "U-020522-000002",
        date: "07-06-2025",
        subValue: "100",
      },
    ],
    []
  );

  const subColumns = useMemo(
    () => [
      columnHelper.accessor("username", {
        header: "الاسم",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountNumber", {
        header: "رقم الحساب",
        cell: (info) => (
          <Link
            className="link-styles"
            to={`/dashboard/user-details/${info.getValue()}`}
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("date", {
        header: " التاريخ ",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("subValue", {
        header: " قيمة الاشتراك ",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  return (
    <section className="communities-details">
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 p-2">
            <div className="communities-image-wrapper">
              <img
                className="communities-image"
                src="/images/dashboard/communities-image.png"
                alt="communities-details"
              />
            </div>
          </div>
          <div className="col-12 p-2">
            <CommunityBio />
          </div>
          <div className="col-12 p-2">
            <CommunityStats />
          </div>
          <div className="col-12 p-2">
            <ReusableDataTable
              filter={false}
              title="سجل التعديلات"
              searchPlaceholder="بحث..."
              data={editData}
              columns={editColumns}
            />
          </div>
          <div className="col-12 p-2">
            <ReusableDataTable
              filter={false}
              title="سجل الاشتراكات"
              searchPlaceholder="بحث..."
              data={subData}
              columns={subColumns}
            />
          </div>
        </div>
        <div className="row p-0">
          <h4 className="chanels">{t("community.channels")}</h4>
          <div className="col-12 col-md-4 p-2">
            <CommunityTabs />
          </div>
          <div className="col-12 col-md-8 p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
