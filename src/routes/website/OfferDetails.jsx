import { useState } from "react";
import { useParams } from "react-router";
import ContractReq from "../../ui/modals/ContractReqModal";
import ReportModal from "../../ui/modals/ReportModal";
import InquiryModal from "../../ui/modals/inquiryModal";
import ReviewsModal from "../../ui/modals/ReviewsModal";
import SectionHeader from "../../ui/website/SectionHeader";
import CustomButton from "../../ui/CustomButton";
import OptionsMenu from "../../ui/website/OptionsMenu";
import TopInfo from "../../ui/website/offers/TopInfo";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
export default function OfferDetails() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeModals = () => {
    setShowHelpModal(false);
    setShowReportModal(false);
    setShowInquiryModal(false);
    setShowReviewsModal(false);
  };

  const offers = [
    {
      id: 1,
      name: "علي الزهراني",
      rating: 4.8,
      title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
      country: "البحرين",
      type: "مؤسس ",
      section: "تجارة إلكترونية",
      ageCategory: "15 - 24",
      identity: "رجال فقط",
      extraTerms:
        "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
      price: 2500,
      image: "/images/p2.png",
      status: true,
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
      rates: [
        { label: "خبره ومعرفة", value: 4.5 },
        { label: "جودة الأداء", value: 4.6 },
        { label: "الالتزام بالوقت", value: 4.7 },
        { label: "حسن التعامل", value: 4.3 },
      ],
      Previousbeneficiaries: "18",
    },
    {
      id: 2,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة ",
      section: "تكنولوجيا المعلومات",
      ageCategory: "15 - 24",
      identity: "رجال فقط",
      extraTerms:
        "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
      price: 2500,
      image: "/images/p1.png",
      status: true,
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
      rates: [
        { label: "خبره ومعرفة", value: 4.5 },
        { label: "جودة الأداء", value: 4.6 },
        { label: "الالتزام بالوقت", value: 4.7 },
        { label: "حسن التعامل", value: 4.3 },
      ],
      Previousbeneficiaries: "22",
    },
    {
      id: 4,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة  ",
      section: "تكنولوجيا المعلومات",
      ageCategory: "15 - 24",
      identity: "الكل",
      extraTerms:
        "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
      price: 2500,
      image: "/images/p1.png",
      status: true,
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
      rates: [
        { label: "خبره ومعرفة", value: 4.5 },
        { label: "جودة الأداء", value: 4.6 },
        { label: "الالتزام بالوقت", value: 4.7 },
        { label: "حسن التعامل", value: 4.3 },
      ],
      Previousbeneficiaries: "33",
    },

    {
      id: 3,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة ",
      section: "تكنولوجيا المعلومات",
      ageCategory: "15 - 24",
      identity: "الكل",
      extraTerms:
        "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
      price: 2500,
      image: "/images/p1.png",
      status: true,
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
      rates: [
        { label: "خبره ومعرفة", value: 4.5 },
        { label: "جودة الأداء", value: 4.6 },
        { label: "الالتزام بالوقت", value: 4.7 },
        { label: "حسن التعامل", value: 4.3 },
      ],
      Previousbeneficiaries: "12",
    },
    {
      id: 5,
      name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة ",
      section: "تكنولوجيا المعلومات",
      ageCategory: "15 - 24",
      identity: "الكل",
      extraTerms:
        "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
      price: 2500,
      image: "/images/p1.png",
      status: true,
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
      rates: [
        { label: "خبره ومعرفة", value: 4.5 },
        { label: "جودة الأداء", value: 4.6 },
        { label: "الالتزام بالوقت", value: 4.7 },
        { label: "حسن التعامل", value: 4.3 },
      ],
      Previousbeneficiaries: "5",
    },
  ];

  const offer = offers.find((o) => o.id === Number(id));

  if (!offer) {
    return (
      <section className="page offer-details-section mx-3">
        <div className="container text-center p-5">
          <h2>العرض غير موجود</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page offer-details-section ">
      <div className="container">
        <div className="header">
          <SectionHeader title="تفاصيل العرض" />
          <OptionsMenu
            setShowInquiryModal={setShowInquiryModal}
            setShowReportModal={setShowReportModal}
          />
        </div>
        <div className="goal-details-card mt-3 row">
          <TopInfo offer={offer} />
          <div className="col-lg-8 col-12 ">
            <div className="hed">
              <img src="/icons/triangle.svg" />
              <h6>المساعدة</h6>
            </div>
            <p className="desc">{offer.title}</p>
            <OfferInfoGrid
              offer={offer}
              onShowHelpModal={() => setShowHelpModal(true)}
              onShowReviewsModal={() => setShowReviewsModal(true)}
            />
            <div className="hed">
              <h6>تقييمات سابقة</h6>
            </div>
            <div className="info-grid">
              <div className="info-box w-100">
                <div className="flex">
                  <div className="label">مستفيدون سابقون </div>
                  <div className="bold">
                    <img src="/icons/Groups.svg" alt="icon" />
                    <span>{offer.Previousbeneficiaries}</span>
                  </div>
                </div>
              </div>
              <div className="info-box w-100">
                <div className="flex">
                  <div className="label">التقييم الاجمالي</div>
                  <div>
                    <i className="fa-solid fa-star text-warning"></i>{" "}
                    <span className="bold">{offer.rating}</span>
                  </div>
                </div>

                <ul className="rates-list mt-2">
                  {offer.rates.map((rate, index) => (
                    <li key={index}>
                      <div className="flex">
                        <span>{rate.label}</span>
                        <span> {rate.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <CustomButton onClick={() => setShowHelpModal(true)}>
                إرسال طلب تعاقد
              </CustomButton>
              <CustomButton onClick={() => setShowReviewsModal(true)}>
                عرض التقييمات
              </CustomButton>
            </div>
          </div>
        </div>

        <ContractReq
          showModal={showHelpModal}
          setShowModal={setShowHelpModal}
        />
        <ReportModal
          showModal={showReportModal}
          setShowModal={setShowReportModal}
        />
        <InquiryModal
          showModal={showInquiryModal}
          setShowModal={setShowInquiryModal}
        />
        <ReviewsModal
          showModal={showReviewsModal}
          setShowModal={setShowReviewsModal}
          reviews={[
            {
              name: "عماد مجيدي",
              stars: 5,
              time: "منذ 16 يوم و9 ساعات",
              comment: "الخدمة مميزة جدا",
            },
            {
              name: "محمد خالد",
              stars: 4,
              time: "منذ 10 أيام و5 ساعات",
              comment: "سعيد بالتعامل مع الاستاذ يوسف العتيبي",
            },
            {
              name: "نورا مصطفى",
              stars: 2,
              time: "منذ يومين و6 ساعات",
              comment: "جودة واداء اكثر من رائع",
            },
            {
              name: "حسن صلاح",
              stars: 3,
              time: "منذ 3 أيام و7 ساعات",
              comment: "الخدمة مميزة جدا",
            },
            {
              name: "علي أحمد",
              stars: 5,
              time: "منذ 10 ساعات",
              comment: "سعيد بالتعامل مع الاستاذ يوسف العتيبي",
            },
          ]}
        />
      </div>
    </section>
  );
}
