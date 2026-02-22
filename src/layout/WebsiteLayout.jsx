import { useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Outlet } from "react-router";
import usePostLastActivate from "../hooks/website/lastActivate/usePostLastActivate";
import ResponsiveNav from "../layout/ResponsiveNav";
import { listenToMessages, requestPermission } from "../lib/fireBase/service";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Loading from "../ui/loading/Loading";
import ScrollToTop from "../ui/ScrollToTop";
import LevelUpModal from "../ui/LevelUpModal";
import useAuth from "../hooks/auth/useAuth";

const WebsiteLayout = () => {
  const queryClient = useQueryClient();
  const { user, loading ,isAuthed } = useAuth();
  usePostLastActivate(isAuthed);

  // Initialize AOS animations
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

  // Initialize Firebase notifications
  useEffect(() => {
    if (!user) return;
    let unsubscribe;
    const initializeNotifications = async () => {
      try {
        await requestPermission();
        unsubscribe = listenToMessages(
          () => queryClient.refetchQueries({ queryKey: ["settings"] }),
          () => queryClient.refetchQueries({ queryKey: ["notifications"] }),
          () => queryClient.refetchQueries({ queryKey: ["counters-notify"] }),
        );
      } catch (error) {
        console.error("Error initializing notifications:", error);
      }
    };
    initializeNotifications();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, queryClient]);

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
          <ResponsiveNav /> <LevelUpModal />
        </>
      )}
    </>
  );
};

export default WebsiteLayout;
