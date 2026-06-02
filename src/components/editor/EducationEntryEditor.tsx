import type { EducationEntry } from "../../types/resume";
import { TextField } from "../shared/TextField";

type EducationFieldName = "school" | "degree" | "location" | "dateRange";

type EducationField = {
  label: string;
  field: EducationFieldName;
  placeholder: string;
};

const educationFields: EducationField[] = [
  {
    label: "School",
    field: "school",
    placeholder: "Brooklyn College",
  },
  {
    label: "Degree",
    field: "degree",
    placeholder: "Computer Science",
  },
  {
    label: "Location",
    field: "location",
    placeholder: "2900 Bedford Ave",
  },
  {
    label: "Date Range",
    field: "dateRange",
    placeholder: "May 2026",
  },
];

type EducationEntryEditorProps = {
  educationEntry: EducationEntry;
  canDelete: boolean;
  onUpdate: (field: EducationFieldName, value: string) => void;
  onDelete: () => void;
};

export function EducationEntryEditor({
  educationEntry,
  canDelete,
  onUpdate,
  onDelete,
}: EducationEntryEditorProps) {
  return (
    <div>
      {educationFields.map((educationField) => (
        // TextField goes here
        <TextField
          key={educationField.field}
          label={educationField.label}
          value={educationEntry[educationField.field]}
          placeholder={educationField.placeholder}
          onChange={(value) => onUpdate(educationField.field, value)}
        />
      ))}

      <button type="button" disabled={!canDelete} onClick={onDelete}>
        Delete Education
      </button>
    </div>
  );
}