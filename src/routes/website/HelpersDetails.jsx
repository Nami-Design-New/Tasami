import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import CustomButton from "../../ui/CustomButton";
import SectionHeader from "../../ui/website/SectionHeader";
import OfferCard from "../../ui/cards/OfferCard";
import TopInfo from "../../ui/website/helpers/TopInfo";
import HelperTabsSection from "../../ui/website/helpers/HelperTabsSection";

export default function HelpersDetails() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const helpers = [
    {
      id: 1,
      name: "انس تركي",
      country: "السعودية",
      rating: 4.4,
      type: "ريادي",
      members: 40,
      price: 248,
      image: "/images/p2.png",
      status: true,
    },
    {
      id: 2,
      name: "مها صالح",
      country: "الإمارات",
      rating: 4.7,
      type: "تقنية",
      members: 35,
      price: 212,
      image: "/images/p1.png",
      status: true,
    },
    {
      id: 3,
      name: "انس تركي",
      country: "السعودية",
      rating: 4.4,
      type: "ريادي",
      members: 40,
      price: 228,
      image: "/images/p2.png",
      status: true,
    },
    {
      id: 4,
      name: "مها صالح",
      country: "الإمارات",
      rating: 4.7,
      type: "تقنية",
      members: 35,
      price: 292,
      image: "/images/p1.png",
      status: true,
    },
  ];

  const Offers = [
    {
      id: 1,
      name: "أنس تركي",
      country: "السعودية",
      rating: 6,
      image: "/images/p2.png",
      //   status: true,
      title: "مساعدة منزلية لمدة أسبوع",
      type: "عمالة منزلية",
      price: "2500",
    },
    {
      id: 2,
      name: "مها صالح",
      country: "الإمارات",
      rating: 10,
      image: "/images/p1.png",
      status: true,
      title: "جليسة أطفال بدوام جزئي",
      type: "رعاية أطفال",
      price: "1800",
    },
    {
      id: 3,
      name: "محمد علي",
      country: "السعودية",
      rating: 8,
      image: "/images/p2.png",
      //   status: true,
      title: "عامل نظافة لمدة شهر",
      type: "نظافة",
      price: "3200",
    },
  ];
  const helperTabs = [
    {
      id: "entrepreneurship",
      label: "ريادة الأعمال",
      data: [
        { label: "نوع التصريح", value: "وثيقة عمل حر" },
        { label: "جهة الإصدار", value: "وزارة التجارة" },
        { label: "الاعتماد", value: "هيئة منشآت" },
        { label: "تاريخ الصلاحية", value: "2025/12/31" },
      ],
    },
    {
      id: "marketing",
      label: "التسويق",
      data: [
        { label: "نوع التصريح", value: "تصريح تسويق رقمي" },
        { label: "جهة الإصدار", value: "وزارة الإعلام" },
        { label: "الاعتماد", value: "منصة معروف" },
        { label: "تاريخ الصلاحية", value: "2026/05/10" },
      ],
    },
    {
      id: "technology",
      label: "تكنولوجيا",
      data: [
        { label: "نوع التصريح", value: "مبرمج مستقل" },
        { label: "جهة الإصدار", value: "وزارة الاتصالات" },
        { label: "الاعتماد", value: "هيئة الاتصالات" },
        { label: "تاريخ الصلاحية", value: "2025/11/22" },
      ],
    },
    {
      id: "innovation",
      label: "مبتكر",
      data: [
        { label: "نوع التصريح", value: "تصريح ابتكار" },
        {
          label: "جهة الإصدار",
          value: "مدينة الملك عبدالعزيز للعلوم والتقنية",
        },
        { label: "الاعتماد", value: "مركز الابتكار الوطني" },
        { label: "تاريخ الصلاحية", value: "2025/09/01" },
      ],
    },
  ];
  const experienceTabs = [
    {
      id: "entrepreneurship",
      label: "ريادة الأعمال",
      data: [
        { label: "المؤهلات", value: "ماجستير" },
        { label: "عدد سنوات الخبرة", value: "12 سنوات" },
      ],
    },
    {
      id: "marketing",
      label: "التسويق",
      data: [
        { label: "المؤهلات", value: "بكالوريوس تسويق" },
        { label: "عدد سنوات الخبرة", value: "7 سنوات" },
      ],
    },
    {
      id: "technology",
      label: "تكنولوجيا",
      data: [
        { label: "المؤهلات", value: "بكالوريوس علوم حاسب" },
        { label: "عدد سنوات الخبرة", value: "9 سنوات" },
      ],
    },
    {
      id: "innovation",
      label: "مبتكر",
      data: [
        { label: "المؤهلات", value: "دكتوراه في الابتكار" },
        { label: "عدد سنوات الخبرة", value: "15 سنة" },
      ],
    },
  ];
  const helper = helpers.find((g) => g.id === Number(id));

  if (!helper) {
    return (
      <section className="page helper-details-section mx-3">
        <div className="container text-center p-5">
          <h2> غير موجود</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page helper-details-section mx-3">
      <div className="container">
        <div className="header">
          <div className="d-flex">
            <SectionHeader />
            <Link to={`/personal-community/${helper.id}/consultations`}>
              <CustomButton>مجتمع {helper.name}</CustomButton>
            </Link>
          </div>

          <div className="options-menu">
            <button className="follow-btn">
              <i className="fa-solid fa-user-plus me-2"></i> متابعة
            </button>{" "}
          </div>
        </div>
        <div className="goal-details-card mt-3 row">
          <TopInfo helper={helper} />
          <div className="col-lg-8 col-12 ">
            <div className="hed">
              <h6>نبذه</h6>
            </div>
            <p className="desc">{helper.description}</p>
            <div className="info-grid">
              <div className="info-box">
                <div className="label">عدد العقود المكتملة </div>
                <div className="value">12</div>
              </div>
              <div className="info-box">
                <div className="label">عدد العقود النشطه </div>
                <div className="value">3</div>
              </div>
              <div className="info-box">
                <div className="label"> المؤهلات </div>
                <div className="value">ماجستير</div>
              </div>
              <div className="info-box">
                <div className="label">عدد سنوات الخبره </div>
                <div className="value">10 سنوات</div>
              </div>
            </div>
            <div className="hed">
              <h6> الخبرات العملية</h6>
            </div>
            <HelperTabsSection tabs={experienceTabs} />
            <div className="hed">
              <h6>الوثائق</h6>
            </div>
            <HelperTabsSection tabs={helperTabs} />

            <div className="hed">
              <h6>عروض مساعدة اخري من "{helper.name}"</h6>
            </div>
            <div className="row g-3">
              {Offers.map((offer) => (
                <div className="col-md-6 col-lg-4" key={offer.id}>
                  <OfferCard offer={offer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
{
}
