import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Outlet } from "react-router";
import useAuth from "../hooks/auth/useAuth";
import ResponsiveNav from "../layout/ResponsiveNav";
import { requestPermission } from "../lib/fireBase/service";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Loading from "../ui/loading/Loading";
import ScrollToTop from "../ui/ScrollToTop";

const WebsiteLayout = () => {
  // const { refetch: refetchSettings } = useSettings();
  // const { refetch: refetchNotifications } = useGetNotifications();

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
    };

    initializeNotifications();
  }, []);

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
