import FormWrapper from "../forms/FormWrapper";
import Attachments from "./Attachments";

const Details = () => (
  <FormWrapper title={"موضوع الطلب"}>
    <div className="model__details">
      <div className="model__details--text-container">
        <div className="model__details-description">
          <h3>الموضوع</h3>
          <p> عنوان الموضوع </p>
        </div>
        <div className="model__details-description">
          <h3>الوصف</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            necessitatibus dolorum architecto consequatur praesentium illum
            ratione modi reprehenderit animi!
          </p>
        </div>
      </div>
      <Attachments />
    </div>
  </FormWrapper>
);

export default Details;
