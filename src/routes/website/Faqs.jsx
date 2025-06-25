import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqCategories = {
  clients: [
    {
      id: 1,
      question: "كيف يمكنني طلب مساعدة على المنصة؟",
      answer: "يمكنك التسجيل واستعراض الأقسام واختيار الخدمة والتواصل مع المختص مباشرة.",
    },
    {
      id: 2,
      question: "هل يمكن إلغاء الطلب بعد الاتفاق؟",
      answer: "نعم — يمكنك الإلغاء وفقًا لسياسة الإلغاء الموضحة في العقد الرقمي.",
    },
    {
      id: 3,
      question: "هل يمكنني تقييم المساعد بعد انتهاء الخدمة؟",
      answer: "بكل تأكيد — يمكنك تقييم المساعد وإضافة تعليق لتجربتك في صفحة الخدمة.",
    },
    {
      id: 4,
      question: "كيف يتم تسليم نتائج الخدمة المتفق عليها؟",
      answer: "يتم تسليم النتائج عبر رسائل المنصة أو عبر وسائل متفق عليها داخل العقد.",
    },
    {
      id: 5,
      question: "هل توجد خدمات مجانية؟",
      answer: "بعض الخدمات تُقدم مجانًا وفق مبادرات المجتمع داخل المنصة.",
    },
  ],
  helpers: [
    {
      id: 1,
      question: "كيف أضيف خدماتي كمساعد؟",
      answer: "بعد التسجيل كمساعد، يمكنك إضافة خدماتك من لوحة التحكم الخاصة بك.",
    },
    {
      id: 2,
      question: "هل يمكنني التواصل مع العميل قبل الاتفاق؟",
      answer: "نعم — يمكنك استخدام رسائل المنصة للتفاوض قبل بدء العقد.",
    },
    {
      id: 3,
      question: "كيف يتم تحديد سعر الخدمة؟",
      answer: "يمكنك تحديد السعر المناسب لك أثناء إضافة الخدمة مع توضيح ما يشمله.",
    },
    {
      id: 4,
      question: "هل يمكنني تعديل الخدمة بعد نشرها؟",
      answer: "نعم — من خلال لوحة التحكم يمكنك تعديل تفاصيل الخدمة في أي وقت.",
    },
    {
      id: 5,
      question: "كيف أحصل على أرباحي؟",
      answer: "يتم تحويل أرباحك إلى محفظتك داخل المنصة ثم يمكنك سحبها في أي وقت.",
    },
  ],
  system: [
    {
      id: 1,
      question: "كيف يتم حماية بياناتي؟",
      answer: "يتم تخزين بياناتك بشكل مشفّر ولا تُشارك إلا بموافقتك وفق سياسة الخصوصية.",
    },
    {
      id: 2,
      question: "هل المنصة متاحة كتطبيق؟",
      answer: "نعم — متوفرة كتطبيق للـ Android و iOS قريبًا.",
    },
    {
      id: 3,
      question: "كيف يمكنني استرجاع كلمة المرور؟",
      answer: "يمكنك استخدام خيار (نسيت كلمة المرور) وإدخال بريدك الإلكتروني لإعادة ضبطها.",
    },
    {
      id: 4,
      question: "هل يمكنني حذف حسابي نهائيًا؟",
      answer: "نعم — من خلال إعدادات الحساب يمكنك طلب حذف حسابك بشكل دائم.",
    },
    {
      id: 5,
      question: "هل يمكنني ربط المنصة بحساباتي الاجتماعية؟",
      answer: "قريبًا — ستتمكن من تسجيل الدخول عبر حسابات Google و Facebook.",
    },
  ],
};


export default function FAQsSection() {
  const [activeTab, setActiveTab] = useState("clients");
  const [activeId, setActiveId] = useState(null);

  const toggleAnswer = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const tabs = [
    { id: "clients", label: "للعملاء" },
    { id: "helpers", label: "للمساعدين" },
    { id: "system", label: "عن النظام" },
  ];

  return (
    <section className="faqs-section  page">
        <div className="container"> 
<div className="triangles">
  <span className="triangle t1"></span>
  <span className="triangle t2"></span>
  <span className="triangle t3"></span>
  
</div>

      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="main-title">
          <i className="fa-solid fa-circle-question me-2"></i>
          الأسئلة <span>الشائعة</span>
        </h2>
      </motion.div>

      {/* Tabs */}
      <div className="faq-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveId(null);
            }}
            className={activeTab === tab.id ? "active" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {faqCategories[activeTab].map((faq) => (
          <div
            className={`faq-item ${activeId === faq.id ? "active" : ""}`}
            key={faq.id}
          >
            <button
              className="faq-question"
              onClick={() => toggleAnswer(faq.id)}
            >
              <span>{faq.question}</span>
              <i
                className={`fa-solid ${
                  activeId === faq.id ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </button>

            <AnimatePresence>
              {activeId === faq.id && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
              </div>

    </section>
  );
}
