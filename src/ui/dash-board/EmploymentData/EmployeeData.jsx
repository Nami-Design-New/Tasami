import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";

<img
  className="profile-card__avatar"
  src="https://randomuser.me/api/portraits/women/44.jpg"
  alt="Sarah Johnson"
/>;
const EmployeeData = () => {
  return (
    <FormWrapper title="البيانات الوظيفيه">
      <form className="form_ui">
        <div className="row g-2 ">
          <div className="col-12 col-sm-6 ">
            <InputField label="الوصف" disabled={true} value="تنفيذي" />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField
              label="رقم الحساب"
              disabled={true}
              value="S-120122-000001"
            />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField
              label="رقم التعريف"
              disabled={true}
              value="01-014-005"
            />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField
              label="رقم المجموعه "
              disabled={true}
              value="GIN-00000001"
            />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField
              label="تاريخ التعيين"
              disabled={true}
              value="12-jan-22"
            />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField label="حاله الحساب" disabled={true} value="نشط" />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField
              label="تاريخ حاله الحساب"
              disabled={true}
              value="15-07-2024"
            />
          </div>
          <div className="col-12 col-sm-6 ">
            <InputField label="وقت حاله الحساب" disabled={true} value="08:55" />
          </div>
        </div>
      </form>
    </FormWrapper>
  );
};

export default EmployeeData;
