import { useState } from "react";
import GoalDetailsModal from "./GoalDetailsModal";
import { useLocation, useNavigate } from "react-router";
import medalIcon from "../../../../assets/icons/medal.svg";
export default function MemberCard({ member, exePercentage }) {
  const [showGoalDetails, setShowGoalDetails] = useState();
  const location = useLocation();

  const isMyGroup = location?.pathname.includes("my-group");
  const navigate = useNavigate();
  return (
    <div className="position-relative">
      <div
        className={`member-card position-relative cursor-pointer ${
          member?.show_goal ? "cursor-pointer" : ""
        }`}
        onClick={() => {
          if (isMyGroup) {
            navigate(`/my-contracts/${member?.work_id}`);
          } else {
            if (member?.show_goal === true) setShowGoalDetails(true);
          }
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
            <img src={medalIcon} />
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
      {member?.member_pending_count &&
      member?.member_pending_count > 0 &&
      isMyGroup ? (
        <span className="notification_span notification_position-bottom">
          {member?.member_pending_count}
        </span>
      ) : null}
    </div>
  );
}
