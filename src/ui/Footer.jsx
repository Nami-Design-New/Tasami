import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer2">
      <div className="container">
        <div className="row justify-content-center">
          {/* <div className="col-12 p-2">
            <div className="news_letter">
              <h6>اشترك لمتابعة آخر الأخبار والتحديثات</h6>
              <form>
                <input type="email" placeholder="أدخل بريدك الإلكتروني" />
                <button type="submit">اشترك</button>
              </form>
            </div>
          </div> */}

          <div className="col-lg-4 col-md-6 col-12 p-2">
            <Link to="/" className="logo">
              <img src="/images/logo.svg" alt="الشعار" />
            </Link>
            <p className="description">
              نحن منصة عربية نسعى لربط الأفكار بأصحاب المهارات والخبرات من خلال
              بيئة داعمة وموثوقة. هدفنا تمكينك من إنجاز مشروعك بأعلى جودة وأقل
              جهد.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 col-12 p-2">
            <h4 className="title">روابط سريعة</h4>
            <ul className="links_list">
              <li>
                <Link to="/faqs">الأسئلة الشائعة</Link>
              </li>
              <li>
                <Link to="/contact">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/terms-conditions">الشروط والأحكام</Link>
              </li>
              <li>
                <Link to="/privacy-policy">سياسة الخصوصية</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <h4 className="title">خدماتنا</h4>
            <ul className="links_list">
              <li>
                <Link to="/how-it-works">كيف تعمل المنصة؟</Link>
              </li>
              <li>
                <Link to="/about"> عن تسامي</Link>
              </li>
              <li>
                <Link to="/package-consolidation">تجميع المشاريع</Link>
              </li>
              <li>
                <Link to="/shipping-calculator"> الخدمات</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <h4 className="title">تواصل معنا</h4>
            <ul className="links_list">
              <li>
                الهاتف: <a href="tel:+20123456789">+20 123 456 789</a>
              </li>
              <li>
                الإيميل:{" "}
                <a href="mailto:support@example.com">support@example.com</a>
              </li>
              <li>
                العنوان: <a href="https://www.google.com/maps">جدة,السعودية</a>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <div className="copyright">
              <p>
                جميع الحقوق محفوظة © {new Date().getFullYear()} إلى{" "}
                <span>تسامي</span>
              </p>
              <div className="socials">
                <Link>
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
                <Link>
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
