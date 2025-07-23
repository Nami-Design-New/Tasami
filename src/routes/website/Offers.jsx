import { useState } from "react";
import useFilteredList from "../../hooks/useFilteredList";
import OfferCard from "../../ui/cards/OfferCard";
import SidebarFilter from "../../ui/website/home/SidebarFilter";
import OfferFilterModal from "../../ui/website/offers/OfferFilterModal";
import SectionHeader from "../../ui/website/SectionHeader";

export default function PersonalOffers() {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const offers = [
    {
      id: 1,
      name: "علي الزهراني",
      rating: 4.8,
      title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
      country: "البحرين",
      type: "مؤسس - تمكين المرأة",
      price1: 2200,
      price2: 1700,
      image: "/images/p2.png",
      status: true,
    },
    {
      id: 2,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة - تكنولوجيا المعلومات",
      price1: 2500,
      price2: 2000,
      image: "/images/p1.png",
      status: true,
    },
    {
      id: 3,
      name: "علي الزهراني",
      rating: 4.8,
      title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
      country: "البحرين",
      type: "مؤسس - تمكين المرأة",
      price1: 2200,
      price2: 1700,
      image: "/images/p2.png",
      status: true,
    },
    {
      id: 4,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة - تكنولوجيا المعلومات",
      price1: 2500,
      price2: 2000,
      image: "/images/p1.png",
      status: true,
    },
   {
      id: 5,
      name: "علي الزهراني",
      rating: 4.8,
      title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
      country: "البحرين",
      type: "مؤسس - تمكين المرأة",
      price1: 2200,
      price2: 1700,
      image: "/images/p2.png",
      status: true,
    },
  ];

  const {
    activeTab,
    setActiveTab,
    searchValue,
    setSearchValue,
    tabs,
    filteredItems,
  } = useFilteredList(offers, "type", ["title", "name"]);

  const filters = [
    {
      label: "جنسية المساعد الشخصي",
      placeholder: "اختر",
      options: [
        { value: "sa", name: "السعودية" },
        { value: "eg", name: "مصر" },
        { value: "ae", name: "الإمارات" },
      ],
    },
    {
      label: "مدينة المساعد الشخصي",
      placeholder: "اختر",
      options: [
        { value: "riyadh", name: "الرياض" },
        { value: "jeddah", name: "جدة" },
        { value: "cairo", name: "القاهرة" },
      ],
    },
    {
      label: "المجال",
      placeholder: "اختر المجال",
      options: [
        { value: "trade", name: "تجارة" },
        { value: "tech", name: "تقنية" },
        { value: "health", name: "صحة" },
      ],
    },
    {
      label: "التخصص",
      placeholder: "اختر التخصص",
      options: [
        { value: "coding", name: "برمجة" },
        { value: "design", name: "تصميم" },
        { value: "medicine", name: "طب" },
      ],
    },
    {
      label: "جنس المساعد الشخصي",
      placeholder: "اختر",
      options: [
        { value: "male", name: "ذكر" },
        { value: "female", name: "أنثى" },
      ],
    },
  ];

  return (
    <section className="personal-offers  page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionHeader title=" عروض المساعدة " />
          </div>

          <div className="col-12 col-lg-3">
            <SidebarFilter
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              resultCount={filteredItems.length}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onFilterClick={() => setShowFilterModal(true)}
            />
          </div>
          <div className="col-12 col-lg-9 ">
            <div className="row">
                <div className="result-count">
                <strong>{filters.length}</strong> عروض مساعدة
              </div>
              {filteredItems.map((offer) => (
                <div className="col-12 col-md-6 col-lg-4 p-2" key={offer.id}>
                  <OfferCard offer={offer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <OfferFilterModal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      />
    </section>
  );
}
