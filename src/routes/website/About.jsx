export default function AboutSection() {
  return (
    <section className="about_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 p-2">
            <div className="content">
              <div className="title" data-aos="fade-up">
                <img src="/sys-icons/wheel.svg" alt="wheel" />
                <h6>عن تسامي</h6>
              </div>

              <h3 data-aos="fade-up">
                قم بتحقيق اهدافك الان بمساعده المتخصصين
              </h3>

              <p data-aos="fade-up">
                سواء كنت تحتاج الي المساعده او لديك القدره علي مساعده الاخرين في
                تحقيق اهدافهم بطريقه احترافيه و شيقه و فقد تم تطوير هذه المنصه
                من اجلكم
                <br /> <br />
                تسامي هو موقع وتطبيق مختص بالوساطة في طلب وعرض خدمات المساعدة
                الشخصية لتحقيق الاهداف وانجاز المهام في أكثر من 300 مجال وتخصص،
                والتعاقد عليها بين طرفين ضمن قوالب عمل عقود اجتماعية، و ذات
                موضوعات بمقابل مادي. وفترات محددة توفر المنصة نماذج عمل متكاملة
                لتحقيق األهداف نموذج SCORE. وإنجاز المهام بتطبيق
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="img" data-aos="zoom-in-up">
              <img
                src="/images/male-coworkers-office-with-lunch.jpg"
                alt="about"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
