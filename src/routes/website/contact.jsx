import React, { useState } from "react";

export default function Contact() {
  const [activeOption, setActiveOption] = useState(null);

 const socialLinks = [
  { href: "#", src: "/icons/insta.svg", label: "إنستجرام" },
  { href: "#", src: "/icons/watsapp.svg", label: "واتساب" },
  { href: "#", src: "/icons/tiktok.svg", label: "تيك توك" },
  { href: "#", src: "/icons/snap.svg", label: "سناب شات" },
];

  const options = ["استفسار", "اقتراح", "تصنيف جديد"];

  return (
    <section className="contact-page  page">
        <div className="container">
      <div className="row g-3 mb-4 social-links">
        {socialLinks.map((link, index) => (
          <div className="col-6 col-md-3" key={index}>
            <a href={link.href} className="social-box">
              <img src={link.src} alt={link.label} className="social-icon" />
              <span>{link.label}</span>
            </a>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="contact-form-wrapper">
            <h3 className="title">اتصل بنا</h3>
            <p className="desc">يمكنك التواصل معنا مباشرة من خلال ملء النموذج التالي:</p>

            <form>
              <div className="mb-3">
                <label className="form-label">الموضوع</label>
                <div className="options">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={activeOption === opt ? "active" : ""}
                      onClick={() => setActiveOption(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">عنوان الرسالة</label>
                <input type="text" className="form-control" placeholder="اكتب هنا ..." />
              </div>

              <div className="mb-3">
                <label className="form-label">الاسم</label>
                <input type="text" className="form-control" placeholder="اكتب اسمك ..." />
              </div>

              <div className="mb-3">
                <label className="form-label">البريد الإلكتروني</label>
                <input type="email" className="form-control" placeholder="name@example.com" />
              </div>

              <div className="mb-3">
                <label className="form-label">الرسالة</label>
                <textarea className="form-control" rows={4} placeholder="اكتب رسالتك ..."></textarea>
              </div>

              <button className="submit-btn w-100" type="submit">إرسال</button>
            </form>
          </div>
        </div>
          <div className="col-12 col-md-6">
            <div className="map-wrapper">
            <iframe
              title="Location"
              width="100%"
              height="100%"
              style={{ borderRadius: "16px", minHeight: "600px",marginTop:"2rem" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509375!2d144.9537363153156!3d-37.81627974202197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd6b%3A0xf577e5f51dfb4c9b!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1633039339142!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
