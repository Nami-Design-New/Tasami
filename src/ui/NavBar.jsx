import { useState } from "react";
import LanguageDropDown from "./LanguageDropDown";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function NavBar({ collapsed, setCollapsed }) {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.adminAuth);

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
          {" "}
          {/* <li>
           <i className="fa-duotone fa-user-md-chat fs-4 mx-2"></i>
          </li> */}
          <li className="settings-gear gap-2">
            <Link to={"/dashboard/chats"} className="btn">
              <i className="fa-sharp fa-regular fa-comments"></i>
            </Link>
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
                <img
                  src={user?.image ? user?.image : "./images/my-fav.svg"}
                  alt="avatar"
                />
              </div>
              <div className="name">
                <h6
                  className={`${lang === "ar" ? "ar" : ""} ${
                    profileDropDown ? "animate" : ""
                  }`}
                >
                  {user?.first_name}
                  {lang === "ar" ? (
                    <i className="fa-regular fa-angle-left" />
                  ) : (
                    <i className="fa-regular fa-angle-right" />
                  )}
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
