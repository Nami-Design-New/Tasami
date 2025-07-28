import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import i18next from "i18next";
import { useQueryClient } from "@tanstack/react-query";
import { setLanguage } from "../../redux/slices/languageSlice";

const WebsiteLangDropdown = () => {
  const [lang, setLan] = useState("ar");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleSelect = (lang) => {
    console.log(lang);

    setLan(lang);
    dispatch(setLanguage(lang));
    localStorage.setItem("lang", lang);
    i18next.changeLanguage(lang);
    queryClient.invalidateQueries();
    queryClient.removeQueries();
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", lang === "en");
    }
  };

  return (
    <Dropdown style={{ background: "white" }} onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="light"
        className=" rounded-circle"
        style={{
          width: "40px",
          height: "40px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        id="dropdown-basic"
      >
        <i className="fa-sharp fa-regular fa-globe"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ background: "white" }}>
        <Dropdown.Item eventKey="en">English</Dropdown.Item>
        <Dropdown.Item eventKey="ar">العربية</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default WebsiteLangDropdown;
