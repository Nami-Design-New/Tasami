import { useNavigate } from "react-router";
import CustomButton from "../../ui/CustomButton";
import BackButton from "../../ui/forms/BackButton";
import SelectField from "../../ui/forms/SelectField";

export default function CustomizeServicesPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <section className="personal-info-form">
      <p className="form-head">
        قم باستكمال معلوماتك لربط أعمالك بفريق خدمة العملاء حسب مكان تواجدك
        الفعلي. تنصح &quot;تسامي&quot; بتحديث هذه المعلومات عند تغير بياناتك
        المكانية كلما كان ذلك ضرورياً ليتم خدمتك بشكل أفضل.
      </p>
      <form className="form_ui">
        <div className="row">
          <div className="col-12 p-2">
            <SelectField
              label="الجنسية"
              options={[
                {
                  value: "saudi",
                  name: "سعودية",
                },
                {
                  value: "egypt",
                  name: "مصر",
                },
                {
                  value: "oman",
                  name: "عمان",
                },
                {
                  value: "siria",
                  name: "سوريا",
                },
                {
                  value: "lebanon",
                  name: "لبنان",
                },
              ]}
              disableFiledValue="اختر"
            />
          </div>
          <div className="col-12 p-2">
            <SelectField
              label="بلد الإقامة"
              options={[
                {
                  value: "saudi",
                  name: "سعودية",
                },
                {
                  value: "egypt",
                  name: "مصر",
                },
                {
                  value: "oman",
                  name: "عمان",
                },
                {
                  value: "siria",
                  name: "سوريا",
                },
                {
                  value: "lebanon",
                  name: "لبنان",
                },
              ]}
              disableFiledValue="اختر"
            />
          </div>
          <div className="col-12 p-2">
            <SelectField
              label="المدينة"
              options={[
                {
                  value: "riyadh",
                  name: "الرياض",
                },
                {
                  value: "jeddah",
                  name: "جدة",
                },
              ]}
              disableFiledValue="اختر"
            />
          </div>
          <div className="col-12 p-2">
            <div className="buttons">
              <BackButton onClick={handleBack} />
              <CustomButton
                type="button"
                fullWidth
                size="large"
                onClick={() => navigate("/")}
              >
                تأكيد
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
