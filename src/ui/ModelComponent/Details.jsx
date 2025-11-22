import FormWrapper from "../forms/FormWrapper";
import Attachments from "./Attachments";

const Details = ({ taskData }) => (
  <FormWrapper title={"موضوع الطلب"}>
    <div className="model__details">
      <div className="model__details--text-container">
        <div className="model__details-description">
          <h3>الموضوع</h3>
          <p> {taskData?.task?.title} </p>
        </div>
        <div className="model__details-description">
          <h3>الوصف</h3>
          <p>{taskData?.task?.description}</p>
        </div>
      </div>
      <Attachments taskData={taskData} />
    </div>
  </FormWrapper>
);

export default Details;
