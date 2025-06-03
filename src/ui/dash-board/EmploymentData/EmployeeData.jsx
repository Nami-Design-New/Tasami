import FormWrapper from "../../forms/FormWrapper";

<img
  className="profile-card__avatar"
  src="https://randomuser.me/api/portraits/women/44.jpg"
  alt="Sarah Johnson"
/>;
const EmployeeData = () => {
  return (
    <FormWrapper title="البيانات الوظيفيه">
      <div className="employee__data">
        <div className="row g-2 ">
          <div className="col-12 col-sm-4 ">
            <h6>الوصف</h6>
            <p>تنفيذي</p>
          </div>
          <div className="col-12 col-sm-4 ">
            <h6> الحساب </h6>
            <p>S-120122-000001</p>
          </div>
          <div className="col-12 col-sm-4 ">
            <h6> رقم التعريف </h6>
            <p>01-014-005</p>
          </div>
          <div className="col-12 col-sm-4 ">
            <h6> رقم المجموعه </h6>
            <p>01-014-005</p>
          </div>
          <div className="col-12 col-sm-4 ">
            <h6> تاريخ التعيين </h6>
            <p>12-jan-22</p>
          </div>
          <div className="col-12 col-sm-4 ">
            <h6> حاله الحساب </h6>
            <p>نشط</p>
          </div>
          <div className="col-12 col-sm-4 ">
            <h6> تاريخ حاله الحساب </h6>
            <p>15-07-2024</p>
          </div>
          <div className="col-12 col-sm-4 ">
            {" "}
            <h6> وقت حاله الحساب </h6>
            <p>08:55</p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default EmployeeData;
