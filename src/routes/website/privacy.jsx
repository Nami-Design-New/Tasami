import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/settings/useSettings";
import Loading from "../../ui/loading/Loading";

export default function Privacy() {
  const { settings, isLoading } = useSettings();
  const { t } = useTranslation();

  if (isLoading) return <Loading />;
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
          <h2 className="main-title mb-3">
            <span>{t("settings.privacyTitle")}</span>
          </h2>
          <p className="desc">{t("settings.privacyDesc")}</p>
        </motion.div>

        <div className="privacy-content">{settings.privacy}</div>
      </div>
    </section>
  );
}
