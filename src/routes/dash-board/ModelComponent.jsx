import Details from "../../ui/ModelComponent/Details";
import EmployeeData from "../../ui/ModelComponent/EmployeeData";
import Header from "../../ui/ModelComponent/Header";
import ModelInfo from "../../ui/ModelComponent/ModelInfo";
import Notes from "../../ui/ModelComponent/Notes";
const ModelComponent = () => {
  return (
    <section className="model">
      <Header title="نموذج خدمه العملاء" />
      <EmployeeData />
      <ModelInfo />
      <Details />
      <Notes />
    </section>
  );
};

export default ModelComponent;
