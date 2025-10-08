const whyItems = [
  {
    id: 1,
    title: "دعم أهدافك بثقة",
    description:
      "ابدأ رحلتك بخطط واضحة وأهداف قابلة للتحقيق، مع دعم مستمر من مختصين في كل مرحلة. ستواجه تحدياتك بثبات مع إرشاد دقيق وخطوات منظمة تساعدك على تحقيق نتائج ملموسة ونجاح متواصل.",
    image: "/images/f1.jpg",
  },
  {
    id: 2,
    title: "فرص تطوير حقيقية",
    description:
      "استفد من شبكة من الخبرات المتخصصة والفرص المبتكرة التي تفتح أمامك مجالات جديدة للنمو والتطور. نمنحك مساحة لاكتساب معارف جديدة وتطوير مهاراتك المهنية والشخصية بالتعاون مع أفضل الخبراء.",
    image: "/images/f2.jpg",
  },
  {
    id: 3,
    title: "مجتمع محفز وملهم",
    description:
      "انضم إلى مجتمع متنوع يجمع بين الطموح والإبداع والتشجيع المتبادل. هنا ستجد من يشجعك ويدعمك لتحقيق طموحاتك، مع تبادل الخبرات والتجارب التي تفتح أمامك آفاقًا جديدة وفرصًا محفزة باستمرار.",
    image: "/images/f3.jpg",
  },
  {
    id: 4,
    title: "إدارة ذكية للمهام",
    description:
      "نقدّم لك منصة متكاملة تساعدك على تنظيم أعمالك ومتابعة أهدافك بكفاءة عالية. بفضل أدوات سهلة الاستخدام وأنظمة ذكية، ستتمكن من إنجاز مهامك في الوقت المناسب وضمن معايير احترافية عالية.",
    image: "/images/f4.jpg",
  },
];

export default function AboutSection() {
  return (
    <>
      <section className="about-section page">
        <div className="triangles">
          <span className="triangle t1"></span>
          <span className="triangle t2"></span>
          <span className="triangle t3"></span>
        </div>

        <div className="section-head ">
          <span className="sub-title">من نحن؟</span>
          <h2 className="main-title">
            عن <span>تسامي</span>
          </h2>
          <p className="desc">
            منصتك المتخصصة لتحقيق الأهداف، بدعم احترافي وتجربة اجتماعية مبتكرة.
          </p>
        </div>

        <div className="main-info">
          <p>
            <strong>تسامي</strong> هو موقع وتطبيق مختص بالوساطة في طلب وعرض
            خدمات المساعدة الشخصية لتحقيق الأهداف في أكثر من{" "}
            <strong>300 </strong>مجال وتخصص. والتعاقد عليها بين طرفين ضمن قوالب
            عمل عقود اجتماعية، وذات موضوعات بمقابل مادي.
          </p>
          <p>
            توفر المنصة نماذج عمل متكاملة لتحقيق الأهداف وفق نموذج{" "}
            <strong>SCORE</strong>.
          </p>
        </div>
      </section>

      <section className="why-section page">
        <div className="container">
          <div className="section-head text-center mb-5">
            <span className="sub-title d-block mb-2">لماذا تختارنا؟</span>
            <h2 className="main-title mb-3">
              لماذا <span>تسامي</span>؟
            </h2>
            <p className="desc">
              "تسامي" أكثر من مجرد منصة — إنها مجتمع داعم وأداة قوية لتحقيق
              أهدافك.
            </p>
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
