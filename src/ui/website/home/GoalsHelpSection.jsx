import { Link } from "react-router";

export default function GoalsHelpSection() {
  return (
    <section className="goals-help-section container">
      <Link to="/new-goal" className="goal-btn personal-goal">
<img src="/icons/add.svg" alt="icon" /> هدف شخصي
      </Link>

      <Link to="/new-help" className="goal-btn offer-help">
        <img src="/icons/add.svg" alt="icon" />   
        تقديم مساعدة
      </Link>
    </section>
  );
}
