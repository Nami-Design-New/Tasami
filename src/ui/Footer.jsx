import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import logo from "../assets/images/logo.svg";
import playStore from "../assets/images/googleplay-store.svg";
import appleStore from "../assets/images/apple-store.svg";
import useSettings from "../hooks/website/settings/useSettings";
export default function Footer() {
  const { t } = useTranslation();
  const { settings, isLoading: settingsLoading } = useSettings();
  const customerCareEmail =
    settings?.emails?.customerCare || "care@example.com";
  const technicalSupportEmail =
    settings?.emails?.technicalSupport || "support@example.com";
  const appleStoreLink = settings?.app_links?.apple || "#";
  const playStoreLink = settings?.app_links?.play || "#";
  return (
    <footer className="footer2">
      <div className="container-lg p-0">
        <div className="row">
          {/* Logo + Description */}
          <div className="col-lg-3 col-md-6 col-12 p-2">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" width="150" height="60" />
            </Link>
            <p className="description ">{t("footer.description")}</p>
            <p className="description color-secondary mt-2">
              تسامي الرقمية س .ت 4700115546
            </p>
            <p className="description color-secondary">
              المملكة العربية السعودية ص.ب. 3964 ينبع الصناعية46451
            </p>
          </div>
          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-12 p-2">
            <h4 className="title">{t("footer.quickLinks.title")}</h4>
            <ul className="links_list">
              <li>
                <Link to="/faqs">{t("footer.quickLinks.faqs")}</Link>
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
              <li>
                <Link to="/refund-policy">
                  {t("footer.quickLinks.refundPolicy")}
                </Link>
              </li>
              <li>
                <Link to="/clients-rights">
                  {t("footer.quickLinks.clients")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  {t("footer.quickLinks.tasamiiTeam")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Services */}
          <div className="col-lg-2 col-md-6 col-12 p-2">
            <h4 className="title">{t("footer.services.title")}</h4>
            <ul className="links_list">
              <li>
                <Link to="/about">{t("footer.services.about")}</Link>
              </li>
              <li>
                <Link to="/how-it-works">
                  {t("footer.services.howItWorks")}
                </Link>
              </li>
              <li>
                <Link to="/about-perosnal-goals">
                  {t("footer.services.personalGoals")}
                </Link>
              </li>
              <li>
                <Link to="/about-help-requests">
                  {t("footer.services.requests")}
                </Link>
              </li>
              <li>
                <Link to="/about-help-offers">
                  {t("footer.services.offers")}
                </Link>
              </li>
              <li>
                <Link to="/about-personal-helpers">
                  {t("footer.services.assistants")}
                </Link>
              </li>
              <li>
                <Link to="/about-tasamii-communities">
                  {t("footer.services.communities")}
                </Link>
              </li>
              <li>
                <Link to="/commissions">
                  {t("footer.services.commissions")}
                </Link>
              </li>
            </ul>
          </div>{" "}
          {/*Contact */}
          <div className="col-lg-2 col-md-6 col-12 p-2">
            <h4 className="title">{t("footer.contact.title")}</h4>
            <ul className="links_list">
              <li>
                <p>{t("footer.contact.customerCare")}</p>
                <a
                  href={`mailto:${customerCareEmail}`}
                  className="text-decoration-underline color-secondary"
                >
                  {customerCareEmail}
                </a>
              </li>
              <li>
                <p>{t("footer.contact.technicalSupport")}</p>
                <a
                  href={`mailto:${technicalSupportEmail}`}
                  className="text-decoration-underline color-secondary"
                >
                  {technicalSupportEmail}
                </a>
              </li>
              <li>
                <p>{t("footer.contact.haveYouGot")}</p>
              </li>
              <li>
                <Link
                  className="text-decoration-underline"
                  to="/contact?subject=PF"
                >
                  {t("footer.contact.complaint")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-underline"
                  to="/contact?subject=NF"
                >
                  {t("footer.contact.inquiry")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-underline"
                  to="/contact?subject=PF"
                >
                  {t("footer.contact.suggestion")}
                </Link>
              </li>
            </ul>
          </div>{" "}
          {/*Download app */}
          <div className="col-lg-3 col-md-6 col-12 p-2">
            <h4 className="title">{t("footer.downloadApp.title")}</h4>
            <div className="store-buttons">
              <a href={appleStoreLink} className="store-btn app-store">
                <img src={appleStore} alt="Apple" />
              </a>

              <a href={playStoreLink} className="store-btn play-store">
                <img src={playStore} alt="Google Play" />
              </a>
            </div>
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
                {settingsLoading ? (
                  <p></p>
                ) : (
                  <>
                    {settings?.social_links.map((link, index) => (
                      <a href={link.link} key={index}>
                        <img src={link.logo} alt={link.id} />
                      </a>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
