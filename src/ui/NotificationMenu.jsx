import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function NotificationMenu({ isOpen, setIsOpen }) {
  const dropdownRef = useRef(null);
  const lang = useSelector((state) => state.language.lang);
  const variants = {
    open: {
      opacity: 1,
      height: "340px",
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".notification");

      if (!isDropdownButton) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen, dropdownRef]);

  return (
    <motion.div
      ref={dropdownRef}
      variants={variants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      className={`notification-modal modals ${lang === "ar" ? "ar" : ""} `}
    >
      <div className="header">
        <p>التنبيهات</p>
        <div className="badge bg-secondary-transparent"> 3 غير مقروه </div>
      </div>
      <div className="body">
        {Array(10)
          .fill(0)
          .map((e, i) => {
            return <NotificationCard key={i} />;
          })}
      </div>
      <div className=" footer ">
        <Link href="notifications">عرض الكل</Link>
      </div>
    </motion.div>
  );
}

function NotificationCard() {
  return (
    <div className="notification-card">
      <div className="icon-wrapper">
        <div className="avatar">
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
      </div>
      <div className="notification-content">
        <div>
          <p className="notification-title">
            <Link>الابلاغ عن مخالفه</Link>
          </p>
          <span className="text-muted fw-normal fs-12">
            يتم الابلاغ عن مخالفه بان المستخدم لم يعرض مختوي مضلل
          </span>
        </div>
      </div>
    </div>
  );
}
