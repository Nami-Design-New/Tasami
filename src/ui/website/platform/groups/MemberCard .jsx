import { useState } from "react";
import GoalDetailsModal from "./GoalDetailsModal";

export default function MemberCard({ member, exePercentage }) {
  const [showGoalDetails, setShowGoalDetails] = useState();
  console.log(member?.user);

  return (
    <>
      <div
        className={`member-card ${member?.show_goal ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (member?.show_goal === true) setShowGoalDetails(true);
        }}
      >
        {" "}
        <div className="position-relative">
          <img
            className="member-card__avatar"
            src={member.user.image ? member.user.image : "/images/p1.png"}
          />
          {member?.user?.is_online && <div className="status-indicator"></div>}
        </div>
        {exePercentage >= 0 && (
          <div className="exe-padge">{exePercentage} %</div>
        )}
        <div className="info">
          <p className="member-name">{member?.user?.name}</p>
          <div className="d-flex gap-1 align-content-center">
            <img src="/icons/medal.svg" />
            <span>{member?.user?.experience_level}</span>
          </div>
        </div>
      </div>
      <GoalDetailsModal
        showModal={showGoalDetails}
        setShowModal={setShowGoalDetails}
        name={member.user.name}
        category={member.goal_category_title}
        subCategory={member.goal_sub_category_title}
        title={member.title}
      />
    </>
  );
}
