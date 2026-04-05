import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/website/settings/useSettings";
import Loading from "../../ui/loading/Loading";
import EmptySection from "../../ui/EmptySection";
import { motion } from "framer-motion";
import RichContent from "../../ui/RichContent";
export default function AboutPersonalGoals() {
  const { settings, isLoading } = useSettings();
  const { t } = useTranslation();

  if (isLoading) return <Loading />;

  if (!settings?.personalGoals)
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

        <RichContent className="privacy-content" html={settings?.personalGoals} />
      </div>
    </section>
  );
}
