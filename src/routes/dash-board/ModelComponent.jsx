import Actions from "../../ui/ModelComponent/Actions";
import Details from "../../ui/ModelComponent/Details";
import EmployeeData from "../../ui/ModelComponent/EmployeeData";
import Header from "../../ui/ModelComponent/Header";
import ModelInfo from "../../ui/ModelComponent/ModelInfo";
import Notes from "../../ui/ModelComponent/Notes";
import SubmitButtons from "../../ui/ModelComponent/SubmitButtons";
import "../../assets/styles/model.css";
const ModelComponent = () => {
  return (
    <section className="model">
      <Header title="نموذج خدمه العملاء" />
      <EmployeeData />
      <ModelInfo />
      <Details />
      <Notes />
      <Actions />
      <SubmitButtons />
    </section>
  );
};

export default ModelComponent;
