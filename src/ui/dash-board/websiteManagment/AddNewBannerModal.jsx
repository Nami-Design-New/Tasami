import { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import CustomButton from "../../CustomButton";

export default function AddNewBannerModal({ setShowModal, showModal, isEdit }) {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <Modal
      centered
      size="md"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        {isEdit ? "تعديل الافتة" : "اضف لافتة"}
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 p-2">
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? "active" : ""}`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <img src={preview} alt="preview" className="banner-preview" />
              ) : (
                <p>اسحب الصورة هنا أو انقر لاختيارها</p>
              )}
            </div>{" "}
          </div>
          <div className="col-12 p-2 ">
            <div className="buttons  justify-content-end">
              <CustomButton fullWidth>{isEdit ? "تحديث" : "اضف"}</CustomButton>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
