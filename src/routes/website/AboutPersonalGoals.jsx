import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/website/settings/useSettings";
import Loading from "../../ui/loading/Loading";
import EmptySection from "../../ui/EmptySection";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
export default function AboutPersonalGoals() {
  const { settings, isLoading } = useSettings();
  const { t } = useTranslation();

  if (isLoading) return <Loading />;

  const sanitizedPersonalGoals = DOMPurify.sanitize(settings?.personalGoals);
  if (!sanitizedPersonalGoals)
    return <EmptySection height="700px" message={t("noContent")} />;
  return (
    <section className="privacy page px-3">
      <div className="container">
        <motion.div
          className="section-head text-center mb-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="main-title mb-3">
            <span>{t("settings.personalGoalsTitle")}</span>
          </h1>
          {/* <p className="desc">{t("settings.personalGoalsDesc")}</p> */}
        </motion.div>

        <div
          className="privacy-content"
          dangerouslySetInnerHTML={{ __html: sanitizedPersonalGoals }}
        />
      </div>
    </section>
  );
}
