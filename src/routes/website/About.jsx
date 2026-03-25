import { useTranslation } from "react-i18next";

import f1 from "../../assets/images/f1.jpg";
import f2 from "../../assets/images/f2.jpg";
import f3 from "../../assets/images/f3.jpg";
import f4 from "../../assets/images/f4.jpg";
import useSettings from "../../hooks/website/settings/useSettings";
import Loading from "../../ui/loading/Loading";
import DOMPurify from "dompurify";

export default function AboutSection() {
  const { t } = useTranslation();
  const { settings, isLoading } = useSettings();

  // Sanitize the HTML
  const sanitizedAbout = DOMPurify.sanitize(settings?.about_app);
  const whyItems = [
    {
      id: 1,
      title: t("why_item1_title"),
      description: t("why_item1_desc"),
      image: f1,
    },
    {
      id: 2,
      title: t("why_item2_title"),
      description: t("why_item2_desc"),
      image: f2,
    },
    {
      id: 3,
      title: t("why_item3_title"),
      description: t("why_item3_desc"),
      image: f3,
    },
    {
      id: 4,
      title: t("why_item4_title"),
      description: t("why_item4_desc"),
      image: f4,
    },
  ];

  if (isLoading) return <Loading />;
  return (
    <>
      <section className="about-section page">
        <div className="triangles">
          <span className="triangle t1"></span>
          <span className="triangle t2"></span>
          <span className="triangle t3"></span>
        </div>

        <div className="section-head">
          <span className="sub-title">{t("about_subtitle")}</span>
          <h2 className="main-title">
            {t("about_title")} <span>{t("brand_name")}</span>
          </h2>
          <p className="desc">{t("about_description")}</p>
        </div>

        <div className="main-info">
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: sanitizedAbout }}
          />
        </div>
      </section>

      <section className="why-section page">
        <div className="container">
          <div className="section-head text-center mb-5">
            <span className="sub-title d-block mb-2">{t("why_subtitle")}</span>
            <h2 className="main-title mb-3">
              {t("why_title")} <span>{t("brand_name")}</span>
            </h2>
            <p className="desc">{t("why_description")}</p>
          </div>

          <div className="row g-4">
            {whyItems.map((item, index) => (
              <div className="col-12 col-md-6" key={item.id}>
                <div className="item d-flex h-100">
                  <div
                    className={`text ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div
                    className="circle-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
