import { Outlet } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScrollToTop from "../ui/ScrollToTop";
import ResponsiveNav from "../layout/ResponsiveNav";
import useAuth from "../hooks/auth/useAuth";
import Loading from "../ui/loading/Loading";
import { listenToMessages, requestPermission } from "../lib/fireBase/service";
import useSettings from "../hooks/website/settings/useSettings";
import useGetNotifications from "../hooks/website/notification/useGetNotifications";

const WebsiteLayout = () => {
  const { refetch: refetchSettings } = useSettings();
  const { refetch: refetchNotifications } = useGetNotifications();

  const { loading } = useAuth();
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionDivs = section.querySelectorAll("[data-aos]");
      sectionDivs.forEach((div, index) => {
        div.setAttribute("data-aos-delay", (index + 1) * 50);
      });
    });

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });

    requestAnimationFrame(() => {
      AOS.refresh();
    });
  }, []);

  useEffect(() => {
    const initializeNotifications = async () => {
      await requestPermission();
      const unsubscribe = listenToMessages(
        refetchSettings,
        refetchNotifications
      );
      return () => {
        if (unsubscribe) unsubscribe();
      };
    };

    initializeNotifications();
  }, [refetchSettings, refetchNotifications]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollToTop />
          <Header />
          <main className="main">
            <Outlet />
          </main>
          <Footer />
          <ResponsiveNav />
        </>
      )}
    </>
  );
};

export default WebsiteLayout;
