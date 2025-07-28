import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function SidebarNavigation() {
  const lang = useSelector((state) => state.language.lang);
  return (
    <>
      <Accordion className={lang === "en" && "en"}>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="icon">
              <img
                src="/sys-icons/markiting-promotion.svg"
                alt="markiting-icon"
              />
            </div>
            <div className="d-flex flex-column">
              <h6> المشتركون و فريق العمل </h6>
            </div>
          </Accordion.Header>
          {/* sub menu */}
          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <NavLink to="user-accounts">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>المشتركون</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="teams">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>فريق العمل </span>
                </NavLink>
              </li>

              {/* <li className="sub_nav_item">
                <NavLink to="create-employee">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>انشاء موظف</span>
                </NavLink>
              </li> */}
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* List Managment */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <div className="icon">
              <img src="/sys-icons/guest-details.svg" alt="Analytics" />
            </div>
            <div className="d-flex flex-column">
              <h6> اداره القوائم </h6>
            </div>
          </Accordion.Header>
          {/* sub menu */}
          <Accordion.Body>
            <ul className="sub_navigation_menu">
              {" "}
              <li className="sub_nav_item">
                <NavLink to="list-management/operating-sectors">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> مناطق التشغيل </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="list-management/working-groups">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>مجموعات العمل</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="list-management/fields-and-specializations">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> المجالات والتخصصات </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="list-management/administrative-systems">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> الانظمه الاداريه </span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <div className="icon">
              <img src="/sys-icons/website-manage.svg" alt="Analytics" />
            </div>
            <div className="d-flex flex-column">
              <h6> اداره الموقع </h6>
            </div>
          </Accordion.Header>
          {/* sub menu */}
          <Accordion.Body>
            <ul className="sub_navigation_menu">
              {" "}
              <li className="sub_nav_item">
                <NavLink to="violations-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> المخالفات </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="social-links-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> روابط وسائل التواصل </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="content-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> إدارة المحتوى </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="faq-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> الأسئلة الشائعة </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="tasks-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> تصنيف المهمات </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="subscription-management">
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> ادارة الاشتراكات </span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
