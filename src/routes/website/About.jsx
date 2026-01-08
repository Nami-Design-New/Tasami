import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  const whyItems = [
    {
      id: 1,
      title: t("why_item1_title"),
      description: t("why_item1_desc"),
      image: "./images/f1.jpg",
    },
    {
      id: 2,
      title: t("why_item2_title"),
      description: t("why_item2_desc"),
      image: "./images/f2.jpg",
    },
    {
      id: 3,
      title: t("why_item3_title"),
      description: t("why_item3_desc"),
      image: "./images/f3.jpg",
    },
    {
      id: 4,
      title: t("why_item4_title"),
      description: t("why_item4_desc"),
      image: "./images/f4.jpg",
    },
  ];

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
          <p>{t("about_main_paragraph1")}</p>
          <p>{t("about_main_paragraph2")}</p>
        </div>
      </section>

      <section className="why-section page">
        <div className="container">
          <div className="section-head text-center mb-5">
            <span className="sub-title d-block mb-2">{t("why_subtitle")}</span>
            <h2 className="main-title mb-3">
              {t("why_title")} <span>{t("brand_name")}</span>؟
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
