export default function AssistantData() {
  return (
    <div className="assistant-card">
      <div className="card-body">
        <div className="user-data">
          <div className="img-wrapper">
            <img
              src="/images/profile2.png"
              alt="احمد التطاوي"
              className="assistant-avatar"
            />
          </div>
          <div className="assistant-name">
            <h3>
              <span> احمد التطاوي</span>{" "}
              <div className="stats">
                <img src="icons/medal.svg" />
                <span>11</span>
              </div>
            </h3>
            <div className="location">
              <img src="icons/location-icon.svg" />
              <span>السعودية </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
