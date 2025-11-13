import { useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import i18next from "i18next";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/languageSlice";

const LangDropdown = ({ isAuthPage = false }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  //  Define your supported languages here
  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const handleSelect = (lang) => {
    i18next.changeLanguage(lang);
    queryClient.invalidateQueries();
    queryClient.removeQueries();
    dispatch(setLanguage(lang));

    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", lang === "en");
    }
  };

  return (
    <Dropdown style={{ background: "transparent" }} onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="light"
        className={`${isAuthPage ? "auth_lang_deropdown" : "lang_dropdown"}`}
        id="dropdown-basic"
      >
        {isAuthPage ? (
          <div className="d-flex align-items-center gap-1">
            <i className="fa-sharp fa-regular fa-globe"></i>
            <span>{t("lang")}</span>
          </div>
        ) : (
          <i className="fa-sharp fa-regular fa-globe"></i>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ background: "white" }}>
        {languages.map(({ code, label }) => (
          <Dropdown.Item
            key={code}
            eventKey={code}
            active={lang === code}
            style={{
              backgroundColor: lang === code ? "#214b92" : "transparent",
              color: lang === code ? "white" : "black",
              transition: "all 0.2s ease",
              borderRadius: "12px",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LangDropdown;
