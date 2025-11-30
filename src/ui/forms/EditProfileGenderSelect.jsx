import { useTranslation } from "react-i18next";

export default function GenderSelect({
  value,
  onChange,
  disabled = ({ disabled } = false),
}) {
  const { t } = useTranslation();
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
          <img src="/icons/femal.svg" alt="female" /> {t("female")}
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
          <img src="/icons/mal.svg" alt="male" /> {t("male")}
        </label>
      </div>
    </div>
  );
}
