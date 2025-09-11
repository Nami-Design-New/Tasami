import { motion } from "framer-motion";
import Loading from "../../ui/loading/Loading";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/website/settings/useSettings";
import DOMPurify from "dompurify";

export default function Terms() {
  const { settings, isLoading } = useSettings();
  const { t } = useTranslation();

  if (isLoading) return <Loading />;

  // Sanitize the HTML
  const sanitizedTerms = DOMPurify.sanitize(settings.terms);

  return (
    <section className="terms page px-3">
      <div className="container">
        <motion.div
          className="section-head text-center mb-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="main-title mb-3">
            <span>{t("settings.termsTitle")}</span>
          </h2>
          <p className="desc">{t("settings.termsDesc")}</p>
        </motion.div>

        <div
          className="terms-content"
          dangerouslySetInnerHTML={{ __html: sanitizedTerms }}
        />
      </div>
    </section>
  );
}
