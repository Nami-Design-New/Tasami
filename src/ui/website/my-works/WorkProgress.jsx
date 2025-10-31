import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function WorkProgress({ steps }) {
  const { lang } = useSelector((state) => state.language);

  return (
    <div className={`work-progress`}>
      <div className="position-relative">
        <div className="progress-step">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isMiddle = index < steps.length - 1 && index > 0;

            // Choose the correct side depending on language
            const positionStyle =
              lang === "en"
                ? {
                    right: isLast ? "0" : isMiddle ? "50%" : "",
                    transform: isMiddle ? "translateX(50%)" : "",
                  }
                : {
                    left: isLast ? "0" : isMiddle ? "50%" : "",
                    transform: isMiddle ? "translateX(-50%)" : "",
                  };

            return (
              <Fragment key={step.key}>
                <div className="position-relative d-flex flex-column">
                  <div
                    className={`step-icon ${
                      step.completed
                        ? "completed"
                        : step.current
                        ? "current"
                        : ""
                    }`}
                  >
                    <span className="step-label" style={positionStyle}>
                      {step.label}
                    </span>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`step-line ${
                      step.completed
                        ? "completed"
                        : step.current
                        ? "current"
                        : ""
                    }`}
                    style={{ width: "100vw" }}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
