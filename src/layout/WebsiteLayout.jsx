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

const WebsiteLayout = () => {
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
    AOS.refresh();
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
