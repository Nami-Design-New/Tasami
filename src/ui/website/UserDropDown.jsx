import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function UserDropDown() {
  const { t } = useTranslation();

  return (
    <>
      <Dropdown className="d-lg-block d-none">
        <Dropdown.Toggle className="user_dropdown">
          <span>Mariam</span>
          <i className="fa fa-chevron-down"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="custom-dropdown-menu text-end">
          <Dropdown.Item as={Link} to="/profile">
            <i className="fa-regular fa-user"></i>
            حسابي
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/my-notifications">
            <i className="fa-regular fa-bell"></i>
            الإشعارات
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/my-wallet">
            <i className="fa-regular fa-wallet"></i>
            المحفظة
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="edit-profile">
            <i className="fa-regular fa-user-pen"></i>
            تعديل الحساب
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item>
            <i className="fa-regular fa-sign-out-alt"></i>
            تسجيل الخروج
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
