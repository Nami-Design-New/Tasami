import { useState } from "react";
import FileUploader from "../../forms/FileUPloader";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import SubmitButton from "../../forms/SubmitButton";
import ProfileImageUploader from "../../ProfileImageUploader";

const EmployerDataForm = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );
  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  return (
    <form className="form_ui">
      <FormWrapper title={" البيانات التوظيفيه "}>
        <div className="row g-2">
          <div className="col-12 col-md-6 col-xxl-4">
            <SelectField
              label="الوصف"
              options={[
                { value: 1, name: "تنفيذي" },
                { value: 2, name: "مشرف" },
                { value: 3, name: "موظف خدمه العملاء" },
              ]}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField
              label=" رقم الحساب "
              type="text"
              placeholder="EX: D-140123-00001"
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField
              label="التاريخ"
              type="date"
              value={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="col-12 col-md-6 col-xxl-4 ">
            <SelectField
              label="الاقليم"
              options={[
                { value: 1, name: "الشرق الاوسط" },
                { value: 2, name: "اوروبا" },
                { value: 3, name: "امريكا الشماليه" },
              ]}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <SelectField
              label="القطاع"
              options={[
                { value: 1, name: "السعوديه" },
                { value: 2, name: "مصر" },
                { value: 3, name: "المغرب" },
              ]}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <SelectField
              label="المدينة"
              options={[
                { value: 1, name: "جده" },
                { value: 2, name: "الرياض" },
                { value: 3, name: "المدينه" },
              ]}
            />
          </div>
        </div>
      </FormWrapper>
      <FormWrapper title={"البيانات الشخصيه"}>
        <div className="row g-2">
          <ProfileImageUploader imageUrl={image} onChange={handleUpload} />
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField
              label="الاسم الاول"
              type="text"
              placeholder="مثال: محمود"
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField label="اسم الاب" type="text" placeholder="مثال: عباس" />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField
              label="اسم العائله"
              type="text"
              placeholder="مثال: عباس"
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField label="تاريخ الميلاد" type="date" />
          </div>
          <div className="col-12 col-md-6 col-xxl-4 ">
            <InputField label="البريد الالكتروني" type="email" />
          </div>

          <div className="col-12 col-md-6 col-xxl-4   ">
            <SelectField
              label="الجنس"
              options={[
                { value: 1, name: "ذكر" },
                { value: 2, name: "انثي" },
              ]}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4   ">
            <SelectField
              label="بلد الاقامه"
              options={[
                { value: 1, name: "السعوديه" },
                { value: 2, name: "مصر" },
                { value: 3, name: "المغرب" },
              ]}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4   ">
            <SelectField
              label="مدينه الاقامه"
              options={[
                { value: 1, name: "جده" },
                { value: 2, name: "الرياض" },
                { value: 3, name: "المدينه" },
              ]}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4   ">
            <SelectField
              label="الجنسيه"
              options={[
                { value: 1, name: "السعوديه" },
                { value: 2, name: "مصر" },
                { value: 3, name: "المغرب" },
              ]}
            />
          </div>
          <div className="col-12  ">
            <FileUploader
              files={files}
              onFilesChange={handleFilesChange}
              label=" اضف المرفقات "
            />
          </div>
        </div>
      </FormWrapper>
      <div className="form__action--buttons d-flex gap-3">
        <button type="button" className=" log  button--add save-button">
          حفظ و اغلاق
        </button>
        <SubmitButton className={"submit-button"} text={"حفظ"} />
      </div>
    </form>
  );
};

export default EmployerDataForm;
