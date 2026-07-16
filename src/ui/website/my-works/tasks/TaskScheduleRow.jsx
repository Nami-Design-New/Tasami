import { Form } from "react-bootstrap";
import CustomButton from "../../../CustomButton";
import InputField from "../../../forms/InputField";

export default function TaskScheduleRow({ viewModel, actions }) {
  const { rowClassName, number, date, completion, reminder, deletion } =
    viewModel;

  return (
    <article className={rowClassName}>
      <span className="task-repetition-row__number">{number}</span>

      <InputField
        type="date"
        className="task-repetition-row__date-field"
        value={date.value}
        min={date.minimum}
        max={date.maximum}
        aria-label={date.label}
        disabled={date.disabled}
        error={date.error}
        onChange={actions.changeDate}
      />

      <div className="task-repetition-row__completion-control">
        {completion.completed ? (
          <span className="task-repetition-row__completed-status">
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            {completion.label}
          </span>
        ) : (
          <CustomButton
            type="button"
            color="secondary-website"
            size="medium"
            className="task-repetition-row__complete"
            disabled={completion.disabled}
            title={completion.title}
            onClick={actions.complete}
          >
            <i className={completion.iconClassName} aria-hidden="true" />
            {completion.label}
          </CustomButton>
        )}
        {completion.error ? (
          <p className="error-text">{completion.error}</p>
        ) : null}
      </div>

      <div className="task-repetition-row__reminder-control">
        <label className="task-repetition-row__reminder">
          <Form.Switch
            aria-label={reminder.label}
            checked={reminder.enabled}
            disabled={reminder.disabled}
            onChange={actions.changeReminder}
          />
          <span>{reminder.shortLabel}</span>
        </label>
        {reminder.error ? (
          <p className="error-text">{reminder.error}</p>
        ) : null}
      </div>

      <button
        type="button"
        className="task-repetition-row__delete"
        disabled={deletion.disabled}
        onClick={actions.requestDelete}
      >
        {deletion.label}
      </button>
    </article>
  );
}
