import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import LanguageDropDown from "./LanguageDropDown";

export default function NavBar({ collapsed, setCollapsed }) {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const role = useSelector((state) => state.authRole.role);
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

      <div className="links">
        <ul>
          {(typeof role === 'string' ? role !== "partner" : role?.en !== "partner") && (
            <>
              <li>
                <NavLink to="" end>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="live-tracker">live tracker</NavLink>
              </li>
              <li>
                <NavLink to="nssm">NSSM</NavLink>
              </li>
              <li>
                <NavLink to="bookings-scheduling">
                  Bookings & scheduling
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="settings">
        <ul>
          <li className="settings-gear">
            <div className="btn" onClick={() => setIsLangOpen(!isLangOpen)}>
              <i className="fa-sharp fa-regular fa-globe"></i>
            </div>
            <LanguageDropDown setIsOpen={setIsLangOpen} isOpen={isLangOpen} />
          </li>

          <li className="settings-gear">
            <Link className="btn" to="/chats">
              <i className="fa-light fa-comments"></i>
            </Link>
          </li>
          <li className="notification">
            <div
              className="btn"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <i className="fa-light fa-bell"></i>
              <span className="number">3</span>
            </div>
            {/* <NotificationMenu
              setIsOpen={setIsNotificationOpen}
              isOpen={isNotificationOpen}
            /> */}
          </li>

          <li className="profile">
            <div
              className="dropdownButton"
              onClick={() => setProfileDropDown(!profileDropDown)}
            >
              <div className="avatar">
                <img src={"/images/fav.svg"} alt="avatar" />
              </div>
              <div className="name">
                <h6 className={profileDropDown ? "animate" : ""}>
                  <i className="fa-regular fa-angle-right" />
                </h6>
              </div>
            </div>
          </li>
        </ul>

        {/* <ProfileMenu
          organization={organization}
          profileDropDown={profileDropDown}
          setProfileDropDown={setProfileDropDown}
        /> */}
      </div>
    </nav>
  );
}
