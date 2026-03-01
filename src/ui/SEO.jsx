import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

export default function SEO() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tasamii",
    url: "https://tasamii.com",
    logo: "/fav-icon.jpeg",
  };
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const location = useLocation();

  const isArabic = lang === "ar";
  const baseUrl = "https://tasamii.com";
  const currentUrl = `${baseUrl}${location.pathname}`;

  const title = t("meta.title");
  const description = t("meta.description");

  const ogTitle = t("meta.og.title");
  const ogDescription = t("meta.og.description");
  const ogImage = t("meta.og.image");

  const twitterTitle = t("meta.twitter.title");
  const twitterDescription = t("meta.twitter.description");
  const twitterSite = t("meta.twitter.site");

  return (
    <Helmet>
      {/* HTML Attributes */}
      <html lang={lang} dir={isArabic ? "rtl" : "ltr"} />

      {/* Title */}
      <title>{title}</title>

      {/* Primary Meta */}
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={isArabic ? "ar_AR" : "en_US"} />
      <meta property="og:image" content="/fav-icon.jpeg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content="/fav-icon.jpeg" />
      <meta name="twitter:site" content={twitterSite} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
