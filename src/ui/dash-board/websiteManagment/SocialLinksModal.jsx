import { Modal } from "react-bootstrap";
import CustomButton from "../../CustomButton";
import InputField from "../../forms/InputField";
import { useState } from "react";

export default function SocialLinksModal({ showModal, setShowModal, isEdit }) {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };
  return (
    <Modal
      show={showModal}
      size="md"
      onHide={() => {
        setShowModal(false);
        setLogoPreview(null);
      }}
      centered
    >
      <Modal.Header closeButton>{isEdit ? "تعديل" : "اضافه"} رابط</Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12">
              <label className="form-label fw-semibold mb-2">
                تحميل الشعار
              </label>

              <div className="border border-2 border-dashed rounded-3 p-3 text-center position-relative bg-light">
                <img
                  style={{ width: "3rem", height: "3rem" }}
                  src="/icons/umpload-icon.svg"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="position-absolute w-100 h-100 top-0 start-0 opacity-0"
                  onChange={handleFileChange}
                  style={{ cursor: "pointer" }}
                />
                {logoPreview ? (
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: 100, objectFit: "contain" }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setLogoFile(null);
                        setLogoPreview(null);
                      }}
                    >
                      حذف الشعار
                    </button>
                  </div>
                ) : (
                  <div className="text-muted">
                    انقر هنا أو اسحب صورة الشعار لرفعها
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 p-2">
              <InputField label="الرابط" placeholder="https://example.com" />
            </div>
            <div className="col-12 p-2">
              <div className="d-flex align-items-center gap-2    justify-content-end  ">
                <CustomButton
                  onClick={() => setShowModal(false)}
                  size="large"
                  color="secondary"
                  type="button"
                >
                  الغاء
                </CustomButton>

                <CustomButton size="large" type="submit">
                  {isEdit ? "تعديل " : "  اضافة "}{" "}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
