import DataItem from "./common/DataItem";
import Attachments from "./Attachments";
import FormWrapper from "../forms/FormWrapper";

const Details = () => (
  <FormWrapper title={"موضوع الطلب"}>
    <div className="model__details">
      <div className="model__details--text-container">
        <DataItem label="الموضوع" value="عنوان الموضوع" />
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
