import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "../../ui/forms/TextField";
import SubmitButton from "../../ui/forms/SubmitButton";
import InputField from "../../ui/forms/InputField";
import { useSelector } from "react-redux";

export default function Contact() {
  const { t } = useTranslation();
  const [activeOption, setActiveOption] = useState(null);
  const { user } = useSelector((state) => state.authRole);
  let options;

  const socialLinks = [
    { href: "#", src: "/icons/insta.svg", label: t("contact_insta") },
    { href: "#", src: "/icons/watsapp.svg", label: t("contact_whatsapp") },
    { href: "#", src: "/icons/tiktok.svg", label: t("contact_tiktok") },
    { href: "#", src: "/icons/snap.svg", label: t("contact_snapchat") },
  ];
  if (user) {
    options = [
      t("contact_option_inquiry"),
      t("contact_option_suggestion"),
      t("contact_option_new_category"),
    ];
  } else {
    options = [t("contact_option_inquiry")];
  }
  return (
    <section className="contact-page page">
      <div className="container">
        {/* Social Links */}
        <div className="row mb-4 social-links">
          {socialLinks.map((link, index) => (
            <div className="col-6 col-md-3 p-2" key={index}>
              <a href={link.href} className="social-box">
                <img src={link.src} alt={link.label} className="social-icon" />
                <span>{link.label}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <div className="contact-form-wrapper">
              <h3 className="title">{t("contact_title")}</h3>
              <p className="desc">{t("contact_description")}</p>

              <form className="form_ui">
                <div className="mb-3">
                  <label className="form-label">{t("contact_subject")}</label>
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
                  <InputField
                    label={t("contact_field_title")}
                    placeholder={t("contact_placeholder_title")}
                  />
                </div>

                <div className="mb-3">
                  <InputField
                    label={t("contact_field_name")}
                    placeholder={t("contact_placeholder_name")}
                  />
                </div>

                <div className="mb-3">
                  <InputField
                    label={t("contact_field_email")}
                    placeholder={t("contact_placeholder_email")}
                    type="email"
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    label={t("contact_field_message")}
                    placeholder={t("contact_placeholder_message")}
                    id="commentText"
                    rows={4}
                  />
                </div>

                <SubmitButton text={t("contact_submit")} />
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6 p-2">
            <div className="map-wrapper">
              <iframe
                title="Location"
                width="100%"
                height="100%"
                style={{
                  borderRadius: "16px",
                  minHeight: "600px",
                  marginTop: "2rem",
                }}
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
