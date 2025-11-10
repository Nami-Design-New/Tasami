import { useState } from "react";
import LanguageDropDown from "./LanguageDropDown";
import ProfileMenu from "./ProfileMenu";

export default function NavBar({ collapsed, setCollapsed }) {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  return (
    <nav className="navbar">
      <button
        className={`menuToggler ${collapsed ? "expand" : ""}`}
        onClick={toggleSidebar}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="settings">
        <ul>
          <li className="settings-gear">
            <div className="btn" onClick={() => setIsLangOpen(!isLangOpen)}>
              <i className="fa-sharp fa-regular fa-globe"></i>
            </div>
            <LanguageDropDown setIsOpen={setIsLangOpen} isOpen={isLangOpen} />
          </li>

          <li className="profile">
            <div
              className="dropdownButton"
              onClick={() => setProfileDropDown(!profileDropDown)}
            >
              <div className="avatar">
                <img src={"/images/my-fav.svg"} alt="avatar" />
              </div>
              <div className="name">
                <h6 className={profileDropDown ? "animate" : ""}>
                  محمود عباس
                  <i className="fa-regular fa-angle-left" />
                </h6>
              </div>
            </div>
          </li>
        </ul>

        <ProfileMenu
          profileDropDown={profileDropDown}
          setProfileDropDown={setProfileDropDown}
        />
      </div>
    </nav>
  );
}
