import CustomButton from "../../CustomButton";

export default function NoGroup({ withHelper = false }) {
  return (
    <div className="no-groups">
      <img src="/icons/alert-icon.svg" />
      <h1>لم يتم تعيين مساعد شخصي لهذا الهدف!</h1>
      <p>
        قم بتعيين مساعد شخصي للاستفادة من أدوات العمل الاحترافية التي توفرها
        منصة تسامي لزيادة الإنتاجية وبناء الجدارات والتعلم الاجتماعي
      </p>
      {withHelper && (
        <div className="button-wrapper">
          <CustomButton
            fullWidth
            size="large"
            style={{ backgroundColor: "#4ECDC4" }}
          >
            تعين مساعد شخصي
          </CustomButton>
        </div>
      )}
    </div>
  );
}
