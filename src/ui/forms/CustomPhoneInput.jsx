// // export default CustomPhoneInput;
// import { useState, useEffect, useRef } from "react";
// import { Dropdown, Spinner } from "react-bootstrap";
// import { useTranslation } from "react-i18next";

// const CustomPhoneInput = ({
//   countries,
//   onScrollEnd,
//   value,
//   onChange,
//   error,
//   disabled = false,
//   isLoadingMore = false,
// }) => {
//   const { t } = useTranslation();
//   const defaultCountry = countries?.[0];
//   const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
//   const [phone, setPhone] = useState("");
//   const observerTarget = useRef(null);

//   // Update local country if countries change
//   useEffect(() => {
//     if (value?.phone !== undefined) {
//       setPhone(value.phone);
//     }
//     if (!countries || countries.length === 0) return;
//     if (value?.code) {
//       const foundCountry = countries?.find((c) => c.phone_code === value.code);
//       if (foundCountry) {
//         setSelectedCountry(foundCountry);
//       } else if (value.image) {
//         setSelectedCountry({
//           phone_code: value.code,
//           image: value.image,
//           title: value.title || "",
//           id: value.countryId || null,
//         });
//       } else if (countries?.length > 0 && !selectedCountry) {
//         const defaultCountry = countries[0];
//         console.log("defaultCountry:", defaultCountry);

//         setSelectedCountry(defaultCountry);
//         onChange({
//           code: defaultCountry.phone_code,
//           phone: value?.phone || "",
//           fullPhone: `${defaultCountry.phone_code}${value?.phone || ""}`,
//           image: defaultCountry.image,
//           title: defaultCountry.title,
//         });
//       }
//     }
//   }, [value, countries]);

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     const fullPhone = `${country.phone_code}${phone}`;
//     onChange({
//       code: country.phone_code,
//       phone,
//       fullPhone,
//     });
//   };

//   const handlePhoneChange = (e) => {
//     const rawValue = e.target.value.replace(/\D/g, ""); // remove non-numeric
//     setPhone(rawValue);
//     const fullPhone = selectedCountry
//       ? `${selectedCountry.phone_code}${rawValue}`
//       : rawValue;

//     onChange({
//       code: selectedCountry?.phone_code || "",
//       phone: rawValue,
//       fullPhone,
//     });
//   };
//   console.log(isLoadingMore);
//   console.log(selectedCountry);
//   console.log("countires :", countries);

//   // --- 2. Intersection Observer (The Fix) ---
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         // Only trigger if the bottom is visible AND we aren't already loading
//         if (entries[0].isIntersecting && !isLoadingMore) {
//           onScrollEnd?.();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerTarget.current) {
//       observer.observe(observerTarget.current);
//     }

//     return () => observer.disconnect();
//   }, [onScrollEnd, isLoadingMore, countries]);

//   return (
//     <div className="custom-phone-input input-filed d-flex flex-column gap-1 w-100">
//       <div className="d-flex align-items-center gap-2 w-100">
//         {/* Controlled phone input */}
//         <div className="input-field ">
//           <input
//             type="tel"
//             className="form-control input-field flex-grow-1"
//             placeholder={t("auth.phoneInputPlaceholder")}
//             value={phone}
//             onChange={handlePhoneChange}
//             disabled={disabled}
//           />
//         </div>{" "}
//         {/* Country dropdown */}
//         <Dropdown
//           style={{
//             height: "54px",
//             display: "block",
//             outline: "none",
//             borderRadius: "12px",
//             background: "#0d0d0d05",
//             padding: "12px 16px !important",
//           }}
//         >
//           <Dropdown.Toggle
//             variant="outline-secondary"
//             id="dropdown-country"
//             className="d-flex align-items-center gap-2"
//             disabled={disabled}
//             style={{
//               height: "54px",
//               display: "block",
//               outline: "none",
//               border: "1px solid #0d0d0d18",
//               borderRadius: "12px",
//               background: "#0d0d0d05",
//               padding: "12px 16px !important",
//             }}
//           >
//             {selectedCountry ? (
//               <>
//                 <img
//                   src={selectedCountry.image}
//                   alt={selectedCountry.title}
//                   style={{ width: 24, height: 16, borderRadius: 3 }}
//                 />
//                 <span>{selectedCountry.phone_code}</span>
//               </>
//             ) : (
//               <Spinner></Spinner>
//             )}
//           </Dropdown.Toggle>

//           <Dropdown.Menu
//             // ref={dropdownMenuRef}
//             style={{ maxHeight: "100px", overflowY: "auto" }}
//             // onScroll={handleScroll}
//           >
//             {countries?.map((country) => (
//               <Dropdown.Item
//                 key={country.id}
//                 disabled={disabled}
//                 onClick={() => handleCountrySelect(country)}
//                 className="d-flex align-items-center gap-2"
//               >
//                 <img
//                   src={country.image}
//                   alt={country.title}
//                   style={{ width: 24, height: 16, borderRadius: 3 }}
//                 />
//                 <div>{country.title}</div>
//                 <small className="text-muted ms-auto">
//                   {country.phone_code}
//                 </small>
//               </Dropdown.Item>
//             ))}
//             <div ref={observerTarget} style={{ height: "4px" }}>
//               {isLoadingMore && (
//                 <div className="text-center p-2">
//                   <Spinner size="sm" animation="border" />
//                 </div>
//               )}
//             </div>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {error && (
//         <p className="text-danger small mb-0" style={{ marginLeft: "5px" }}>
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CustomPhoneInput;

import { useEffect, useMemo, useRef } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CustomPhoneInput = ({
  countries = [], // Now strictly expecting a flattened array
  value, // { phone, code, image, title }
  onChange,
  onScrollEnd,
  isLoadingMore,
  disabled,
  error,
}) => {
  const observerTarget = useRef(null);
  const { t } = useTranslation();
  // 1. Identify the selected country object from the flattened list
  const selectedCountry = useMemo(() => {
    if (!value?.code || countries.length === 0) return null;
    return countries.find((c) => String(c.phone_code) === String(value.code));
  }, [countries, value?.code]);

  // 2. CREATE MODE: Auto-select first country if no code exists
  useEffect(() => {
    if (countries.length > 0 && !value?.code && !disabled) {
      const first = countries[0];
      onChange({
        code: first.phone_code,
        phone: value?.phone || "",
        fullPhone: `${first.phone_code}${value?.phone || ""}`,
        image: first.image,
        title: first.title,
      });
    }
  }, [countries.length, value?.code]);

  // 3. PAGINATION: Intersection Observer (Solves the scroll-spam)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only trigger if bottom is visible AND not currently fetching
        if (entries[0].isIntersecting && !isLoadingMore && onScrollEnd) {
          onScrollEnd();
        }
      },
      { threshold: 0.1 } // Trigger as soon as the sentinel is slightly visible
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [onScrollEnd, isLoadingMore, countries.length]);

  const handlePhoneChange = (e) => {
    const num = e.target.value.replace(/\D/g, "");
    onChange({
      ...value,
      phone: num,
      fullPhone: `${value.code}${num}`,
    });
  };

  const handleCountryClick = (country) => {
    onChange({
      code: country.phone_code,
      phone: value.phone,
      fullPhone: `${country.phone_code}${value.phone}`,
      image: country.image,
      title: country.title,
    });
  };

  return (
    <div className="phone-input-container">
      <div className="d-flex align-items-center gap-2 w-100">
        {" "}
        <div className="input-field ">
          <input
            type="tel"
            className="form-control input-field flex-grow-1"
            placeholder={t("auth.phoneInputPlaceholder")}
            value={value?.phone || ""}
            onChange={handlePhoneChange}
            disabled={disabled}
          />
        </div>
        <Dropdown
          className="country-dropdown"
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
            variant="none"
            disabled={disabled}
            className="d-flex align-items-center gap-2 "
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
            {/* Logic: Show selectedCountry flag, OR the fallback image from value, OR spinner */}
            {selectedCountry || value?.image ? (
              <>
                <img
                  src={selectedCountry?.image || value.image}
                  alt="flag"
                  width="22"
                  height="15"
                  className="object-fit-cover"
                />
                <div className="code-text">
                  {value?.code || selectedCountry?.phone_code}
                </div>
              </>
            ) : (
              <Spinner animation="border" size="sm" />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu className="country-menu shadow">
            <div
              className="dropdown-list-container"
              style={{ maxHeight: "100px", overflowY: "auto" }}
            >
              {countries.map((country, index) => (
                <Dropdown.Item
                  key={`${country.id}-${index}`}
                  onClick={() => handleCountryClick(country)}
                  className="d-flex align-items-center gap-2"
                >
                  <img
                    src={country.image}
                    alt=""
                    width="20"
                    height="14"
                    className="object-fit-cover"
                  />
                  <div className="flex-grow-1">{country.title}</div>
                  <div className="text-muted small">{country.phone_code}</div>
                </Dropdown.Item>
              ))}

              {/* SENTINEL: Invisible div that triggers pagination */}
              <div
                ref={observerTarget}
                style={{ height: "1px", width: "100%" }}
              >
                {isLoadingMore && (
                  <div className="text-center py-2">
                    <Spinner animation="border" size="sm" variant="primary" />
                  </div>
                )}
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {error && (
        <div className="error-message text-danger small mt-1">{error}</div>
      )}
    </div>
  );
};

export default CustomPhoneInput;
