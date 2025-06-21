import CustomButton from "../../CustomButton";
import ProgressStats from "../teams/ProgressStats";
import TeamInfoItem from "../teams/TeamInfoItem";

const TeamCard = ({ team }) => {
  return (
    <div className="teams__card teams__card--main">
      <div className="teams__card-header">
        <div className="teams__card-header-info">
          <h4 className="teams__card-id">{team.id}</h4>
          <p className="teams__card-location">{team.location}</p>
        </div>
        <span className="teams__card-region">{team.region}</span>
      </div>

      <div className="teams__card-body">
        <div className="teams__card-body-list">
          {team.employees.map((item, idx) => (
            <TeamInfoItem key={idx} title={item.title} value={item.data} />
          ))}
        </div>

        <div className="teams__progress">
          <div className="teams__progress-data">
            <div className="teams__progress-summary">
              <span>انجاز المهام</span>
              <span>{team.progress.percent}%</span>
            </div>

            <div className="teams__progress-bar">
              <div
                className="teams__progress-fill"
                style={{ width: `${team.progress.percent}%` }}
              />
            </div>
            <ProgressStats
              completed={team.progress.completed}
              pending={team.progress.pending}
            />
          </div>
        </div>
      </div>

      <div className="teams__card-footer">
        <CustomButton size="small">حذف</CustomButton>
      </div>
    </div>
  );
};

export default TeamCard;
