import { Link } from "react-router";

const DashBoardFooter = () => {
  return (
    <footer>
      <div className="inner_footer">
        <h6>
          جميع الحقوق محفوظه ل <Link to="/">تسامي</Link>
          <span>&copy; {new Date().getFullYear()}.</span>
        </h6>
        <div className="links">
          <Link to="terms-conditions">الشروط و الاحكام</Link>
          <Link to="/privacy-policy">سياسه الخصوصيه</Link>
          <Link to="/contact-us"> تواصل معنا </Link>
        </div>
      </div>
    </footer>
  );
};

export default DashBoardFooter;
