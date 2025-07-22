import { useState } from "react";
import { Modal } from "react-bootstrap";
import "react-range-slider-input/dist/style.css";
// import CustomButton from "../../CustomButton";
import SelectField from "../../forms/SelectField";
import SubmitButton from "../../forms/SubmitButton";

const GoalFilterModal = ({ show, onHide }) => {
  // const [valueRange, setValueRange] = useState([100, 30000]);
  // const [ageRange, setAgeRange] = useState([18, 65]);
  // const [rating, setRating] = useState("");
  const [assistMethod, setAssistMethod] = useState("");

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <h5 className="fw-bold">تصفية</h5>
      </Modal.Header>

      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            {/* {filters.map((filter, index) => (
              <div key={index} className="col-12 col-md-6 mb-3">
                <SelectField
                  label={filter.label}
                  placeholder={filter.placeholder}
                  options={filter.options}
                />
              </div>
            ))} */}
            {/* {showRating && (
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
            )} */}
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
                label="جنسيه المستفيد"
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

            <div className="row">
              {/* {showValueRange && (
                <div className="col-12 col-lg-6 mb-4">
                  <label className="mb-2 fw-medium">القيمة</label>
                  <RangeSlider
                    min={100}
                    max={30000}
                    value={valueRange}
                    onInput={setValueRange}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <small>
                      {valueRange[0]} <img src="/icons/ryal.svg" alt="ريال" />
                    </small>
                    <small>
                      {valueRange[1]} <img src="/icons/ryal.svg" alt="ريال" />
                    </small>
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
              )} */}

              {/* {showAgeRange && (
                <div className="col-12 col-lg-6 mb-4">
                  <label className="mb-2 fw-medium">
                    الفئات العمرية المستهدفة
                  </label>
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
              )} */}
            </div>
            {/* {showMethod && (
              <div className="col-12 mb-3">
                <label className="mb-2 fw-medium">
                  آليات المساعدة المناسبة
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {[
                    "الكل",
                    "التراسل النصي والصوتي",
                    "الالتقاء الشخصي",
                    "الاتصال المرئي والمسموع",
                  ].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setAssistMethod(option)}
                      className={`btn ${
                        assistMethod === option
                          ? "btn-secondary"
                          : "btn-outline-secondary"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )} */}
          </div>

          <div className="col-12 my-3 d-flex gap-1">
            <div className="col-6">
              <SubmitButton text="تصفية" />
            </div>
            <div className="col-6">
              <button
                type="button"
                className="cancle"
                onClick={() => onHide(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default GoalFilterModal;
