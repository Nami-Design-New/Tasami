import { useState } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../../forms/InputField";
import CustomButton from "../../CustomButton";

export default function AddNewSubscriptoinsModal({
  setShowModal,
  showModal,
  isEdit,
  existingData = null,
}) {
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    yearlyPrice: existingData?.price || "",
    halfYearlyPrice: existingData?.price || "",
    image: existingData?.image || null,
    preview: existingData?.image || null,
    maxOffers: existingData?.maxOffers || "",
    maxGroups: existingData?.maxGroups || "",
    maxSeats: existingData?.maxSeats || "",
    commission: existingData?.commission || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };
  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        {isEdit ? "تعديل اشتراك" : "اضف اشتراك جديد"}
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="d-flex  align-items-center justify-content-center col-12 p-2">
              <label className="image-upload-wrapper">
                <img
                  src={formData.preview || "/default-avatar.png"}
                  alt="Preview"
                  className="image-preview-circle"
                />
                <div className="edit-icon">
                  <i className="fa-solid fa-edit"></i>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="col-12 col-lg-6 p-2">
              <InputField label="اسم الخطة" name="name" />
            </div>
            {/* <div className="col-12 col-lg-6 p-2">
              <p className="sub-type-lable"> نوع الاشتراك </p>
              <div className="toggle-radio-group">
                <div className="toggle-radio">
                  <input
                    type="radio"
                    id="half-yearly"
                    name="subscription"
                    value="half-yearly"
                    checked={formData.subscription === "half-yearly"}
                    onChange={handleChange}
                  />
                  <label htmlFor="half-yearly" className="toggle-radio-label">
                    نصف سنوي
                  </label>
                </div>
                <div className="toggle-radio">
                  <input
                    type="radio"
                    id="yearly"
                    name="subscription"
                    checked={formData.subscription === "yearly"}
                    value="yearly"
                    onChange={handleChange}
                  />
                  <label htmlFor="yearly" className="toggle-radio-label">
                    سنوي
                  </label>
                </div>
              </div>
            </div> */}
            <div className="col-12 col-lg-6 p-2">
              <InputField label=" السعر السنوي" />
            </div>
            <div className="col-12 col-lg-6 p-2">
              <InputField label=" السعر النصف سنوي" />
            </div>
            {/* Features */}
            <div className="col-12 col-md-6 p-2">
              <InputField
                label="عدد العروض"
                name="maxOffers"
                value={formData.maxOffers}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                label="عدد المجموعات"
                name="maxGroups"
                value={formData.maxGroups}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                label="عدد المقاعد"
                name="maxSeats"
                value={formData.maxSeats}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6 p-2">
              <InputField
                label="نسبة العمولة (%)"
                name="commission"
                value={formData.commission}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 ">
              <div className="buttons justify-content-end">
                <CustomButton
                  color="secondary"
                  size="large"
                  onClick={() => setShowModal(false)}
                >
                  الغاء
                </CustomButton>
                <CustomButton>{isEdit ? "تحديث" : "اضف"}</CustomButton>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
