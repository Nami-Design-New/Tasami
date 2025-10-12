export default function WorkProgress({ steps }) {
  return (
    <div className="work-progress">
      <div className="position-relative">
        <div className="progress-step">
          {steps.map((step, index) => (
            <>
              <div
                key={step.key}
                className=" position-relative d-flex fl  flex-column "
              >
                {" "}
                <div
                  className={`step-icon ${
                    step.completed ? "completed" : step.current ? "current" : ""
                  }`}
                >
                  <span
                    style={{
                      left: `${
                        index === steps.length - 1
                          ? "0"
                          : index < steps.length - 1 && index > 0
                          ? "50%"
                          : ""
                      }`,
                      transform: `translateX(${
                        index < steps.length - 1 && index > 0 ? "-50%" : ""
                      })`,
                    }}
                    className="step-label"
                  >
                    {step.label}
                  </span>
                </div>
              </div>{" "}
              <>
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
              </>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
