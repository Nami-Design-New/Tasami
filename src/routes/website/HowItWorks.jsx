import { motion } from "framer-motion";
import FAQsSection from "./Faqs";

export default function Steps() {
    const steps = [
        {
            icon: "fa-search",
            title: "استعرض أهدافك",
            desc: "تصفّح المهام والخدمات المتاحة وتعرف على ما تحتاجه بدقة.",
        },
        {
            icon: "fa-pencil-alt",
            title: "اطلب المساعدة",
            desc: "اكتب هدفك بالتفصيل وحدد متطلباتك بوضوح.",
        },
        {
            icon: "fa-users",
            title: "اختر المساعد",
            desc: "احصل على عروض من مساعدين مؤهلين واختر الأنسب لك.",
        },
        {
            icon: "fa-flag-checkered",
            title: "ابدأ رحلة الإنجاز",
            desc: "ابدأ تنفيذ خطتك وحقق أهدافك بدعم مستمر.",
        },
        {
            icon: "fa-star",
            title: "قيم وشارك",
            desc: "ولا تنسى أن تقيم تجربتك وتشارك قصة نجاحك مع أصدقائك.",
        },
    ];
    return (
        <>
            <section className="steps-section">
                <motion.div
                    className="section-head text-center mb-5"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="sub-title d-block mb-2">الخطوات ببساطة</span>
                    <h2 className="main-title mb-3">كيف تعمل <span>تسامي</span>؟</h2>
                    <p className="desc">
                        من البداية حتى تحقيق هدفك — "تسامي" تساعدك على تحديد أهدافك، التواصل مع المساعد الأنسب، والمتابعة حتى تصل للنتيجة التي تطمح إليها.
                    </p>
                </motion.div>
                <div className="steps-container">
                    <div className="progress-line"></div>
                    {steps.map((step, index) => (
                        <motion.div
                            className="step"
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            {/* <div className="step-number">{index + 1}</div> */}
                            <div className="icon-wrapper">
                                <i className={`fa ${step.icon}`}></i>
                            </div>

                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </section>

            <section className="aim-section">
                <motion.div
                    className="section-head text-center mb-5"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="sub-title ">صممت من أجلك</span>
                    <h2 className="main-title mb-3">
                        ما الذي تقدمه لك <span>تسامي</span>؟
                    </h2>
                    <p className="desc">
                        منصتنا تلبي احتياجاتك، سواء كنت مستفيدًا تسعى لتحقيق أهدافك، أو مساعدًا شخصيًا يدعم الآخرين لتحقيق النجاح.
                    </p>
                </motion.div>

                <div className="container">
                    <div className="row g-4 align-items-center">
                        <motion.div
                            className="col-12 col-md-6 text-center"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="/images/1.jpg"
                                alt="مستفيد"
                                className="img-fluid mb-3"
                            />
                            <h3>كمستفيد</h3>
                            <p>
                                منصة لا غنى عنها لتحقيق أهدافك بكفاءة وفعالية ضمن مجتمع داعم ومتحفز.
                            </p>
                        </motion.div>

                        <motion.div
                            className="col-12 col-md-6 text-center"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="/images/2.jpg"
                                alt="مساعد شخصي"
                                className="img-fluid mb-3"

                            />
                            <h3>كمساعد شخصي</h3>
                            <p>
                                منصة مميزة لدعم الطموحين ومساعدتهم على تخطي التحديات والوصول إلى أهدافهم.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FAQsSection />
        </>
    );
}
