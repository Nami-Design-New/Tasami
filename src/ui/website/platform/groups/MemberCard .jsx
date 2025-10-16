import { useState } from "react";
import GoalDetailsModal from "./GoalDetailsModal";

export default function MemberCard({ member, exePercentage }) {
  const [showGoalDetails, setShowGoalDetails] = useState();
  console.log(member);

  console.log(member?.show_goal);

  return (
    <>
      <div
        className={`member-card ${member?.show_goal ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (member?.show_goal === true) setShowGoalDetails(true);
        }}
      >
        <img
          className="member-card__avatar"
          src={member.user.image ? member.user.image : "/images/p1.png"}
        />
        {exePercentage >= 0 && (
          <div className="exe-padge">{exePercentage} %</div>
        )}
        <div className="info">
          <p className="member-name">{member?.user?.name}</p>
          <div className="d-flex gap-1 align-content-center">
            <img src="/icons/medal.svg" />
            <span>{member?.user?.contract_numbers}</span>
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
