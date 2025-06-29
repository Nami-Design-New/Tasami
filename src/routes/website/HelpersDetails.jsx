import { useParams } from "react-router";
import { useState } from "react";
import SectionHeader from "../../ui/website/home/SectionHeader";
import HelpModal from "../../ui/modals/HelpModal";
import ReportModal from "../../ui/modals/ReportModal";

export default function HelpersDetails() {
    const { id } = useParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeModals = () => {
        setShowHelpModal(false);
        setShowReportModal(false);
    };
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
    description: "أنا أنس تركي، مستشار ريادة أعمال بخبرة تمتد لأكثر من 12 عامًا في تأسيس وإدارة المشاريع الناشئة. ساعدت في إطلاق عشرات المبادرات الريادية في المنطقة وأسعى لتمكين رواد الأعمال من تحقيق أهدافهم عبر خطط نمو مبتكرة ومستدامة."
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
    description: "مها صالح، متخصصة في تطوير الحلول التقنية والذكاء الاصطناعي. أمتلك خبرة واسعة في تصميم التطبيقات الذكية وتقديم استشارات تقنية للمنشآت الصغيرة والمتوسطة. أؤمن بأهمية التكنولوجيا في تعزيز كفاءة الأعمال وتحقيق نمو مستدام."
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
    description: "مستشار تطوير أعمال بخبرة في بناء خطط النمو وتحليل الأسواق الناشئة. أعمل مع أصحاب المشاريع على تحسين أدائهم التشغيلي وزيادة فرصهم الاستثمارية في السوق السعودي والخليجي."
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
    description: "مطور نظم معلومات بخبرة تتجاوز 8 سنوات في بناء تطبيقات إدارة الأعمال والحلول التقنية المتكاملة. أساعد المؤسسات على التحول الرقمي ورفع كفاءتها التشغيلية من خلال أحدث التقنيات."
  }
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
                    <SectionHeader />
                    <div className="options-menu">
                        <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
                        {menuOpen && (
                            <div className="options-list">
                                <button onClick={() => { setShowHelpModal(true); setMenuOpen(false); }}>
                                    تقديم مساعدة
                                </button>
                                <button onClick={() => { setShowReportModal(true); setMenuOpen(false); }}>
                                    إبلاغ عن مخالفة
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="goal-details-card mt-3 row ">
                    <div className="top-info col-lg-4 col-12">
                        <div style={{ position: "relative" }}>
                            <img src={helper.image} alt={helper.name} className="avatar" />
                            {helper.status && <span className="status-dot"></span>}
                        </div>

                        <div className="details">
                            <h5>{helper.name}</h5>
                            <div className="rating">
                                4.4 <i className="fas fa-star"></i>
                                <span>(453)</span>
                            </div>
                            <div className="info">
                                <div className="country">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {helper.country}
                                </div>
                            
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-12">
                        <h6>الهدف</h6>
                        <p className="desc">{helper.description}</p>
                        
                    </div>
                  
                </div>
                <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
                <ReportModal showModal={showReportModal} setShowModal={setShowReportModal} />

            </div>
        </section>

    );
}
