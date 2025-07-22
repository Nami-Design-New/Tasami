import { useRef } from "react";
import CustomButton from "../CustomButton";
import BackButton from "../forms/BackButton";
import InputField from "../forms/InputField";
import { useSearchParams } from "react-router";

export default function PersonalInfoForm({ setFormType }) {
  const inputFileRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  function handleNext(e) {
    e.preventDefault();
    setSearchParams({ step: "2" });
    setFormType("accountInfo");
  }
  return (
    <div className="row "  >
      <div className="col-12 p-2">
        <p className="image-label">
          <span>الصوره الشخصية </span>
          <span> &apos;اختياري &apos;</span>
        </p>
        <label className="images-input">
          <div className="image-input-wrapper">
            <img src="/icons/add-photo.svg" />
            <button
              onClick={handleButtonClick}
              type="button"
              className="add-image-buttton"
            >
              <i className="fa-light fa-plus"></i>{" "}
            </button>
          </div>
          <input type="file" ref={inputFileRef} onChange={handleFileChange} />
        </label>
      </div>
      <div className="col-12 p-2">
        <InputField type="text" label="الاسم الأول" />
      </div>
      <div className="col-12 p-2">
        <InputField
          type="text"
          label="اسم الأب أو اللقب أو الحرف الأول منهما"
        />
      </div>
      <div className="col-12 p-2">
        <InputField type="date" label="تاريخ الميلاد" />
      </div>
      <div className="col-12 p-2">
        <div className="identity-selector">
          <h6 className="identity-title">الهوية</h6>
          <div className="identity-container">
            <label className="identity-option">
              <img src="/icons/male-outlined.svg" alt="ذكر" />
              <span>ذكر</span>
              <input type="radio" name="gender" value="male" />
            </label>
            <label className="identity-option">
              <img src="/icons/female-outlined.svg" alt="أنثى" />
              <span>أنثى</span>
              <input type="radio" name="gender" value="female" />
            </label>
          </div>
        </div>
      </div>
      <div className="col-12 p-2">
        <div className="buttons">
          <BackButton  />
          <CustomButton
            type="button"
            fullWidth
            size="large"
            onClick={handleNext}
          >
            التالي
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
