import { Modal } from "react-bootstrap";
import SelectField from "../forms/SelectField";
import SubmitButton from "../forms/SubmitButton";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from "react";
import InputField from "../forms/InputField";
import DatePicker from "../forms/DatePicker";

const FilteredModal = ({
  show,
  onHide,
  filters = [],
  showValueRange = false,
  showAgeRange = false,
  showRating = false,
  showDate = false,
  showMethod = false,
}) => {
  const [valueRange, setValueRange] = useState([100, 30000]);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [rating, setRating] = useState("");
  const [assistMethod, setAssistMethod] = useState("");

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <h5 className="fw-bold">تصفية</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            {filters.map((filter, index) => (
              <div key={index} className="col-12 col-md-6 mb-3">
                <SelectField
                  label={filter.label}
                  placeholder={filter.placeholder}
                  options={filter.options}
                />
              </div>
            ))}
              {showRating && (
              <div className="col-lg-6 mb-3">
                <label className="mb-2 fw-medium">التقييم</label>
                <div className="d-flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`btn ${rating === star ? "btn-secondary" : "btn-outline-secondary"}`}
                    >
                      {`أكثر من ${star}`} <i className="fa-solid fa-star ms-1 text-warning"></i>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="col-12 col-lg-6 mt-4">
              {showDate && (
                <DatePicker />
              )}
            </div>
            <div className="row">
            {showValueRange && (
              <div className="col-12 col-lg-6 mb-4">
                <label className="mb-2 fw-medium">القيمة</label>
                <RangeSlider
                  min={100}
                  max={30000}
                  value={valueRange}
                  onInput={setValueRange}
                />
                <div className="d-flex justify-content-between mt-2">
                  <small>{valueRange[0]} <img src="/icons/ryal.svg" alt="ريال" /></small>
                  <small>{valueRange[1]} <img src="/icons/ryal.svg" alt="ريال" /></small>
                </div>
                <div className="col-12 col-lg-12 p-2">
                  <div className="row">
                    <div className="col-6 p-1">
                      <InputField label="الحد الأدني" placeholder="ريال" />
                    </div>
                    <div className="col-6 p-1">
                      <InputField label="الحد الأقصي" placeholder="ريال" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showAgeRange && (
              <div className="col-12 col-lg-6 mb-4">
                <label className="mb-2 fw-medium">الفئات العمرية المستهدفة</label>
                <RangeSlider
                  min={18}
                  max={100}
                  value={ageRange}
                  onInput={setAgeRange}
                />
                <div className="d-flex justify-content-between mt-2">
                  <small>{ageRange[0]} عام</small>
                  <small>{ageRange[1]} عام</small>
                </div>
                <div className="col-12 col-lg-12 p-2">
                  <div className="row">
                    <div className="col-6 p-1">
                      <InputField label="من" placeholder="عام" />
                    </div>
                    <div className="col-6 p-1">
                      <InputField label="إلى" placeholder="عام" />
                    </div>
                  </div>
                </div>
              </div>
            )}
</div>
            {showMethod && (
              <div className="col-12 mb-3">
                <label className="mb-2 fw-medium">آليات المساعدة المناسبة</label>
                <div className="d-flex flex-wrap gap-2">
                  {["الكل", "التراسل النصي والصوتي", "الالتقاء الشخصي", "الاتصال المرئي والمسموع"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setAssistMethod(option)}
                      className={`btn ${assistMethod === option ? "btn-secondary" : "btn-outline-secondary"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="d-flex gap-2 mt-3">
            <SubmitButton text="تطبيق التصفية" />
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              إلغاء
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FilteredModal;
