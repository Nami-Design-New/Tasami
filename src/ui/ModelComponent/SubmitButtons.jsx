import { Link } from "react-router";
import SubmitButton from "../forms/SubmitButton";

const SubmitButtons = () => (
  <div className="model__submit">
    <Link to="/dashboard/actions-log" className="model__submit-log">
      سجل الاجراءات
    </Link>
    <div className="model__submit-buttons">
      <button className="log button--add">حفظ و اغلاق</button>
      <SubmitButton text={"تنفيذ"} />
    </div>
  </div>
);

export default SubmitButtons;
