import { NavLink, Outlet } from "react-router";

export default function Profile() {
  return (
    <section className="profile_section mt-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12 p-2">
            <div className="profile_sidebar">
              <div className="user">
                <img
                  src="/images/profile1.png"
                  alt="User Avatar"
                  className="avatar"
                />
                <div className="content">
                  <h6> محمد سمير</h6>
                  <span>ID: 345654</span>
                </div>
                 <div className="rating">
                  <img src="/icons/hz-bars.svg" />
                  <span>11</span>
                </div>
              </div>

              <div className="nav_links">
                <NavLink to="" end className="nav_link">
                  <i className="fa-regular fa-user"></i>
                  معلوماتي
                </NavLink>

                <NavLink to="my-notifications" className="nav_link">
                  <i className="fa-regular fa-bell"></i>
                  الإشعارات
                </NavLink>

                <NavLink to="my-wallet" className="nav_link">
                  <i className="fa-solid fa-wallet"></i>
                  محفظتي
                </NavLink>

                <NavLink to="Interests" className="nav_link">
                  <i className="fa-solid fa-clipboard-list"></i>
                  اهتماماتي
                </NavLink>

                <NavLink to="savings" className="nav_link">
                  <i className="fa-solid fa-bookmark"></i>
                  محفوظاتي
                </NavLink>

                <NavLink to="community" className="nav_link">
                  <i className="fa-solid fa-users"></i>
                  مجتمعاتي
                </NavLink>

                <NavLink to="followers" className="nav_link">
                  <i className="fa-solid fa-heart"></i>
                  متابعاتي
                </NavLink>
              </div>

              <button className="assistant_btn">
                <i className="fa-solid fa-robot"></i>
                منصة المساعد الشخصي
              </button>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-12 p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
