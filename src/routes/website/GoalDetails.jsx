import { useState } from "react";
import { useParams } from "react-router";
import HelpModal from "../../ui/modals/HelpModal";
import ReportModal from "../../ui/modals/ReportModal";
import SectionHeader from "../../ui/website/SectionHeader";
import CustomButton from "../../ui/CustomButton";
import OptionsMenu from "../../ui/website/OptionsMenu";
import TopInfo from "../../ui/website/gaols/TopInfo";
import GoalInfoGrid from "../../ui/website/gaols/GoalInfoGrid";
import InquiryModal from "../../ui/website/my-notifications/inquiryModal";

export default function GoalDetails() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeModals = () => {
    setShowHelpModal(false);
    setShowReportModal(false);
    setShowCommentModal(false);
    setShowInquiryModal(false);
  };
  const goals = [
    {
      id: 1,
      name: "سلطان حسن",
      title: "إنشاء متجر لبيع مستلزمات الطباعة ثلاثية الأبعاد في السعودية.",
      country: "السعودية",
      date: "16 فبراير 2025",
      type: "ريادي ",
      section: " تجارة إلكترونية",
      offers: 12,
      image: "/images/profile1.png",
      status: true,
      description:
        "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
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
      type: "تقنية ",
      section: " تطبيقات موبايل",
      offers: 8,
      image: "/images/profile2.png",
      status: false,
      description:
        "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
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
      type: "تقنية",
      section: " تعليم",
      offers: 15,
      image: "/images/profile2.png",
      status: true,
      description:
        "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
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
      type: "ريادي",
      section: " تجارة إلكترونية",
      offers: 10,
      image: "/images/profile1.png",
      status: false,
      description:
        "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
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
          <SectionHeader title="تفاصيل العرض" />
          <OptionsMenu
            setShowInquiryModal={setShowInquiryModal}
            setShowReportModal={setShowReportModal}
          />
        </div>

        <div className="goal-details-card mt-3 row ">
          <TopInfo goal={goal} />
          <div className="col-lg-8 col-12 ">
            <div className="hed">
              <img src="/icons/triangle.svg" />
              <h6>الهدف</h6>
            </div>
            <p className="desc ">{goal.description}</p>
            <GoalInfoGrid
              goal={goal}
              onShowHelpModal={() => setShowHelpModal(true)}
              // onShowReviewsModal={() => setShowReviewsModal(true)}
            />
            <CustomButton onClick={() => setShowHelpModal(true)}>
              تقديم عرض مساعدة
            </CustomButton>
          </div>
        </div>
        <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
        <ReportModal
          showModal={showReportModal}
          setShowModal={setShowReportModal}
        />
        <InquiryModal
          showModal={showInquiryModal}
          setShowModal={setShowInquiryModal}
        />
      </div>
    </section>
  );
}
