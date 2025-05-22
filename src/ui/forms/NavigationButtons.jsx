import { Link } from "react-router";
import SubmitButton from "./SubmitButton";

export default function NavigationButtons({
  form,
  steps,
  onBack,
  onNext,
  isLoading,
}) {
  return (
    <div className="navigation-buttons ">
      {form > 0 && form !== steps.length && (
        <button
          onClick={onBack}
          type="button"
          className="btn-custom btn-outline-custom "
        >
          Back
        </button>
      )}

      {form < steps.length - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="button next-button"
          style={{
            backgroundColor: "#006980",
            color: "#fff",
          }}
        >
          Next
        </button>
      ) : form === steps.length ? (
        <></>
      ) : (
        <SubmitButton
          loading={isLoading}
          text="Make Booking"
          className="next-button btn-padding"
          disabled={isLoading}
        />
      )}
    </div>
  );
}
