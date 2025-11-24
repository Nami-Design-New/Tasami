import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import i18next from "i18next";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/languageSlice";
import RadioInput from "./forms/RadioInput";

export default function LanguageDropDown({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const dropdownRef = useRef(null);

  const [active, setActive] = useState(
    i18next.language || localStorage.getItem("i18nextLng") || "ar"
  );

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  function handleRadioChange(e) {
    const selectedLanguage = e.target.value;
    setActive(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
    localStorage.setItem("i18nextLng", selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
    queryClient.invalidateQueries();
    queryClient.removeQueries();

    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", selectedLanguage === "en");
    }
  }

  //  Keep selected language in sync on mount
  useEffect(() => {
    const currentLang =
      i18next.language || localStorage.getItem("i18nextLng") || "ar";
    setActive(currentLang);
  }, []);

  //  Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".settings-gear");
      if (!isDropdownButton) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [setIsOpen]);

  return (
    <motion.div
      ref={dropdownRef}
      variants={variants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      className="settings-modal modals"
    >
      <div className="body">
        <div className="radios">
          <RadioInput
            active={active}
            value="ar"
            onChange={handleRadioChange}
            label="عربي"
            name="preferred_language"
          />
          <RadioInput
            active={active}
            value="en"
            onChange={handleRadioChange}
            label="English"
            name="preferred_language"
          />
        </div>
      </div>
    </motion.div>
  );
}
