// export default CustomPhoneInput;
import { useState, useEffect, useRef } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CustomPhoneInput = ({
  countries,
  onScrollEnd,
  value,
  onChange,
  error,

  disabled = false,
}) => {
  const { t } = useTranslation();
  const defaultCountry = countries?.[0];
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [phone, setPhone] = useState("");
  const dropdownMenuRef = useRef(null);

  // Update local country if countries change
  useEffect(() => {
    if (!countries?.length) return;

    // Edit mode
    if (value?.code) {
      const foundCountry = countries.find((c) => c.phone_code === value.code);

      if (foundCountry) {
        setSelectedCountry(foundCountry);
      }
    }
    //  Create mode:  →
    else {
      setSelectedCountry(countries[0]);
    }

    // sync phone
    if (value?.phone !== undefined) {
      setPhone(value.phone);
    }
  }, [value, countries]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    const fullPhone = `${country.phone_code}${phone}`;
    onChange({
      code: country.phone_code,
      phone,
      fullPhone,
    });
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // remove non-numeric
    setPhone(rawValue);
    const fullPhone = selectedCountry
      ? `${selectedCountry.phone_code}${rawValue}`
      : rawValue;

    onChange({
      code: selectedCountry?.phone_code || "",
      phone: rawValue,
      fullPhone,
    });
  };

  // Infinite scroll handler
  const handleScroll = (e) => {
    const el = e.target;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      if (onScrollEnd) {
        onScrollEnd();
      }
    }
  };

  return (
    <div className="custom-phone-input input-filed d-flex flex-column gap-1 w-100">
      <div className="d-flex align-items-center gap-2 w-100">
        {/* Controlled phone input */}
        <div className="input-field ">
          <input
            type="tel"
            className="form-control input-field flex-grow-1"
            placeholder={t("auth.phoneInputPlaceholder")}
            value={phone}
            onChange={handlePhoneChange}
            disabled={disabled}
          />
        </div>{" "}
        {/* Country dropdown */}
        <Dropdown
          style={{
            height: "54px",
            display: "block",
            outline: "none",
            borderRadius: "12px",
            background: "#0d0d0d05",
            padding: "12px 16px !important",
          }}
        >
          <Dropdown.Toggle
            variant="outline-secondary"
            id="dropdown-country"
            className="d-flex align-items-center gap-2"
            disabled={disabled}
            style={{
              height: "54px",
              display: "block",
              outline: "none",
              border: "1px solid #0d0d0d18",
              borderRadius: "12px",
              background: "#0d0d0d05",
              padding: "12px 16px !important",
            }}
          >
            {selectedCountry ? (
              <>
                <img
                  src={selectedCountry.image}
                  alt={selectedCountry.title}
                  style={{ width: 24, height: 16, borderRadius: 3 }}
                />
                <span>{selectedCountry.phone_code}</span>
              </>
            ) : (
              <Spinner></Spinner>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu
            ref={dropdownMenuRef}
            style={{ maxHeight: "250px", overflowY: "auto" }}
            onScroll={handleScroll}
          >
            {countries?.map((country) => (
              <Dropdown.Item
                key={country.id}
                disabled={disabled}
                onClick={() => handleCountrySelect(country)}
                className="d-flex align-items-center gap-2"
              >
                <img
                  src={country.image}
                  alt={country.title}
                  style={{ width: 24, height: 16, borderRadius: 3 }}
                />
                <div>{country.title}</div>
                <small className="text-muted ms-auto">
                  {country.phone_code}
                </small>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {error && (
        <p className="text-danger small mb-0" style={{ marginLeft: "5px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;
