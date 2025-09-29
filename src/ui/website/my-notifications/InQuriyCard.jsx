import HelperCard from "../../cards/HelperCard";
import CustomButton from "../../CustomButton";

export default function InQuriyCard({ item }) {
  return (
    <div className="inquriy-card">
      <HelperCard helper={item?.fromUser} />
      <div className="inquriy-data">
        <div className="inquriy-header">
          <img src="/icons/triangle.svg" />
          <h2>{item.code}</h2>
        </div>
        <p>{item.message} </p>
        <small>{item.created_at}</small>
      </div>
      {!item.answer && (
        <div className="buttons my-3 justify-content-end">
          <CustomButton
            size="large"
            fullWidth
            style={{ backgroundColor: "#4ECDC4" }}
          >
            {" "}
            رد{" "}
          </CustomButton>
        </div>
      )}
      {!item.answer && (
        <div className="inquriy-data">
          <div className="inquriy-header">
            <h2>الرد</h2>
          </div>
          <p>{item.answer} </p>
          <small>{item.updated_at}</small>
        </div>
      )}
    </div>
  );
}
