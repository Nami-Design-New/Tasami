import { useParams } from "react-router";
import { useState } from "react";
import SectionHeader from "../../ui/website/home/SectionHeader";

import HelperContractsChart from "../../ui/website/home/HelperContractsChart";
import { Link } from "react-router";
import CustomButton from "../../ui/CustomButton";

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
            description: "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
            contracts: { total: 14, active: 3, completed: 11 },
            permits: {
                categories: ["التسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                experiences: ["تسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                expernum: "10 سنوات",
                qualify: "(دراسات عليا)ماجستير",
                type: "وثيقة عمل حر",
                issuer: "وزارة الموارد البشرية",
                documentNumber: "وثيقة عمل حر",
                expiryDate: "5 مايو 2025"
            }
        },

        {
            id: 2,
            name: "انس تركي",
            country: "السعودية",
            rating: 4.4,
            type: "ريادي",
            members: 40,
            price: 248,
            image: "/images/p2.png",
            status: true,
            description: "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
            contracts: { total: 14, active: 3, completed: 11 },
            permits: {
                categories: ["التسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                experiences: ["تسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                expernum: "7 سنوات",
                type: "وثيقة عمل حر",
                qualify: "(دراسات عليا)ماجستير",
                issuer: "وزارة الموارد البشرية",
                documentNumber: "وثيقة عمل حر",
                expiryDate: "5 مايو 2025"
            }
        },
        {
            id: 3,
            name: "انس تركي",
            country: "السعودية",
            rating: 4.4,
            type: "ريادي",
            members: 40,
            price: 248,
            image: "/images/p2.png",
            status: true,
            description: "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
            contracts: { total: 14, active: 3, completed: 11 },
            permits: {
                categories: ["التسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                experiences: ["تسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                expernum: "12 سنوات",
                type: "وثيقة عمل حر",
                qualify: "(دراسات عليا)ماجستير",
                issuer: "وزارة الموارد البشرية",
                documentNumber: "وثيقة عمل حر",
                expiryDate: "5 مايو 2025"
            }
        },
        {
            id: 4,
            name: "انس تركي",
            country: "السعودية",
            rating: 4.4,
            type: "ريادي",
            members: 40,
            price: 248,
            image: "/images/p2.png",
            status: true,
            description: "تطوير تطبيق جوال متكامل لمراقبة الصحة الشخصية، يهدف إلى تمكين المستخدمين من تتبع مؤشرات صحتهم بشكل يومي. سيوفر التطبيق ميزات مثل تسجيل النشاط البدني، مراقبة النظام الغذائي، وتحليل البيانات الصحية لتقديم نصائح مخصصة. كما سيتضمن التطبيق واجهة مستخدم سهلة الاستخدام، مع إمكانية الوصول إلى معلومات صحية موثوقة، مما يساعد المستخدمين على اتخاذ قرارات أفضل بشأن صحتهم.",
            contracts: { total: 14, active: 3, completed: 11 },
            permits: {
                categories: ["التسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                experiences: ["تسويق", "تكنولوجيا", "مبتكر", "تحليل البيانات", "ريادة الأعمال"],
                expernum: "2 سنوات",
                type: "وثيقة عمل حر",
                qualify: "(دراسات عليا)ماجستير",
                issuer: "وزارة الموارد البشرية",
                documentNumber: "وثيقة عمل حر",
                expiryDate: "5 مايو 2025"
            }
        }];

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
                    <Link to="/personal-community/consultations">
                        <CustomButton color="primary">
                            مجتمع المساعد الشخصي
                        </CustomButton>
                    </Link>
                </div>
                <div className="goal-details-card mt-3 row">
                    <div className="top-info col-lg-3 col-12">
                        <div style={{ position: "relative" }}>
                            <img src={helper.image} alt={helper.name} className="avatar" />
                            {helper.status && <span className="status-dot"></span>}
                        </div>
                        <div className="details">
                            <h5>{helper.name}</h5>
                            <div className="rating">
                                {helper.rating} <i className="fas fa-star"></i>
                            </div>
                            <div className="info">
                                <div className="country">
                                    <i className="fas fa-map-marker-alt"></i> {helper.country}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-12">
                        <h6>نبذة</h6>
                        <p className="desc">{helper.description}</p>
                    </div>

                    <div className="row sub-info mt-5">
                        <div className="permits-box col-lg-6 col-12">
                            <h6>التصاريح</h6>
                            <div className="assist-methods  mb-3">
                                {helper.permits.categories.map((cat, index) => (
                                    <span key={index} className="assist-method">{cat}</span>
                                ))}
                            </div>
                        </div>
                        <div className="info-grid col-lg-6 col-12">
                            <div className="info-box">
                                <div className="label">نوع التصريح</div>
                                <div className="value">{helper.permits.type}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">جهة الاصدار</div>
                                <div className="value">{helper.permits.issuer}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">رقم الوثيقة</div>
                                <div className="value">{helper.permits.documentNumber}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">تاريخ الصلاحية</div>
                                <div className="value">{helper.permits.expiryDate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row sub-info">
                        <div className="permits-box col-lg-6 col-12">
                            <h6>الخبرات العملية</h6>
                            <div className="assist-methods  mb-3">
                                {helper.permits.experiences.map((ex, index) => (
                                    <span key={index} className="assist-method">{ex}</span>
                                ))}
                            </div>
                        </div>
                        <div className="info-grid col-lg-6 col-12">
                            <div className="info-box">
                                <div className="label">عدد سنوات الخبره</div>
                                <div className="value">{helper.permits.expernum}</div>
                            </div>
                            <div className="info-box">
                                <div className="label">المؤهلات</div>
                                <div className="value">{helper.permits.qualify}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-12 ">
                            <HelperContractsChart contracts={helper.contracts} />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
