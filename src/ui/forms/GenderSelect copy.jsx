export default function GenderSelect({
  value,
  onChange,
  disabled = ({ disabled } = false),
}) {
  return (
    <div className="gender_select">
      <label>الهوية</label>
      <div>
        <label
          htmlFor="female"
          className={`gender_card ${value === "female" ? "active" : ""}`}
        >
          <input
            onChange={() => onChange("female")}
            type="radio"
            name="gender"
            id="female"
            disabled={disabled}
            checked={value === "female"}
          />
          <img src="/icons/femal.svg" alt="female" /> أنثي
        </label>

        <label
          htmlFor="male"
          className={`gender_card ${value === "male" ? "active" : ""}`}
        >
          <input
            onChange={() => onChange("male")}
            type="radio"
            name="gender"
            id="male"
            disabled={disabled}
            checked={value === "male"}
          />
          <img src="/icons/mal.svg" alt="male" /> ذكر
        </label>
      </div>
    </div>
  );
}
