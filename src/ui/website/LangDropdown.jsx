import { useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import i18next from "i18next";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/languageSlice";

const LangDropdown = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleSelect = (lang) => {
    dispatch(setLanguage(lang));
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

export default LangDropdown;
