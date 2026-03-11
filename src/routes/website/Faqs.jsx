import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useGetFAQs from "../../hooks/website/settings/useGetFAQs";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import EmptySection from "../../ui/EmptySection";
import AudienceCardLoader from "../../ui/loading/AudienceCardLoader";
import { Placeholder } from "react-bootstrap";
import InterestsLoading from "../../ui/loading/InterestsLoading";

export default function FAQsSection() {
  const { t } = useTranslation();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFAQs();

  const faqs = data?.pages?.flatMap((page) => page.data) || [];

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
            {t("faqs_title_main")} <span>{t("faqs_title_span")}</span>
          </h2>
        </motion.div>
        {!isLoading && faqs?.length === 0 && (
          <EmptySection height="300px" message={t("noFaqsAvailable")} />
        )}
        {isLoading ? (
          <></>
        ) : (
          <InfiniteScroll
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
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
              ))}{" "}
              {(isLoading || isFetchingNextPage) && (
                <>
                  {[1, 2, 3].map((i) => (
                    <div className="col-12  p-2" key={i}>
                      <InterestsLoading />
                    </div>
                  ))}
                </>
              )}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </section>
  );
}
