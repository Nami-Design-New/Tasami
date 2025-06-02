import FormWrapper from "../forms/FormWrapper";

const MODELACTIONS = [
  {
    id: 1,
    label: "اعاده الاجراء",
  },
  {
    id: 2,
    label: "اكمال الاجراء",
  },
  {
    id: 3,
    label: "اجراء مباشر",
  },
];

const Actions = () => (
  <>
    <FormWrapper title="خيارات الاجراء">
      <div className="model__actions">
        {MODELACTIONS.map(({ id, label }) => (
          <div key={id} className="model__actions-option">
            <input id={`${label}-${id}`} type="radio" name="action" />
            <label htmlFor={`${label}-${id}`}>{label}</label>
          </div>
        ))}
      </div>
    </FormWrapper>
    <div className="model__extra-options">
      <input type="checkbox" id="notify-head" />
      <label htmlFor="notify-head"> اشعار الرئيس المباشر </label>
    </div>
  </>
);

export default Actions;
