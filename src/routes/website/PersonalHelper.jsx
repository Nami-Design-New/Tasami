import { useState } from "react";
import useFilteredList from "../../hooks/useFilteredList";
import HelperCard from "../../ui/cards/HelperCard";
import SectionHeader from "../../ui/website/SectionHeader";
import SidebarFilter from "../../ui/website/home/SidebarFilter";
import helperFilterModal from "../../ui/website/helpers/HelperFilterModal";
import HelperFilterModal from "../../ui/website/helpers/HelperFilterModal";
import useGetPersonalAssistants from "../../hooks/website/personal-assistants/useGetPersonalAssistants";
import AssistantsSidebar from "../../ui/website/helpers/AssistantsSidebar";
import { Link } from "react-router";

export default function PersonalHelper() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const {
    assistantsData,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPersonalAssistants();

  const allAssistants =
    assistantsData?.pages?.flatMap((page) => page?.data) ?? [];
  // const {
  //   activeTab,
  //   setActiveTab,
  //   searchValue,
  //   setSearchValue,
  //   tabs,
  //   filteredItems,
  // } = useFilteredList("type", ["title", "name"]);
  // const filters = [
  //   {
  //     label: "جنسية المساعد الشخصي",
  //     placeholder: "اختر",
  //     options: [
  //       { value: "sa", name: "السعودية" },
  //       { value: "eg", name: "مصر" },
  //       { value: "ae", name: "الإمارات" },
  //     ],
  //   },
  //   {
  //     label: "مدينة المساعد الشخصي",
  //     placeholder: "اختر",
  //     options: [
  //       { value: "riyadh", name: "الرياض" },
  //       { value: "jeddah", name: "جدة" },
  //       { value: "cairo", name: "القاهرة" },
  //     ],
  //   },
  //   {
  //     label: "المجال",
  //     placeholder: "اختر المجال",
  //     options: [
  //       { value: "trade", name: "تجارة" },
  //       { value: "tech", name: "تقنية" },
  //       { value: "health", name: "صحة" },
  //     ],
  //   },
  //   {
  //     label: "التخصص",
  //     placeholder: "اختر التخصص",
  //     options: [
  //       { value: "coding", name: "برمجة" },
  //       { value: "design", name: "تصميم" },
  //       { value: "medicine", name: "طب" },
  //     ],
  //   },
  //   {
  //     label: "جنس المساعد الشخصي",
  //     placeholder: "اختر",
  //     options: [
  //       { value: "male", name: "ذكر" },
  //       { value: "female", name: "أنثى" },
  //     ],
  //   },
  // ];

  return (
    <section className="personal-helpers page">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="section-header">
              <div className="page-header">
                {
                  <Link to="/" className="back-btn">
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                }
                <h1>المساعدون الشخصيون</h1>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 p-2">
            <AssistantsSidebar />
          </div>
          <div className="col-12 col-lg-9 p-2">
            <div className="row">
              <div className="col-12 p-2">
                <div className="result-count">
                  <strong>{allAssistants.length}</strong> الأهداف الشخصية
                </div>
              </div>
              {allAssistants.map((helper) => (
                <div className="col-12 col-md-6 col-xl-4 p-2" key={helper.id}>
                  <HelperCard helper={helper} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <HelperFilterModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        showValueRange={true}
        showAgeRange={true}
      /> */}
    </section>
  );
}
