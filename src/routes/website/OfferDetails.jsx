import { useState } from "react";
import { useParams } from "react-router";
import ContractReq from "../../ui/modals/ContractReqModal";
import ReportModal from "../../ui/modals/ReportModal";

export default function OfferDetails() {
    const { id } = useParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeModals = () => {
        setShowHelpModal(false);
        setShowReportModal(false);
    };

    const offers = [  
          {
           id: 1,
            name: "علي الزهراني",
            rating: 4.8,
            title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
            country: "البحرين",
            type: "مؤسس - تمكين المرأة",
            ageCategory: "15 - 24",
            genderPreference: "رجال فقط",
            extraTerms: "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
            groupAssistValue: "4000",
            personalAssistValue: "2500",
            price1: 2500,
            price2: 2000,
            image: "/images/p2.png",
            status: true,
            stats: {
                beneficiaries: 20,
                rating: 4.4,
                rates: [
                    { label: "سرعة التنفيذ", value: 4.5 },
                    { label: "جودة الأداء", value: 4.6 },
                    { label: "الالتزام بالمواعيد", value: 4.7 },
                    { label: "سهولة التواصل", value: 4.3 }
                ]
            },
        },
        {
            id: 2,
            name: "فاطمة الجهني",
            rating: 4.5,
            title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
            country: "الإمارات",
            type: "مبتكرة - تكنولوجيا المعلومات",
            ageCategory: "15 - 24",
            genderPreference: "رجال فقط",
            extraTerms: "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
            groupAssistValue: "4000",
            personalAssistValue: "2500",
            price1: 2500,
            price2: 2000,
            image: "/images/p1.png",
            status: true,

            stats: {
                beneficiaries: 20,
                rating: 4.4,
                rates: [
                    { label: "سرعة التنفيذ", value: 4.5 },
                    { label: "جودة الأداء", value: 4.6 },
                    { label: "الالتزام بالمواعيد", value: 4.7 },
                    { label: "سهولة التواصل", value: 4.3 }
                ]
            },
        },
       {
            id: 4,
             name: "فاطمة الجهني",
      rating: 4.5,
      title: "تطوير تطبيقات الهاتف الذكي لتسهيل التسوق للأسر المنتجة",
      country: "الإمارات",
      type: "مبتكرة - تكنولوجيا المعلومات",
            ageCategory: "15 - 24",
            genderPreference: "رجال فقط",
            extraTerms: "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
            groupAssistValue: "4000",
            personalAssistValue: "2500",
            price1: 2500,
            price2: 2000,
            image: "/images/p1.png",
            status: true,

            stats: {
                beneficiaries: 20,
                rating: 4.4,
                rates: [
                    { label: "سرعة التنفيذ", value: 4.5 },
                    { label: "جودة الأداء", value: 4.6 },
                    { label: "الالتزام بالمواعيد", value: 4.7 },
                    { label: "سهولة التواصل", value: 4.3 }
                ]
            },
        },
        {
            id: 3,
            name: "علي الزهراني",
            rating: 4.8,
            title: "إطلاق مبادرة لتمكين النساء في التجارة الإلكترونية",
            country: "البحرين",
            type: "مؤسس - تمكين المرأة",
            ageCategory: "15 - 24",
            genderPreference: "رجال فقط",
            extraTerms: "توفر نسخة قابلة للتعديل من نموذج بطاقة الأداء المتوازن مع خطوات إرشادية دقيقة لطريقة تطبيقها على المشروع.",
            groupAssistValue: "4000",
            personalAssistValue: "2500",
            price1: 2500,
            price2: 2000,
            price1: 2200,
            price2: 1700,
            image: "/images/p2.png",
            status: true,

            stats: {
                beneficiaries: 20,
                rating: 4.4,
                rates: [
                    { label: "سرعة التنفيذ", value: 4.5 },
                    { label: "جودة الأداء", value: 4.6 },
                    { label: "الالتزام بالمواعيد", value: 4.7 },
                    { label: "سهولة التواصل", value: 4.3 }
                ]
            },
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

            stats: {
                beneficiaries: 20,
                rating: 4.4,
                rates: [
                    { label: "سرعة التنفيذ", value: 4.5 },
                    { label: "جودة الأداء", value: 4.6 },
                    { label: "الالتزام بالمواعيد", value: 4.7 },
                    { label: "سهولة التواصل", value: 4.3 }
                ]
            },
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
        <section className="page offer-details-section mx-3">
            <div className="container">
                <div className="header">
                    {/* <SectionHeader title="تفاصيل العرض" /> */}
                    <div className="options-menu">
                        <i className="fas fa-ellipsis-v" onClick={toggleMenu}></i>
                        {menuOpen && (
                            <div className="options-list">
                                <button onClick={() => { setShowHelpModal(true); setMenuOpen(false); }}>
                                    إرسال طلب تعاقد
                                </button>
                                <button onClick={() => { setShowReportModal(true); setMenuOpen(false); }}>
                                    إبلاغ عن مخالفة
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="goal-details-card mt-3 row">
                    <div className="top-info col-lg-3 col-12">
                        <div style={{ position: "relative" }}>
                            <img src={offer.image} alt={offer.name} className="avatar" />
                            {offer.status && <span className="status-dot"></span>}
                        </div>

                        <div className="details">
                            <h5>{offer.name}</h5>
                            <div className="rating">
                                {offer.rating} <i className="fas fa-star text-warning"></i>
                            </div>
                            <div className="info">
                                <div className="country">
                                    <i className="fas fa-map-marker-alt"></i> {offer.country}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-12">

                        <h6 className="mt-4">المساعدة المعروضة</h6>
                        <p className="desc">{offer.title}</p>
                        <div className="info-grid">
                            <div className="info-box">
                                <div className="label">المجال والتخصص</div>
                                <div className="value">{offer.type}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">الفئة العمرية للمستهدفين</div>
                                <div className="value">{offer.ageCategory}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">تفضيل جنس المستفيد</div>
                                <div className="value">{offer.genderPreference}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">بنود إضافية للمجموعة</div>
                                <div className="value">{offer.extraTerms}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">قيمة المساعدة ضمن المجموعة</div>
                                <div className="value">{offer.groupAssistValue} <img src="/icons/ryal.svg" alt="ريال" /></div>
                            </div>
                            <div className="info-box">
                                <div className="label">قيمة المساعدة الشخصية</div>
                                <div className="value">{offer.personalAssistValue} <img src="/icons/ryal.svg" alt="ريال" /></div>
                            </div>
                        </div>
                    </div>

                    <div className=" col-12">

                        <h6 className="mt-4">احصائيات العرض</h6>
                        <div className="stats">
                            <div className="beneficiaries mb-2 col-12 col-lg-6">
                                مستفيدون سابقون
                                <div><i className="fa-solid fa-user-group me-1"></i> {offer.stats.beneficiaries} </div>

                            </div>
                            <div className="stats-box col-12 col-lg-6">
                                <div className="rating">
                                    التقييم الاجمالي
                                    <div><i className="fa-solid fa-star text-warning"></i>   <span>{offer.stats.rating}</span></div>
                                </div>
                                <ul className="rates-list mt-2">
                                    {offer.stats.rates.map((rate, index) => (
                                        <li key={index}>
                                            <strong>{rate.label}:</strong> {rate.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <ContractReq showModal={showHelpModal} setShowModal={setShowHelpModal} />
                <ReportModal showModal={showReportModal} setShowModal={setShowReportModal} />
            </div>
        </section>
    );
}
