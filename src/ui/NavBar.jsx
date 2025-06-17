import { useState } from "react";
import { Link } from "react-router";
import LanguageDropDown from "./LanguageDropDown";
import ProfileMenu from "./ProfileMenu";

export default function NavBar({ collapsed, setCollapsed }) {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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

          <li className="settings-gear">
            <Link className="btn" to="/dashboard/chats">
              <i className="fa-light fa-comments"></i>
            </Link>
          </li>
          {/* <li className="notification">
            <div
              className="btn"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <i className="fa-light fa-bell"></i>
              <span className="number">3</span>
            </div>
            <NotificationMenu
              setIsOpen={setIsNotificationOpen}
              isOpen={isNotificationOpen}
            />
          </li> */}

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
