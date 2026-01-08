import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer2">
      <div className="container-lg p-0">
        <div className="row">
          {/* Logo + Description */}
          <div className="col-lg-4 col-md-6 col-12 p-2">
            <Link to="/" className="logo">
              <img src="/images/logo.svg" alt="logo" width="150" height="60" />
            </Link>
            <p className="description">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-12 p-2">
            <h4 className="title">{t("footer.quickLinks.title")}</h4>
            <ul className="links_list">
              <li>
                <Link to="/faqs">{t("footer.quickLinks.faqs")}</Link>
              </li>
              <li>
                <Link to="/contact">{t("footer.quickLinks.contact")}</Link>
              </li>
              <li>
                <Link to="/terms-conditions">
                  {t("footer.quickLinks.terms")}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy">
                  {t("footer.quickLinks.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 col-12 p-2">
            <h4 className="title">{t("footer.services.title")}</h4>
            <ul className="links_list">
              <li>
                <Link to="/how-it-works">
                  {t("footer.services.howItWorks")}
                </Link>
              </li>
              <li>
                <Link to="/about">{t("footer.services.about")}</Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-12">
            <div className="copyright">
              <p>
                {t("footer.copyright.text", {
                  year: new Date().getFullYear(),
                })}{" "}
                <span>{t("footer.copyright.brand")}</span>
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
