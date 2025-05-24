import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/slices/authRole";

const ROLES = ["admin", "user"];

export default function UserTypeSelection({ setShowLoginForm }) {
  const role = useSelector((state) => state.authRole.role);
  const dispatch = useDispatch();

  return (
    <div className="form">
      <h2 className="head">
        ! مرحبا بعودتك <img src="/sys-icons/waving-hand.svg" alt="hand-wave" />
      </h2>
      <p className="sub-head">من فضلك اختر دور المستخدم</p>
      <div className="selection-grid">
        {ROLES.map((r) => (
          <button
            key={r}
            className={`select ${r === role ? "active" : ""}`}
            onClick={() => dispatch(setRole(r))}
          >
            {r}
          </button>
        ))}
      </div>
      <button className="next" onClick={() => setShowLoginForm(true)}>
        التالي
      </button>
    </div>
  );
}
