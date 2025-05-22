export default function FormSteps({
  styleType,
  setForm,
  form,
  id,
  steps,
  type,
}) {
  const canAccessStep = (stepIndex) => {
    let currentIndex;
    if (type === "booking") {
      currentIndex = form;
    } else {
      currentIndex = steps?.indexOf(form);
    }
    if (id) return true;
    if (stepIndex < currentIndex) return true;
    return false;
  };

  return (
    <div
      className={`wizard_tabs  ${styleType === "withBg" ? "bg_third" : ""} `}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          className={`wizard_tab ${
            styleType === "withBg" ? "wizard_tab_bg" : ""
          } ${
            Number(form) === (type === "booking" ? i : step) ? "active" : ""
          } ${!canAccessStep(i) ? "disabled" : ""}`}
          onClick={() =>
            canAccessStep(i) && setForm(type === "booking" ? i : step)
          }
          style={{ cursor: canAccessStep(i) ? "pointer" : "not-allowed" }}
        >
          <div className="step_no">{i + 1}</div>
          <h6>{step}</h6>
        </div>
      ))}
    </div>
  );
}
