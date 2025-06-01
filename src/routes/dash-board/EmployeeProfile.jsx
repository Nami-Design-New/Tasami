import UserProfileCard from "../../ui/dash-board/cards/UserProfileCard";
import PageHeader from "../../ui/PageHeader";
import "../../assets/styles/profile.css";
import QuickActionsCard from "../../ui/dash-board/cards/QuickActionsCard";
import EmployeeData from "../../ui/dash-board/EmploymentData/EmployeeData";

const EmployeeProfile = () => {
  return (
    <section className="employee__profile">
      <PageHeader />
      <div className="row">
        <div className="col-12 col-md-3">
          <div>
            <UserProfileCard />
            <QuickActionsCard />
          </div>
        </div>
        <div className="col-12 col-md-9">
          <EmployeeData />
        </div>
      </div>
    </section>
  );
};

export default EmployeeProfile;
