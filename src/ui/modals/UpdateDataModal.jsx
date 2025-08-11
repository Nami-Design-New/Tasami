import { Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";
import FileUploader from "../forms/FileUPloader";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import TextField from "../forms/TextField";
import { useState } from "react";
import ProfileImageUploader from "../ProfileImageUploader";
import MapLocationField from "../dash-board/create-employee/MapLocationField";

const UpdateDataModal = ({ showModal, setShowModal }) => {
  const [files, setFiles] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/men/12.jpg"
  );

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
  const handleUserFilesChange = (updatedFiles) => {
    setUserFiles(updatedFiles);
  };
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <h6>طلب تحديث البيانات</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            {" "}
            <div className="col-12 p-2">
              <div className="d-flex align-items-center justify-content-center w-full">
                <ProfileImageUploader
                  imageUrl={image}
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField type="text" label="بلد الاقامه " value="السعوديه" />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField type="text" label=" المدينه  " value="الرياض" />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                type="text"
                label=" رقم الهويه او الجواز "
                value="12345678"
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                type="text"
                label=" البريد الالكتروني الشخصي"
                value="mohamed.radwan@tasami.com"
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <MapLocationField
                htmlFor="companyLocationOnMap"
                label="العنوان "
                hint="(علي الخريطه)"
                name={"السعودية"}
                setShowModal={setShowMapModal}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                type="text"
                label=" العنوان الوطني "
                value="السعوديه "
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <SelectField
                label="الموظف الموجه اليه الطلب"
                options={[
                  { value: "1", name: "S-111111-0111111" },
                  { value: "2", name: "S-111111-0111111" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 p-2">
              <InputField
                label="عنوان الموضوع"
                placeholder="اضف عنوان للموضوع"
              />
            </div>
            <div className="col-12  p-2">
              <TextField label={"سبب التحديث"} />
            </div>
            <div className="col-12  p-2">
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label=" اضف المرفقات "
                hint="خاصة بالموظف"
              />
            </div>
            <div className="col-12 p-2">
              <FileUploader
                files={userFiles}
                onFilesChange={handleUserFilesChange}
                label=" اضف المرفقات "
                hint="خاصة بالنموذج"
              />
            </div>
            <div className="col-12 p-2">
              <p className="hint">
                سيتم مراجعة طلبك من قبل الادارة وسيتم التواصل معك في حال
                الموافقة في حال الموافقة سيتم تحديث بياناتك في النظام
              </p>
            </div>
            <div className="mt-3">
              <CustomButton fullWidth size="large">
                ارسال الطلب
              </CustomButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDataModal;
