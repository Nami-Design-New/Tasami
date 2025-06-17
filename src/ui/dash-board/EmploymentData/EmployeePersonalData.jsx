import { useState } from "react";
import FileUploader from "../../forms/FileUPloader";
import FormWrapper from "../../forms/FormWrapper";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import MapModal from "../../modals/MapModal";
import UpdateDataModal from "../../modals/UpdateDataModal";
import ProfileImageUploader from "../../ProfileImageUploader";
import MapLocationField from "../create-employee/MapLocationField";

const EmployeePersonalData = () => {
  const defaultBirthday = "2000-01-01";
  const today = new Date().toISOString().split("T")[0];
  const [showMapModal, setShowMapModal] = useState(false);
  const [showUpdateDataModal, setShowUpdateDataModal] = useState(false);
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );
  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  return (
    <FormWrapper title=" البيانات الشخصيه ">
      <form className="form_ui personal-data__form">
        <div className="row g-2">
          <div className="col-12">
            <ProfileImageUploader imageUrl={image} onChange={handleUpload} />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField label="الاسم الاول" value="محمود" readonly disabled />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField label="اسم الاب" value="عباس" readonly disabled />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField label="اسم العائله" value="عباس" readonly disabled />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField
              type="date"
              label="تاريخ الميلاد"
              value={defaultBirthday}
              max={today}
              readonly
              disabled
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField
              type="text"
              label="الجنس"
              value={"ذكر"}
              readonly
              disabled
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField
              value={"السعوديه"}
              type="text"
              label="الجنسيه"
              readonly
              disabled
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField type="text" label=" بلد الاقامه " />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField type="text" label=" المدينه  " />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField type="text" label=" رقم الهويه او الجواز " />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField type="text" label=" البريد الالكتروني الشخصي" />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <MapLocationField
              htmlFor="companyLocationOnMap"
              label="العنوان "
              hint="(علي الخريطه)"
              setShowModal={setShowMapModal}
            />
          </div>
          <div className="col-12 col-md-6 col-xxl-4">
            <InputField type="text" label=" العنوان الوطني " />
          </div>
          <FileUploader
            files={files}
            onFilesChange={handleFilesChange}
            label=" اضف المرفقات "
          />
          <div className="personal-data__button ">
            <button
              type="button"
              onClick={() => setShowUpdateDataModal(true)}
              className="log btn-width"
            >
              طلب تحديث بيانات
            </button>
          </div>
        </div>
      </form>
      <MapModal
        title="العنوان علي الخريطة"
        showModal={showMapModal}
        setShowModal={setShowMapModal}
        // setSearchedPlace={setSearchedPlace}
        target="companyLocation"
        showLocationFirst={true}
        // formData={watch()}
        // setFormData={(data) => {
        //   if (data.lat)
        //     register("lat").onChange({ target: { value: data.lat } });
        //   if (data.lng)
        //     register("lng").onChange({ target: { value: data.lng } });
        // }}
      />
      <UpdateDataModal
        title="طلب تحديث البيانات"
        setShowModal={setShowUpdateDataModal}
        showModal={showUpdateDataModal}
      />
    </FormWrapper>
  );
};

export default EmployeePersonalData;
