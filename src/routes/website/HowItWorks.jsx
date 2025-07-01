import FAQsSection from "./Faqs";

export default function Steps() {
  const steps = [
    {
      icon: "fa-search",
      title: "استعرض أهدافك",
      desc: "تصفّح المهام والخدمات المتاحة وتعرف على ما تحتاجه بدقة.",
    },
    {
      icon: "fa-pencil-alt",
      title: "اطلب المساعدة",
      desc: "اكتب هدفك بالتفصيل وحدد متطلباتك بوضوح.",
    },
    {
      icon: "fa-users",
      title: "اختر المساعد",
      desc: "احصل على عروض من مساعدين مؤهلين واختر الأنسب لك.",
    },
    {
      icon: "fa-flag-checkered",
      title: "ابدأ رحلة الإنجاز",
      desc: "ابدأ تنفيذ خطتك وحقق أهدافك بدعم مستمر.",
    },
    {
      icon: "fa-star",
      title: "قيم وشارك",
      desc: "ولا تنسى أن تقيم تجربتك وتشارك قصة نجاحك مع أصدقائك.",
    },
  ];

  return (
    <>
      <section className="steps-section">
        <div className="section-head text-center mb-5">
          <span className="sub-title d-block mb-2">الخطوات ببساطة</span>
          <h2 className="main-title mb-3">
            كيف تعمل <span>تسامي</span>؟
          </h2>
          <p className="desc">
            من البداية حتى تحقيق هدفك — "تسامي" تساعدك على تحديد أهدافك، التواصل مع المساعد الأنسب، والمتابعة حتى تصل للنتيجة التي تطمح إليها.
          </p>
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

      <section className="aim-section">
        <div className="section-head text-center mb-5">
          <span className="sub-title">صممت من أجلك</span>
          <h2 className="main-title mb-3">
            ما الذي تقدمه لك <span>تسامي</span>؟
          </h2>
          <p className="desc">
            منصتنا تلبي احتياجاتك، سواء كنت مستفيدًا تسعى لتحقيق أهدافك، أو مساعدًا شخصيًا يدعم الآخرين لتحقيق النجاح.
          </p>
        </div>

        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-6 text-center">
              <img
                src="/images/1.jpg"
                alt="مستفيد"
                className="img-fluid mb-3"
              />
              <h3>كمستفيد</h3>
              <p>
                منصة لا غنى عنها لتحقيق أهدافك بكفاءة وفعالية ضمن مجتمع داعم ومتحفز.
              </p>
            </div>

            <div className="col-12 col-md-6 text-center">
              <img
                src="/images/2.jpg"
                alt="مساعد شخصي"
                className="img-fluid mb-3"
              />
              <h3>كمساعد شخصي</h3>
              <p>
                منصة مميزة لدعم الطموحين ومساعدتهم على تخطي التحديات والوصول إلى أهدافهم.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQsSection />
    </>
  );
}
