import { Link } from "react-router";
import TextField from "../../forms/TextField";

const NoteItem = ({ label, id }) => (
  <div className="note-item">
    <label className="note-item__label">
      <span>{label}</span>
      <Link>{id}</Link>
    </label>
    <TextField rows={6} />
  </div>
);

export default NoteItem;
