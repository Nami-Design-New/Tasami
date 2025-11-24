import AvailableForAddGroups from "../../../ui/dash-board/workingGroups/AvailableForAddGroups";
import SharedGroupsComponent from "../../../ui/dash-board/workingGroups/SharedGroupsComponent";
// const gradientClasses = ["blue", "indigo", "green"];

const SharedGroups = () => {
  return (
    <section className="teams">
      <SharedGroupsComponent />
      <AvailableForAddGroups />
    </section>
  );
};

export default SharedGroups;
