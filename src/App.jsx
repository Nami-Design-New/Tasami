import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./providers/router";

import i18n from "./utils/i18n";

export default function App() {
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <Toaster expand={false} duration={2000} position="bottom-right" />
      <RouterProvider router={router} />
    </>
  );
}
