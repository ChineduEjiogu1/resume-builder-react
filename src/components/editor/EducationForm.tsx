import { useResume } from "../../state/ResumeContext";
import type { EducationEntry } from "../../types/resume";

type EducationField = {
  label: string;
  field: keyof EducationEntry;
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

export function EducationForm() {
  const { resume, dispatch } = useResume();
  return (
    <div>
      <h3>Education</h3>
      {resume.education.map((educationEntry, educationIndex) => (
        <div key={educationIndex}>
          {educationFields.map((educationField) => (
            <label key={educationField.field}>
              <span>{educationField.label}</span>
              <input
                type="text"
                placeholder={educationField.placeholder}
                value={educationEntry[educationField.field]}
                onChange={(event) =>
                  dispatch({
                    type: "update_education",
                    index: educationIndex,
                    field: educationField.field,
                    value: event.target.value,
                  })
                }
              />
            </label>
          ))}

          <button
            type="button"
            disabled={resume.education.length <= 1}
            onClick={() =>
              dispatch({
                type: "delete_education",
                index: educationIndex,
              })
            }
          >
            Delete Education
          </button>
        </div>
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
