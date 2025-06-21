import { Modal } from "react-bootstrap";
import InputField from "../../../ui/forms/InputField";
import TextField from "../../../ui/forms/TextField";
import SelectField from "../../../ui/forms/SelectField";
import FileUploader from "../../../ui/forms/FileUPloader";
import SubmitButton from "../../../ui/forms/SubmitButton";
import { useState } from "react";

const AddNewTask = ({ showModal, setShowModal }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );
  const handleFilesChange = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Modal size="lg" centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <h6>نموذج عمل جديد</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 col-md-6 py-2">
              <SelectField
                label="النظام الاداري"
                options={[
                  { value: "1", name: "داخلي" },
                  { value: "2", name: " خارجي " },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 py-2">
              <SelectField
                label="الموضوع"
                options={[
                  { value: "1", name: "مهمه تنفيذيه" },
                  { value: "2", name: "مهمه اجرائيه" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 py-2">
              <SelectField
                label="الموظف الموجه اليه الطلب"
                options={[
                  { value: "1", name: "مهمه تنفيذيه" },
                  { value: "2", name: "مهمه اجرائيه" },
                ]}
              />
            </div>
            <div className="col-12 col-md-6 py-2">
              <InputField
                label="عنوان الموضوع"
                placeholder="اضف عنوان للموضوع"
              />
            </div>
            <div className="col-12 py-2">
              <TextField label="الوصف" placeholder="اضف وصف الطلب" />
            </div>

            <div>
              <FileUploader
                files={files}
                onFilesChange={handleFilesChange}
                label=" اضف المرفقات "
              />
            </div>
          </div>
          <div className="col-12 py-2 ">
            <div className="d-flex align-items-center justify-content-end gap-2">
              <button
                type="button
              "
                className="button button--cancel"
                onClick={handleClose}
              >
                الغاء
              </button>
              <SubmitButton text="تنفيذ" className="button" />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewTask;
