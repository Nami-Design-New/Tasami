import { useState } from "react";
import { useParams } from "react-router";
import HelpModal from "../../ui/modals/HelpModal";
import ReportModal from "../../ui/modals/ReportModal";
import SectionHeader from "../../ui/website/SectionHeader";
// import SectionHeader from "../../ui/website/home/SectionHeader";

export default function GoalDetails() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeModals = () => {
    setShowHelpModal(false);
    setShowReportModal(false);
  };
  const goals = [
    {
      id: 1,
      name: "سلطان حسن",
      title: "إنشاء متجر لبيع مستلزمات الطباعة ثلاثية الأبعاد في السعودية.",
      country: "السعودية",
      date: "16 فبراير 2025",
      type: "ريادي - تجارة إلكترونية",
      offers: 12,
      image: "/images/profile1.png",
      status: true,
      description:
        "الهدف من هذا المشروع هو إنشاء متجر متخصص لبيع مستلزمات الطباعة ثلاثية الأبعاد وتقديم خدمات متميزة للمستخدمين. يشمل ذلك ميزة شحن سريع، دعم فني على مدار الساعة، وعروض تنافسية تساعد العملاء على بدء مشاريعهم الإبداعية.",
      duration: "6 شهور",
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
    },
    {
      id: 2,
      name: "علياء السالم",
      title:
        "تطوير تطبيق لتسهيل الوصول إلى الخدمات الصحية في الإمارات للمواطنين والمقيمين.",
      country: "الإمارات",
      date: "10 مارس 2025",
      type: "تقنية - تطبيقات موبايل",
      offers: 8,
      image: "/images/profile2.png",
      status: false,
      description:
        "تطبيق يسهل الوصول إلى الخدمات الصحية ويتيح للمستخدمين حجز المواعيد الطبية واستشارة المختصين والحصول على إشعارات مواعيد المتابعة والعلاجات الدورية.",
      duration: "4 شهور",
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
    },
    {
      id: 3,
      name: "محمد العلي",
      title: "إنشاء منصة تعليمية لتعليم البرمجة للأطفال في العالم العربي.",
      country: "مصر",
      date: "5 أبريل 2025",
      type: "تعليم - تقنية",
      offers: 15,
      image: "/images/profile2.png",
      status: true,
      description:
        "منصة تقدم محتوى متميزًا لتعليم الأطفال لغات البرمجة بأسلوب ممتع وبسيط من خلال دروس تفاعلية ومشاريع عملية تساعد على تنمية مهارات التفكير الإبداعي.",
      duration: "8 شهور",
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
    },
    {
      id: 4,
      name: "سارة القحطاني",
      title: "تطوير موقع إلكتروني لبيع المنتجات اليدوية والحرفية في الكويت.",
      country: "الكويت",
      date: "20 مايو 2025",
      type: "ريادي - تجارة إلكترونية",
      offers: 10,
      image: "/images/profile1.png",
      status: false,
      description:
        "موقع متخصص لبيع المنتجات اليدوية والحرف التقليدية، مع ميزة تخصيص المنتجات وطرق دفع آمنة لتسهيل التسوق الإلكتروني.",
      duration: "5 شهور",
      assistMethods: [
        "الالتقاء الشخصي",
        "الاتصال المرئي والمسموع ",
        "التراسل النصي والصوتي",
      ],
    },
  ];

  const goal = goals.find((g) => g.id === Number(id));
  if (!goal) {
    return (
      <section className="page goal-details-section mx-3">
        <div className="container text-center p-5">
          <h2>الهدف غير موجود</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page goal-details-section mx-3">
      <div className="container">
        <div className="header">
          <SectionHeader title="تفاصيل الهدف" />

          <div className="options-menu">
            <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
            {menuOpen && (
              <div className="options-list">
                <button
                  onClick={() => {
                    setShowHelpModal(true);
                    setMenuOpen(false);
                  }}
                >
                  تقديم مساعدة
                </button>
                <button
                  onClick={() => {
                    setShowReportModal(true);
                    setMenuOpen(false);
                  }}
                >
                  إبلاغ عن مخالفة
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="goal-details-card mt-3 row ">
          <div className="top-info col-lg-4 col-12">
            <div style={{ position: "relative" }}>
              <img src={goal.image} alt={goal.name} className="avatar" />
            </div>

            <div className="details">
              <div className="d-flex flex-1  justify-content-between ">
                <h5>{goal.name}</h5>
                <div className="rating">
                  <img src="/icons/hz-bars.svg" />
                  <span>11</span>
                </div>
              </div>
            </div>
            {/* <div className="info">
              <div className="country">
                <i className="fas fa-map-marker-alt"></i>
                {goal.country}
              </div>
              <div className="offers">
                <i className="fa-light fa-layer-group"></i> {goal.offers} عرض
                مقدم
              </div>
            </div> */}
          </div>

          <div className="col-lg-8 col-12">
            <h6>الهدف</h6>
            <p className="desc ">{goal.description}</p>
            <div className="info-grid ">
              <div className="info-box">
                <div className="label">المجال والتخصص</div>
                <div className="value">{goal.type}</div>
              </div>
              <div className="info-box">
                <div className="label">مدة تحقيق الهدف</div>
                <div className="value">{goal.duration}</div>
              </div>
              <div className="info-box">
                <div className="label">تاريخ البدء</div>
                <div className="value">{goal.date}</div>
              </div>
            </div>
          </div>
          <h6>آليات المساعدة المعتمدة</h6>
          <div className="assist-methods ">
            {goal.assistMethods.map((method, index) => (
              <div className="assist-method" key={index}>
                {method}
              </div>
            ))}
          </div>
        </div>
        <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
        <ReportModal
          showModal={showReportModal}
          setShowModal={setShowReportModal}
        />
      </div>
    </section>
  );
}
