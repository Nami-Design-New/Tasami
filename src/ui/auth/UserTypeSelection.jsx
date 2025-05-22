import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/slices/authRole";

const ROLES = [
  { en: "admin", ar: "موظف" },
  { en: "user", ar: "مستخدم" },
];

export default function UserTypeSelection({ setShowLoginForm }) {
  const role = useSelector((state) => state.authRole.role);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  // Helper function to check if a role is active
  const isRoleActive = (roleObj) => {
    if (typeof role === 'string') {
      return role === roleObj.en || role === roleObj.ar;
    } else if (role && typeof role === 'object') {
      return role.en === roleObj.en;
    }
    return false;
  };

  return (
    <div className="form">
      <h2 className="head">
        ! مرحبا بعودتك <img src="/sys-icons/waving-hand.svg" alt="hand-wave" />
      </h2>
      <p className="sub-head">من فضلك اختر دور المستخدم</p>
      <div className="selection-grid">
        {ROLES.map((roleObj) => (
          <button
            key={roleObj.en}
            className={`select ${isRoleActive(roleObj) ? "active" : ""}`}
            onClick={() => dispatch(setRole(roleObj))}
          >
            {lang === "en" ? roleObj.en : roleObj.ar}
          </button>
        ))}
      </div>
      <button className="next" onClick={() => setShowLoginForm(true)}>
        التالي
      </button>
    </div>
  );
}
