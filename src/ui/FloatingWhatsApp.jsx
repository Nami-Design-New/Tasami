import useSettings from "../hooks/website/settings/useSettings";

const FloatingWhatsApp = () => {
  const { settings, isLoading: settingsLoading } = useSettings();

  if (settingsLoading) return null;

  const whatsappLink = settings?.social_links?.find(
    (link) =>
      link.link.includes("wa.me") || link.link.includes("api.whatsapp.com"),
  );

  if (!whatsappLink) return null;

  return (
    <a
      href={whatsappLink.link}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
    >
      <img src={whatsappLink.logo} alt="WhatsApp" />
    </a>
  );
};

export default FloatingWhatsApp;
