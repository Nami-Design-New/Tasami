import { useTranslation } from "react-i18next";
import imageOne from "../../assets/images/1.jpg";
import imageTwo from "../../assets/images/2.jpg";
import useSettings from "../../hooks/website/settings/useSettings";
import Loading from "../../ui/loading/Loading";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import EmptySection from "../../ui/EmptySection";

export default function Steps() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: "fa-search",
      title: t("steps_browse_title"),
      desc: t("steps_browse_desc"),
    },
    {
      icon: "fa-pencil-alt",
      title: t("steps_request_title"),
      desc: t("steps_request_desc"),
    },
    {
      icon: "fa-users",
      title: t("steps_choose_title"),
      desc: t("steps_choose_desc"),
    },
    {
      icon: "fa-flag-checkered",
      title: t("steps_start_title"),
      desc: t("steps_start_desc"),
    },
    {
      icon: "fa-star",
      title: t("steps_review_title"),
      desc: t("steps_review_desc"),
    },
  ];
  const { settings, isLoading } = useSettings();

  if (isLoading) return <Loading />;

  // Sanitize the HTML
  const sanitizedHowItWorks = DOMPurify.sanitize(settings?.howItWorks);
  return (
    <>
      <section className="steps-section page">
        <div className="section-head text-center mb-5">
          <span className="sub-title d-block mb-2">{t("steps_subtitle")}</span>
          <h2 className="main-title mb-3">
            {t("steps_title")} <span>{t("brand_name")}</span>
          </h2>
          <p className="desc">{t("steps_description")}</p>
        </div>

        <div className="steps-container">
          <div className="progress-line"></div>
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="icon-wrapper">
                <i className={`fa ${step.icon}`}></i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="aim-section page">
        <div className="section-head text-center mb-3 mb-lg-5">
          <span className="sub-title">{t("aim_subtitle")}</span>
          <h2 className="main-title mb-3">
            {t("aim_title")} <span>{t("brand_name")}</span>
          </h2>
          <p className="desc">{t("aim_description")}</p>
        </div>

        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-6 text-center">
              <img
                src={imageOne}
                alt={t("aim_beneficiary_alt")}
                className="img-fluid mb-3"
              />
              <h3>{t("aim_beneficiary_title")}</h3>
              <p>{t("aim_beneficiary_desc")}</p>
            </div>

            <div className="col-12 col-md-6 text-center">
              <img
                src={imageTwo}
                alt={t("aim_assistant_alt")}
                className="img-fluid mb-3"
              />
              <h3>{t("aim_assistant_title")}</h3>
              <p>{t("aim_assistant_desc")}</p>
            </div>
          </div>
        </div>
      </section>
      {!sanitizedHowItWorks ? (
        <EmptySection height="700px" message={t("noContent")} />
      ) : (
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
                {t("steps_title")} <span>{t("brand_name")}</span>
              </h2>
              <p className="desc">{t("steps_description")}</p>
            </motion.div>

            <div
              className="terms-content"
              dangerouslySetInnerHTML={{ __html: sanitizedHowItWorks }}
            />
          </div>
        </section>
      )}
    </>
  );
}
