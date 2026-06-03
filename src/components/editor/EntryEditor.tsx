// EntryEditor.tsx — edits one entry: its TextFields, its BulletEditor, a remove button.
import type { BulletedEntry } from "../../types/resume";
import { TextField } from "../shared/TextField";

type EntryField = {
  label: string;
  field: EntryFieldName;
  placeholder: string;
};


type EntryFieldName =
  | "organization"
  | "role"
  | "location"
  | "dateRange";

const entryFields: EntryField[] = [
    {
        label: "Organization",
        field: "organization",
        placeholder: "Google"
    },

    {
        label: "Role",
        field: "role",
        placeholder: "Software Engineer"
    },

    {
        label: "Location",
        field: "location",
        placeholder: "New York, NY"
    },

    {
        label: "Date Range",
        field: "dateRange",
        placeholder: "May 2023 - September 2025"
    }

];

type EntryEditorProps = {
  entry: BulletedEntry;
  onUpdate: (field: EntryFieldName, value: string) => void;
};

export function EntryEditor({ entry, onUpdate }: EntryEditorProps) {
  return (
    <div>
      {entryFields.map((entryField) => (
        <TextField
          key={entryField.field}
          label={entryField.label}
          value={entry[entryField.field]}
          placeholder={entryField.placeholder}
          onChange={(value) => onUpdate(entryField.field, value)}
        />
      ))}
    </div>
  );
}