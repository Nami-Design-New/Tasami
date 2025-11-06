import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useGetFAQs from "../../hooks/website/settings/useGetFAQs";
import { useTranslation } from "react-i18next";
// import PaginationCustom from "../../ui/PaginationCustom";

export default function FAQsSection() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetFAQs(page);

  const faqs = data?.data || [];
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;

  const [activeId, setActiveId] = useState(null);

  const toggleAnswer = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faqs-section page">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="main-title">
            <i className="fa-solid fa-circle-question me-2"></i>
            {t("faqs_title_main")} <span>{t("faqs_title_span")}</span>{" "}
          </h2>
        </motion.div>

        {isLoading ? (
          <></>
        ) : (
          <>
            <div className="faq-list">
              {faqs.map((faq) => (
                <div
                  className={`faq-item ${activeId === faq.id ? "active" : ""}`}
                  key={faq.id}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleAnswer(faq.id)}
                  >
                    <span>{faq.title}</span>
                    <i
                      className={`fa-solid ${
                        activeId === faq.id
                          ? "fa-chevron-up"
                          : "fa-chevron-down"
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
                        <p>{faq.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Reusable Pagination */}
            {/* <PaginationCustom
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={setPage}
            /> */}
          </>
        )}
      </div>
    </section>
  );
}
