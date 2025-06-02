import FormWrapper from "../forms/FormWrapper";
import NoteItem from "./common/NoteItem";

const Notes = () => (
  <FormWrapper title="">
    <div className="model__notes">
      <NoteItem label="افاده الموظف" id="E-150322-000001" />
      <NoteItem label="افاده المشرف" id="S-150322-000001" />
      <NoteItem label="افاده المشرف" id="D-150322-000001" />
    </div>
  </FormWrapper>
);

export default Notes;
