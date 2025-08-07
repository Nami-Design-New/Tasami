import { useState } from "react";
import FileUploader from "../../forms/FileUPloader";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import ProfileImageUploader from "../../ProfileImageUploader";
import CustomButton from "../../CustomButton";

const EmployerDataForm = ({ isEdit }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(
    "/images/dashboard/avatar-placeholder.jpg"
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
    <>
      <form className="form_ui">
        <FormWrapper title={" البيانات الوظيفية"}>
          <div className="row ">
            <div className="col-12 col-md-6 col-xxl-4 p-2">
              <SelectField
                label="المستوي الوظيفي"
                disableFiledValue="اختر المستوي الوظيفي"
                options={[
                  { value: 1, name: "تنفيذي" },
                  { value: 2, name: "قائد" },
                  { value: 3, name: "مدير" },
                  { value: 4, name: "مشرف" },
                  { value: 5, name: "موظف خدمه العملاء" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4 p-2 ">
              <InputField
                label=" المسمي الوظيفي "
                type="text"
                placeholder="مثال: اخصائي قانوني"
              />
            </div>{" "}
            {isEdit && (
              <>
                <div className="col-12 col-md-6 col-xxl-4 p-2 ">
                  <InputField
                    label=" رقم الحساب "
                    type="text"
                    placeholder="EX: D-140123-00001"
                  />
                </div>
                <div className="col-12 col-md-6 col-xxl-4 p-2 ">
                  <InputField
                    label="التاريخ"
                    type="date"
                    value={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </>
            )}
            <div className="col-12 col-md-6 col-xxl-4 p-2 ">
              <SelectField
                label="المجموعة"
                disableFiledValue="اختر المجموعة"
                options={[
                  { value: 1, name: "AG-000001" },
                  { value: 2, name: "OG-000002" },
                  { value: 3, name: "AG-000003" },
                  { value: 4, name: "OG-000004" },
                ]}
              />
            </div>
            {isEdit && (
              <>
                <div className="col-12 col-md-6 col-xxl-4 p-2 ">
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
              </>
            )}
          </div>
        </FormWrapper>

        <FormWrapper title={"البيانات الشخصيه"}>
          <div className="row ">
            <div className="col-12   p-2">
              <div className="d-flex align-items-center justify-content-center">
                <ProfileImageUploader
                  imageUrl={image}
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2 ">
              <InputField
                label="الاسم الاول"
                type="text"
                placeholder="مثال: محمود"
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2 ">
              <InputField
                label="اسم الاب"
                type="text"
                placeholder="مثال: عباس"
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2 ">
              <InputField
                label="اسم العائله"
                type="text"
                placeholder="مثال: عباس"
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2 ">
              <InputField label="تاريخ الميلاد" type="date" />
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2 ">
              <InputField
                label="البريد الالكتروني"
                type="email"
                placeholder="مثال: mahmoud@gmail.com"
              />
            </div>

            <div className="col-12 col-md-6 col-xxl-4  p-2   ">
              <SelectField
                label="الجنس"
                options={[
                  { value: 1, name: "ذكر" },
                  { value: 2, name: "انثي" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4  p-2   ">
              <SelectField
                label="بلد الاقامه"
                options={[
                  { value: 1, name: "السعوديه" },
                  { value: 2, name: "مصر" },
                  { value: 3, name: "المغرب" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4   p-2  ">
              <SelectField
                label="مدينه الاقامه"
                options={[
                  { value: 1, name: "جده" },
                  { value: 2, name: "الرياض" },
                  { value: 3, name: "المدينه" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 col-xxl-4   p-2  ">
              <SelectField
                label="الجنسيه"
                options={[
                  { value: 1, name: "السعوديه" },
                  { value: 2, name: "مصر" },
                  { value: 3, name: "المغرب" },
                ]}
              />
            </div>
            <div className="col-12 p-2 ">
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label=" اضف المرفقات "
              />
            </div>
            <div className="col-12 p-2 ">
              <div className="buttons w-full justify-content-end ">
                <CustomButton color="secondary" size="large">
                  الغاء
                </CustomButton>
                <CustomButton color="primary" size="large">
                  {isEdit ? "تعديل" : "حفظ"}{" "}
                </CustomButton>
              </div>
            </div>
          </div>
        </FormWrapper>
      </form>{" "}
    </>
  );
};

export default EmployerDataForm;
