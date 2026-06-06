// EntryEditor.tsx — edits one entry: its TextFields, its BulletEditor, a remove button.
import type { BulletedEntry } from "../../types/resume";
import { TextField } from "../shared/TextField";
import { BulletEditor } from "./BulletEditor";

type EntryField = {
  label: string;
  field: BulletedEntryFieldName;
  placeholder: string;
};

export type BulletedEntryFieldName = "organization" | "role" | "location" | "dateRange";

const entryFields: EntryField[] = [
  {
    label: "Organization",
    field: "organization",
    placeholder: "Google",
  },

  {
    label: "Role",
    field: "role",
    placeholder: "Software Engineer",
  },

  {
    label: "Location",
    field: "location",
    placeholder: "New York, NY",
  },

  {
    label: "Date Range",
    field: "dateRange",
    placeholder: "May 2023 - September 2025",
  },
];

type EntryEditorProps = {
  entry: BulletedEntry;
  onUpdate: (field: BulletedEntryFieldName, value: string) => void;
  onUpdateBullet: (bulletIndex: number, value: string) => void;
  onAddBullet: () => void;
  onDeleteBullet: (bulletIndex: number) => void;
};

export function BulletedEntryEditor({
  entry,
  onUpdate,
  onUpdateBullet,
  onAddBullet,
  onDeleteBullet,
}: EntryEditorProps) {
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
      <BulletEditor
        bullets={entry.bullets}
        onUpdateBullet={onUpdateBullet}
        onAddBullet={onAddBullet}
        onDeleteBullet={onDeleteBullet}
      />
    </div>
  );
} 