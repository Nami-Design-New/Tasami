import { useState } from "react";
import { Modal } from "react-bootstrap";
import "react-range-slider-input/dist/style.css";
import SelectField from "../../forms/SelectField";
import InputField from "../../forms/InputField";
import SubmitButton from "../../forms/SubmitButton";

export default function HelperFilterModal({ show, onHide }) {
 
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <h5 className="fw-bold">تصفية</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui">
          <div className="row">
        
            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="المدينه"
                options={[
                  { value: "riyadh", name: "رياض" },
                  { value: "jeddah", name: "جدة " },
                  { value: "cairo", name: "القاهرة" },
                ]}
              />
            </div>
            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="جنسيه المساعد الشخصي"
                options={[
                  { value: "sa", name: "السعودية" },
                  { value: "eg", name: "مصر" },
                  { value: "ae", name: "الإمارات" },
                ]}
              />
            </div>
            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="المجال"
                options={[
                  { value: "trade", name: "تجارة" },
                  { value: "tech", name: "تقنية" },
                  { value: "health", name: "صحة" },
                ]}
              />
            </div>
            <div className="col-12 col-lg-6 p-2">
              <SelectField
                label="التخصص"
                options={[
                  { value: "coding", name: "برمجة" },
                  { value: "design", name: "تصميم" },
                  { value: "medicine", name: "طب" },
                ]}
              />
            </div>
            <div className="col-12 col-lg-6 p-2">
              <div className="gender-goal-filter">
                <p>تفضيل هوية المساعد الشخصي</p>
                <div className="filter-options">
                  <label>
                    الكل
                    <input type="radio" name="gender" value="all" />
                  </label>
                  <label>
                    ذكر
                    <input type="radio" name="gender" value="male" />
                  </label>
                  <label>
                    أنثى
                    <input type="radio" name="gender" value="female" />
                  </label>
                </div>
              </div>
            </div>
            
          </div>

          <div className="col-12 my-3 d-flex gap-1">
                     <div className="col-6">
                       <SubmitButton text="تصفية" />
                     </div>
                     <div className="col-6">
                       <button type="button" className="cancle" onClick={onHide}>
                         إلغاء
                       </button>
                     </div>
                   </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
