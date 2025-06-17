import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

export default function ProfileMenu({ profileDropDown, setProfileDropDown }) {
  const dropdownRef = useRef(null);
  const handleLogout = async () => {};
  const variants = {
    open: {
      opacity: 1,
      height: "max-content",
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".dropdownButton");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !isDropdownButton
      ) {
        setProfileDropDown(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setProfileDropDown, dropdownRef]);

  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate={profileDropDown ? "open" : "closed"}
      className={`profile_dropdown`}
      ref={dropdownRef}
    >
      {/* authed user */}
      <div className="account_owner">
        <div className="avatar--wrapper ">
          <div className="avatar">
            <img src={"/images/my-fav.svg"} alt="avatar" />
            <Link className="edit" to="profile">
              <img src="/sys-icons/editIcon.svg" alt="edit" />
            </Link>
          </div>
        </div>
        <div className="account_welcoming">
          <h6> اهلا , محمود عباس </h6>
          <span> E-010222-0000 </span>
          <span> تنفيذي </span>
          <span> الرئيس المباشر : ا.سلطان </span>
          <span> رقم المجموعه : GN-000002</span>
        </div>
      </div>

      {/* manage and invite links */}
      {/* <div className="manage_invite">
        <div className="link" onClick={() => setProfileDropDown(false)}>
          <i className="fa-solid fa-shield-check"></i>
          <Link to="invite-user"> اضافه صلاحيه جديده </Link>
        </div>
        <div className="link" onClick={() => setProfileDropDown(false)}>
          <i className="fa-solid fa-gear"></i>
          <Link to="manage-account"> اداره حسابك في تسامي </Link>
        </div>
      </div> */}

      {/* switch users */}
      <div className="select_frame">
        <div className="manage_invite">
          {/* <div className="link ps-2">
            <i className="fa-solid fa-user-plus"></i>
            <Link to="invite-user"> انشاء موظف </Link>
          </div> */}

          <div className="link ps-2">
            <i className="fa-regular fa-arrow-right-from-bracket"></i>
            <Link onClick={handleLogout}> تسجيل الخروج </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
