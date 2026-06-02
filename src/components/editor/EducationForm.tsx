import { useResume } from "../../state/useResume";
import { EducationEntryEditor } from "./EducationEntryEditor";

export function EducationForm() {
  const { resume, dispatch } = useResume();
  return (
    <div>
      <h3>Education</h3>
      {resume.education.map((educationEntry, educationIndex) => (
        <EducationEntryEditor
          key={educationIndex}
          educationEntry={educationEntry}
          canDelete={resume.education.length > 1}
          onUpdate={(field, value) =>
            dispatch({
              type: "update_education",
              index: educationIndex,
              field,
              value,
            })
          }
          onDelete={() =>
            dispatch({
              type: "delete_education",
              index: educationIndex,
            })
          }
        />
      ))}

      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "add_education",
          })
        }
      >
        Add Education
      </button>
    </div>
  );
}