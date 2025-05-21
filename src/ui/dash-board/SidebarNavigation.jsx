import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function SidebarNavigation({ handleLinkClick }) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <>
      <Accordion className={lang === "en" && "en"}>
        {/* manage listings */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="icon">
              <img
                src="/sys-icons/manage-listing.svg"
                alt="Manage-Listings-icon"
              />
            </div>
            <div className="d-flex flex-column">
              <h6>المهام</h6>
            </div>
          </Accordion.Header>
          {/* sub menu */}
          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <NavLink to="fleets" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>المهام التنفيذيه </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="addons" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>المهام الاشرافيه</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="activities" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>مهام خدمه العملاء</span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        {/* markiting */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="icon">
              <img
                src="/sys-icons/markiting-promotion.svg"
                alt="markiting-icon"
              />
            </div>
            <div className="d-flex flex-column">
              <h6> المشتركون و فرق العمل </h6>
            </div>
          </Accordion.Header>
          {/* sub menu */}
          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <Accordion>
                  <Accordion.Item eventKey="1-1">
                    <Accordion.Header>
                      <img src="/sys-icons/subArrow.svg" alt="arrow" />
                      <span>المشتركون</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <li className="sub_nav_item">
                        <NavLink to="affiliate" onClick={handleLinkClick}>
                          <img src="/sys-icons/subArrow.svg" alt="arrow" />
                          <span> الحسابات </span>
                        </NavLink>
                      </li>
                      <li className="sub_nav_item">
                        <NavLink to="compigens" onClick={handleLinkClick}>
                          <img src="/sys-icons/subArrow.svg" alt="arrow" />
                          <span> البرامج </span>
                        </NavLink>
                      </li>
                      <li className="sub_nav_item">
                        <NavLink to="compigens" onClick={handleLinkClick}>
                          <img src="/sys-icons/subArrow.svg" alt="arrow" />
                          <span> الخدمات </span>
                        </NavLink>
                      </li>
                      <li className="sub_nav_item">
                        <NavLink to="compigens" onClick={handleLinkClick}>
                          <img src="/sys-icons/subArrow.svg" alt="arrow" />
                          <span> السير الذاتيه </span>
                        </NavLink>
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </li>
              <li className="sub_nav_item">
                <NavLink to="affiliate" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>فرق العمل </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="compigens" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>انشاء موظف</span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        {/* Analytics */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="icon">
              <img src="/sys-icons/Reports.svg" alt="Analytics" />
            </div>
            <div className="d-flex flex-column">
              <h6> تقارير الاداء </h6>
            </div>
          </Accordion.Header>
          {/* sub menu */}
          <Accordion.Body>
            <ul className="sub_navigation_menu">
              <li className="sub_nav_item">
                <NavLink to="reports" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> الاشتراكات </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="clients" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> البرامج والخدمات </span>
                </NavLink>
              </li>

              <li className="sub_nav_item">
                <NavLink to="clients" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> خدمات العملاء </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="clients" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> العمليات </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="clients" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> المبيعات </span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        {/* Guest Details &  Reviews */}
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
              <li className="sub_nav_item">
                <NavLink to="guests" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span>مجموعات العمل</span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="complaint" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> قطاعات التشغيل </span>
                </NavLink>
              </li>
              <li className="sub_nav_item">
                <NavLink to="rating" onClick={handleLinkClick}>
                  <img src="/sys-icons/subArrow.svg" alt="arrow" />
                  <span> المجالات والتخصصات </span>
                </NavLink>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
